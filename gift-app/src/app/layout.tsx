import type { Metadata } from "next";
import {Provider} from "./provider"
import { Geist, Geist_Mono, Barlow_Condensed } from "next/font/google";

import "./globals.css";
import ClientSession from "@/app/ui/clientSession";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
    weight: '400',
    style: "normal",
    subsets: ['latin']
});
export const metadata: Metadata = {
  title: "GiftTopia",
  description: "Generated by create next app",
};

export default function RootLayout(

    {
  children,
}: Readonly<{
  children: React.ReactNode;
}>
)
{
    return (
        <html lang="en">
        <Provider>
            <body
                className={` ${barlowCondensed.className}`}
            >
            <ClientSession/>

            {children}
            <footer className={"text-center bg-green-900 p-6"}>
                Created by Theresa. A
            </footer>
            </body>
        </Provider>
        </html>
    );
}
