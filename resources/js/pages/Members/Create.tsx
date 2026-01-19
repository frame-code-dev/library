import { Head, Link, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Anggota',
        href: '/members',
    },
    {
        title: 'Tambah',
        href: '/members/create',
    },
];

export default function MemberCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        gender: 'male',
        type: 'student',
        class_or_position: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/members');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Anggota" />
            <div className="flex flex-1 flex-col gap-4 p-4 w-full">
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-lg font-semibold">Tambah Anggota Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        className="h-9"
                                    />
                                    {errors.name && <p className="text-xs text-destructive font-medium">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        className="h-9"
                                    />
                                    {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Jenis Kelamin</Label>
                                    <Select onValueChange={(value) => setData('gender', value)} defaultValue={data.gender}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Pilih Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Laki-laki</SelectItem>
                                            <SelectItem value="female">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.gender && <p className="text-xs text-destructive font-medium">{errors.gender}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipe Anggota</Label>
                                    <Select onValueChange={(value) => setData('type', value)} defaultValue={data.type}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Pilih Tipe" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="student">Siswa</SelectItem>
                                            <SelectItem value="teacher">Guru</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <p className="text-xs text-destructive font-medium">{errors.type}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="class_or_position">Kelas / Jabatan</Label>
                                    <Input
                                        id="class_or_position"
                                        value={data.class_or_position}
                                        onChange={(e) => setData('class_or_position', e.target.value)}
                                        required
                                        className="h-9"
                                    />
                                    {errors.class_or_position && <p className="text-xs text-destructive font-medium">{errors.class_or_position}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Link href="/members">
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
