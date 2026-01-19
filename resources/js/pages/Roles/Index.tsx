import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { ShieldCheck, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function RolesIndex({ roles, permissions }: { roles: any[]; permissions: any[] }) {
    const [editingRole, setEditingRole] = useState<any>(null);
    const [isAdding, setIsAdding] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        permissions: [] as string[],
    });

    const openEdit = (role: any) => {
        setEditingRole(role);
        setIsAdding(false);
        setData({
            name: role.name,
            permissions: role.permissions.map((p: any) => p.name),
        });
    };

    const openAdd = () => {
        setEditingRole(null);
        setIsAdding(true);
        reset();
    };

    const cancel = () => {
        setEditingRole(null);
        setIsAdding(false);
        reset();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRole) {
            put(`/roles/${editingRole.id}`, {
                onSuccess: () => cancel(),
            });
        } else {
            post('/roles', {
                onSuccess: () => cancel(),
            });
        }
    };

    const togglePermission = (permissionName: string) => {
        const current = [...data.permissions];
        const index = current.indexOf(permissionName);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(permissionName);
        }
        setData('permissions', current);
    };

    const deleteRole = (id: number) => {
        if (confirm('Yakin ingin menghapus role ini?')) {
            router.delete(`/roles/${id}`);
        }
    };

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hak Akses', href: '/roles' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Hak Akses" />
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Manajemen Hak Akses</h1>
                        <p className="text-muted-foreground">Atur peran dan izin akses untuk setiap pengguna.</p>
                    </div>
                    {!isAdding && !editingRole && (
                        <Button onClick={openAdd} className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Tambah Role
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[200px]">Nama Role</TableHead>
                                        <TableHead>Permissions</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell className="font-bold text-primary flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                                                {role.name.toUpperCase()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions.map((p: any) => (
                                                        <Badge key={p.id} variant="secondary" className="text-[10px]">
                                                            {p.name}
                                                        </Badge>
                                                    ))}
                                                    {role.permissions.length === 0 && (
                                                        <span className="text-xs text-muted-foreground italic">Tanpa Izin</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(role)}>
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="text-destructive"
                                                        disabled={role.name === 'admin' || role.name === 'petugas'}
                                                        onClick={() => deleteRole(role.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        {(isAdding || editingRole) ? (
                            <form onSubmit={submit}>
                                <Card className="border-none shadow-sm ring-1 ring-primary/10">
                                    <CardHeader className="bg-primary/5">
                                        <CardTitle className="text-lg">
                                            {editingRole ? 'Edit Role' : 'Tambah Role Baru'}
                                        </CardTitle>
                                        <CardDescription>
                                            Berikan nama unik dan pilih izin yang sesuai.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6 pt-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nama Role</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value.toLowerCase())}
                                                placeholder="contoh: pustakawan"
                                                className="uppercase font-bold"
                                            />
                                            {errors.name && <p className="text-xs text-destructive font-bold">{errors.name}</p>}
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Daftar Izin (Permissions)</Label>
                                            <div className="grid grid-cols-1 gap-2 border rounded-lg p-3 max-h-[400px] overflow-y-auto bg-muted/20">
                                                {permissions.map((p) => (
                                                    <div key={p.id} className="flex items-center space-x-2 p-1 hover:bg-background rounded transition-colors group">
                                                        <Checkbox 
                                                            id={`p-${p.id}`} 
                                                            checked={data.permissions.includes(p.name)}
                                                            onCheckedChange={() => togglePermission(p.name)}
                                                        />
                                                        <label 
                                                            htmlFor={`p-${p.id}`}
                                                            className="text-sm cursor-pointer select-none group-hover:text-primary"
                                                        >
                                                            {p.name}
                                                        </label>
                                                    </div>
                                                ))}
                                                {permissions.length === 0 && (
                                                    <p className="text-xs text-muted-foreground italic p-2 text-center">
                                                        Belum ada permissions yang tersedia.
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Button type="button" variant="outline" className="flex-1" onClick={cancel}>
                                                <X className="w-4 h-4 mr-2" />
                                                Batal
                                            </Button>
                                            <Button type="submit" disabled={processing} className="flex-1">
                                                <Save className="w-4 h-4 mr-2" />
                                                {processing ? 'Menyimpan...' : 'Simpan'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </form>
                        ) : (
                            <Card className="border-none shadow-sm bg-muted/20 border-dashed border-2 flex flex-col items-center justify-center p-12 text-center">
                                <div className="p-4 rounded-full bg-background mb-4">
                                    <ShieldCheck className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <CardTitle className="text-base text-muted-foreground">Pilih atau Tambah Role</CardTitle>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Pilih role dari tabel untuk mengubah izin atau buat role baru.
                                </p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
