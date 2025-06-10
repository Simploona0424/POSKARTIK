import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Header({ name, setInputValue }) {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false);
    const [userName, setUserName] = useState()
    const [photo, setPhoto] = useState(null)
    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        const storedimageURL = localStorage.getItem("imageURL");
        setPhoto(storedimageURL)
        setUserName(storedUserName);
    }, []);

    const handleToggle = () => {
        setToggle((prev) => !prev);
    };

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem("userName");
        localStorage.removeItem("imageURL");
    };

    return (
        <>
            <section className='flex justify-between items-center bg-white border-2  rounded-t-xl border-gray-200 m-5 px-8 py-3 mb-0 border-b-0'>
                <h1 className='text-2xl max-xl:text-xl heading text-[#0A6637] font-semibold'>{name}</h1>
                <div>
                    <input
                        type="text"
                        onChange={(event) => { setInputValue(event.target.value) }}
                        placeholder="Search..."
                        className="w-96 bg-[#F6F6F6] px-5 py-[0.35rem] border-1 border-gray-200 text-sm font-normal rounded-full  focus:outline-none  focus:ring-1"
                    />
                </div>

                <div className='flex items-center gap-3'>
                    <button className='border border-gray-300 rounded-full p-1'> <i className="fa-solid fa-bell text-amber-300 w-6"></i></button>
                    <div className="relative flex flex-col items-start">
                        <div
                            onClick={handleToggle}
                            className="flex items-center bg-white border border-gray-300 rounded-full px-2 py-1 cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <div className="text-sm max-xl:text-xs ">
                                <span className="font-normal flex justify-center gap-2 items-center text-[#505050] text-sm xl:text-base ">
                                    {photo && (
                                        <img
                                            src={photo}
                                            alt="User Profile"
                                            className="h-8 w-8 rounded-full object-cover border border-gray-300"
                                        />
                                    )}

                                    {userName}
                                    <i className="fa-solid fa-angle-down text-[#505050]"></i>
                                </span>

                            </div>
                        </div>
                        {toggle && (
                            <div
                                onClick={handleLogout}
                                className="absolute top-10 right-0 bg-white border border-gray-300 shadow-lg   rounded-lg py-1 px-4 z-10 cursor-pointer"
                            >
                                <div className="flex gap-2 items-center">
                                    <i class="fa-solid fa-user text-xs  xl:text-sm"></i>
                                    <span className=" text-gray-700 max-xl:text-xs text-sm font-medium">
                                        Profile
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center mt-2">
                                    <i class="fa-solid fa-arrow-right-from-bracket text-xs  xl:text-sm"></i>
                                    <span className=" text-gray-700 text-sm font-medium max-xl:text-xs  xl:text-sm">LogOut</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header