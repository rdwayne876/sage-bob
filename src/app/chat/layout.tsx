'use client'
import { cn } from "@/lib/utils"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/aceternity/sideBar"
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconArrowLeft, IconLogout2, IconMessage2Plus, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { user } = useUser()

    if (!user) {
        redirect('/')
    }
    const links = [
        {
            label: "New Chat",
            href: "#",
            icon: (
                <IconMessage2Plus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Profile",
            href: "#",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];

    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl min-w-full border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={false}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Logout",
                                href: "/api/auth/logout",
                                icon: (<IconLogout2 />)
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <section className="flex-grow flex flex-col justify-between">{children}</section>
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 flex-shrink-0">
                <IconMessage2Plus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                New Chat
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6">
                <IconMessage2Plus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            </div>
        </Link>
    );
};
