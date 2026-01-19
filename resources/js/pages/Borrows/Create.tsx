import { Head, Link, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peminjaman',
        href: '/borrows',
    },
    {
        title: 'Tambah',
        href: '/borrows/create',
    },
];

export default function BorrowCreate({ members, books }: { members: any[]; books: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        member_id: '',
        book_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/borrows');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Peminjaman" />
            <div className="flex flex-1 flex-col gap-4 p-4 w-full">
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-lg font-semibold">Tambah Peminjaman Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="member">Anggota</Label>
                                    <Select onValueChange={(value) => setData('member_id', value)}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Pilih Anggota" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {members.map((member) => (
                                                <SelectItem key={member.id} value={member.id.toString()}>
                                                    {member.name} ({member.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.member_id && <p className="text-xs text-destructive font-medium">{errors.member_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="book">Buku</Label>
                                    <Select onValueChange={(value) => setData('book_id', value)}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Pilih Buku" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {books.map((book) => (
                                                <SelectItem key={book.id} value={book.id.toString()} disabled={book.stock <= 0}>
                                                    {book.title} {book.stock <= 0 ? '(Stok Habis)' : `(Stok: ${book.stock})`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.book_id && <p className="text-xs text-destructive font-medium">{errors.book_id}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Link href="/borrows">
                                    <Button variant="outline" type="button" size="sm" className="h-8">Batal</Button>
                                </Link>
                                <Button type="submit" disabled={processing} size="sm" className="h-8 bg-black hover:bg-black/90 text-white">Simpan</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
