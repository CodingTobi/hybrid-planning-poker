"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FcExpand } from 'react-icons/fc';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="nav1 fixed top-4 inset-x-0 mx-auto w-fit z-50 bg-slate-500/30 
                        backdrop-blur-lg py-2 px-4 rounded-md md:rounded-full transition 
                        duration-500 ease-in-out"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex flex-col justify-between items-center">
                <div className="text-xl font-bold">
                    <Link className="hidden md:block" href="/">
                        Hybrid Planning Poker
                    </Link>
                    <Link className="md:hidden" href="/">
                        HPP
                    </Link>
                </div>
                <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <FcExpand className={`transition ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>
            <div className={`mt-2 transition ${isOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="space-y-2 md:flex md:px-2 md:gap-6 md:items-center">
                    <li>
                        <Link href="/" className="text-black hover:bg-gray-500 rounded-md p-1">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className="text-black hover:bg-gray-500 rounded-md p-1">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link href="/new" className="text-black hover:bg-gray-500 rounded-md p-1">
                            Neuer Raum
                        </Link>
                    </li>
                    <li>
                        <Link href="/table" className="text-black hover:bg-gray-500 rounded-md p-1">
                            Hauptseite
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/test" className="text-gray-700 hover:text-blue-600">
                            Test2
                        </Link>
                    </li> */}
                    {/* <li>
                        <Link href="/placeCard?id=card_0" className="text-gray-700 hover:text-blue-600">
                            Place Card
                        </Link>
                    </li> */}
                    {/* <li>
                        <Link href="/testReg" className="text-gray-700 hover:text-blue-600">
                            test register
                        </Link>
                    </li> */
              
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;