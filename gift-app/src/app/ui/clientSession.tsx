'use client'
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function ClientSession(){
    const {status} = useSession()

    function logout() {
        signOut({redirect: true, callbackUrl: '/'})
    }

    if(status === "authenticated"){
            return (
                <header className="border-b-black-100">
                    <nav className="flex px-4 justify-between items-center">
                        <Link href={"/"} className="text-4xl font-bold cursor-pointer">
                            GiftTopia<span className="text-green-700">.</span>
                        </Link>
                        <Link id="shop-icon" href={"/shop"}
                              className="shop-icon cursor-pointer flex text-2xl gap-2 "><span
                            className="self-center">
                    <Image src={"/shopIcon.svg"} alt={"shop icon"} width={15} height={15}></Image>

                </span>Shop</Link>
                        <h2 onClick={logout} className="logout cursor-pointer flex text-2xl gap-2 "><span
                            className="self-center">
                    <Image src={"/logoutIcon.svg"} alt={"logout icon"} width={15} height={15}></Image>
                </span>Log Out</h2>

                    </nav>
                </header>
            )
        }
        else if(status == "loading"){
            return (
                <div>


                    <header className="border-b-black-100">
                        <nav className="flex px-4 justify-between items-center">
                            <div className="text-4xl font-bold cursor-pointer">
                                GiftTopia<span className="text-green-700">.</span>
                            </div>
                            <Link id="shop-icon" href={"/shop"}
                                  className="shop-icon cursor-pointer flex text-2xl gap-2 "><span
                                className="self-center">
                    <Image src={"/shopIcon.svg"} alt={"shop icon"} width={15} height={15}></Image>

                </span>Shop</Link>
                            <h2 onClick={logout} className="logout cursor-pointer flex text-2xl gap-2 "><span
                                className="self-center">
                    <Image src={"/logoutIcon.svg"} alt={"logout icon"} width={15} height={15}></Image>
                </span>Log Out</h2>

                        </nav>
                    </header>

                    <h1>Loading....</h1>
                </div>
            )
        }
        else {
            return (
                <header className="border-b-black-100">
                    <nav className="flex px-4 justify-between items-center">
                        <div className="text-4xl font-bold cursor-pointer">
                            GiftTopia<span className="text-green-700">.</span>
                        </div>
                        <Link onClick={ () => alert("Sign In!")} id="shop-icon" href={"/"}
                              className="shop-icon cursor-pointer flex text-2xl gap-2 "><span
                            className="self-center">
                    <Image src={"/shopIcon.svg"} alt={"shop icon"} width={15} height={15}></Image>

                </span>Shop</Link>

                    </nav>
                </header>
            )
        }

}