"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {register} from "../../../action/register";

interface SignInResponse {
    error?: string;
    ok? : boolean;
}
export default function Modal() {
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const eventId = event.nativeEvent.submitter.id
        console.log(event)
        console.log(event.nativeEvent.submitter.id)

        console.log(event.type)
        console.log(formData.get("username"))
        console.log(formData.get("password"),)
        if(eventId === "submit"){
            const res  =  await signIn("credentials", {
                username: formData.get("username"),
                password: formData.get("password"),
                redirect: false,
            } ) as SignInResponse | undefined;
            console.log(res)
            if (res?.error) {
                setError(res.error as string);
                alert("Incorrect username or password")
            }
            if (res?.ok) {
                return router.push("/shop");
            }
        }
        if (eventId === "newUser"){
            const res  =  await register({
                username: formData.get("username"),
                password: formData.get("password"),
                redirect: false,
            } ) as SignInResponse | undefined;
            console.log(res?.ok)

            if (res?.error) {
                setError(res.error as string);
                alert("Already in the system")
            }
            else {
                const res  =  await signIn("credentials", {
                    username: formData.get("username"),
                    password: formData.get("password"),
                    redirect: false,
                } ) as SignInResponse | undefined;
                console.log(res)
                alert("Welcome new User")
                return router.push("/shop");
            }
        }

    };

    return (
        <div>
            <dialog id="modal" open={true}>
                <div className={"internal-modal"}>
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                        <div className="flex sm:mx-auto sm:w-full sm:max-w-sm">
{/*
                            <Image src={"/greenCircleIcon.png"} alt={"green circle"} width={15} height={15}></Image>
*/}
                            {/* <img className="mx-auto h-10 w-auto" src="/greenCircleIcon.png" alt="green dot"/>*/}
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in
                                to
                                your account</h2>

                            <Link className={"close"} href={"/"}>X</Link>
                        </div>


                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form id="initial-form" onSubmit={handleSubmit} method="post" className="space-y-6" action="#">
                                <div>
                                    <label htmlFor="username"
                                           className="block text-sm/6 font-medium text-gray-900">Username</label>
                                    <div className="mt-2">
                                        <input type="text" name="username" id="username" autoComplete="text" required
                                               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"/>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password"
                                               className="block text-sm/6 font-medium text-gray-900">Password</label>
                                    </div>
                                    <div className="mt-2">
                                        <input type="password" name="password" id="password"
                                               autoComplete="current-password"
                                               required
                                               className="mb-3 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus-visible:outline-green-600 sm:text-sm/6"/>
                                    </div>
                                </div>

                                <div className="modal-buttons flex gap-3">
                                    <button id="submit" type="submit"
                                            className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign
                                        in
                                    </button>
                                    <button id="newUser" type="submit"
                                            className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">New
                                        User
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>


                </div>
            </dialog>
        </div>
    )
}