'use client'

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";



export default function Home() {
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()


    useEffect(() => {
        setIsMounted(true)
    }, []);



    function openModal(){
        if(isMounted){
            router.push('/login')

        }
    }
return (
    <div>
        <div className="home-screen flex flex-wrap">
            <div className="w-full sm:w-8/12 mb-10">
                <div className=" mx-auto h-full sm:p-10">
                    <section className=" px-4 lg:flex mt-10 items-center h-full lg:mt-0">
                        <div className="w-full">
                            <h1 className="text-4xl lg:text-6xl font-bold">Send your special <span
                                className="text-green-700">gift</span> to someone special!</h1>
                            <div className="w-20 h-2 bg-green-700 my-4"></div>
                            <p className="w-100 text-xl mb-10"><strong>GiftTopia</strong><span
                                className="text-green-700">.</span> is your one-stop gift store where we fulfill your
                                purchases in our
                                abundant warehouse of spectacular gifts. Whether it's your spouse, lover, friend, or a
                                pet, this is
                                the place for you. Sign up to get started!
                            </p>
                            <button onClick={openModal} id="signup"
                                    className="bg-green-700 text-white text-2xl font-medium px-4 py-2 rounded shadow">Sign
                                Up!
                            </button>

                        </div>
                    </section>
                </div>
            </div>
            <div className="relative object-cover sm:h-screen sm:w-4/12">
                <Image priority={true} fill src={"/greenGift.avif"} alt={"Gift with pencil and leaves"}
                       sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                ></Image>

            </div>


        </div>





    </div>

);
}
