'use client'

import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, MessageCircleMoreIcon, X } from 'lucide-react'
import Image from 'next/image'

interface Story {
  comments: [];
  likes: number;
  imageURL: string;
  _id: string;
  handleLike: (id: string) => Promise<void>;
  isLiked: boolean;
  createdAt: string;
}

const StoryModal = ({comments, likes, imageURL, _id, handleLike, isLiked, createdAt}: Story) => {
  return (
    <dialog id={`story-${_id}`} className="modal backdrop-blur-md overflow-hidden cursor-auto">
        <div className="modal-box w-11/12 max-w-2xl backdrop-blur-md h-[90vh] p-5 bg-[#0C1014] flex flex-col justify-center mt-2">
          <div className="flex justify-between align-middle">
            <h3 className="text-white font-sans text-xl font-bold" style={{letterSpacing : '2px'}}>Glimpse</h3>
            <div className="modal-action m-0">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white"><X /></button>
              </form>
            </div>
          </div>
          <div className="flex justify-center items-center h-full py-4"> 
            <div className="relative h-full w-full bg-black rounded-xl border border-gray-800">
              <Image
                src={imageURL || 'https://ik.imagekit.io/glimpse/avatar.png'}
                alt="story"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex justify-between">
                <div className='flex align-middle items-center gap-1'>
                    <label className='swap' onClick={() => handleLike(_id)}>
                    <input type="checkbox" checked={isLiked} readOnly/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-off lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#d10000" stroke="#d10000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-on lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                        </svg>
                    </label>
                    <span>{likes}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm">• {createdAt ? formatDistanceToNow(new Date(createdAt)) + ' ago' : 'Just now'}</span>
                </div>
                <div className="flex align-middle items-center gap-1" onClick={() => (document.getElementById(`comment-${_id}`) as HTMLDialogElement)?.showModal()}>
                    <MessageCircle className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
                    <span>{comments.length}</span>
                </div>
          </div>
        </div>
      </dialog>
  )
}

export default StoryModal