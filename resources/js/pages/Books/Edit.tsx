import { Head, Link, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Buku',
        href: '/books',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function BookEdit({ book, categories }: { book: any; categories: any[] }) {
    const [preview, setPreview] = useState<string | null>(book.cover_image_url);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category_id: book.category_id.toString(),
        stock: book.stock.toString(),
        rack_location: book.rack_location,
        cover_image: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('cover_image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/books/${book.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Buku" />
            <div className="flex flex-1 flex-col gap-4 p-4 w-full">
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-lg font-semibold">Edit Buku: {book.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="col-span-1 space-y-4">
                                    <Label>Sampul Buku</Label>
                                    <div className="aspect-[3/4] rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-muted/50 relative group cursor-pointer" onClick={() => document.getElementById('cover_image')?.click()}>
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <div className="mx-auto w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                                    <Plus className="w-4 h-4 text-primary" />
                                                </div>
                                                <p className="text-xs text-muted-foreground">Klik untuk upload sampul</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs font-medium">Ubah Gambar</p>
                                        </div>
                                    </div>
                                    <Input
                                        id="cover_image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    {errors.cover_image && <p className="text-xs text-destructive font-medium">{errors.cover_image}</p>}
                                </div>

                                <div className="col-span-1 md:col-span-3 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Judul Buku</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                            className="h-9"
                                        />
                                        {errors.title && <p className="text-xs text-destructive font-medium">{errors.title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="author">Pengarang</Label>
                                        <Input
                                            id="author"
                                            value={data.author}
                                            onChange={(e) => setData('author', e.target.value)}
                                            required
                                            className="h-9"
                                        />
                                        {errors.author && <p className="text-xs text-destructive font-medium">{errors.author}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="isbn">ISBN</Label>
                                            <Input
                                                id="isbn"
                                                value={data.isbn}
                                                onChange={(e) => setData('isbn', e.target.value)}
                                                required
                                                className="h-9"
                                            />
                                            {errors.isbn && <p className="text-xs text-destructive font-medium">{errors.isbn}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Kategori</Label>
                                            <Select onValueChange={(value) => setData('category_id', value)} defaultValue={data.category_id}>
                                                <SelectTrigger className="h-9">
                                                    <SelectValue placeholder="Pilih Kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.category_id && <p className="text-xs text-destructive font-medium">{errors.category_id}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="stock">Stok</Label>
                                            <Input
                                                id="stock"
                                                type="number"
                                                value={data.stock}
                                                onChange={(e) => setData('stock', e.target.value)}
                                                required
                                                className="h-9"
                                            />
                                            {errors.stock && <p className="text-xs text-destructive font-medium">{errors.stock}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="rack">Lokasi Rak</Label>
                                            <Input
                                                id="rack"
                                                value={data.rack_location}
                                                onChange={(e) => setData('rack_location', e.target.value)}
                                                required
                                                className="h-9"
                                            />
                                            {errors.rack_location && <p className="text-xs text-destructive font-medium">{errors.rack_location}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Link href="/books">
                                    <Button variant="outline" type="button" size="sm" className="h-8">Batal</Button>
                                </Link>
                                <Button type="submit" disabled={processing} size="sm" className="h-8 bg-black hover:bg-black/90 text-white">Update</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
