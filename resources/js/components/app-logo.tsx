import AppLogoIcon from './app-logo-icon';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function AppLogo() {
    const { name, school_name } = usePage<SharedData>().props as any;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
                <AppLogoIcon className="size-5 fill-current" />
            </div>
            <div className="ml-3 grid flex-1 text-left text-sm leading-tight min-w-0">
                <span className="truncate font-bold tracking-tight text-foreground" title={name || 'Perpustakaan'}>
                    {name || 'Perpustakaan'}
                </span>
                <span className="truncate text-[10px] font-medium text-muted-foreground uppercase tracking-wider" title={school_name || 'Digital Library'}>
                    {school_name || 'Digital Library'}
                </span>
            </div>
        </>
    );
}
