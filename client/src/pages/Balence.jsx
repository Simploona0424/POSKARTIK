import { useEffect, useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import axios from "axios"

function Balence() {
    const [selectLocation, setSelectLocation] = useState([])
    const [Location, setLocation] = useState("")
    const [balence, setBalence] = useState([])

    const mergedBalence = Object.values(
        balence.reduce((acc, curr) => {
            const date = curr.currentDate
            if (!acc[date]) {
                acc[date] = {
                    currentDate: date,
                    openingBalence: null,
                    clossingBalence: null,
                    userlocation: curr.userlocation || "",
                }
            }
            if (curr.balencetype === "Opening Balence") {
                acc[date].openingBalence = curr.sumtotal;
            } else if (curr.balencetype === "Clossing Balence") {
                acc[date].clossingBalence = curr.sumtotal;
            }
            return acc;
        }, {})
    )

    const fetchNewLocation = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/getlocation");
            setSelectLocation(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchNewLocation();
    }, []);

    const fetchBalence = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/getbalence");
            setBalence(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchBalence();
    }, []);

    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 flex flex-col bg-[#F3F7F9]">
                    <Header />
                    <section className="flex-1 m-5  bg-white border-2 border-gray-200 rounded-b-xl p-8 pt-2 mt-0">
                        <div className='text-base max-xl:text-sm font-medium flex items-center gap-3 justify-end'>
                            <div className='text-end '>
                                <select
                                    value={Location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="border w-[200px] px-3 py-2 focus-within:ring-[#0A6637] text-[#0A6637]  text-sm max-xl:text-xs font-normal border-[#0A6637] bg-white mt-1  rounded-md focus:outline-none focus:ring-1"
                                    id="SelectLocation"
                                >
                                    <option value="">--Select Location --</option>
                                    {Array.isArray(selectLocation) && selectLocation.map((loc, index) => (
                                        <option key={index} value={loc.city}>{loc.city}</option>
                                    ))}
                                </select>
                            </div>
                            <button className='px-4 py-2 text-[#0A6637] cursor-pointer transition-colors duration-300   max-2xl:px-3 max-2xl:py-1 rounded-lg border flex items-center gap-3'><input type="date" /></button>
                            <button className='px-4 py-2 text-[#0A6637] cursor-pointer transition-colors duration-300 hover:bg-[#0A6637] hover:text-white  max-2xl:px-3 max-2xl:py-1 rounded-lg border flex items-center gap-3'><i className="fa-solid fa-arrow-up-from-bracket"></i> Export</button>
                        </div>

                        <section className='overflow-x-auto table-scroll-wrapper mt-3'>
                            <table className=' min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm '>
                                <thead className='bg-[#F6F6F6] rounded-t-xl'>
                                    <tr>
                                        <th className='px-4 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl'>

                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 '>
                                            #
                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                                            Date
                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                                            Oprning Balence
                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                                            Clossing Balence
                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                                            Location
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {mergedBalence.map((item, index) => (
                                        <tr key={index}>
                                            <td className=' whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300'></td>
                                            <td className=' whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300'>{index + 1}</td>
                                            <td className=' whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300'>{item.currentDate}</td>
                                            <td className=' whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300'>{item.openingBalence ?? '-'}</td>
                                            <td className=' whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300'>{item.clossingBalence ?? '-'}</td>
                                            <td className=' whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300'>{item.userlocation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </section>
                </main>
            </div>
        </>
    )
}
export default Balence