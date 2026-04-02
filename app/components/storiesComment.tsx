"use client"
import Image from 'next/image';

export default function CommentsModal() {
  return (
    <dialog id="comments" className="modal backdrop-blur-md">
      <div className="modal-box w-11/12 max-w-xl bg-[#0C1014] p-0 overflow-hidden flex flex-col h-[70vh] border border-gray-800 shadow-2xl">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-800 bg-[#0C1014] z-10">
          <h3 className="text-white text-xl font-bold tracking-wider">Comments</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white">✕</button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">

          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="flex gap-4 items-start group">
              <div className="avatar size-10 flex-shrink-0">
                <div className="rounded-full ring-1 ring-gray-700">
                  <Image src='https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp' sizes="100" fill loading="eager" className="rounded-full" alt="pic"></Image>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white hover:underline cursor-pointer">username</span>
                  <span className="text-xs text-gray-500">2h</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed break-words">
                  This layout looks much cleaner now! The scrolling works perfectly without overlapping the input field at the bottom.
                </p>
              </div>
            </div>
          ))}

        </div>

        <div className="p-4 bg-[#0C1014] border-t border-gray-800">
          <form className="flex items-center gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="input input-bordered w-full bg-[#161b22] border-gray-700 text-sm focus:border-green-600 focus:outline-none h-11"
              />
            </div>
            <button 
              type="submit" 
              className="btn bg-green-700 hover:bg-green-600 border-none text-white px-6 h-11 min-h-0"
            >
              Post
            </button>
          </form>
        </div>

      </div>
    </dialog>
  );
}