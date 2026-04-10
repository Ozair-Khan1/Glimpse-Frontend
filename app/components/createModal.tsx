'use client'
import { X } from "lucide-react";
import Image from "next/image"
import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import api from "../utils/api";
import CustomVideoPlayer from "./customVideoPlayer";


interface ImagePreview {
    url: string;
    type?: 'image' | 'video';
}

interface User {
    username: string;
    pfp: string;
}

export default function CreateModal({ username, pfp }: User) {

    const [step, setStep] = useState(1)

    const [fileError, setFileError] = useState(false)

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [captionData, setCaptionData] = useState({
        caption: ''
    });

    const [loading, setLoading] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<ImagePreview[]>([]);

    const handleButtonClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleFolderSelect = async (event: ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if (!fileList || fileList.length === 0) return;

        const file = fileList[0];

        if (file && !file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            alert('Please select an image or video')
            return
        }

        if (file && file.size > 100 * 1024 * 1024) {
            setFileError(true)
            return
        }

        setSelectedFile(file);

        const localUrl = URL.createObjectURL(file);

        setPreviews([{ url: localUrl, type: file.type.startsWith('video/') ? 'video' : 'image' }]);
        setStep(2);
    };

    const handlePost = async () => {

        if (!selectedFile) return

        const formData = new FormData()


        formData.append('image', selectedFile)
        formData.append('caption', captionData.caption || '')

        setLoading(true)

        try {

            await api.post('/api/post/create-post', formData);

            (document.getElementById('create-modal') as HTMLDialogElement).close();
            captionData.caption = ''
            setStep(1);
            setPreviews([]);
            setSelectedFile(null);

            await api.get('/api/post/posts')

            window.location.reload()

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    const handleClose = () => {

        (document.getElementById('create-modal') as HTMLDialogElement).close();

        setStep(1);

        setPreviews([]);

        setSelectedFile(null);

    }

    return (
        <dialog id="create-modal" className="modal backdrop-blur-md overflow-hidden" onKeyDown={(e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
            }
        }}>
            <div className="modal-box w-11/12 max-w-2xl backdrop-blur-md h-9/12 p-5 bg-[#22262B] flex flex-col items-center align-middle mt-2 gap-15 overflow-hidden">
                <div className="flex justify-between align-middle bg-[#0C1014] w-full p-5 rounded-xl">
                    <h3 className="text-white font-sans text-xl font-bold" style={{ letterSpacing: '2px' }}>Glimpse</h3>
                    <div className="modal-action m-0">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white" onClick={handleClose}><X /></button>
                        </form>
                    </div>
                </div>
                {step === 1 ? (
                    <div className="flex flex-col justify-center items-center align-middle h-full w-full overflow-hidden gap-5">
                        <div className='avatar size-50 w-fit h-fit flex flex-col justify-center items-center align-middle gap-3'>
                            <svg aria-label="Icon to represent media such as images or videos" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            <p className='font-semibold'>Select A Picture Or Video</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFolderSelect}
                                style={{ display: 'none' }}
                                accept="image/*, video/*"
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleButtonClick}
                            >
                                Select From Folder
                            </button>
                            {fileError && <p className="text-red-500 font-semibold">File size should not exceed 100 MB</p>}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full w-full align-middle items-center overflow-hidden rounded-lg">
                        {previews.map((file, index) => (
                            <div key={index} className={`relative hide-preview bg-black flex-1 h-full w-full`}>
                                {file.type === 'video' ? (
                                    <CustomVideoPlayer src={file.url} />
                                ) : (
                                    <Image
                                        src={file.url}
                                        alt="Post preview"
                                        fill
                                        className={`object-contain relative rounded-lg`}
                                        priority
                                    />
                                )}
                            </div>
                        ))}
                        <div className="w-[250px] h-full flex flex-col border-l-2 border-white/10">

                            <div className="flex items-center gap-3 p-4">
                                <div className="avatar size-8">
                                    <div className="rounded-full bg-white">
                                        <Image src={pfp} alt='avatar' sizes='100' fill className='rounded-full'></Image>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-white">{username}</span>
                            </div>

                            <div className="px-4 flex flex-col justify-start h-full">
                                <textarea
                                    placeholder="Write a caption..."
                                    value={captionData.caption}
                                    onChange={(e) => setCaptionData({ ...captionData, caption: e.target.value })}
                                    disabled={loading}
                                    className="w-full h-full flex-1 bg-transparent border-none outline-none resize-none text-sm text-white placeholder:text-[#8e8e8e]"
                                />
                                <span className="flex justify-between p-2 text-xs text-gray-500">{captionData?.caption?.length || 0} / 2200</span>
                                <button type="button" onClick={handlePost} className="btn btn-success" disabled={loading}>{loading ? <span className="loading loading-infinity loading-xl"></span> : 'Post'}t</button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </dialog>
    )

}