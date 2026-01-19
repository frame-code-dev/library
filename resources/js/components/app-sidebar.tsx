import { Link, usePage } from '@inertiajs/react';
import { Book, BookOpen, BookUp, Folder, LayoutGrid, Settings, ShieldCheck, Users, Users2 } from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';

import AppLogo from './app-logo';

const navigationGroups = [
    {
        label: 'Platform',
        items: [] as NavItem[],
    },
    {
        label: 'Master Data',
        items: [] as NavItem[],
    },
    {
        label: 'Transaksi',
        items: [] as NavItem[],
    },
    {
        label: 'Sistem',
        items: [] as NavItem[],
    }
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const roles = auth.user?.roles || [];
    const isAdmin = roles.includes('admin');
    const isPetugas = roles.includes('petugas') || isAdmin;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
            icon: LayoutGrid,
        },
    ];

    const masterNavItems: NavItem[] = [];
    const transaksiNavItems: NavItem[] = [];
    const systemNavItems: NavItem[] = [];

    if (isPetugas) {
        masterNavItems.push(
            {
                title: 'Buku',
                href: '/books',
                icon: Book,
            },
            {
                title: 'Anggota',
                href: '/members',
                icon: Users2,
            }
        );
        transaksiNavItems.push(
            {
                title: 'Peminjaman',
                href: '/borrows',
                icon: BookUp,
            }
        );
    }

    if (isAdmin) {
        systemNavItems.push(
            {
                title: 'Manajemen User',
                href: '/users',
                icon: Users,
            },
            {
                title: 'Hak Akses',
                href: '/roles',
                icon: ShieldCheck,
            },
            {
                title: 'Pengaturan',
                href: '/settings/library',
                icon: Settings,
            }
        );
    }

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r-0 shadow-none">
            <SidebarHeader className="py-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="gap-0">
                <NavMain items={mainNavItems} title="Dashboard" />
                {masterNavItems.length > 0 && <NavMain items={masterNavItems} title="Master Data" />}
                {transaksiNavItems.length > 0 && <NavMain items={transaksiNavItems} title="Transaksi" />}
                {systemNavItems.length > 0 && <NavMain items={systemNavItems} title="Sistem" />}
            </SidebarContent>

            <SidebarFooter className="p-4">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
