import React from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaTelegram } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Socials() {

    return (
        <div className='relative z-99'>
            <div className='p-8 text-center text-xl '>
                <h1 className='p-4 text-txt text-4xl font-semibold'>Join our <br /><b>Community</b></h1>
                <p className='py-4 text-base'>Meet the Community, Artists and collectors for platform updates, announcements, and more...</p>
                <a href="https://t.me/+Kp3sYZ9sgXUzOWE1">
                    <button className='m-4 px-4 py-2 flex items-center mx-auto text-txt hover:bg-yellow-500 bg-yelloww rounded-full'><FaTelegram className='mx-2' />Launch Telegram</button>
                </a>
                <div>
                    <FaFacebookSquare className='absolute top-1/3 left-1/3 opacity-40 animate-bounce' />
                    <FaInstagramSquare className='absolute  top-1/3 right-1/4 opacity-40 animate-bounce' />
                    <FaTwitterSquare className='absolute  top-1/4 left-1/4 opacity-40 animate-bounce' />
                    <FaTelegram className='absolute  top-2/3 left-2/3 opacity-40 animate-bounce' />
                </div>
            </div>
        </div>
    )
}