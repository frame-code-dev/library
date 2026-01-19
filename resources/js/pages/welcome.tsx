import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans selection:bg-indigo-500 selection:text-white">
            <Head title="Selamat Datang - Sistem Informasi Perpustakaan" />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-default">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/><path d="M4 20h16"/></svg>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-700 dark:from-white dark:to-slate-400">
                            Perpustakaan <span className="text-indigo-600 dark:text-indigo-400">Apps</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-xl active:scale-95 transition-all duration-200"
                            >
                                Masuk Ke Sistem
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium animate-fade-in">
                            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                            Sistem Informasi Perpustakaan Digital
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 dark:text-white tracking-tight">
                            Manajemen <br />
                            <span className="text-indigo-600 dark:text-indigo-400">Literasi Masa Kini</span>
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                            Akses koleksi buku, pantau peminjaman, dan kelola administrasi perpustakaan dengan lebih cerdas, cepat, dan transparan.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                             {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 transition-all duration-200"
                                >
                                    Buka Dashboard
                                </Link>
                             ) : (
                                <Link
                                    href={login()}
                                    className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 transition-all duration-200"
                                >
                                    Mulai Sekarang
                                </Link>
                             )}
                            <button className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 font-bold hover:shadow-lg transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-200 dark:border-zinc-800">
                            <div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">10k+</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Koleksi Buku</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">5k+</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Anggota Aktif</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">24/7</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Akses Online</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group lg:block hidden">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-zinc-800">
                             <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
                             <div className="h-full w-full bg-slate-200 dark:bg-zinc-900 flex items-center justify-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600/30 dark:text-indigo-400/30"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                             </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -bottom-8 -left-8 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 animate-bounce-slow">
                             <div className="flex items-center gap-3">
                                 <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                 </div>
                                 <div>
                                     <div className="text-xs text-slate-500 font-bold uppercase">Status Sistem</div>
                                     <div className="text-sm font-semibold text-slate-900 dark:text-white">Berjalan Optimal</div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
