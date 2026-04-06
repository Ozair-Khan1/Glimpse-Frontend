'use client'

import Image from "next/image"
import { MessageCircle, X } from "lucide-react"
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../utils/authContext";
import Link from "next/link";
import MobileProfileComment from "./mobileProfileComment";

interface Post {
  caption: string;
  image: string;
  likes: number;
  username: string;
  pfpImage: string;
  postId: string
  handleLike: (id: string) => Promise<void>;
  isLiked:boolean;
}

interface userInterface {
  profilePicture: string;
  username: string;
  _id: string;
}

interface commentInterface {
  user: userInterface,
  _id: string,
  text: string,
  createdAt: string
}

export default function ProfilePost({image, caption, pfpImage, username, likes, postId, handleLike, isLiked}: Post) {

    const [comments, setComments] = useState<commentInterface[]>([])

    const [formData, setFormData] = useState('')

    const [error, setError] = useState(false)

    const [adding, setAdding] = useState(false)

    const {user} = useAuth()

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if(formData.trim() === '') {
      setError(true)
      return
    }

    setAdding(true)

    try {
      
      const res = await api.post(`/api/post/comment/${postId}`, {text: formData})

      await api.get(`/api/post/get-comments/${postId}`)

      if (res.data.comments) {
        getComments()
      }

        setFormData('')

    } catch (error) {
      console.log(error)
    } finally {
        setAdding(false)
    }
    

  }

    const getComments = async () => {
    
      try {
            
        const res = await api.get(`/api/post/get-profile-comment/${postId}`)
    
    
        setComments(res.data)
    
      } catch (error) {
         console.log(error)
       }
    }

    useEffect(() => {
        if(postId) {
            getComments()
        }
    }, [postId])

    
    return (
        <dialog className="modal backdrop-blur-md py-10 px-5 lg:px-0 md:px-0 cursor-auto" id={postId}>
            <div className="fixed top-4 right-4">
                <form method="dialog">
                    <button className="btn btn-circle bg-red-500 hover:bg-red-900"><X /></button>
                </form>
            </div>
             <div className="modal-box max-w-[500px] w-full bg-[#0C1014] p-0 overflow-hidden flex flex-col lg:flex-row lg:max-w-[950px] lg:h-[75vh] md:flex-col md:max-w-[500px] md:h-[80vh] justify-center items-center h-[75vh] border border-gray-800 shadow-2xl">

                <div className="max-w-[600px] lg:max-w-[600px] md:max-w-[600px] relative w-full lg:h-full md:h-[40vh] h-[63.5vh] bg-black rounded-lg">
                    <Image src={image} alt="post" fill className="object-contain" sizes="100"/>
                </div>
                <div className="relative flex flex-col flex-1 max-w-screen lg:max-w-[350px] md:max-w-screen w-full h-full overflow-hidden lg:overflow-y-auto md:overflow-y-auto">
                    
                    <div className="flex flex-col gap-5 border-b border-white/10 p-4 justify-center">
                        <div className="flex gap-3">
                        <div className="avatar size-8">
                            <div className="rounded-full bg-white">
                                <Image src={pfpImage} alt="pic" className="object-cover rounded-full" fill/>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-3 w-full h-fit">
                            <p className="text-sm">
                                <span className="font-bold mr-2 text-[15px]">{username}</span>
                                {caption}
                            </p>
                            <div className="flex gap-3 items-center">
                                <div className="flex items-center align-middle">
                                <label className='swap' onClick={() => handleLike(postId)}>
                                    <input type="checkbox" checked={isLiked} readOnly/>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-off lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" viewBox="0 0 24 24" fill="#d10000" stroke="#d10000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-on lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                                        </svg>
                                </label>
                                <span className="font-bold">{likes}</span>
                            </div>
                            <div className="flex lg:hidden md:hidden align-middle items-center gap-1" onClick={() =>  (document.getElementById(`comment-${postId}`) as HTMLDialogElement)?.showModal()}>
                                <MessageCircle className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" />
                                <span>{comments.length}</span>
                            </div>
                            <MobileProfileComment postId={postId}/>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="hidden flex-1 lg:flex md:flex flex-col p-4 justify-between">
                
                        <div className="flex flex-col gap-5">
                            {comments ? (
                                comments.map((User) => (
                                    <div key={User._id} className="flex gap-3">
                                    <div className="avatar size-8">
                                        <div className="rounded-full bg-white">
                                            <Image src={User.user.profilePicture} alt="pic" className="object-cover rounded-full" fill/>
                                        </div>
                                    </div>
                                    <div className="flex w-full h-fit">
                                        <p className="text-sm">
                                            <Link href={`${User.user._id === user?.user ? '/profile' : `/user/${User.user._id}`}`} className="font-bold mr-2">{User.user.username}</Link>
                                            {User.text}
                                        </p>
                                    </div>
                                    </div>
                                ))
                            ) : (
                                <p>No comments</p>
                            )}
                        </div>
                        <form className="sticky bottom-3 w-full h-fit flex flex-col items-start gap-3 bg-[#0C1014]" onSubmit={handleAddComment}>
                            {error && (
                                <span className="text-sm text-red-500 font-bold">Write something..</span>
                            )}
                            <div className="flex gap-3 w-full">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={formData}
                                onChange={(e) => {setFormData(e.target.value); setError(false)}}
                                className={`input input-bordered w-full bg-[#161b22] border-gray-700 text-sm focus:border-green-600 focus:outline-none h-11 ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-700 text-sm focus:border-green-600'}`}
                            />
                            <button
                                type="submit"
                                className="btn bg-green-700 hover:bg-green-600 border-none text-white px-4 h-11 min-h-0"
                                disabled={adding}
                                >
                                Post
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )

}