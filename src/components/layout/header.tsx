
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import Link from "next/link";
import { UserNav } from "@/components/layout/user-nav";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import imgLogo from '/public/images/logo.png';
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
    const { data: sessionData } = useSession();
    return (
        <WalletModalProvider>
            <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
                <nav className="flex h-16 items-center justify-between px-4">
                    <Link
                        href={"/home"}
                        className="hidden items-center justify-between gap-2 md:flex"
                    >
                        <Image src={imgLogo} alt="My Image" width={170} height={300} />
                    </Link>
                    <div className={cn("block md:!hidden")}>
                        <MobileSidebar />
                    </div>

                    <div className="flex items-center gap-2">
                        {sessionData?.user ? (
                            <UserNav user={sessionData.user} />
                        ) : (
                            <WalletMultiButton />
                        )}
                    </div>
                </nav>
            </div>
        </WalletModalProvider>
    );
}