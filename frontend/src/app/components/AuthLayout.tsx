import React from 'react';
import illustration from '../../assets/illustration.png';

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#F4FBFF] flex w-full relative overflow-hidden font-sans">
            {/* Abstract Wave at Bottom Left */}
            <div className="absolute left-[-5%] bottom-[-5%] w-[400px] h-[400px] pointer-events-none opacity-80 z-0">
                <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,400 L0,200 C150,200 200,350 400,350 L400,400 Z"
                        fill="#B9D7F0"
                    />
                    <path
                        d="M0,400 L0,250 C120,250 180,380 350,380 L350,400 Z"
                        fill="#80BCEE"
                    />
                </svg>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
                <div className="w-full max-w-md bg-transparent">
                    {children}
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 p-4 relative z-10">
                <div className="w-full h-full relative rounded-[3rem] overflow-hidden ml-4">
                    <img
                        src={illustration}
                        alt="Real Estate Illustration"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#B9D8F2]/60 to-transparent pointer-events-none" />

                    {/* Logo overlay on image */}
                    <div className="absolute bottom-12 left-12 flex flex-col pointer-events-none">
                        <h1 className="text-6xl font-serif italic text-[#013557] tracking-wider" style={{ fontFamily: 'Georgia, serif', margin: 0 }}>
                            Tenant
                        </h1>
                        <p className="text-[#013557] text-xl font-light tracking-wide mt-1">Management System.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
