import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="Selamat Datang Kembali"
            description="Silakan masuk untuk mengelola koleksi dan layanan perpustakaan"
        >
            <Head title="Masuk ke Sistem" />

            <div className="relative mb-8">
                 <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-200 dark:border-zinc-800"></div>
                 </div>
                 <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white dark:bg-zinc-950 px-4 text-slate-400">Silakan isi formulir</span>
                 </div>
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2 group">
                                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 transition-colors group-focus-within:text-indigo-600">Email Utama</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="contoh@perpustakaan.com"
                                    className="h-12 border-slate-200 dark:border-zinc-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 rounded-xl transition-all"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2 group">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" title="password" className="text-slate-700 dark:text-slate-300 transition-colors group-focus-within:text-indigo-600">Kata Sandi</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 decoration-none"
                                            tabIndex={5}
                                        >
                                            Lupa Kata Sandi?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="h-12 border-slate-200 dark:border-zinc-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 rounded-xl transition-all"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3 bg-slate-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-slate-200 dark:border-zinc-800">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                />
                                <Label htmlFor="remember" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none">Ingat saya di perangkat ini</Label>
                            </div>

                            <Button
                                type="submit"
                                className="h-12 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all duration-200"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? <Spinner className="mr-2 h-4 w-4" /> : null}
                                Masuk Sekarang
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center pt-2">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Belum punya akun?{' '}
                                    <TextLink 
                                        href={register()} 
                                        className="font-bold text-indigo-600 hover:text-indigo-700 decoration-indigo-600/30 ml-1"
                                        tabIndex={5}
                                    >
                                        Daftar Akun Baru
                                    </TextLink>
                                </p>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-8 p-4 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-center text-sm font-bold text-green-600 rounded-xl">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
