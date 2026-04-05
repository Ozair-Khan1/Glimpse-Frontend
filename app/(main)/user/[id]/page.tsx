'use client'
import Image from "next/image"
import ProfilePost from "../../../components/profilePost";
import { useEffect, useState } from "react";
import api from "@/app/utils/api";
import { useAuth } from "@/app/utils/authContext";
import { useParams } from "next/navigation";
import UserProfilePost from "@/app/components/userProfilePost";

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

interface User {
  username: string;
  bio: string;
  pfp: string;
  posts: string;
  followers: string;
  following: string;
}


export default function UserProfile() {

  const params = useParams()

  const {id} = params

  const [post, setPost] = useState<Post[]>([])

  const [User, setUser] = useState<User | null>(null)

  const [following, setFollowing] = useState<any>(null)

  const [followLoading, setFollowLoading] = useState(false)

  const {user} = useAuth()

  const handleFollow = async () => {
    setFollowLoading(true)

    try {
      
      const res = await api.post(`/api/auth/follow/${id}`)

      setFollowing(res.data)

    } catch (error) {
      console.log(error)
    } finally {
      setFollowLoading(false)
    }
  }


useEffect(() => {

  const fetchProfile = async () => {
    try {
        
        const res = await api.get(`/api/auth/get-clicked-user/${id}`)
        
        console.log('User', res.data)

        setUser(res.data)

    } catch (error) {
        console.log(error)
    }
  }
  
  const handlePost = async () => {
    try {
      
      const res = await api.get(`/api/post/get-post-by/${id}`)

      console.log(res.data)

      setPost(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleGetFollow = async () => {

    setFollowLoading(true)

    try {
      
      const res = await api.get(`/api/auth/get-follower/${id}`)

      console.log('Follower', res.data)

      setFollowing(res.data)

    } catch (error) {
      console.log(error)
    } finally {
      setFollowLoading(false)
    }
  }


  handleGetFollow()
  fetchProfile()
  handlePost()
}, [id])

const handleLike = async (postId) => {

try {
            
    const res = await api.post(`/api/post/like/${postId}`)

    const newData = res.data.updatedPost;

     setPost((prev) => 
         prev.map((post) => post._id === postId ? newData : post)
     );

  } catch (error) {
    console.log(error)
  }
}

return (
    <div className="flex flex-col items-center w-screen min-h-screen text-white overflow-x-hidden">
      
      <div className="max-w-4xl w-full pt-8 pb-12 px-4 flex flex-col lg:flex md:flex-row sm:flex-row justify-center align-middle items-center gap-8 md:gap-16 overflow-hidden">
          
          <div className="w-[150px] h-[150px] rounded-full">
            <div className="w-full h-full rounded-full p-1">
              <div className="avatar w-full h-full bg-white rounded-full">
                <Image
                  src={User?.pfp || 'https://ik.imagekit.io/glimpse/avatar.png'}
                  alt="Profile Picture"
                  fill
                  sizes="100"
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>

        <div className="flex flex-col gap-6 w-fit">
          
          <div className="flex justify-center lg:justify-start md:justify-start sm:justify-start change-bio-display items-center gap-4">
            <h1 className="text-xl font-semibold">{User?.username}</h1>
            <button className="btn btn-primary" disabled={followLoading} onClick={() => handleFollow()}>{following?.user.followers.includes(user?.user) ? 'Unfollow' : 'Follow'}</button>
          </div>

          <div className="flex justify-evenly md:justify-start sm:justify-evenly md:gap-10 text-base">
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-baseline">
                  <span className="font-bold">{User?.posts}</span>
                  <span className="text-gray-300 text-sm md:text-base">posts</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-baseline">
              <span className="font-bold">{User?.followers || 0}</span>
              <span className="text-gray-300 text-sm md:text-base">followers</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-baseline">
              <span className="font-bold">{User?.following || 0}</span>
              <span className="text-gray-300 text-sm md:text-base">following</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start md:justify-start text-sm leading-snug">
            <p className="text-gray-200 mt-1 whitespace-pre-line">
              {User?.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1450px] reduce-profile-width w-full h-full flex justify-center items-center align-middle flex-wrap gap-3 overflow-hidden">
          {post.length > 0 ? (
            post.map((post) => (
              <div key={post._id} className="relative aspect-9/12 group max-w-[300px] w-full max-h-[400px] h-full cursor-pointer bg-neutral-900" onClick={() => (document.getElementById(post._id) as HTMLDialogElement)?.showModal()}>
                <Image
                  src={post.imageUrl}
                  alt='post'
                  fill
                  sizes="(max-width: 500px) 33vw, 300px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-6 transition-opacity duration-200">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span>❤️</span> {post.likes.length}
                  </div>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span>💬</span> {post.comments.length}
                  </div>
                </div>
                <ProfilePost image={post.imageUrl} pfpImage={post.author.profilePicture} caption={post.caption} username={post.author.username} likes={post.likes.length} postId={post._id} handleLike={handleLike}/>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center align-middle h-full">
              <p className="text-white text-xl font-semibold">No posts</p>
            </div>
          )}
      </div>
    </div>
  );
} 