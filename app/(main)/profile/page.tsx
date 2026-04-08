'use client'
import Image from "next/image"
import CreateModal from "../../components/createModal";
import ProfilePost from "../../components/profilePost";
import StoryCreateModal from "../../components/storyCreateModal";
import { useEffect, useState } from "react";
import api from "@/app/utils/api";
import AddPfp from "@/app/components/addPfp";
import { useAuth } from "@/app/utils/authContext";
import { CameraIcon } from "lucide-react";

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

interface Story {
  author: string;
}

export default function ProfileComp() {

  const [post, setPost] = useState<Post[]>([])

  const [loading, setLoading] = useState(false)

  const {user} = useAuth()

  const [isStory, setIsStory] = useState<Story[]>([])

  const [postLength, setPostLength] = useState(0)

useEffect(() => {
  
  const handlePost = async () => {

    setLoading(true)

    try {
      
      const res = await api.get('/api/post/get-posts')

      setPost(res.data.posts)

      setPostLength(res.data.postLength)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getMyStory = async () => {

    try {
      const res = await api.get('/api/story/my-story')

      setIsStory(res.data)
    } catch (error) {
      console.log(error)
    }

  }

  getMyStory()
  handlePost()
}, [])

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
    <div className="flex flex-col items-center w-full min-h-screen text-white overflow-x-hidden lg:mt-0 md:mt-0 sm:mt-0 mt-15">
      
      <div className="max-w-4xl w-full pt-8 pb-12 px-4 flex change-direction-id lg:flex md:flex-row sm:flex-row justify-center align-middle items-center gap-8 md:gap-8 overflow-hidden">
          
          <div className="w-[150px] h-[150px] rounded-full">
            <div className="w-full h-full rounded-full p-1">
              <div className="relative avatar w-full h-full border-2 border-black rounded-full">
                <Image
                  src={user?.pfp || 'https://ik.imagekit.io/glimpse/avatar.png'}
                  alt="Profile Picture"
                  fill
                  sizes="100"
                  className="object-cover rounded-full"
                />
                <div className="absolute bottom-1 right-1 bg-gray-800 p-2 rounded-full border-2 cursor-pointer hover:bg-gray-700 transition-colors" onClick={() => (document.getElementById('add-pfp') as HTMLDialogElement)?.showModal()}>
                 <CameraIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

        <div className="flex flex-col gap-6 w-fit">
          
          <div className="flex justify-center lg:justify-start md:justify-start sm:justify-start change-bio-displa items-center gap-4">
            <h1 className="text-xl font-semibold">{user?.username}</h1>
            {isStory.length > 0 ? (
              isStory.map((story) => (
                <button key={story.author} className="btn btn-primary" onClick={() => (document.getElementById('create-story') as HTMLDialogElement)?.showModal()}>Change story</button>
              ))
            ) : (
              <button className="btn btn-primary" onClick={() => (document.getElementById('create-story') as HTMLDialogElement)?.showModal()}>Add story</button>
            )}
          </div>

          <div className="flex justify-evenly gap-10 md:justify-start sm:justify-evenly md:gap-10 text-base">
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-center">
                  <span className="font-bold">{postLength}</span>
                  <span className="text-gray-300 text-sm md:text-base">posts</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-center">
              <span className="font-bold">{user?.followers|| 0}</span>
              <span className="text-gray-300 text-sm md:text-base">followers</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-center">
              <span className="font-bold">{user?.following || 0}</span>
              <span className="text-gray-300 text-sm md:text-base">following</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start md:justify-start text-sm leading-snug">
            <p className="text-gray-200 mt-1 whitespace-pre-line">
              {user?.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1450px] reduce-profile-width w-full h-full flex justify-center items-center align-middle flex-wrap gap-3 pb-16">
          {loading ? (
            <div className="flex justify-center items-center h-fit w-full">
              <span className="loading loading-infinity loading-xl w-20"></span>
            </div>
          ) : (
              post.length > 0 ? (
              post.map((User) => (
                <div key={User._id} className="relative aspect-9/12 group max-w-[250px] lg:max-w-[300px] md:max-w-[300px] w-full lg:max-h-[450px] md:max-h-[450] max-h-[350px] h-full cursor-pointer bg-neutral-900" onClick={() => (document.getElementById(User._id) as HTMLDialogElement)?.showModal()}>
                  <Image
                    src={User.imageUrl}
                    alt='post'
                    fill
                    sizes="(max-width: 500px) 33vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex justify-center items-center align-middle gap-6 transition-opacity duration-200">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <span>❤️</span> {User.likes.length}
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <span>💬</span> {User.comments.length}
                    </div>
                  </div>
                  <ProfilePost image={User.imageUrl} pfpImage={User.author.profilePicture} caption={User.caption} username={User.author.username} likes={User.likes.length} postId={User._id} handleLike={handleLike} isLiked={User.likes.includes(user?.user) ? true : false}/>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center align-middle h-full">
                <p className="text-white text-xl font-semibold">No posts</p>
              </div>
            )
          )}
      </div>
      <CreateModal username={user?.username || ''} pfp={user?.pfp || ''}/>
      <AddPfp username={user?.username || ''} pfp={user?.pfp || ''}/>
      <StoryCreateModal />
    </div>
  );
} 