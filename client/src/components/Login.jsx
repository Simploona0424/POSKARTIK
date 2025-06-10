import React, { useEffect, useState } from 'react'
import Logo from '../assets/images/logo-second.png';
import logo2 from "../assets/images/crispy-fried-chicken-.png"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [showMessage] = useState(false);
    const fetchUserData = async () => {
        try {
            const res = await axios.get("https://poskartik.onrender.com/api/getUser")
            setUserData(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = userData.find((user) => user.emailId === email && user.password === password);
        if (!user) {
            alert("Email or Password are Not Found")
        }
        try {
            await axios.post("http://localhost:3000/api/login", { email, password })
            localStorage.setItem("userName", user.userName);
            localStorage.setItem("jobrole", user.jobrole);
            localStorage.setItem("imageURL", user.userImage);
            localStorage.setItem("location", user.location);
            navigate("/dashboard")
            toast.success("Login Successful..")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
         <img className='m-2' src={Logo} alt="" />
       
        <div className="flex justify-between items-center px-20  min-h-screen bg-gray-100">
            <div className="w-[463px]">
                <h2 className="text-5xl heading font-semibold text-[#202020] ">
                    Welcome Back!
                </h2>
                <p className='text-[#6E6E6E] text-base'>
                    please enter your email and password to login
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 py-6">
                        <label
                            htmlFor="email"
                            className="block text-lg font-semibold text-[#202020] text-start"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-[0.35rem]  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0A6637] "
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6 relative">
                        <label
                            htmlFor="password"
                            className="block text-start  text-lg font-semibold text-[#202020]"
                        >
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className=" px-3 py-[0.40rem] text-sm mt-1 font-normal text-[#202020] w-full border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A6637] pr-10"
                            type={showPassword ? "text" : "password"}
                            placeholder="*********"
                            value={password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className={`absolute right-3 ${showMessage ? "top-[55%]" : "top-[75%]"
                                } transform -translate-y-1/2 text-[#A1A7C4] hover:text-[#0A6637]`}
                        >
                            <i
                                className={
                                    showPassword
                                        ? "fa-regular fa-eye-slash"
                                        : "fa-regular fa-eye"
                                }
                            ></i>
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#0A6637] text-white text-lg font-semibold py-2 rounded-lg cursor-pointer"
                    >
                       Login
                    </button>
                </form>
            </div>
            <img className='max-h-screen' src={logo2} alt="" />
        </div>
         </>
    )
}

export default Login