'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import api from "../utils/api";

interface SuggestedUsers {
    _id: string,
    username: string,
    profilePicture: string
}

export default function FollowComp() {

    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUsers[]>([]);

    useEffect(() => {
        const fetchSuggested = async () => {
            try {
                const res = await api.get('/api/auth/get-all-user');
                console.log(res.data)
                setSuggestedUsers(res.data.users);
            } catch (error) {
                console.error("Failed to load suggestions", error);
            }
        };


        fetchSuggested();
    }, []);
 
    const handleFollow = async (userId: any) => {

        try {
            
            const res = await api.post(`/api/auth/follow/${userId}`)

            console.log(res)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className="flex flex-col justify-center p-4 gap-3 fixed">
                <div className="flex items-center align-middle justify-between space-x-3 max-w-115 w-full gap-30">
                    <div className="flex gap-2 text-nowrap items-center align-middle">
                        <div className="avatar size-10">
                            <div className="bg-black rounded-full">
                            <Image src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" alt="User" width={40} height={40} className="rounded-circle object-cover" />
                            </div>
                        </div>
                        <Link href='/'>Ozair Khan</Link>
                    </div>
                </div>
                <div className="divider divider-primary">Suggested for you</div>
                {suggestedUsers ? (
                    suggestedUsers.map((user) => (
                        <div key={user._id} className="flex items-center align-middle justify-between space-x-3 max-w-115 w-full gap-30">
                            <div className="flex gap-2 text-nowrap items-center align-middle">
                                <div className="avatar size-10">
                                     <div className="bg-white rounded-full">
                                    <Image src={user.profilePicture} alt="User" fill className="rounded-circle object-cover" />
                                     </div>
                                </div>
                                 <Link href='/'>{user.username}</Link>
                            </div>
                            <div className="block">
                                <button className="btn btn-primary" onClick={() => handleFollow(user._id)}> Follow </button>
                            </div>
                        </div>
                    ))
                ) : (
                     <span></span>
                )}  
                <div className="block mt-4">
                <p className="text-gray-400">© 2026 Glimpse from <Link href='https://ok-folio.vercel.app/' className="text-[#0D6EFD] font-bold hover:text-[#0446aa] transition-all duration-200" target="_blank">OK-Folio</Link></p>
                </div>
            </div>
        </>
    )

}