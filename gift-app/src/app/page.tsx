'use client'

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import HomeScreen from "@/app/ui/homeScreen";


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
    <HomeScreen onClick={openModal}/>

);
}
