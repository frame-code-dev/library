import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Book, Users, ClipboardList, CheckCircle2, DollarSign, ArrowUpRight, History } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ stats, recent_borrows, chart_data }: { stats: any; recent_borrows: any[]; chart_data: any[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-8 p-8 max-w-7xl mx-auto w-full">
                
                <header className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Ringkasan Sistem</h1>
                    <p className="text-muted-foreground">Statistik dan aktivitas perpustakaan saat ini.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: 'Total Koleksi Buku', value: stats.total_books, icon: Book, desc: `${stats.available_books} stok tersedia`, color: 'text-primary' },
                        { title: 'Anggota Terdaftar', value: stats.total_members, icon: Users, desc: 'Aktif di sistem', color: 'text-blue-500' },
                        { title: 'Buku Dipinjam', value: stats.borrowed_books, icon: ClipboardList, desc: 'Sedang dalam peminjaman', color: 'text-orange-500' },
                        { title: 'Total Denda', value: `Rp ${Number(stats.total_fines).toLocaleString()}`, icon: DollarSign, desc: 'Akumulasi denda', color: 'text-emerald-500' }
                    ].map((item, i) => (
                        <Card key={i} className="border-none shadow-xl shadow-foreground/5 bg-card overflow-hidden group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.title}</CardTitle>
                                <div className={cn("p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors", item.color)}>
                                    <item.icon className="h-4 w-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-black text-foreground">{item.value}</div>
                                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                                    <span className="font-semibold text-primary">{item.desc}</span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-8 md:grid-cols-7">
                    {/* Borrowing Trend Chart */}
                    <Card className="md:col-span-4 border-none shadow-xl shadow-foreground/5 bg-card">
                        <CardHeader className="pb-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-bold">Tren Peminjaman</CardTitle>
                                    <CardDescription>Aktivitas 14 hari terakhir</CardDescription>
                                </div>
                                <div className="bg-primary/10 p-2.5 rounded-xl">
                                    <ArrowUpRight className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="h-[320px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chart_data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                                        <XAxis 
                                            dataKey="name" 
                                            stroke="#94a3b8" 
                                            fontSize={11} 
                                            tickLine={false} 
                                            axisLine={false} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            stroke="#94a3b8" 
                                            fontSize={11} 
                                            tickLine={false} 
                                            axisLine={false} 
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip 
                                            cursor={{fill: '#f8fafc'}}
                                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px'}}
                                        />
                                        <Bar dataKey="total" fill="currentColor" className="text-primary" radius={[6, 6, 0, 0]} barSize={28} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent History */}
                    <Card className="md:col-span-3 border-none shadow-xl shadow-foreground/5 bg-card">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <History className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold">Aktivitas Terkini</CardTitle>
                                    <CardDescription>Transaksi terbaru</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {recent_borrows.map((borrow) => (
                                    <div key={borrow.id} className="flex items-center gap-4 group p-1">
                                        <div className="relative">
                                            <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center font-black text-muted-foreground/50 text-lg overflow-hidden group-hover:bg-primary/5 group-hover:text-primary transition-all">
                                                {borrow.member.name.charAt(0)}
                                            </div>
                                            <div className={cn(
                                                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card shadow-sm",
                                                borrow.status === 'borrowed' ? 'bg-orange-500' : 'bg-emerald-500'
                                            )} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-foreground truncate">{borrow.member.name}</p>
                                            <p className="text-xs text-muted-foreground truncate italic">"{borrow.book.title}"</p>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-1.5">
                                            <Badge variant={borrow.status === 'borrowed' ? 'outline' : 'secondary'} className={cn(
                                                "text-[9px] font-black h-5 uppercase tracking-tighter px-2",
                                                borrow.status === 'borrowed' ? "border-orange-200 text-orange-600 bg-orange-50/50" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                            )}>
                                                {borrow.status === 'borrowed' ? 'Dipinjam' : 'Selesai'}
                                            </Badge>
                                            <span className="text-[10px] font-medium text-muted-foreground/60 tracking-tight">
                                                {new Date(borrow.borrowed_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-6 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5" asChild>
                                <Link href="/borrows">Lihat Semua Riwayat</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
