"use client"
import { useAuth } from '@/app/utils/authContext';
import FollowComp from '../../components/followComp';
import PostComp from '../../components/postComp';
import StoriesComp from '../../components/storiesComp';


const page = () => {

  return (
    <>
      <main className="flex justify-center w-full min-h-screen pt-8 pb-17 lg:pb-0 md:pb-0">
      <div className="flex w-full max-w-fit px-4 gap-30 reduce-gap-home justify-center">
        <div className="flex flex-col items-center w-full max-w-fit gap-10">
          <StoriesComp />
          <PostComp />
        </div>
        <div className="block hide-follow-sec w-full max-w-fit pt-4">
          <FollowComp/>
        </div>
      </div>
    </main>
    </>
  )
}

export default page