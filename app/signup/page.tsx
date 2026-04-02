'use client'

import Image from "next/image"
import Link from "next/link"
import api from "../utils/api"
import { useAuth } from "../utils/authContext"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SignUp() {

    const {setUser, user} = useAuth()

    console.log(user)

    const router = useRouter()

    useEffect(() => {
        console.log("Current user state:", user); // This will log null first, then the user object
        if (user) {
            router.push('/');
        }
    }, [user]);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        username: '',
        password: ''
    })

    const [emailExists, setEmailExists] = useState(false)

    const [usernameExists, setUsernameExists] = useState(false)

    const [step, setStep] = useState(1)

    const [shortPass, setShortPass] = useState(false)

    useEffect(() => {
        const savedStep = localStorage.getItem('Verify')
        if(savedStep) {
            setStep(Number(savedStep))
        }
    }, [])

    const [loading, setLoading] = useState(false)

    const [nullError, setNullError] = useState(false);

    const [otp, setOtp] = useState('');

    const [coderError, setCodeError] = useState(false);

    const [timer, setTimer] = useState(0);

    const [canResend, setCanResend] = useState(false);

    const [error, setError] = useState({
        email: false,
        name: false,
        username: false,
        password: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setError((prev) => ({
            ...prev,
            [name]: value.trim() === ''
        }))

        setEmailExists(false)

        setUsernameExists(false)

        setShortPass(false)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        const newErrors = {
            email: formData.email.trim() === '',
            name: formData.name.trim() === '',
            username: formData.username.trim() === '',
            password: formData.password.trim() === ''
        }

        setError(newErrors)

        const hasError = Object.values(newErrors).includes(true)

        if(hasError) {
            return
        } else if(formData.password.length < 8) {
            setShortPass(true)
            return
        }

        setLoading(true)
        
        try {
            
            await api.post('/api/auth/register', formData)

            setCanResend(false)

            setTimer(60)

            setStep(2)

            localStorage.setItem('Verify', '2')

        } catch (error: any) {
            if(error.status === 409 && error.response.data.message === 'Email Exists') {
                setEmailExists(true)
            } else if (error.status === 409 && error.response.data.message === 'Username Exists') {
                setUsernameExists(true)
            }
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
              let interval: NodeJS.Timeout | undefined;
      
              if (timer > 0) {
                  interval = setInterval(() => {
                      setTimer((prev) => prev - 1);
                  }, 1000);
              } else {
                  setCanResend(true);
                  clearInterval(interval)
              }
              return () => clearInterval(interval)
    }, [timer]);

    const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(otp.trim() === '') {
            setNullError(true)
            return
        }

        setLoading(true)

        try {
            
            const res = await api.post('/api/auth/verify', {otp: otp})

            setUser(res.data.user.username)

            localStorage.clear()

            router.push('/home')

        } catch (error: any) {
            if(error.status === 401) {
                alert('Token not found')
            } else if (error.status === 404) {
                alert('Otp not found')
            } else if (error.status === 402) {
                alert('User not found')
            } else if (error.status === 406) {
                setCodeError(true)
            }
        } finally {
            setLoading(false)
        }

    }

    const handleResendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!canResend) return;

         try {

            setCanResend(false)

            setTimer(60)

            await api.post('/api/auth/resend-code')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex flex-col max-w-[600px] w-screen h-screen justify-center py-10 items-center">
                <div className="flex flex-col gap-5 w-full justify-center items-center h-fit border border-[#1f2b36] rounded-xl p-5">
                    <div className="flex w-full h-fit gap-2 justify-start align-middle items-center">
                        <div className="avatar size-6">
                            <Image src='/favicon.svg' alt="logo" className="object-cover" fill/>
                        </div>
                        <Link href='https://ok-folio.vercel.app/' target="_blank" className="text-gray-200 font-semibold text-lg hover:text-[#0D6EFD]">OK-Folio</Link>
                    </div>
                    <div className="flex flex-col w-full h-fit justify-start align-middle">
                        <p className="text-[#E4E6EB] font-semibold text-3xl">Get started on Glimpse</p>
                        <p className="text-[#E4E6EB] font-medium text-lg">Sign up to see pictures from your friends</p>
                    </div>
                    <div className="flex flex-col justify-start align-middle w-full">
                        {step === 1 ? (
                            <form onSubmit={handleSubmit}>
                            <div className="flex gap-8 flex-col w-full h-full">
                                <div className="flex flex-col gap-2.5 w-full h-fit">
                                    <p className="text-[#E4E6EB] text-lg font-semibold">Email</p>
                                    <label className="floating-label">
                                        <span>Your Email</span>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="mail@gmail.com" className={`input ${error.email ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} ${emailExists ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} rounded-2xl hover:border-gray-400 focus:border-[#0D6EFD]  bg-transparent p-4 input-lg w-full h-fit`} />
                                    </label>
                                    {error.email && (
                                        <span className="text-red-400">Email is required</span>
                                    )}
                                    {emailExists && (
                                        <span className="text-red-400">Email already exists</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2.5 w-full h-fit">
                                    <p className="text-[#E4E6EB] text-lg font-semibold">Password</p>
                                    <label className="floating-label">
                                        <span>Password</span>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className={`input ${error.password ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} rounded-2xl hover:border-gray-400 focus:border-[#0D6EFD] outline-[#0D6EFD] bg-transparent p-4 input-lg w-full h-fit`} />
                                    </label>
                                    {error.password && (
                                        <span className="text-red-400">Password is required</span>
                                    )}
                                    {shortPass && (
                                        <span className="text-red-400">Password must be greater than 8 characters</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2.5 w-full h-fit">
                                    <p className="text-[#E4E6EB] text-lg font-semibold">Name</p>
                                    <label className="floating-label">
                                        <span>Full name</span>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className={`input ${error.name ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} rounded-2xl hover:border-gray-400 focus:border-[#0D6EFD] outline-[#0D6EFD] bg-transparent p-4 input-lg w-full h-fit`} />
                                    </label>
                                    {error.name && (
                                        <span className="text-red-400">Name is required</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2.5 w-full h-fit">
                                    <p className="text-[#E4E6EB] text-lg font-semibold">Username</p>
                                    <label className="floating-label">
                                        <span>Username</span>
                                        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className={`input ${error.username ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} ${usernameExists ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} rounded-2xl hover:border-gray-400 focus:border-[#0D6EFD] outline-[#0D6EFD] bg-transparent p-4 input-lg w-full h-fit`} />
                                    </label>
                                    {error.username && (
                                        <span className="text-red-400">Username is required</span>
                                    )}
                                    {usernameExists && (
                                        <span className="text-red-400">Username already exists</span>
                                    )}
                                </div>
                                <div className="flex flex-col w-full h-fit">
                                    <p className="text-[#E4E6EB] font-medium text-md">By tapping Submit, you agree to create an account and to Glimpse&apos;s <span className="text-[#0D6EFD] font-medium text-md">Terms, Privacy Policy</span> and <span className="text-[#0D6EFD] font-medium text-md">Cookies Policy</span></p>
                                </div>
                                <div className="flex flex-col gap-3 w-full h-fit">
                                    <button type="submit" className="btn btn-block rounded-2xl bg-[#0D6EFD] hover:bg-[#094eb6] text-[16px]" disabled={loading}>{loading ? <span className="loading loading-infinity loading-xl text-white"></span> : 'Submit'}</button>
                                    <Link href='/login' className="btn btn-block border-gray-400 rounded-2xl bg-transparent hover:bg-gray-600 font-semibold text-[16px]" style={{boxShadow: 'none'}}>Already have an account</Link>
                                </div>
                            </div>
                        </form>
                        ) : (
                            <form onSubmit={handleVerifyCode}>
                                <div className="flex gap-8 flex-col justify-center items-center w-full h-fit">
                                    <div className="flex flex-col gap-3.5 w-full h-fit">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#E4E6EB] text-lg font-semibold text-wrap">We&apos;ve sent a 6-digit code to <span className="text-[#0D6EFD] text-xl font-bold text-wrap">{formData.email}</span></p>
                                        </div>
                                        <label className="floating-label">
                                            <span>Your Code</span>
                                            <input type="text" name="otp" value={otp} onChange={(e) => {setOtp(e.target.value); setNullError(false); setCodeError(false)}} placeholder="Code" className={`input ${nullError ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} ${coderError ? 'outline-red-500 focus:border-red-500 border-red-500' : 'outline-[#0D6EFD]'} rounded-2xl hover:border-gray-400 focus:border-[#0D6EFD] outline-[#0D6EFD] bg-transparent p-4 input-lg w-full h-fit`} />
                                        </label>
                                        {nullError && (
                                            <span className="text-red-400">Enter the code</span>
                                        )}
                                        {coderError && (
                                            <span className="text-red-400">Invalid code</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-3 w-full h-fit">
                                        <button type="submit" className="btn btn-block rounded-2xl bg-[#0D6EFD] hover:bg-[#094eb6] text-[16px]" disabled={loading}>{loading ? <span className="loading loading-infinity loading-xl text-white"></span> : 'Verify'}</button>
                                        <button className="btn max-w-[150px] w-full rounded-2xl bg-green-700 hover:bg-green-900 text-[16px]" onClick={handleResendCode} disabled={!canResend}>{canResend ? "Resend code" : `Resend in ${timer}`}</button>
                                     </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}