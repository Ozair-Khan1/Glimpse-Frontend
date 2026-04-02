'use client'
import Image from "next/image"
import CreateModal from "../../components/createModal";
import ProfilePost from "../../components/profilePost";
import { PlusCircleIcon } from "lucide-react";
import StoryCreateModal from "../../components/storyCreateModal";

export default function ProfileComp() {
return (
    <div className="flex flex-col items-center w-screen min-h-screen text-white overflow-x-hidden">
      
      <div className="max-w-4xl w-full pt-8 pb-12 px-4 flex flex-col lg:flex-row md:flex-row sm:flex-row items-center md:items-start gap-8 md:gap-16 overflow-hidden">
          
          <div className="w-[150px] h-[150px] rounded-full">
            <div className="w-full h-full bg-black rounded-full p-1">
              <div className="avatar max-w-[150px] w-full h-full rounded-full">
                <Image
                  src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp"
                  alt="Profile Picture"
                  fill
                  sizes="150px"
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>

        <div className="flex flex-col gap-6 flex-1 w-full">
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-xl font-semibold">ozair_nvm</h1>
            <button className="btn btn-primary" onClick={() => (document.getElementById('create-story') as HTMLDialogElement)?.showModal()}>Add Story</button>
          </div>

          <div className="flex justify-evenly md:justify-start md:gap-10 text-base">
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-baseline">
              <span className="font-bold">3</span>
              <span className="text-gray-300 text-sm md:text-base">posts</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-baseline">
              <span className="font-bold">133</span>
              <span className="text-gray-300 text-sm md:text-base">followers</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-1 items-center md:items-baseline">
              <span className="font-bold">110</span>
              <span className="text-gray-300 text-sm md:text-base">following</span>
            </div>
          </div>

          <div className="text-sm leading-snug">
            <p className="font-bold">Ozair Khan</p>
            <p className="text-gray-200 mt-1 whitespace-pre-line">
              They wanna die, let them
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1450px] reduce-profile-width w-full h-full flex justify-center items-start flex-wrap gap-3 overflow-hidden">
          <div className="relative aspect-square group max-w-[250px] w-full h-full cursor-pointer bg-neutral-900" onClick={() => (document.getElementById('profile-post') as HTMLDialogElement)?.showModal()}>
            <Image
              src='/test-img.png'
              alt='post'
              fill
              sizes="(max-width: 500px) 33vw, 300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-6 transition-opacity duration-200">
              <div className="flex items-center gap-2 text-white font-bold">
                <span>❤️</span> 42
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <span>💬</span> 12
              </div>
            </div>
          </div>
      </div>
      <CreateModal />
      <ProfilePost />
      <StoryCreateModal />
    </div>
  );
}