import React, { useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import logo2 from "../../assets/images/para-logo 1 copy.png"
import { jsPDF } from "jspdf";

function ViewOrder() {
    const [expendTableRow, setExpendTableRow] = useState(false)
    const [invoicePopup, setInvoicePopup] = useState(false)
    const handleExpendRow = () => {
        setExpendTableRow((prev) => !prev)
    }

    const printRef = useRef(null);
    const handleGenerateInvoice = () => {
        setInvoicePopup((prev) => !prev)
    }
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
        <div className='flex h-screen'>
            <Sidebar />
            <main className="flex-1 flex w-full min-w-0 flex-col bg-[#F3F7F9]">
                <Header name="orders" />
                <section className='m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-base max-xl:text-sm text-[#505050]'>orders / <span className='text-[#0A6637]'>View</span></h2>

                        <button
                            onClick={handleGenerateInvoice}
                            className='border cursor-pointer hover:shadow px-4 py-2 max-xl:px-3 max-xl:py-[0.38rem] text-base max-xl:text-sm rounded-lg border-[#D8D8D8] text-[#505050] flex gap-3 items-center'>
                            Generate Invoice
                        </button>

                    </div>
                    {invoicePopup && (
                        <section onClick={closePopup} className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50 bg-[#2424242a]'>
                            <button onClick={handleDownloadPDF} className='mb-1 cursor-pointer bg-[#0A6637] text-white hover:shadow px-4 mt-1 py-2 max-xl:px-3 max-xl:py-[0.38rem] text-base max-xl:text-sm rounded-lg   flex gap-3 items-center'>
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
                    {/* section-1 */}
                    <div>
                        <section className='mt-3 border border-[#D8D8D8] rounded-xl p-3 flex flex-col gap-3 '>
                            <div className='text-base max-xl:text-sm font-medium flex justify-between text-[#202020]'>
                                <div>
                                    <p>Order No : <span className='font-semibold'>SG2025032101</span></p>
                                    <p>21st, March 2025 At 1:49 pm</p>
                                </div>
                                <div>
                                    <p>Order Status : <span>Pending</span></p>
                                    <p>Payment Status :<span>Partial</span></p>
                                </div>
                            </div>

                            <section className='grid grid-cols-3 max-2xl:grid-cols-2 gap-3'>
                                <div className='orverviewbox2 p-3 rounded-lg bg-[#F6F6F6] text-[#202020]'>
                                    <h2 className='text-base max-xl:text-sm font-medium border-b-2 pb-2 border-[#D8D8D8] text-[#202020]'>Order Summary</h2>
                                    <div className='mt-3 flex flex-col gap-3 p-2'>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>Customer Name</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: Amit Mazumder</p>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>Razorpay Order Id</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: order_Q9N8Ka78iIo6nc</p>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>Payment Method</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: Razorpay</p>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>Payment Mode</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: Online</p>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>International</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: False</p>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>Invoice No.</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: 00380</p>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>Partial Amount</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: ₹3459.9</p>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>Currency</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: INR</p>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-sm max-xl:text-xs font-medium'>Payment Id</p>
                                            <p className='text-sm max-xl:text-xs font-light'>: pay_Q9NAdJL0yOFThf</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=' p-3 rounded-lg bg-[#F6F6F6] col-span-2 max-2xl:col-span-1'>
                                    <h2 className='text-base max-xl:text-sm font-medium border-b-2 pb-2 border-[#D8D8D8] text-[#202020]'>Customer Details</h2>
                                    <div className='mt-3 flex flex-col gap-5 p-2 text-[#202020]'>
                                        <div className='grid grid-cols-3'>
                                            <div>
                                                <p className='text-sm max-xl:text-xs font-medium'>Name :</p>
                                                <p className='text-sm max-xl:text-xs font-light'>Amit Mazumder</p>
                                            </div>
                                            <div>
                                                <p className='text-sm max-xl:text-xs font-medium'>State :</p>
                                                <p className='text-sm max-xl:text-xs font-light'>Assam</p>
                                            </div>
                                            <div>
                                                <p className='text-sm max-xl:text-xs font-medium'>Mobile Number :</p>
                                                <p className='text-sm max-xl:text-xs font-light'>7002855481</p>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <div>
                                                <p className='text-sm max-xl:text-xs font-medium'>City :</p>
                                                <p className='text-sm max-xl:text-xs font-light'>Ahmedabad</p>
                                            </div>
                                            <div>
                                                <p className='text-sm max-xl:text-xs font-medium'>Pincode :</p>
                                                <p className='text-sm max-xl:text-xs font-light'>382470</p>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-2'>
                                            <div>
                                                <p className='text-sm max-xl:text-xs font-medium'>Landmark :</p>
                                                <p className='text-sm max-xl:text-xs font-light'>Jagatpur</p>
                                            </div>
                                            <div>
                                                <p className='text-sm max-xl:text-xs font-medium'>Location :</p>
                                                <p className='text-sm max-xl:text-xs font-light'>View on Google Map</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <p className='text-sm max-xl:text-xs font-medium'>Address  :</p>
                                                <p className='text-sm max-xl:text-xs font-light'>Ganesh Glory 11, </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className=' p-3 rounded-lg bg-[#F6F6F6]'>
                                <h2 className='text-base max-xl:text-sm font-medium border-b-2 pb-2 border-[#D8D8D8]'>Payment Info</h2>
                                <div className='mt-3 flex flex-col gap-3 p-2'>
                                    <div className='grid grid-cols-2'>
                                        <p className='text-sm max-xl:text-xs font-medium'>Customer Name</p>
                                        <p className='text-sm max-xl:text-xs font-light'>: Amit Mazumder</p>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <p className='text-sm max-xl:text-xs font-medium'>Razorpay Order Id</p>
                                        <p className='text-sm max-xl:text-xs font-light'>: order_Q9N8Ka78iIo6nc</p>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <p className='text-sm max-xl:text-xs font-medium'>Payment Method</p>
                                        <p className='text-sm font-light'>: Razorpay</p>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <p className='text-sm max-xl:text-xs font-medium'>Payment Mode</p>
                                        <p className='text-sm max-xl:text-xs font-light'>: Online</p>
                                    </div>
                                </div>
                            </div>

                            <div className=' p-3 rounded-lg bg-[#F6F6F6]'>
                                <h2 className='text-base max-xl:text-sm font-medium  pb-2 border-[#D8D8D8]'>Payment Transactions</h2>

                                <div className='overflow-x-auto mt-3'>
                                    <table className='min-w-[100%] table-auto border-separate border-spacing-0 shadow-sm rounded-t-xl'>
                                        <thead className='bg-[#9A9A9A] rounded-t-xl'>
                                            <tr>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300 rounded-tl-xl'>

                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300 '>
                                                    #
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Date
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Razorpay Payment Id
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Amount
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Payment Mode
                                                </th>
                                                <th className="px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                                                    Order Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white'>
                                            <tr>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    <i onClick={handleExpendRow} className={`fa-solid fa-chevron-right cursor-pointer ${expendTableRow ? "rotate-90" : ""}`}></i>
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    1
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    21st, Mar 2025
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    pay_Q9NAdJL0yOFThf
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    ₹3459.90
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    Online
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    Pending
                                                </td>
                                            </tr>
                                            {expendTableRow && (
                                                <>
                                                    <tr>
                                                        <td colSpan="10" className="p-4 ">
                                                            <div className='border rounded-lg bg-[#F6F6F6] border-[#D8D8D8] p-3'>
                                                                <h2 className='text-sm max-xl:text-xs font-medium border-b-2 pb-2  border-[#dddddd]'>Order Summary</h2>
                                                                <div className='flex items-center gap-10 mt-2'>
                                                                    <p className='text-sm max-xl:text-xs font-light'>VPA</p>
                                                                    <p className='text-sm max-xl:text-xs font-light'>: subhankarsahaofficial8638@oksbi</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className=' p-3 rounded-lg bg-[#F6F6F6]'>
                                <h2 className='text-base max-xl:text-sm font-medium  pb-2 border-[#D8D8D8]'>Product Details</h2>
                                <div className='overflow-x-auto mt-3'>
                                    <table className='min-w-[100%] table-auto border-separate border-spacing-0 shadow-sm rounded-t-xl'>
                                        <thead className='bg-[#9A9A9A] rounded-t-xl'>
                                            <tr>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300 rounded-tl-xl'>
                                                    #
                                                </th>

                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Image
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Name
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    SKU ID
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Category
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Sub Category
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Brand
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Unit
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Qty
                                                </th>
                                                <th className='px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs font-medium text-start border-b border-gray-300'>
                                                    Amount
                                                </th>
                                                <th className="px-2 py-[0.40rem] whitespace-nowrap  text-white  text-sm max-xl:text-xs  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white'>
                                            <tr>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    1
                                                </td>

                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    image
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    Product Name
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    RAJKFAT24302
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    Category Name
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    Sub Category Name
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    Brand Name
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    Sets
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    1
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    ₹ 7839
                                                </td>
                                                <td className=" whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-light border-b text-start border-gray-300">
                                                    <button className='mr-2'>
                                                        <i className="fa-regular fa-pen-to-square text-[#9A9A9A]"></i>
                                                    </button>
                                                    <button>
                                                        <i className="fa-regular fa-trash-can text-[#9A9A9A] cursor-pointer"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <section className='mt-3  text-sm max-xl:text-xs flex justify-end '>
                                    <div>
                                        <div className='grid grid-cols-2 gap-10'>
                                            <p className='text-end'>Basic Amount</p>
                                            <p>: ₹ 30593.00</p>
                                        </div>
                                        <div className='grid grid-cols-2 gap-10 mt-2'>
                                            <p className='text-end'>Discount Value</p>
                                            <p>: ₹ 0.00</p>
                                        </div>
                                        <div className='grid grid-cols-2 gap-10 mt-2 pb-2 border-b border-[#D8D8D8]'>
                                            <p className='text-end'>GST</p>
                                            <p>: ₹ 3707.04</p>
                                        </div>
                                        <div className='grid grid-cols-2 gap-10 mt-2'>
                                            <p className='text-end'>Total</p>
                                            <p>: ₹ 34599.04</p>
                                        </div>
                                    </div>

                                </section>
                            </div>
                        </section>
                    </div>

                </section>
            </main>
        </div>
    )
}

export default ViewOrder