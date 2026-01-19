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
        title: 'Buku',
        href: '/books',
    },
];

export default function BookIndex({ books, filters }: { books: any; filters: any }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/books', { search }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Buku" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari buku (judul, pengarang, isbn)..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <Link href="/books/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Buku
                        </Button>
                    </Link>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Pengarang</TableHead>
                                <TableHead>ISBN</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead>Rak</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {books.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        Data buku tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                books.data.map((book: any) => (
                                    <TableRow key={book.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <img src={book.cover_image_url} alt={book.title} className="w-10 h-14 object-cover rounded shadow-sm bg-muted" />
                                                <span>{book.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.isbn}</TableCell>
                                        <TableCell>{book.category.name}</TableCell>
                                        <TableCell>{book.stock}</TableCell>
                                        <TableCell>{book.rack_location}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/books/${book.id}/edit`}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => {
                                                        if (confirm('Yakin ingin menghapus buku ini?')) {
                                                            router.delete(`/books/${book.id}`);
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
                    {books.links.map((link: any, index: number) => (
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
