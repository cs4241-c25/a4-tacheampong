'use client'
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {purchase} from "../../../action/purchase";
import {remove} from "../../../action/delete"
import {edit} from "../../../action/edit";
import PurchaseList from "@/app/ui/purchaseList";

export default function Page() {
    const [isMounted, setIsMounted] = useState(false)

    const {data: session, status} = useSession()

    const [purchases, setPurchases] = useState(session?.user?.purchases);

    const data = session?.user
    useEffect(() => {
        // Only set purchases when session data is available
        if (session?.user?.purchases) {
            setPurchases(session?.user?.purchases);
        }
    }, [session])
    useEffect(() => {
        setIsMounted(true)
    }, []);


    function updateSelection(userData) {
        const parsedData = userData
        console.log("added")

        const section = document.querySelector("select")

        section.replaceChildren()
        const option2 = document.createElement("option")
        option2.textContent = "Select an Option"
        option2.disabled = true
        option2.defaultSelected = true

        section.append(option2)

        parsedData.map(choice => {
            const option = document.createElement("option")
            option.textContent = choice.recipient
            option.id = choice.recipient
            section.append(option)

        })



    }

    function clearInput() {

        const recipient = document.querySelector("#recipient") as HTMLInputElement
        const gift = document.querySelector("#gift") as HTMLInputElement
        const quantity = document.querySelector("#quantity") as HTMLInputElement
        const cost = document.querySelector("#cost") as HTMLInputElement
        const select = document.querySelector("#recipient-list") as HTMLSelectElement

        recipient.value = ""
        gift.value = ""
        quantity.value = ""
        cost.value = ""
        select.selectedIndex = 0
        recipient.readOnly = false
        recipient.style.backgroundColor = "white"

    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (isMounted) {
            // const formData = new FormData(event.currentTarget);
            // console.log(event.target)
            // console.log(event.target.id)
            // console.log(event.nativeEvent.submitter.id)
            const eventId = event.target.id

            const recipient1 = document.getElementById("recipient") as HTMLInputElement
            const gift1 = document.getElementById("gift") as HTMLInputElement
            const quantity1 = document.getElementById("quantity") as HTMLInputElement
            const cost1 = document.getElementById("cost") as HTMLInputElement
            const select = document.getElementById("recipient-list") as HTMLSelectElement
            //const tableBody = document.querySelector("tbody")

            if (eventId === "purchase") {
                const res = await purchase({
                    username: data?.username,
                    password: data?.password, //figure out password
                    recipient: recipient1.value,
                    gift: gift1.value,
                    quantity: quantity1.value,
                    cost: cost1.value,
                    redirect: false,
                });
                console.log(res.purchases)
                setPurchases(res.purchases)
                updateSelection(res.purchases)
                clearInput()
                // setReloadKey(prevKey => prevKey + 1)

            }
            if (eventId === "delete") {
                const res = await remove({
                    username: data?.username,
                    password: data?.password, //figure out password
                    selectValue: select.value,//figure out select value

                });
                console.log(res.purchases)
                setPurchases(res.purchases)
                updateSelection(res.purchases)
                clearInput()


            }
            if (eventId === "edit") {
                const res = await edit({
                    username: data?.username,
                    password: data?.password, //figure out password
                    recipient: recipient1.value,
                    gift: gift1.value,
                    quantity: quantity1.value,
                    cost: cost1.value,
                    selectValue: select.value,//figure out select value
                    redirect: false,
                });
                console.log(res.purchases)
                setPurchases(res.purchases)
                updateSelection(res.purchases)
                clearInput()
            }
        }
    }

    function updateFields(selectVal) {
        if (isMounted) {


            let parsedData = (data)

            const recipient1 = document.getElementById("recipient") as HTMLInputElement
            const gift1 = document.getElementById("gift") as HTMLInputElement
            const quantity1 = document.getElementById("quantity") as HTMLInputElement
            const cost1 = document.getElementById("cost") as HTMLInputElement
            let purchaseIndex = parsedData?.purchases.findIndex(item => {

                return item.recipient === selectVal;
            });


            recipient1.value = parsedData?.purchases[purchaseIndex].recipient
            recipient1.readOnly = true
            recipient1.style.backgroundColor = "grey";
            gift1.value = parsedData?.purchases[purchaseIndex].gift
            quantity1.value = parsedData?.purchases[purchaseIndex].quantity
            cost1.value = parsedData?.purchases[purchaseIndex].cost

        }
    }

    /*console.log(session)*/
    if (status === "loading") {
        // console.log(session)
        return console.log("session is loeading")

    }

 /*   console.log(isMounted)
    console.log(purchases)
    console.log(session)*/
    if (isMounted && session !== undefined) {
        /*setPurchases(session?.user.purchases)*/
        {
            return (
                <div className={"shop-container"}>

                    <h2 id="welcome" className="text-3xl"> Welcome {session?.user.username} !</h2>
                    <div className="container">
                        <div className="store-container">

                            <div className="store">

                                <form id="purchase-form" method="post">
                                    <label htmlFor="recipient-list"></label>
                                    <select defaultValue={"text"} onChange={(event) => updateFields(event.target.value)}
                                            name="recipient-list-1" id="recipient-list">
                                        <option value="text" disabled>Select an Option</option>

                                        {data?.purchases && data.purchases.length > 0 ? (
                                            data.purchases.map((purchase: {
                                                recipient,
                                                gift,
                                                quantity,
                                                cost,
                                                total
                                            }, index) => (
                                                <option key={index}>{purchase.recipient}</option>

                                            ))
                                        ) : (
                                            <>somethings not working</>
                                        )}
                                    </select>
                                    <div className="item">
                                        <div className="input-group">
                                            <label htmlFor="recipient">Enter Recipient Name:</label>
                                            <input type="text" id="recipient"/>
                                        </div>

                                        <div className="input-group">
                                            <label htmlFor="gift">Enter Gift Name:</label>
                                            <input type="text" id="gift"/>
                                        </div>

                                        <div className="input-group">
                                            <label htmlFor="quantity">Enter Quantity Amount:</label>
                                            <input type="text" id="quantity"/>
                                        </div>

                                        <div className="input-group">
                                            <label htmlFor="cost">Enter Cost:</label>
                                            <input type="text" id="cost"/>
                                        </div>
                                    </div>
                                    <div className="button-container">
                                        <button onClick={handleSubmit} type="submit" id="purchase">Purchase</button>
                                        <button onClick={handleSubmit} type="submit" id="delete">Delete</button>
                                        <button onClick={handleSubmit} type="submit" id="edit">Edit</button>
                                        <button onClick={clearInput} type={"button"} id="clear">Clear</button>
                                    </div>
                                </form>


                            </div>
                        </div>


                        <aside>
                            Outgoing Purchases
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                                    <tr id="header">
                                        <th scope="col" className="px-6 py-3">Sender</th>
                                        <th scope="col" className="px-6 py-3">Recipient</th>
                                        <th scope="col" className="px-6 py-3">Gift</th>
                                        <th scope="col" className="px-6 py-3">Quant.</th>
                                        <th scope="col" className="px-6 py-3">Cost</th>
                                        <th scope="col" className="px-6 py-3">Total</th>
                                    </tr>
                                    </thead>


                                    <PurchaseList username={data?.username} purchases={purchases}/>


                                </table>
                            </div>


                        </aside>
                    </div>

                </div>

            )
        }
    }
}