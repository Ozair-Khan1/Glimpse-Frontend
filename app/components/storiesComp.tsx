'use client'

import Image from "next/image"
import { X, MessageCircleMoreIcon } from 'lucide-react';
import CommentsModal from './storiesComment';
import { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import StoryModal from "./storyModal";
import { useAuth } from "../utils/authContext";


interface Author {
  _id: string;
  profilePicture: string;
  username: string;
}

interface Story {
  author: Author;
  comments: [];
  likes: string[];
  imageUrl: string;
  _id: string;
  createdAt: string;
}

export default function StoriesComp() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  const [story, setStory] = useState<Story[]>([])

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;
    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1;
      slider.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {

    const getStory = async () => {

      setLoading(true)

      await new Promise(resolve => setTimeout(resolve, 1000));

      try {

        const res = await api.get('/api/story/get-follower-story')

        setStory(res.data)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

    }

    getStory()
  }, [])

  const handleLike = async (_id) => {

    try {

      const res = await api.post(`/api/story/like-story/${_id}`)

      const newData = res.data.updatedStory

      setStory((prev) =>
        prev.map((story) => story._id === _id ? newData : story)
      );


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex justify-center max-w-116 w-full overflow-hidden">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          className="flex items-center reduce-stories-width justify-center max-w-116 w-full border border-gray-800 rounded-lg py-4 px-4 gap-4 overflow-x-auto scroll-x-mandatory scroll-smooth scrollbar-hide select-none"
        >
          {loading ? (
            <div className="skeleton max-w-116 w-full h-[125.45]">
            </div>
          ) : (
            story.length > 0 ? (
              story.map((story) => (
                <div
                  className="flex flex-col items-center gap-1 scroll-snap-align-start cursor-pointer w-fit"
                  onClick={() => {
                    (document.getElementById(`story-${story._id}`) as HTMLDialogElement)?.showModal()
                    const video = document.getElementById(`story-${story._id}`)?.querySelector('video');
                    if (video) video.play();
                  }}
                  key={story._id}
                >
                  <div className="p-[2px] rounded-full">
                    <div className="bg-black p-[2px] rounded-full">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image src={story.author.profilePicture} alt={story.author.username} fill sizes="100" className="object-cover" />
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-300 text-sm truncate text-center">{story.author.username}</span>
                  <StoryModal createdAt={story.createdAt} comments={story.comments} likes={story.likes.length} imageURL={story.imageUrl} _id={story._id} handleLike={handleLike} isLiked={story.likes.includes(user?.user) ? true : false} />
                  <CommentsModal _id={story._id} />
                </div>
              ))
            ) : (
              <span>No story yet</span>
            )
          )}
        </div>
      </div>
    </>
  )

}