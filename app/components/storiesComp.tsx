import Image from "next/image"
import { X, MessageCircleMoreIcon } from 'lucide-react';
import CommentsModal from './storiesComment';
import { useRef } from "react";


export default function StoriesComp() {
  const scrollRef = useRef<HTMLDivElement>(null);

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

const stories = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    username: `user_${i + 1}`,
    img: "/test-img.png",
  }));

return (
    <>
      <div className="">
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            className="flex items-center w-full reduce-stories-width max-w-117  border border-gray-800 rounded-lg py-4 px-4 gap-4 overflow-x-auto scroll-x-mandatory scroll-smooth scrollbar-hide select-none"
          >
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center gap-1 flex-shrink-0 scroll-snap-align-start cursor-pointer"
            onClick={() => (document.getElementById('story-modal') as HTMLDialogElement)?.showModal()}
          >
            <div className="p-[2px] rounded-full">
              <div className="bg-black p-[2px] rounded-full">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image src={story.img} alt={story.username} fill sizes="100" className="object-cover" />
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-300 truncate w-16 text-center">{story.username}</span>
          </div>
        ))}
      </div>
      <dialog id="story-modal" className="modal backdrop-blur-md overflow-hidden">
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
                src="/test-img.png"
                alt="username"
                fill
                className="object-contain"
                loading="eager"
                sizes='100'
              />
            </div>
          </div>
          <div className="flex justify-between">
                <label className='swap' onClick={() => console.log('lol')}>
                  <input type="checkbox" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-off lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 24 24" fill="#d10000" stroke="#d10000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-on lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                    </svg>
                </label>
            <button className="btn bg-[#0C1014] border-0" style={{boxShadow : 'none'}} onClick={()=>(document.getElementById('comments') as HTMLDialogElement)?.showModal()}><MessageCircleMoreIcon className='size-7' /></button>
          </div>
        </div>
      </dialog>
      <CommentsModal/>
    </div>
    </>
)

}