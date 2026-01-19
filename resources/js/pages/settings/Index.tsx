import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Save, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import SettingsLayout from '@/layouts/settings/layout';

export default function SettingsIndex({ settings }: { settings: any }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        fine_per_day: settings.fine_per_day || '1000',
        borrow_duration: settings.borrow_duration || '7',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/settings/library');
    };

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pengaturan', href: '/settings/library' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Perpustakaan" />
            
            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-xl font-bold">Kebijakan Perpustakaan</h1>
                        <p className="text-sm text-muted-foreground">Konfigurasi parameter operasional buku dan denda.</p>
                    </div>

                    {recentlySuccessful && (
                        <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                            <AlertTitle>Berhasil!</AlertTitle>
                            <AlertDescription>Pengaturan telah diperbarui secara global.</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={submit}>
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">Kebijakan Peminjaman</CardTitle>
                                <CardDescription>Atur denda dan durasi standar peminjaman buku.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fine_per_day">Denda Per Hari (Rp)</Label>
                                    <div className="relative group">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-medium">Rp</span>
                                        <Input
                                            id="fine_per_day"
                                            type="number"
                                            value={data.fine_per_day}
                                            onChange={(e) => setData('fine_per_day', e.target.value)}
                                            className="pl-10 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                                            placeholder="Contoh: 1000"
                                        />
                                    </div>
                                    {errors.fine_per_day && <p className="text-xs text-destructive font-medium">{errors.fine_per_day}</p>}
                                    <p className="text-[10px] text-muted-foreground">Denda otomatis dihitung saat pengembalian terlambat.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="borrow_duration">Durasi Peminjaman (Hari)</Label>
                                    <div className="relative">
                                        <Input
                                            id="borrow_duration"
                                            type="number"
                                            value={data.borrow_duration}
                                            onChange={(e) => setData('borrow_duration', e.target.value)}
                                            className="pr-12 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                                            placeholder="Contoh: 7"
                                        />
                                        <span className="absolute right-3 top-2.5 text-muted-foreground text-sm font-medium">Hari</span>
                                    </div>
                                    {errors.borrow_duration && <p className="text-xs text-destructive font-medium">{errors.borrow_duration}</p>}
                                    <p className="text-[10px] text-muted-foreground">Batas waktu standar sebelum dianggap terlambat.</p>
                                </div>

                                <Button type="submit" disabled={processing} className="w-full h-10 flex items-center justify-center gap-2">
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </CardContent>
                        </Card>
                    </form>

                    <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-900 font-bold">Peringatan</AlertTitle>
                        <AlertDescription>
                            Perubahan ini berdampak pada perhitungan transaksi baru.
                        </AlertDescription>
                    </Alert>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

