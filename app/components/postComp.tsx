import Image from 'next/image';
import { MessageCircle, MoreHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import PostComments from './postComment';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import CreateModal from './createModal';
import api from '../utils/api';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../utils/authContext';

interface Author {
  _id: string;
  username: string;
  profilePicture: string;
}

interface Post {
  _id: string;
  author: Author;
  caption: string;
  imageUrl: string;
  likes: string[];
  comments: any[];
  createdAt: string;
}

export default function PostComp() {

    const [suggestedPost, setSuggestedPost] = useState<Post[]>([]);

    const [loading, setloading] = useState(false)

    const {user} = useAuth()

    const myId = user

    console.log(myId)

    useEffect(() => {
        const getPosts = async () => {
            setloading(true);
            
            await new Promise(resolve => setTimeout(resolve, 2000));

            try {
            
                const res = await api.get('/api/post/posts')

                console.log(res.data)

                setSuggestedPost(res.data)

            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        
        }

        getPosts()
    }, [])

    const handleLike = async (postId) => {

        try {
            
            const res = await api.post(`/api/post/like/${postId}`)

            console.log(res.data)

            const newData = res.data.updatedPost;

            setSuggestedPost((prev) => 
                prev.map((post) => post._id === postId ? newData : post)
            );

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='flex w-full h-full flex-col gap-10'>
            {loading ? (
                <div className="skeleton max-w-116 w-full max-h-[727px] h-full border border-gray-800"></div>
            ) : (
                suggestedPost ? (
                suggestedPost.map((user) => (
                    <div key={user._id} className="max-w-116 w-full mx-auto bg-[#0C1014] text-white rounded-lg overflow-hidden border border-gray-800">
                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-3">
                        <div className="avatar size-10">
                            <div className="bg-white rounded-full">
                            <Image src={user.author?.profilePicture} alt="User" width={40} height={40} className="rounded-circle object-cover" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Link href='/sidebar' className="font-semibold text-sm">{user.author?.username}</Link>
                            <span className="text-gray-400 text-sm">• {user.createdAt ? formatDistanceToNow(new Date(user.createdAt)) + ' ago' : 'Just now'}</span>
                        </div>  
                        </div>
                        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
                    </div>

                    <div className="relative aspect-4/5 w-full bg-zinc-900 z-0">
                        <Image 
                        src={user.imageUrl} 
                        alt="Post content" 
                        fill 
                        loading='eager'
                        sizes='100'
                        className="object-contain"
                        />
                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                        <div className="flex space-x-4">
                            <div className='flex align-middle items-center gap-1'>
                                <label className='swap' onClick={() => handleLike(user._id)}>
                                <input type="checkbox" checked={user.likes?.includes(myId)} readOnly/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-off lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#d10000" stroke="#d10000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-on lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                                    </svg>
                                </label>
                                <span>{user.likes ? user.likes.length : 0}</span>
                            </div>
                            <div className="flex align-middle items-center gap-1" onClick={() => (document.getElementById('post-comments') as HTMLDialogElement)?.showModal()}>
                                <MessageCircle className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
                                <span>{user.comments?.length}</span>
                            </div>
                        </div>
                        </div>
                        
                        <div className="w-full text-wrap">
                            <p className="w-full text-sm">
                                <Link href='/sidebar' className="font-bold mr-2">{user.author?.username}</Link>  
                                {user.caption}
                            </p>
                        </div>
                    </div>
                </div>
                ))
            ) : (
                <p>No posts</p>
            )

            )}
            <CreateModal />
            <PostComments />
        </div>
    )

}