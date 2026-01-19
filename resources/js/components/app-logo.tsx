import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
                <AppLogoIcon className="size-5 fill-current" />
            </div>
            <div className="ml-3 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold tracking-tight text-foreground">
                    SIPERPU
                </span>
                <span className="truncate text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                    Digital Library
                </span>
            </div>
        </>
    );
}
