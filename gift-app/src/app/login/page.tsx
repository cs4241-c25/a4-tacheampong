'use client'
import React from 'react'
import Modal from "@/app/ui/modal";
import HomeScreen from "@/app/ui/homeScreen";

export default function  Page ()   {

        const blurStyle = {
            filter: 'blur(5px)',
            disabled: true
        }
    return (
        <div>
            <div >
                <Modal />

            </div>
            <div style={blurStyle}>
                <HomeScreen onClick={() => console.log("background")}/>
            </div>

        </div>

    )


}
