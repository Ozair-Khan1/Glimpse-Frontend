"use client"
import FollowComp from '../../components/followComp';
import PostComp from '../../components/postComp';
import StoriesComp from '../../components/storiesComp';


const page = () => {

  return (
    <>
      <main className="flex justify-center max-w-162.5 w-full min-h-screen pt-8 pb-17 lg:pb-0 md:pb-0 lg:mt-0 md:mt-0 sm:mt-0 mt-15">
      <div className="flex w-full px-4 gap-30 reduce-gap-home justify-center">
        <div className="flex flex-col items-center w-full gap-10">
          <StoriesComp />
          <PostComp />
        </div>
        <div className="block hide-follow-sec w-fit pt-4">
          <FollowComp/>
        </div>
      </div>
    </main>
    </>
  )
}

export default page