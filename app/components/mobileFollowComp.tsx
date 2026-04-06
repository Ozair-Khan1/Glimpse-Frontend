'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../utils/authContext";

interface SuggestedUsers {
    _id: string,
    username: string,
    profilePicture: string
}

const MobileFollowComp = () => {

    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUsers[]>([]);
    
        const [following, setFollowing] = useState<any>(null)
    
        const [loading, setLoading] = useState(false)
    
        const {user} = useAuth()
    
        useEffect(() => {
            const fetchSuggested = async () => {
                try {
                    const res = await api.get('/api/auth/get-all-user');
                    setSuggestedUsers(res.data.users);
                } catch (error) {
                    console.error("Failed to load suggestions", error);
                }
            };
    
            fetchSuggested();
        }, []);
     
        const handleFollow = async (userId: any) => {
    
            setLoading(true)
    
            try {
                
                const res = await api.post(`/api/auth/follow/${userId}`)
    
                setFollowing(res.data)
    
                window.location.reload()
    
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
    
        }

  return (
        <dialog id="follow-comp" className="modal backdrop-blur-md">
        <div className="modal-box w-11/12 max-w-xl bg-[#0C1014] p-0 overflow-hidden flex flex-col h-[90vh] border border-gray-800 items-center justify-center shadow-2xl relative">
            
            {/* Close Button positioned at the top right */}
            <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white z-50"
            onClick={() => (document.getElementById('follow-comp') as HTMLDialogElement)?.close()}
            >
            ✕
            </button>

            <div className="flex flex-col justify-center items-center p-4 gap-3 fixed w-full">
            <div className="flex items-center align-middle justify-center space-x-3 w-full gap-30">
                <div className="flex gap-4 text-nowrap justify-between items-center align-middle">
                <div className="avatar size-10">
                    <div className="bg-white rounded-full">
                    <Image src={user?.pfp || 'https://ik.imagekit.io/glimpse/avatar.png'} alt="User" width={64} height={64} className="object-cover" />
                    </div>
                </div>
                <Link href="/profile">{user?.username}</Link>
                </div>
            </div>

            <div className="divider divider-primary">Suggestions for you</div>

            {suggestedUsers.length > 0 ? (
                suggestedUsers.map((User) => (
                <div key={User._id} className="flex items-center align-middle justify-between space-x-3 max-w-[318px] w-full">
                    <div className="flex gap-4 text-nowrap items-center align-middle">
                    <div className="avatar size-10">
                        <div className="bg-white rounded-full">
                        <Image src={User.profilePicture} alt="User" width={64} height={64} className="object-cover" />
                        </div>
                    </div>
                    <Link href={`/user/${User._id}`} onClick={() => (document.getElementById('follow-comp') as HTMLDialogElement)?.close()}>{User.username}</Link>
                    </div>
                    <div className="block">
                    <button disabled={loading} className="btn btn-primary" onClick={() => handleFollow(User?._id)}>
                        {following?.user.followers.includes(user?.user) ? 'Unfollow' : 'Follow'}
                    </button>
                    </div>
                </div>
                ))
            ) : (
                <div className="flex justify-center items-center">
                <span>No Users Found</span>
                </div>
            )}

            <div className="block mt-4">
                <p className="text-gray-400">
                © 2026 Glimpse from <Link href="https://ok-folio.vercel.app/" className="text-[#0D6EFD] font-bold hover:text-[#0446aa] transition-all duration-200">OK-Folio</Link>
                </p>
            </div>
            </div>
        </div>
        </dialog>
  )
}

export default MobileFollowComp