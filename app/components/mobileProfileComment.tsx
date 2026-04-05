'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useAuth } from "../utils/authContext";

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
const MobileProfileComment = ({postId}) => {

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
        
        const res = await api.get(`/api/post/get-comments/${postId}`)

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
    <dialog id={`comment-${postId}`} className="modal backdrop-blur-md">
      <div className="modal-box w-11/12 max-w-xl bg-[#0C1014] p-0 overflow-hidden flex flex-col h-[70vh] border border-gray-800 shadow-2xl">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-800 bg-[#0C1014] z-10">
          <h3 className="text-white text-xl font-bold tracking-wider">Comments</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white">✕</button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
          {comments.length > 0 ? (
            comments.map((User) => (
              <div key={User._id} className="flex gap-4 items-start group">
              <div className="avatar size-10 flex-shrink-0">
                <div className="rounded-full ring-1 ring-gray-700 bg-white">
                  <Image src={User.user.profilePicture} sizes="100" fill loading="eager" className="rounded-full" alt="pic"></Image>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <Link href={`${User.user._id === user?.user ? '/profile' : `/user/${User.user._id}`}`} className="text-sm font-bold text-white hover:underline cursor-pointer">{User.user.username}</Link>
                  <span className="text-xs text-gray-500">• {User.createdAt ? formatDistanceToNow(new Date(User.createdAt)) + ' ago' : 'Just now'}</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed break-words">
                  {User.text}
                </p>
              </div>
            </div>
            ))
          ) : (
            <span>No comments</span>
          )}

        </div>
        <div className="p-4 bg-[#0C1014] border-t border-gray-800">
          <form className="flex flex-col items-center gap-3" onSubmit={handleAddComment}>
            {error && (
                <span className="text-sm text-red-500 font-bold">Write something..</span>
            )}
            <div className="flex gap-3 w-full">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                value={formData}
                onChange={(e) => {setFormData(e.target.value); setError(false)}}
                className={`input input-bordered w-full bg-[#161b22] focus:outline-none h-11 ${error ? 'border-red-500' : 'border-gray-700 text-sm focus:border-green-600'}`}
                disabled={adding}
              />
              <button 
              type="submit" 
              className="btn bg-green-700 hover:bg-green-600 border-none text-white px-6 h-11 min-h-0"
            >
              Post
            </button>
            </div>
          </form>
        </div>

      </div>
    </dialog>
  )
}

export default MobileProfileComment