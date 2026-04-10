'use client'

import Image from 'next/image';
import { MessageCircle, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import PostComments from './postComment';
import { useEffect, useState } from 'react';
import CreateModal from './createModal';
import api from '../utils/api';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../utils/authContext';
import CustomVideoPlayer from './customVideoPlayer';

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

    const [followLoading, setFollowLoading] = useState(false)

    const { user } = useAuth()

    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const getPosts = async () => {
            setloading(true);

            await new Promise(resolve => setTimeout(resolve, 1000));

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

            const newData = res.data.updatedPost;

            setSuggestedPost((prev) =>
                prev.map((post) => post._id === postId ? newData : post)
            );

        } catch (error) {
            console.log(error)
        }

    }

    const [activePostId, setActivePostId] = useState<string | null>(null);

    const handleDeletePost = async (postId: any) => {

        setDeleting(true)

        try {

            await api.post(`/api/post/delete-post/${postId}`)

            const res = await api.get('/api/post/posts')

            console.log(res.data)

            setSuggestedPost(res.data)

        } catch (error) {
            console.log(error)
        } finally {
            setDeleting(false)
        }
    }

    const handleFollow = async (userId: any) => {

        setFollowLoading(true)

        try {

            await api.post(`/api/auth/follow/${userId}`)

            window.location.reload()

        } catch (error) {
            console.log(error)
        } finally {
            setFollowLoading(false)
        }

    }

    return (
        <div className='flex w-full h-full flex-col gap-10'>
            {loading ? (
                <div className="skeleton max-w-116 w-full max-h-[727px] h-full border border-gray-800 mx-auto"></div>
            ) : (
                suggestedPost.length > 0 ? (
                    suggestedPost.map((User) => (
                        <div key={User._id} className="max-w-116 w-full mx-auto bg-[#0C1014] text-white rounded-lg border border-gray-800">
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center space-x-3">
                                    <div className="avatar size-10">
                                        <div className="bg-white rounded-full">
                                            <Image src={User.author?.profilePicture} alt="User" width={40} height={40} className="rounded-circle object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Link href={User.author._id === user?.user ? '/profile' : `/user/${User.author._id}`} className="font-semibold text-sm">{User.author?.username}</Link>
                                        <span className="text-gray-400 text-sm">• {User.createdAt ? formatDistanceToNow(new Date(User.createdAt)) + ' ago' : 'Just now'}</span>
                                    </div>
                                </div>
                                {User.author._id === user?.user ? (
                                    <div className="dropdown dropdown-bottom drop-shadow-0 dropdown-center" style={{ boxShadow: 'none' }}>
                                        <div tabIndex={0} role="button" className="btn bg-transparent border border-b-gray-800" style={{ boxShadow: 'none' }}><MoreHorizontal /></div>
                                        <ul tabIndex={-1} className="dropdown-content menu bg-gray-800 rounded-box z-1 w-35 p-2 shadow-sm mt-2">
                                            <li><button type='button' onClick={() => handleDeletePost(User._id)} className='hover:bg-red-500 flex justify-center' disabled={deleting}>{deleting ? <span className="loading loading-infinity loading-lg"></span> : 'Delete Post'}</button></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="dropdown dropdown-bottom drop-shadow-0 dropdown-center" style={{ boxShadow: 'none' }}>
                                        <div tabIndex={0} role="button" className="btn bg-transparent border border-b-gray-800" style={{ boxShadow: 'none' }}><MoreHorizontal /></div>
                                        <ul tabIndex={-1} className="dropdown-content menu bg-gray-800 rounded-box z-1 w-35 p-2 shadow-sm mt-2">
                                            <li><button type='button' onClick={() => handleFollow(User.author._id)} className='hover:bg-[#0D6EFD] flex justify-center' disabled={followLoading}>Unfollow</button></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative aspect-9/12 w-full bg-black z-0">
                                {User.imageUrl?.split('?')[0].match(/\.(mp4|webm|ogg|mov)$/i) ? (
                                    <CustomVideoPlayer src={User.imageUrl} />
                                ) : (
                                    <Image
                                        src={User.imageUrl}
                                        alt="Post content"
                                        fill
                                        loading='eager'
                                        sizes='100'
                                        className="object-contain"
                                    />
                                )}
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex space-x-4">
                                        <div className='flex align-middle items-center gap-1'>
                                            <label className='swap' onClick={() => handleLike(User._id)}>
                                                <input type="checkbox" checked={User.likes?.includes(user?.user)} readOnly />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-off lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#d10000" stroke="#d10000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-on lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                                                </svg>
                                            </label>
                                            <span>{User.likes ? User.likes.length : 0}</span>
                                        </div>
                                        <div className="flex align-middle items-center gap-1" onClick={() => { setActivePostId(User._id); (document.getElementById(User._id) as HTMLDialogElement)?.showModal() }}>
                                            <MessageCircle className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
                                            <span>{User.comments?.length}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full text-wrap">
                                    <p className="w-full text-sm">
                                        <Link href={User.author._id === user?.user ? '/profile' : `/user/${User.author._id}`} className="font-bold mr-2">{User.author?.username}</Link>
                                        {User.caption}
                                    </p>
                                </div>
                            </div>
                            <PostComments postId={User._id} isActive={activePostId === User._id} />
                        </div>
                    ))
                ) : (
                    <div className='flex items-center align-middle justify-center h-full'>
                        <p className='text-white font-semibold text-xl'>No posts, Follow someone to see their post</p>
                    </div>
                )

            )}
            <CreateModal username={user?.username || 'Guest'} pfp={user?.pfp || 'https://ik.imagekit.io/glimpse/avatar.png'} />
        </div>
    )

}