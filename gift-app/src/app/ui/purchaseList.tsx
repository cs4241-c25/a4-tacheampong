'use client'


import {useSession} from "next-auth/react";

export default function PurchaseList({username, purchases}){
    const { data: session } = useSession();

    if (!session?.user?.purchases) {
        // If the session data is not loaded yet or the user doesn't have purchases
        return <div>Loading...</div>;
    }
    console.log(purchases)
    return (

    <tbody>
    {purchases.length > 0 ?(

        purchases.map((purchase: {recipient, gift, quantity, cost, total}, index) => (
            <tr key={index}>
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