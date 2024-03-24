
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { IoMdPerson } from "react-icons/io";
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const navLinks = [
    {
        path: "#",
        display: "Home",
    },
    {
        path: "/service",
        display: "Services",
    },
    {
        path: "/doctors",
        display: "Find a Doctor",
    },
    {
        path: "/contact",
        display: "Contact",
    },
];

export default function Header() {

    const { data: session } = useSession()
    const router = useRouter()

    const gotoprofile = session?.user?._id

    const [nav, setNav] = useState(false);

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };


    return (
        <header className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
            <div className="container">
                <div className="flex items-center justify-between">
                    {/* =========== logo ========== */}
                    <div>
                        <img src="/images/logo.png" alt="logo" />
                    </div>
                    <div className="hidden md:flex">
                        <ul className="menu flex items-center gap-[2.7rem]">
                            {navLinks.map((x) => (
                                <li className="font-[600] text-[16px] leading-7"><Link style={{ color: "#48739C" }} href={x.path}>{x.display}</Link></li>
                            ))}

                            <li>
                                <div className="flex items-center gap-4">
                                    {session ? (<button className="bg-buttonBgColor py-2 px-6 rounded-[50px] text-black font-[600] h-[44px] flex items-center justify-center" onClick={() => { router.push(`profile/${gotoprofile}`) }} style={{ border: "1px solid black" }}> <IoMdPerson />
                                        {session.user.name}</button>) :
                                        (<Link href="/login">
                                            <button className="bg-buttonBgColor py-2 px-6 rounded-[50px] text-black font-[600] h-[44px] flex items-center justify-center">
                                                Log In
                                            </button>
                                        </Link>)}

                                </div>
                            </li>
                            <li>
                                <button className="bg-buttonBgColor py-2 px-6 rounded-[50px] text-black font-[600] h-[44px] flex items-center justify-center" onClick={signOut} style={{ border: "1px solid black", marginLeft: "10px" }} >Sign Out</button>
                            </li>
                        </ul>
                    </div>


                </div>

                {/* Mobile Navigation Icon */}
                <div onClick={handleNav} className='block md:hidden'>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>

                {/* Mobile Navigation Menu */}
                <ul
                    className={
                        nav
                            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-200 bg-[#48739C] ease-in-out duration-500'
                            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                    }
                >
                    {/* Mobile Logo */}
                    <h1 className='w-full text-3xl font-bold m-4'><img src="/images/logo.png" alt="logo" /></h1>

                    {/* Mobile Navigation Items */}
                    {navLinks.map(item => (
                        <li
                            key={item.id}
                            className='p-4 border-b rounded-xl hover:bg-[#8FACC8] duration-300 hover:text-black cursor-pointer border-gray-600'
                        >
                            <Link href={item.path}>{item.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}
