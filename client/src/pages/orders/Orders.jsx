import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo2 from "../../assets/images/para-logo 1 copy.png"
import { jsPDF } from "jspdf";

function Orders() {
  const navigate = useNavigate()
  const [openFilter, setOpenFilter] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [invoicePopup, setInvoicePopup] = useState(false)

  const fetchOrderData = async () => {
    const res = await axios.get("http://localhost:3000/api/getorder");
    setOrderData(res.data)
  }

  useEffect(() => {
    fetchOrderData()
  }, [])
  const AddNewOrder = () => {
    navigate("/orders/addneworder")
  }
  const handleFiltersection = () => {
    setOpenFilter((prev) => !prev)
  }

  const handleview = () => {
    navigate("/orders/vieworder")
  }

  const handlePrint = () => {
    setInvoicePopup((prev) => !prev)
  }
  const printRef = useRef(null);
    const handleDownloadPDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.html(printRef.current, {
            callback: (pdf) => {
                pdf.save("Invoice.pdf");
            },
            margin: [10, 10, 10, 10],
            autoPaging: 'text',
            x: 0,
            y: 0,
            width: 595,
            windowWidth: 800
        });
    };
  const closePopup = () => {
    setInvoicePopup(false);
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#F3F7F9]">
        <Header name="Orders" />
        <section className='m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0'>
          <div className='text-base max-xl:text-sm font-medium flex items-center gap-3 justify-end'>
            <button onClick={AddNewOrder} className='px-4  max-2xl:px-3 max-2xl:py-1 cursor-pointer py-2 bg-[#0A6637] rounded-lg text-white flex items-center gap-3'><i className="fa-solid fa-circle-plus"></i>Add New</button>
            <button onClick={handleFiltersection} className='px-4 transition-colors duration-300 hover:bg-[#0A6637] hover:text-white py-2 max-2xl:px-3 max-2xl:py-1  text-[#0A6637] cursor-pointer rounded-lg border flex items-center gap-3'><i class="fa-solid fa-filter"></i>Filter</button>

            <button className='px-4 py-2 text-[#0A6637] cursor-pointer transition-colors duration-300 hover:bg-[#0A6637] hover:text-white  max-2xl:px-3 max-2xl:py-1 rounded-lg border flex items-center gap-3'><i className="fa-solid fa-arrow-up-from-bracket"></i> Export</button>

          </div>
          {openFilter &&
            <div className='border mt-3 border-[#D8D8D8] rounded-xl p-3'>
              <div className='flex justify-between'>
                <h2 className='text-xl font-medium text-[#202020]'>Filter</h2>
                <i onClick={() => setOpenFilter(false)} class="fa-solid fa-xmark cursor-pointer"></i>
              </div>

              <form action="" >
                <section className='bg-[#F6F6F6] p-3 mt-3 rounded-lg grid grid-cols-3 gap-3'>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Order No.
                    </label>
                    <input
                      className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      type="text"
                      name="OrderNo"
                      placeholder="Enter Order No."
                    // value={city}
                    // onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Select Customer
                    </label>
                    <select
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="SelectCustomer"
                    >
                      <option value="">--Select Customer --</option>
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                      <option value="government">Government</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Date
                    </label>
                    <input
                      className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      type="date"
                      name="Date"
                      placeholder="Enter Date"
                    // value={city}
                    // onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      State
                    </label>
                    <select
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="State"
                    >
                      <option value="">-- Select State--</option>
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                      <option value="government">Government</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      City
                    </label>
                    <input
                      className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      type="text"
                      name="City"
                      placeholder="Enter City"
                    // value={city}
                    // onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Payment Status
                    </label>
                    <select
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="PaymentStatus"
                    >
                      <option value="">-- Select Payment Status--</option>
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                      <option value="government">Government</option>
                    </select>
                  </div>
                </section>

                <div className='flex justify-end items-center gap-3 mt-3'>
                  <button className='px-4 py-1 max-2xl:px-3 max-2xl:py-1  text-base max-xl:text-sm font-medium text-[#505050] border cursor-pointer rounded-lg'>Clear All</button>
                  <button className='px-4 py-1 max-2xl:px-3 max-2xl:py-1 bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg'>Apply</button>
                </div>
              </form>
            </div>
          }
          <section className='overflow-x-auto table-scroll-wrapper mt-3'>
            <table className=' min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm '>
              <thead className='bg-[#F6F6F6] rounded-t-xl'>
                <tr>
                  <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl'>
                    #
                  </th>
                  <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Date
                  </th>
                  <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Order No.
                  </th>
                  <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Business Name
                  </th>
                  <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Transaction ID
                  </th>
                  <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Delivery Location
                  </th>
                  <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Employee ID
                  </th>
                  <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Qty.
                  </th>
                  <th className='px-6 py-[0.40rem] w-18 whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Total Amount
                  </th>
                  <th className='px-6 py-[0.40rem] w-30 whitespace-nowrap  text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Payment Mode
                  </th>
                  <th className='px-6 py-[0.40rem] w-30 whitespace-nowrap  text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Payment Status
                  </th>
                  <th className='px-6 py-[0.40rem] w-30 whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                    Order Status
                  </th>
                  <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    1
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    Simploona
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    OR1230
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    Simploona Technosoft LLp
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    pay_Q9NAdJL0yOFThf
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    Mumbai
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    SAI019
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    3
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    $ 3497
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    Online
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    Paid
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                    Pending
                  </td>
                  <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 flex gap-3">
                    <button onClick={handleview}>
                      <i class="fa-solid fa-eye text-[#9A9A9A] cursor-pointer"></i>
                    </button>
                    <button onClick={handlePrint}>
                      <i class="fa-solid fa-print text-[#9A9A9A] cursor-pointer"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </main>
      {invoicePopup && (
        <section onClick={closePopup} className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50 bg-[#2424242a]'>
          <button onClick={handleDownloadPDF} className='mb-1 cursor-pointer bg-[#0A6637] mt-1 text-white hover:shadow px-4 py-2 max-xl:px-3 max-xl:py-[0.38rem] text-base max-xl:text-sm rounded-lg   flex gap-3 items-center'>
            <i class="fa-solid fa-print "></i>Print Invoice
          </button>
          <div ref={printRef} id="printRefId" className=' shadow-lg bg-white  w-[775px] h-full text-xs flex flex-col border-[#D8D8D8] p-6 '>
            <div className='flex justify-center my-3'>
              <img className='w-[174px] m-auto ' src={logo2} />
            </div>
            <hr />
            <h1 className='text-center  my-3 border-[#D8D8D8]  text-[#0A6637] font-medium text-lg'>Order</h1>
            <div className='flex justify-between'>
              <div>
                <div className='flex'>
                  <p className='border border-[#D8D8D8] border-b-0 border-r-0 w-[96px] h-[25px] flex items-center px-[10px] bg-[#085988] text-white font-semibold text-[8px]'>Invoice Id</p>
                  <p className='border border-[#D8D8D8] border-b-0 w-[96px] h-[25px] flex items-center px-[10px] text-[8px]'>#123654d</p>
                </div>
                <div className='flex'>
                  <p className='border border-[#D8D8D8] border-b-0 border-r-0 w-[96px] h-[25px] flex items-center px-[10px]  bg-[#085988] text-white font-semibold text-[8px]'>Order Date</p>
                  <p className='border border-[#D8D8D8] border-b-0 w-[96px] h-[25px] flex items-center px-[10px]  text-[8px]'>2025-02-12</p>
                </div>
                <div className='flex'>
                  <p className='border border-[#D8D8D8] border-b-0 border-r-0 w-[96px] h-[25px] flex items-center px-[10px]  bg-[#085988] text-white font-semibold text-[8px]'>Order Number</p>
                  <p className='border border-[#D8D8D8] border-b-0 w-[96px] h-[25px] flex items-center px-[10px]  text-[8px]'>SA060801</p>
                </div>
                <div className='flex'>
                  <p className='border border-[#D8D8D8] border-r-0 w-[96px] h-[25px] flex items-center px-[10px]  bg-[#085988] text-white font-semibold text-[8px]'>Delivery Date</p>
                  <p className='border border-[#D8D8D8] w-[96px] h-[25px] flex items-center px-[10px]  text-[8px]'>2025-02-21</p>
                </div>
              </div>
              <div className='flex gap-5'>
                <div className='text-[8px] leading-3'>
                  <p className='font-semibold '>Bill From:</p>
                  <p className='uppercase whitespace-nowrap '>Paragraph coworking,</p>
                  <p className=''>B wing Mondeal Hights,</p>
                  <p>Ahmedabad, Gujarat - 382415</p>
                  <p className='uppercase whitespace-nowrap'>GSTIN: 24AAFFR0354K1ZA</p>
                </div>
                <div className='text-[8px] leading-3'>
                  <p className='font-semibold'>Ship To:</p>
                  <p className='uppercase whitespace-nowrap'>Paragraph coworking,</p>
                  <p>B wing Mondeal Hights,</p>
                  <p>Ahmedabad, Gujarat - 382415</p>
                  <p className='uppercase whitespace-nowrap'>GSTIN: 24AAFFR0354K1ZA</p>
                </div>
              </div>
            </div>

            <section className='mt-10'>
              <table className="min-w-[100%] table-auto border-[#D8D8D8]  border border-separate border-spacing-0">
                <thead className="bg-[#085988] text-[8px] font-medium">
                  <tr>
                    <th className="px-1 w-15 py-2 text-white border-r  text-center border-b border-gray-300 ">
                      Sr No.
                    </th>
                    <th className="px-1 py-2 text-white text-center border-r  border-b border-gray-300">
                      Name
                    </th>
                    <th className="px-1 py-2 text-white  text-center border-r border-b border-gray-300">
                      Category
                    </th>
                    <th className="px-1 py-2 text-white  text-center border-r border-b border-gray-300">
                      Sub Category
                    </th>
                    <th className="px-1 py-2 text-white  text-center border-r border-b border-gray-300">
                      Brand
                    </th>
                    <th className="px-1 py-2 text-white  text-center border-r border-b border-gray-300">
                      Unit
                    </th>
                    <th className="px-1 py-2 text-white  text-center border-r border-b border-gray-300">
                      Qty
                    </th>
                    <th className="px-1 py-2 text-white  text-center border-b border-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[8px] font-normal">
                  <tr className="">
                    <td className="py-1 w-15 border-r  text-[#5A607F] border-[#E4E7EC] text-center">
                      1
                    </td>
                    <td className="py-1 leading-3  border-r text-[#5A607F] border-[#E4E7EC] text-center">
                      <p>Product Name</p>
                      <p>RAJKFAT24302</p>
                    </td>
                    <td className="py-1 border-r text-[#5A607F] border-[#E4E7EC] text-center">
                      Category Name
                    </td>
                    <td className="py-1 border-r  text-[#5A607F] border-[#E4E7EC] text-center">
                      Sub Category Name
                    </td>
                    <td className="py-1  border-r text-[#5A607F] border-[#E4E7EC] text-center">
                      Brand Name
                    </td>
                    <td className="py-1  border-r text-[#5A607F] border-[#E4E7EC] text-center">
                      Sets
                    </td>
                    <td className="py-1 border-r  text-[#5A607F] border-[#E4E7EC] text-center">
                      1
                    </td>
                    <td className="py-1  text-[#5A607F] border-[#E4E7EC] text-center">
                      ₹ 7839
                    </td>
                  </tr>
                </tbody>

                {/* <tbody className="text-[8px] font-normal">
                                              {selectedProposal.rows &&
                                                  selectedProposal.rows.length > 0 ? (
                                                  selectedProposal.rows.map((row, rowIndex) => (
                                                      <tr key={rowIndex} className="border-b">
                                                          <td className="py-1 w-15 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {rowIndex + 1}
                                                          </td>
                                                          <td className="py-1 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {row.SelectProducts}
                                                          </td>
                                                          <td className="py-1 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {row.Rate}
                                                          </td>
                                                          <td className="py-1 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {row.Quantity}
                                                          </td>
                                                          <td className="py-1 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {row.Rate * row.Quantity}
                                                          </td>
                                                          <td className="py-1 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {(row.CGST !== 0) ? row.CGST : 0}%
                                                          </td>
                                                          <td className="py-1 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {(row.SGST !== 0) ? row.SGST : 0}%
                                                          </td>
                                                          <td className="py-1 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {(row.CGST === 0) ? row.Tax : 0}%
                                                          </td>
                                                          <td className="py-1 border  text-[#5A607F] border-[#E4E7EC] text-center">
                                                              {row.Amount}
                                                          </td>
                                                      </tr>
                                                  ))
                                              ) : (
                                                  <tr>
                                                      <td
                                                          colSpan="6"
                                                          className="text-center text-sm text-[#5A607F] py-2"
                                                      >
                                                          No Order Aetails Available.
                                                      </td>
                                                  </tr>
                                              )}
                                          </tbody> */}
              </table>
            </section>
            <section className='mt-3'>
              <div className="flex justify-end space-y-4 text-[8px] mb-10">

                <div className="w-36 space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Basic Amount:</p>
                    <p className="font-normal">
                      ₹{" "}
                      30593.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Discount Value:</p>
                    <p className="font-normal">
                      ₹{" "}
                      0
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">GST:</p>
                    <p className="font-normal">
                      ₹{" "}
                      3707.04
                    </p>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">

                    <p className="font-bold">Total:</p>
                    <p className="font-bold">
                      ₹{" "}
                      34599.04
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className='mt-10 text-[8px]'>
              <div className='w-[50%] '>
                <hr />
                <p className='mt-2'>Authorized Signature</p>
                <p><span>DECLARATION :</span>We declare that the invoice shows the actual price of the goods described and that the particulars are true and correct. Is tax payable on reverse charge basis - NO</p>
              </div>
            </section>


          </div>
        </section>
      )}
    </div>
  );
}

export default Orders;