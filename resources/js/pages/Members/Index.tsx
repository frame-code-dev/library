import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Anggota',
        href: '/members',
    },
];

export default function MemberIndex({ members, filters }: { members: any; filters: any }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/members', { search }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Anggota" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari anggota (nama, email)..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <Link href="/members/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Anggota
                        </Button>
                    </Link>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Tgl Masuk</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Kelas/Jabatan</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        Data anggota tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                members.data.map((member: any) => (
                                    <TableRow key={member.id}>
                                        <TableCell className="font-medium">{member.name}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="capitalize">{member.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                                        <TableCell className="capitalize">{member.type}</TableCell>
                                        <TableCell>{member.class_or_position}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/members/${member.id}/edit`}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => {
                                                        if (confirm('Yakin ingin menghapus anggota ini?')) {
                                                            router.delete(`/members/${member.id}`);
                                                        }
                                                    }}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-end space-x-2 py-4">
                    {members.links.map((link: any, index: number) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 py-1 text-sm rounded-md border ${
                                link.active ? 'bg-primary text-primary-foreground' : 'bg-background'
                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
