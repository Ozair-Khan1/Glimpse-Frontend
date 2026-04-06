"use client"
import { PlusSquareIcon, HomeIcon, Grid2X2Icon, MenuIcon, SquareUserRoundIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "../utils/authContext"
import Image from "next/image"
import MobileFollowComp from "../components/mobileFollowComp"
import { usePathname } from "next/navigation"


const Sidebar = () => {
    const [home, setHome] = useState(true)
    const [profile, setProfile] = useState(false)
    const [create, setCreate] = useState(false)
    const[more, setMore] = useState(false)
    const [changeBg, setChangeBg] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const {logout} = useAuth()
    const pathName = usePathname()
    const {user} = useAuth()

    const isHome = pathName === '/home'
    const isProfile = pathName === '/profile'

    const handleLogut = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()

        await logout()

    }

  return (
    <>
        <div className="w-full p-4 h-fit flex lg:hidden md:hidden align-middle items-center justify-between fixed top-0 z-50 bg-[#0C1014]">
            <Link href='/home' className="text-white font-sans text-xl font-bold z-50 select-none" style={{letterSpacing : '2px'}}>Glimpse</Link>
            <button onClick={() => (document.getElementById('follow-comp') as HTMLDialogElement)?.showModal()} className="bg-gray-800 p-3 rounded-lg"><SquareUserRoundIcon/></button>
        </div>
        <div className="w-screen flex justify-center items-center mx-auto">
            <div className="fixed left-0 bg-transparent lg:top-0 lg:left-0 md:top-0 md:left-0 bottom-0 nav-main-div w-full lg:w-fit md:w-fit m-0 lg:h-screen h-fit lg:p-4 px-4 pt-4 flex lg:flex-col md:flex-col flex-row gap-70 text-white z-50" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
                <div className="hidden lg:block md:block p-3 w-fit rounded-2xl hover:bg-gray-800 h-fit">
                    <Link className="w-fit" href='/home'>
                        <h3 className="text-white font-sans text-xl font-bold" style={{letterSpacing : '2px'}}>Glimpse</h3>
                    </Link>
                </div>
                <nav className="flex lg:flex-col md:flex-col nav-second-div gap-15 lg:gap-8 md:gap-8">
                    <Link className={`flex items-center w-fit gap-4 p-3 m-0 rounded-lg hover:bg-gray-800 transition-colors group`} href='/home'>
                        <div className={`relative group-hover:scale-110 ${isHome ? 'bg-gray-800 p-2 rounded-lg' : ''} transition-all duration-400`}>
                            <HomeIcon className="size-6"/>
                        </div>
                        <span className={`text-md font-sans nav-text hidden lg:block ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} transition-all duration-350`}>Home</span>
                    </Link>
                    <button type="button" className={`flex cursor-pointer items-center gap-4 p-3 m-0 rounded-lg hover:bg-gray-800 transition-colors group`} onClick={() =>(document.getElementById('create-modal') as HTMLDialogElement)?.showModal()}>
                        <div className={`relative group-hover:scale-110 ${create ? 'bg-gray-800 p-2 rounded-lg' : ''} transition-all duration-400`}>
                            <PlusSquareIcon className="size-6"/>
                        </div>
                        <span className={`text-md font-sans nav-text hidden lg:block ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} transition-all duration-350`}>Create</span>
                    </button>
                    <Link className={`flex items-center gap-4 p-3 m-0 rounded-lg hover:bg-gray-800 transition-colors group`} href='/profile'>
                        <div className={`relative group-hover:scale-110 ${isProfile ? 'bg-gray-800 p-2 rounded-lg' : ''} transition-all duration-400`}>
                           <div className="avatar size-6">
                                <div className="bg-white rounded-full">
                                    <Image src={user?.pfp || 'https://ik.imagekit.io/glimpse/avatar.png'} height={64} width={64} className="object-cover" alt="Pfp"></Image>
                                </div>
                            </div>
                        </div>
                        <span className={`text-md font-sans nav-text hidden lg:block ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} transition-all duration-350`}>Profile</span>
                    </Link> 
                    <div tabIndex={0} role="button" className="dropdown dropdown-bottom dropdown-start" onMouseEnter={() => setChangeBg(true)} onMouseLeave={() => setChangeBg(false)}>
                        <div className={`flex items-center gap-2 m-0 hover:bg-gray-800 transition-all rounded-lg group ${more ? 'p-2' : ''}`}>
                            <div className={`btn ${changeBg ? 'bg-gray-800 transition-all duration-100 rounded-lg' : 'bg-[#0C1014] transition-all duration-400'} ${more ? 'bg-gray-800 p-2' : 'p-2 ml-1.5'} border-0`} style={{boxShadow: 'none'}}>
                                <MenuIcon className="size-6"/>
                            </div>
                            <span className={`text-md font-sans nav-text hidden cursor-pointer lg:block ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} transition-all duration-400`}>More</span>
                        </div>
                        <ul tabIndex={-1} className="dropdown-content menu rounded-box mt-2 z-1 w-52 p-2 bg-base-100">
                            <li><button onClick={handleLogut}>Log out</button></li>
                        </ul>
                    </div>
                </nav>
            </div> 
            <div className="dock show-mobile-nav hidden dock-md bg-[#0C1014]">
                <Link href='/' type="button" className={`${isHome ? 'bg-gray-800 rounded-lg' : ''} transition-all duration-400`}>
                    <HomeIcon className="size-7"/>
                </Link>
                
                <button type="button" className={`${create ? 'bg-gray-800 rounded-lg' : ''} transition-all duration-400`} onClick={() => (document.getElementById('create-modal') as HTMLDialogElement)?.showModal()}>
                    <PlusSquareIcon className="size-7"/> 
                </button>
                
                <Link href='/profile' type="button" className={`${isProfile ? 'bg-gray-800 rounded-lg' : ''} transition-all duration-400`}>
                    <div className="avatar size-7">
                        <div className="bg-white rounded-full">
                            <Image src={user?.pfp || 'https://ik.imagekit.io/glimpse/avatar.png'} height={64} width={64} className="object-cover" alt="Pfp"></Image>
                        </div>
                    </div>
                </Link>
                <div tabIndex={0} role="button" className={`dropdown flex items-center justify-center dropdown-top dropdown-center ${more ? 'bg-gray-800 p-2' : 'p-2'} transition-all duration-400`}>
                    <div className="btn border-0 bg-transparent" style={{boxShadow: 'none'}}><MenuIcon className="size-6"/></div>
                    <ul tabIndex={-1} className="dropdown-content menu rounded-box z-1 mb-2 w-52 p-2 bg-base-100">
                        <li><button onClick={handleLogut}>Log out</button></li> 
                    </ul>
                </div>
            </div>
            <MobileFollowComp />         
        </div>
    </>
  )
}
export default Sidebar