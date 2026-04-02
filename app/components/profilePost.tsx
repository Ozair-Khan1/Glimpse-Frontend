'use client'
import Image from "next/image"
import { X } from "lucide-react"

export default function ProfilePost() {
    
    return (
        <dialog className="modal backdrop-blur-md py-10 px-5 lg:px-0 md:px-0" id="profile-post">
            <div className="fixed top-4 right-4">
                <form method="dialog">
                    <button className="btn btn-circle bg-red-500 hover:bg-red-900"><X /></button>
                </form>
            </div>
             <div className="modal-box max-w-[500px] w-full bg-[#0C1014] p-0 overflow-hidden flex flex-col lg:flex-row lg:max-w-[950px] lg:h-[75vh] md:flex-col md:max-w-[500px] md:h-[80vh] justify-center items-center h-[75vh] border border-gray-800 shadow-2xl">

                <div className="max-w-[600px] lg:max-w-[600px] md:max-w-[600px] relative w-full lg:h-full md:h-[40vh] h-[40vh] bg-black rounded-lg">
                    <Image src='/test-img.png' alt="post" fill className="object-contain" sizes="100"/>
                </div>
                <div className="relative flex flex-col flex-1 max-w-screen lg:max-w-[350px] md:max-w-screen w-full h-full overflow-y-auto">
                    
                    <div className="flex flex-col gap-5 border-b border-white/10 p-4 justify-center">
                        <div className="flex gap-3">
                        <div className="avatar size-8">
                            <div className="rounded-full">
                                <Image src='/test-img.png' alt="pic" className="object-cover rounded-full" fill/>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-5 w-full h-fit">
                            <p className="text-sm">
                                <span className="font-bold mr-2">ozair_nvm</span>
                                Eid Mubarak 🌙 ✨ asd asd asda sda sd
                            </p>
                            <div className="flex items-center align-middle">
                                <label className='swap' onClick={() => console.log('lol')}>
                                    <input type="checkbox" />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-off lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" viewBox="0 0 24 24" fill="#d10000" stroke="#d10000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swap-on lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                                        </svg>
                                </label>
                                <span className="font-bold">1</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Scrollable Comments Section */}
                    <div className="flex-1 flex flex-col p-4 justify-between">
                
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-3">
                            <div className="avatar size-8">
                                <div className="rounded-full">
                                    <Image src='/test-img.png' alt="pic" className="object-cover rounded-full" fill/>
                                </div>
                            </div>
                            <div className="flex w-full h-fit">
                                <p className="text-sm">
                                    <span className="font-bold mr-2">ozair_nvm</span>
                                    Eid Mubarak 🌙 ✨ asd asd asda sda sd ada sda sdasd asda sdasdas da sdas da
                                </p>
                            </div>
                            </div>
                            
                        </div>
                        <form className="sticky bottom-3 w-full h-fit flex items-center gap-3">
                            <div className="flex-1 w-full">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="input input-bordered w-full bg-[#161b22] border-gray-700 text-sm focus:border-green-600 focus:outline-none h-11"
                            />
                            </div>
                            <button
                            type="submit"
                            className="btn bg-green-700 hover:bg-green-600 border-none text-white px-4 h-11 min-h-0"
                            >
                            Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )

}