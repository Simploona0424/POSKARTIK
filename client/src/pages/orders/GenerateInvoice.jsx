import React, { useRef } from 'react'
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import logo2 from "../../assets/images/para-logo 1 copy.png"
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
function GenerateInvoice() {
    const printRef = useRef(null);

    const handleDownloadPDF = async () => {
        if (!printRef.current) return;

        try {
            const style = document.createElement("style");
            document.head.appendChild(style);

            const canvas = await html2canvas(printRef.current, {
                scale: 4,
                useCORS: true,
                backgroundColor: "#ffffff",
                onclone: (documentClone) => {
                    const clonedElement = documentClone.getElementById("printRefId");
                    if (clonedElement) {
                        clonedElement.style.fontFamily = "Arial, sans-serif";
                        clonedElement.style.color = "black";
                        clonedElement.style.border = "1px solid #000";
                    }
                },
            });

            const dataURL = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(dataURL, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("Invoice.pdf");
            document.head.removeChild(style);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 flex flex-col bg-[#F3F7F9]">
                <Header name="Generate Invoice" />
                <section className="flex-1 m-5 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
                    <div className='flex justify-end'>
                        <button onClick={handleDownloadPDF} className=' cursor-pointer bg-[#0A6637] text-white hover:shadow px-4 py-2 max-xl:px-3 max-xl:py-[0.38rem] text-base max-xl:text-sm rounded-lg   flex gap-3 items-center'>
                            <i class="fa-solid fa-print "></i>Print Invoice
                        </button>
                    </div>

                    <div className='flex justify-center  m-a mt-10'>
                        <div ref={printRef} id="printRefId" className='w-[595px] h-[842px] border-2 border-[#D8D8D8] p-2'>
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
                    </div>
                </section>
            </main>
        </div>
    )
}

export default GenerateInvoice