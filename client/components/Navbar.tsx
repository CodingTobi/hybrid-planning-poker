"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FcExpand } from 'react-icons/fc';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-4 inset-x-0 mx-auto w-fit z-50 bg-slate-500/30 backdrop-blur-lg py-2 px-4 rounded-md md:rounded-full transition duration-500 ease-in-out">
            <div className="flex flex-col justify-between items-center">
                <div className="text-xl font-bold">MySite</div>
                <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <FcExpand className={`transition ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>
            <div className={`mt-2 transition ${isOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="space-y-2 md:flex md:gap-6 md:items-center">
                    <li>
                        <Link href="/" className="text-gray-700 hover:text-blue-600">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/test" className="text-gray-700 hover:text-blue-600">
                            Test2
                        </Link>
                    </li>
                    <li>
                        <Link href="/test" className="text-gray-700 hover:text-blue-600">
                            Test3
                        </Link>
                    </li>
                    <li>
                        <Link href="/test" className="text-gray-700 hover:text-blue-600">
                            Test4
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;