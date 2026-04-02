'use client'

import Link from "next/link"
import React, { useState } from "react"
import api from "../utils/api"
import { useAuth } from "../utils/authContext"
import { useRouter } from "next/navigation"

export default function Login() {

    const {setUser, user} = useAuth()

     const router = useRouter()

    const [formData, setFormData] = useState({

        identifier: '',
        password: ''

    })

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({
        identifier: false,
        password: false
    })

    const [dontExists, setDontExists] = useState(false)


    const [passError, setPassError] = useState(false)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setError((prev) => ({
            ...prev,
            [name]: value.trim() === ''
        }))

        setPassError(false)

        setDontExists(false)
        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const newErrors = {
            identifier: formData.identifier.trim() === '',
            password: formData.password.trim() === ''
        }

        setError(newErrors)

        const hasErrors = Object.values(newErrors).includes(true)

        if(hasErrors) {
            return
        }

        setLoading(true)

        try {
            
            const res = await api.post('/api/auth/login', formData)

            setUser(res.data.user.username)


            router.push('/home')
        } catch (error: any) {
            if(error.status === 404) {
                setDontExists(true)
            } else if(error.status === 403) {
                setPassError(true)
            }
        } finally {
            setLoading(false)
        }

    }


    return (
        <>
            <div className="flex flex-col max-w-[600px] w-screen h-screen justify-center py-10 items-center">
                <div className="flex flex-col gap-10 w-full justify-center items-center h-fit p-5 border border-[#1f2b36] rounded-xl">
                    <div className="flex w-full h-fit gap-2 justify-start">
                        <p className="text-2xl font-semibold">Login into Glimpse</p>
                    </div>
                    <div className="flex flex-col justify-start align-middle w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-8 flex-col w-full h-full">
                                <div className="flex flex-col gap-2.5 w-full h-fit">
                                    <p className="text-[#E4E6EB] text-lg font-semibold">Email or Username</p>
                                    <label className="floating-label">
                                        <span>Email or Username</span>
                                        <input type="text" name="identifier" value={formData.identifier} onChange={handleChange} placeholder="Email or Username" className={`input ${dontExists ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} ${error.identifier ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} rounded-2xl hover:border-gray-400 focus:border-[#0D6EFD] outline-[#0D6EFD] bg-transparent p-4 input-lg w-full h-fit`} />
                                    </label>
                                    {dontExists && (
                                        <span className="text-red-400">Invalid email or username</span>
                                    )}
                                    {error.identifier && (
                                        <span className="text-red-400">Email or username is required</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2.5 w-full h-fit">
                                    <p className="text-[#E4E6EB] text-lg font-semibold">Password</p>
                                    <label className="floating-label">
                                        <span>Password</span>
                                        <input type="text" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className={`input ${passError ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} ${error.password ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} rounded-2xl hover:border-gray-400 focus:border-[#0D6EFD] outline-[#0D6EFD] bg-transparent p-4 input-lg w-full h-fit`} />
                                    </label>
                                    {passError && (
                                        <span className="text-red-400">Invalid password</span>
                                    )}
                                    {error.identifier && (
                                        <span className="text-red-400">Password is required</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3 w-full h-fit">
                                    <button type="submit" className="btn btn-block rounded-2xl bg-[#0D6EFD] hover:bg-[#094eb6] text-[16px]" disabled={loading}>{loading ? <span className="loading loading-infinity loading-xl text-white"></span> : 'Login'}</button>
                                    <Link href='/signup' className="btn btn-block border-gray-400 rounded-2xl bg-transparent hover:bg-gray-600 font-semibold text-[16px]" style={{boxShadow: 'none'}}>Don&apos;t have an account</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}