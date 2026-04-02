'use client'
import { useAuth } from "./utils/authContext"

const StartingPage = () => {

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center align-middle">
      <p className="text-5xl font-semibold mb-2">Glimpse</p>
      <div className="flex justify-center w-15">
        <span className="loading loading-infinity loading-xl w-full"></span>
      </div>
    </div>
  )
}

export default StartingPage