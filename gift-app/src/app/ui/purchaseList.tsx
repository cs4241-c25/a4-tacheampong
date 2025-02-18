'use client'


import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

export default function PurchaseList({username, purchases}){
    const { data: session } = useSession();
    const [isMounted, setIsMounted] = useState(false)


    useEffect(() => {
        setIsMounted(true)
    }, []);


    if(isMounted && session?.user.purchases !== undefined){


    console.log(purchases)
    return (

    <tbody>
    {purchases.length > 0 ?(

        purchases.map((purchase: {recipient, gift, quantity, cost, total}, index) => (
            <tr className={"odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"} key={index}>
                <td>{username}</td>
                <td>{purchase.recipient}</td>
                <td>{purchase.gift}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.cost}</td>
                <td>{purchase.total}</td>
            </tr>
        ))

    ): (
        <tr>
            <td>Somethings not working</td>
        </tr>

    )}
    </tbody>
)
}
}