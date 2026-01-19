import { Head, Link, router } from '@inertiajs/react';
import { FileDown, Plus, Printer, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peminjaman',
        href: '/borrows',
    },
];

export default function BorrowIndex({ borrows, filters }: { borrows: any; filters: any }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/borrows', { search }, { preserveState: true });
    };

    const handleExport = () => {
        window.open(`/borrows/export?search=${search}`, '_blank');
    };

    const handlePrintReceipt = (id: number) => {
        window.open(`/borrows/${id}/receipt`, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Peminjaman" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari transaksi (anggota, buku)..."
                            className="pl-10 bg-muted/30 border-none ring-offset-background placeholder:text-muted-foreground/50 focus-visible:ring-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleExport} className="border-primary/20 hover:bg-primary/5 text-primary">
                            <FileDown className="mr-2 h-4 w-4" /> Export PDF
                        </Button>
                        <Link href="/borrows/create">
                            <Button className="shadow-lg shadow-primary/20">
                                <Plus className="mr-2 h-4 w-4" /> Pinjamkan Buku
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="rounded-xl border border-border/50 overflow-hidden bg-card shadow-sm">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent border-b-border/50">
                                <TableHead className="py-4 font-semibold text-foreground/70">Anggota</TableHead>
                                <TableHead className="py-4 font-semibold text-foreground/70">Informasi Buku</TableHead>
                                <TableHead className="py-4 font-semibold text-foreground/70">Tgl Pinjam</TableHead>
                                <TableHead className="py-4 font-semibold text-foreground/70">Batas Kembali</TableHead>
                                <TableHead className="py-4 font-semibold text-foreground/70 text-center">Status</TableHead>
                                <TableHead className="py-4 font-semibold text-foreground/70 text-right">Denda</TableHead>
                                <TableHead className="py-4 font-semibold text-foreground/70 text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {borrows.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                        Data peminjaman tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                borrows.data.map((borrow: any) => {
                                    const isLate = borrow.status === 'borrowed' && new Date() > new Date(borrow.due_at);
                                    let calculatedFine = 0;
                                    if (isLate) {
                                        const diffTime = Math.abs(new Date().getTime() - new Date(borrow.due_at).getTime());
                                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        calculatedFine = diffDays * 1000;
                                    }

                                    return (
                                        <TableRow key={borrow.id} className="hover:bg-muted/30 transition-colors border-b-border/30">
                                            <TableCell className="py-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-bold text-foreground">{borrow.member.name}</span>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                                        {borrow.member.type === 'student' ? 'Siswa' : 'Guru'} • {borrow.member.member_code}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-medium text-foreground">{borrow.book.title}</span>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">ISBN: {borrow.book.isbn}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-muted-foreground">{new Date(borrow.borrowed_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                                            <TableCell className="py-4">
                                                <div className={cn("text-sm", isLate ? "text-destructive font-semibold" : "text-muted-foreground")}>
                                                    {new Date(borrow.due_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    {isLate && <div className="text-[9px] mt-0.5 px-1.5 py-0.5 bg-destructive/10 text-destructive rounded-full w-fit">TERLAMBAT</div>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-center">
                                                <Badge 
                                                    variant={borrow.status === 'borrowed' ? (isLate ? 'destructive' : 'default') : 'secondary'} 
                                                    className={cn(
                                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                                                        borrow.status === 'borrowed' && !isLate ? "bg-primary/10 text-primary border-primary/20" : ""
                                                    )}
                                                >
                                                    {borrow.status === 'borrowed' ? 'Dipinjam' : 'Selesai'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                {borrow.fine_amount > 0 ? (
                                                    <span className="text-destructive font-bold text-sm">Rp {Number(borrow.fine_amount).toLocaleString('id-ID')}</span>
                                                ) : (
                                                    isLate ? (
                                                        <span className="text-orange-500 text-xs font-semibold italic">Est: Rp {calculatedFine.toLocaleString('id-ID')}</span>
                                                    ) : (
                                                        <span className="text-muted-foreground/30 font-bold">—</span>
                                                    )
                                                )}
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                                        onClick={() => handlePrintReceipt(borrow.id)}
                                                        title="Cetak Struk"
                                                    >
                                                        <Printer className="h-4 w-4" />
                                                    </Button>
                                                    
                                                    {borrow.status === 'borrowed' && (
                                                        <Button 
                                                            variant={isLate ? "destructive" : "outline"}
                                                            size="sm"
                                                            className={cn(
                                                                "h-8 text-[11px] font-bold uppercase tracking-tight px-3",
                                                                !isLate && "border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                                                            )}
                                                            onClick={() => {
                                                                const msg = isLate 
                                                                    ? `Buku terlambat dikembalikan! Perkiraan denda: Rp ${calculatedFine.toLocaleString('id-ID')}. Lanjutkan pengembalian?`
                                                                    : 'Yakin ingin menandai buku ini sebagai kembali?';
                                                                if (confirm(msg)) {
                                                                    router.post(`/borrows/${borrow.id}/return`);
                                                                }
                                                            }}
                                                        >
                                                            KEMBALIKAN
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-end space-x-2 py-4">
                    {borrows.links.map((link: any, index: number) => (
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
