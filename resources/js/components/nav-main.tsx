import { Link } from '@inertiajs/react';

import { cn } from '@/lib/utils';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useActiveUrl } from '@/hooks/use-active-url';
import { type NavItem } from '@/types';

export function NavMain({ items = [], title = 'Platform' }: { items: NavItem[]; title?: string }) {
    const { urlIsActive } = useActiveUrl();

    return (
        <SidebarGroup className="px-3 py-4">
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-2">{title}</SidebarGroupLabel>
            <SidebarMenu className="gap-1.5">
                {items.map((item) => {
                    const active = urlIsActive(item.href);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                tooltip={{ children: item.title }}
                                className={cn(
                                    "relative transition-all duration-300 rounded-lg py-5 px-3",
                                    active 
                                        ? "bg-primary/10 text-primary font-semibold shadow-xs" 
                                        : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Link href={item.href} prefetch className="flex items-center gap-3">
                                    {item.icon && (
                                        <div className={cn(
                                            "transition-colors",
                                            active ? "text-primary" : "text-muted-foreground/60"
                                        )}>
                                            <item.icon className="size-5" />
                                        </div>
                                    )}
                                    <span className="text-sm">{item.title}</span>
                                    {active && (
                                        <div className="absolute right-3 size-1.5 rounded-full bg-primary animate-pulse" />
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
