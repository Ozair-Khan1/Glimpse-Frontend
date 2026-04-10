'use client'

import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CustomVideoPlayer = ({ src, stop }: { src: string, stop?: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const manualPauseRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (stop && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [stop]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
                        videoRef.current.pause();
                        setIsPlaying(false);
                    } else if (entry.isIntersecting && videoRef.current && videoRef.current.paused && !stop && !manualPauseRef.current) {
                        const playPromise = videoRef.current.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => setIsPlaying(true)).catch(() => { });
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentVideo = videoRef.current;
        if (currentVideo) {
            observer.observe(currentVideo);
        }

        return () => {
            if (currentVideo) {
                observer.unobserve(currentVideo);
            }
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (videoRef.current.paused) {
                manualPauseRef.current = false;
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                manualPauseRef.current = true;
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div className="relative w-full h-full cursor-pointer" onClick={togglePlay}>
            <video
                ref={videoRef}
                src={src}
                className="object-contain w-full h-full"
                autoPlay
                loop
                muted={isMuted}
                playsInline
            />
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="p-4 bg-black/50 rounded-full">
                        <Play className="w-10 h-10 text-white fill-white" />
                    </div>
                </div>
            )}
            <div
                className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
                onClick={toggleMute}
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </div>
        </div>
    );
}


export default CustomVideoPlayer