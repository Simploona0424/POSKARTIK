import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import frame1 from "../assets/images/Frame 739.png"
import frame2 from "../assets/images/dash2.png"
import frame3 from "../assets/images/dash3.png"
import frame4 from "../assets/images/dash4.png"
import frame5 from "../assets/images/dash5.png"
import rectangle1 from "../assets/images/Rectangle 1.png"
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, registerables, Tooltip } from 'chart.js';
import Calendar from '../components/Calendar';
import axios from "axios"
import { format, subDays } from 'date-fns';


function Dashboard() {
  Chart.register(...registerables, ArcElement, Tooltip)
  const [selectedDate, setSelectedDate] = useState(null);
  const date = format(selectedDate, 'dd/MM/yyyy')
  const CurrDate = new Date()
  const currDate = format(CurrDate, 'dd/MM/yyyy')
  const yesterdateDate = format(subDays(CurrDate, 1), 'dd/MM/yyyy')
  const [customerData, setCustomerData] = useState([])
  const [selectLocation, setSelectLocation] = useState([])
  const [Location, setLocation] = useState("")
  const [activeTable, setActiveTable] = useState("All");


  const fetchNewLocation = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getlocation");
      setSelectLocation(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNewLocation();  
  }, []);

  const CustomerOrderData = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getsavedCustomer");
      setCustomerData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    CustomerOrderData()
  }, [])

  const totalRevenue = customerData.filter((customer) => { const matchlocation = Location === "" || customer.customerLocation === Location; const matchdate = selectedDate === null || customer.currentDate === date; return matchlocation && matchdate }).flatMap((customer) => customer.ordersetList).reduce((total, item) => {
    const price = Number(item.sellingPrice);
    const count = Number(item.count);
    return total + price * count;
  }, 0)

  const dineInRevenue = customerData.filter(customer => {
    const matchesDate = !selectedDate || customer.currentDate === date;
    const matchesLocation = !Location || customer.customerLocation === Location;
    return matchesDate && matchesLocation && customer.orderType === "Dine in";
  })
    .flatMap(customer => customer.ordersetList || [])
    .reduce((total, order) => {
      const price = Number(order.sellingPrice || 0);
      const count = Number(order.count || 0);
      return total + price * count;
    },
      0);


  const dineInOrder = customerData.filter(customer => {
    const matchesDate = selectedDate === null || customer.currentDate === date;
    const matchesLocation = Location === "" || customer.customerLocation === Location;
    return matchesDate && matchesLocation && customer.orderType === "Dine in";
  }).length


  const takeAwayRevenue = customerData
    .filter(customer => {
      const matchesDate = !selectedDate || customer.currentDate === date;
      const matchesLocation = !Location || customer.customerLocation === Location;
      return matchesDate && matchesLocation && customer.orderType === "Take Away";
    })
    .flatMap(customer => customer.ordersetList || [])
    .reduce((total, order) => {
      const price = Number(order.sellingPrice || 0);
      const count = Number(order.count || 0);
      return total + price * count;
    },
      0);

  const takeawayOrder = customerData.filter(customer => {
    const matchesDate = selectedDate === null || customer.currentDate === date;
    const matchesLocation = Location === "" || customer.customerLocation === Location;
    return matchesDate && matchesLocation && customer.orderType === "Take Away";
  }).length




  const filteredCustomer = customerData.filter(
    customer => Location === "" || customer.customerLocation === Location
  );

  const allOrder = filteredCustomer.flatMap(customer => customer.ordersetList || []);

  let dineInCount = 0;
  let takeAwayCount = 0;

  customerData.forEach(order => {
    if (order.orderType === "Dine in") dineInCount += 1;
    else if (order.orderType === "Take Away") takeAwayCount += 1;
  });

  const totalOrder = dineInCount + takeAwayCount;

  const dineinPercentage = totalOrder ? ((dineInCount / totalOrder) * 100).toFixed() : 0;
  const takeAwayPercentage = totalOrder ? ((takeAwayCount / totalOrder) * 100).toFixed() : 0;

  const doughnutdata = {
    labels: [
      `${dineinPercentage} % Dine in`,
      `${takeAwayPercentage} % Take Away`
    ],
    datasets: [{
      label: 'Order Type Distribution',
      data: [dineInCount, takeAwayCount],
      backgroundColor: [
        'RGB(59, 133, 95)',
        'RGB(255, 202, 107)'
      ],
      hoverOffset: 2,
      cutout: '60%',
    }]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  const filterTodayOrder = customerData.filter((customer) => {
    const matchlocation = Location === "" || customer.customerLocation === Location;
    const matchdate = selectedDate === null || customer.currentDate === date;
    return matchlocation && matchdate
  }).length


  const TodayOrder = customerData.filter((customer) => customer.currentDate === currDate).length

  const YesterDayOrder = customerData.filter((customer) => {
    const matchdate = customer.currentDate === yesterdateDate;
    return matchdate
  }).length

  let percentageChange = 0;
  if (YesterDayOrder > 0) {
    percentageChange = ((YesterDayOrder - TodayOrder) / YesterDayOrder) * 100
  }

  const changeTotalOrder = YesterDayOrder === 0
    ? "No orders yesterday"
    : percentageChange < 0
      ? `${Math.abs(percentageChange).toFixed(1)}% more than yesterday`
      : percentageChange > 0
        ? `${Math.abs(percentageChange).toFixed(1)}% less than yesterday`
        : "Same as yesterday";

  const todayRevenue = customerData.filter((customer) => customer.currentDate === currDate).flatMap((customer) => customer.ordersetList).reduce((total, item) => {
    const price = Number(item.sellingPrice);
    const count = Number(item.count);
    return total + price * count;
  }, 0)


  const yesterdayRevenue = customerData.filter((customer) => customer.currentDate === yesterdateDate).flatMap((customer) => customer.ordersetList).reduce((total, item) => {
    const price = Number(item.sellingPrice);
    const count = Number(item.count);
    return total + price * count;
  }, 0)

  let percentagechange = 0;
  if (yesterdayRevenue > 0) {
    percentagechange = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
  }

  const changeRevenue = yesterdayRevenue === 0
    ? "No Revanue yesterday"
    : percentagechange > 0
      ? `${Math.abs(percentagechange).toFixed(1)}% more than yesterday`
      : percentagechange < 0
        ? `${Math.abs(percentagechange).toFixed(1)}% less than yesterday`
        : "Same as yesterday";

  const filterResult = customerData.filter((customer) => {
  
  const matchTable =
    activeTable === "All" ||
    customer.orderType === activeTable;

  return matchTable;
})


  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-[#F3F7F9]">
        <Header name="Dashboard" />
        <section className="flex-1 m-5  bg-white border-2 border-gray-200 rounded-b-xl p-8 pt-2 mt-0">

          <div className='text-end '>
            <label className="font-medium text-[#202020] text-sm max-xl:text-xs">
              Location :{" "}
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border w-[200px] px-3 py-[0.25rem] focus-within:ring-[#0A6637] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
              id="SelectLocation"
            >
              <option value="">--Select Location --</option>
              {Array.isArray(selectLocation) && selectLocation.map((loc, index) => (
                <option key={index} value={loc.city}>{loc.city}</option>
              ))}
            </select>
          </div>


          <div className='grid grid-cols-4 mt-4'>
            <div className='col-span-3 overflow-y-auto h-[600px] table-scroll-wrapper custom-scrollbar'>
              <div className='flex overflow-x-auto table-scroll-wrapper gap-6 flex-nowrap custom-scrollbar'>
                <div className='w-[230px] p-4 border border-[#D8D8D8] rounded-2xl flex-none shrink-0 group'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-sm whitespace-nowrap'>Total Order</h2>
                    <img src={frame1} alt="" />
                  </div>
                  <h1 className='text-3xl font-semibold heading'>{filterTodayOrder}</h1>
                  <p className={`text-[#0FA814] text-xs whitespace-nowrap ${percentageChange <= 0 ? "text-green-600" : "text-red-600"}`}>{changeTotalOrder}</p>
                </div>
                <div className='w-[230px]  p-4 border border-[#D8D8D8] rounded-2xl flex-none shrink-0 group'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-sm whitespace-nowrap'>Pending Order</h2>
                    <img src={frame2} alt="" />
                  </div>
                  <h1 className='text-3xl font-semibold heading'>5</h1>
                  <p className='text-[#0FA814] text-xs whitespace-nowrap'>30% less then yesterday</p>
                </div>
                <div className=' w-[230px] p-4 border border-[#D8D8D8] rounded-2xl flex-none shrink-0 group'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-sm whitespace-nowrap'>Cancelled Order</h2>
                    <img src={frame3} alt="" />
                  </div>
                  <h1 className='text-3xl font-semibold heading'>5</h1>
                  <p className='text-[#0FA814] text-xs whitespace-nowrap'>30% less then yesterday</p>
                </div>
                <div className='w-[230px] p-4 border border-[#D8D8D8] rounded-2xl flex-none shrink-0 group'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-sm whitespace-nowrap'>Total Revenue</h2>
                    <img src={frame4} alt="" />
                  </div>
                  <h1 className='text-3xl font-semibold heading'>{totalRevenue}</h1>
                  <p className={`text-[#0FA814] text-xs whitespace-nowrap ${percentagechange > 0 ? "text-green-600" : "text-red-600"}`}>{changeRevenue}</p>
                </div>
                <div className='w-[230px] p-4 border border-[#D8D8D8] rounded-2xl flex-none shrink-0 group'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-sm whitespace-nowrap'>Total Product</h2>
                    <img src={frame5} alt="" />
                  </div>
                  <h1 className='text-3xl font-semibold heading'>360</h1>
                  <p className='text-[#0FA814] text-xs whitespace-nowrap'>30% less then yesterday</p>
                </div>
              </div>

              <div className='my-6'>
                <div className='grid grid-cols-4 gap-4'>
                  <div className='col-span-1 border border-[#D8D8D8] p-4 rounded-2xl'>
                    <h2 className='text-sm'>Revenue in</h2>
                    <div className="w-full h-[100px] flex flex-col items-center">
                      <Doughnut data={doughnutdata} options={options} height={100} />
                      <div className=" flex space-x-2">
                        {doughnutdata.labels.map((label, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span
                              className="w-3 h-[10px] rounded-full"
                              style={{ backgroundColor: doughnutdata.datasets[0].backgroundColor[index] }}
                            ></span>
                            <span className="text-gray-700 text-xs">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='col-span-3 border border-[#D8D8D8] p-4 rounded-2xl'>
                    <h2 className='text-sm'>All Revenue</h2>

                    <div className='text-xs py-6 grid grid-cols-3 '>
                      <div className='leading-5 border-r-2 pr-6 border-[#D8D8D8]'>
                        <p>Estimated Total Revenue</p>
                        <p className='text-lg font-semibold'>${totalRevenue}</p>
                        <p>{customerData.filter((customer) => { const matchlocation = Location === "" || customer.customerLocation === Location; const matchdate = selectedDate === null || customer.currentDate === date; return matchlocation && matchdate }).length} Orders</p>
                      </div>
                      <div className='leading-5 border-r-2 px-6 border-[#D8D8D8]'>
                        <p>Dine in</p>
                        <p className='text-lg font-semibold'>${dineInRevenue}</p>
                        <p>{dineInOrder} Orders</p>
                      </div>
                      <div className='leading-5 px-6'>
                        <p>Take Away</p>
                        <p className='text-lg font-semibold'>${takeAwayRevenue}</p>
                        <p>{takeawayOrder} Orders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='my-6'>
                <div className='flex overflow-x-auto table-scroll-wrapper gap-6 flex-nowrap custom-scrollbar'>
                  {customerData
                    .filter((customer) => {
                      const matchlocation = Location === "" || customer.customerLocation === Location;
                      const matchdate = selectedDate === null || customer.currentDate === date
                      return matchlocation && matchdate

                    }).map((data, index) => (
                      <div key={index} className='border w-[348px] rounded-2xl border-[#D8D8D8] flex-none shrink-0 group'>
                        <div className='flex justify-between items-center p-4 bg-[#E7F6E8] rounded-t-2xl'>
                          <div>
                            <h2 className='text-md font-medium'>{data.customerName}</h2>
                            <p className='text-sm'><i class="fa-solid fa-phone text-sm mr-1"></i>{data.phoneno}</p>
                          </div>
                          <p className='border border-[#D8D8D8] flex justify-center items-center rounded-full w-[35px] h-[35px] text-[#085988] font-semibold'>{data.ordersetList.length}</p>
                        </div>
                        <div className='p-4'>
                          <h2 className='text-sm font-medium'>{data.ordersetList.length} item in this Order</h2>
                          <div className='mt-4 flex flex-col h-[240px] gap-2 overflow-y-auto table-scroll-wrapper'>
                            {data.ordersetList.map((item, index) => (
                              <div key={index} className='border border-[#D8D8D8] rounded-lg p-2 flex gap-6 items-center'>
                                <img className='w-[86px] h-[56px] object-contain p-1' src={item.productImage} alt="" />
                                <div className='text-sm'>
                                  <p>{item.count} X {item.productName}</p>
                                  <p className='font-medium'>$ {item.sellingPrice}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* table */}
              <section className='border p-4 rounded-2xl border-[#D8D8D8]'>
                <div className='flex gap-3'>
                  <button onClick={() => setActiveTable("All")} className={`${activeTable === "All" ? "text-[#0A6637]" : "text-[#9A9A9A]"} cursor-pointer hover:text-[#0A6637]`}>All(10)</button>
                  <button onClick={() => setActiveTable("Dine in")} className={`${activeTable === "Dine in" ? "text-[#0A6637]" : "text-[#9A9A9A]"} cursor-pointer hover:text-[#0A6637] `}>Dine in</button>
                  <button onClick={() => setActiveTable("Take Away")} className={`${activeTable === "Take Away" ? "text-[#0A6637]" : "text-[#9A9A9A]"} cursor-pointer hover:text-[#0A6637]`}>Take Away</button>
                </div>

                <div className="overflow-x-auto mt-3">
                  <table className=" min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
                    <thead className="bg-[#F6F6F6] rounded-t-xl">
                      <tr>
                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl">
                          #
                        </th>
                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                          Date
                        </th>
                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                          Order No
                        </th>
                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                          Customer Name
                        </th>
                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                          Transection Id
                        </th>
                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                          Delivery Location
                        </th>
                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                          Employee ID
                        </th>
                        <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                          Table No
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerData
                        .filter((customer) => {
                          const matchlocation = Location === "" || customer.customerLocation === Location;
                          const matchdate = selectedDate === null || customer.currentDate === date;
                           const matchTable =activeTable === "All" || customer.orderType === activeTable;
                          return matchlocation && matchdate && matchTable
                        }).map((data, index) => (
                          <tr key={index}>
                            <td className='className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"'>
                              {index + 1}
                            </td>
                            <td className='className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"'>
                              {data.currentDate}
                            </td>
                            <td className='className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"'>
                              -
                            </td>
                            <td className='className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"'>
                              {data.customerName}
                            </td>
                            <td className='className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"'>
                              -
                            </td>
                            <td className='className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"'>
                              -
                            </td>
                            <td className='className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"'>
                              -
                            </td>
                            <td className='className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"'>
                              {data.customerID}
                            </td>
                          </tr>
                        ))}

                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div className='col-span-1 p-2'>
              <div className='mb-4'>
                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              </div>
              <div className='border border-[#D8D8D8] rounded-2xl p-2'>
                <h2 className='text-lg font-medium'>Best Seller</h2>
                <div className='mt-4 flex flex-col  gap-2 overflow-y-auto table-scroll-wrapper'>
                  <div className='border border-[#D8D8D8] rounded-lg p-2 flex gap-4 items-center'>
                    <img className='w-[75px]' src={rectangle1} alt="" />
                    <div className='text-sm'>
                      <p>Chicken Fingers</p>
                      <p className='font-medium text-[#3B855F]'>$ 7.50</p>
                    </div>
                  </div>
                  <div className='border border-[#D8D8D8] rounded-lg p-2 flex gap-4 items-center'>
                    <img className='w-[75px]' src={rectangle1} alt="" />
                    <div className='text-sm'>
                      <p>sweet Potato Fries</p>
                      <p className='font-medium text-[#3B855F]'>$ 7.50</p>
                    </div>
                  </div>
                  <div className='border border-[#D8D8D8] rounded-lg p-2 flex gap-4 items-center'>
                    <img className='w-[75px]' src={rectangle1} alt="" />
                    <div className='text-sm'>
                      <p>Mozzarella Stickes</p>
                      <p className='font-medium text-[#3B855F]'>$ 7.50</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
