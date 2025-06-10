import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from "axios";
 
function JobRole() {
    const [openAddUserPopup, setOpenAddUserPopup] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [jobRole, setJobRole] = useState([]);
    const [editJobRole, setEditJobRole] = useState(null);
    const [access, setAccess] = useState({
        manageOrder: false,
        manageProduct: false,
        manageCustomer: false,
        manageProductBrand: false,
        manageCategories: false,
        manageSubCategories: false,
        manageInventory: false,
        manageLocation: false,
        manageVendors: false,
        manageUsers: false
    });

    const permissionFields = [
        { label: "Manage Order", field: "manageOrder" },
        { label: "Manage Product", field: "manageProduct" },
        { label: "Manage Customer", field: "manageCustomer" },
        { label: "Manage ProductBrand", field: "manageProductBrand" },
        { label: "Manage Categories", field: "manageCategories" },
        { label: "Manage SubCategories", field: "manageSubCategories" },
        { label: "Manage Inventory", field: "manageInventory" },
        { label: "Manage Location", field: "manageLocation" },
        { label: "Manage Vendors", field: "manageVendors" },
        { label: "Manage Users", field: "manageUsers" }
    ];

    const fetchJobRole = async () => {
        try {
            const res = await axios.get("https://poskartik.onrender.com/api/getRole");
            setJobRole(res.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    useEffect(() => {
        fetchJobRole();
    }, []);

    useEffect(() => {
        localStorage.setItem("managejobRole", JSON.stringify(jobRole));
    }, [jobRole]);


    const handleToggle = (field) => {
        setAccess((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleNewUserSubmit = async (e) => {
        e.preventDefault();

        const roleData = {
            roleName,
            ...access
        };

        try {
            if (editJobRole) {
                await axios.put(`https://poskartik.onrender.com/api/updateRole/${editJobRole._id}`, roleData);
            } else {
                await axios.post("https://poskartik.onrender.com/api/addRole", roleData);
            }

            await fetchJobRole();
            setOpenAddUserPopup(false);
            setRoleName("");
            setAccess({
                manageOrder: false,
                manageProduct: false,
                manageCustomer: false,
                manageProductBrand: false,
                manageCategories: false,
                manageSubCategories: false,
                manageInventory: false,
                manageLocation: false,
                manageVendors: false,
                manageUsers: false
            });
            setEditJobRole(null);
        } catch (error) {
            console.error("Error saving role:", error);
        }
    };

    const handleRoleEdit = (id) => {
        const dataToEdit = jobRole.find((data) => data._id === id);
        if (dataToEdit) {
            setEditJobRole(dataToEdit);
            setRoleName(dataToEdit.roleName || "");
            setAccess({
                manageOrder: dataToEdit.manageOrder || false,
                manageProduct: dataToEdit.manageProduct || false,
                manageCustomer: dataToEdit.manageCustomer || false,
                manageProductBrand: dataToEdit.manageProductBrand || false,
                manageCategories: dataToEdit.manageCategories || false,
                manageSubCategories: dataToEdit.manageSubCategories || false,
                manageInventory: dataToEdit.manageInventory || false,
                manageLocation: dataToEdit.manageLocation || false,
                manageVendors: dataToEdit.manageVendors || false,
                manageUsers: dataToEdit.manageUsers || false
            });
            setOpenAddUserPopup(true);
        }
    };

    const handleRoleDelete = async (id) => {
        try {
            await axios.delete(`https://poskartik.onrender.com/api/deleteRole/${id}`)
            fetchJobRole();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 flex flex-col bg-[#F3F7F9]">
                <Header name="Job Role" />
                <section className="flex-1 m-5 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0 overflow-auto">
                    <div className='shadow-sm rounded-md w-[70%] bg-[#F3F7F9] m-auto p-5'>
                        <div className='flex justify-between items-center'>
                            <h2 className='font-semibold text-2xl text-[#0A6637]'>Manage Access</h2>
                            <button
                                onClick={() => {
                                    setOpenAddUserPopup(true);
                                    setEditJobRole(null);
                                    setRoleName("");
                                    setAccess({
                                        manageOrder: false,
                                        manageProduct: false,
                                        manageCustomer: false,
                                        manageProductBrand: false,
                                        manageCategories: false,
                                        manageSubCategories: false,
                                        manageInventory: false,
                                        manageLocation: false,
                                        manageVendors: false,
                                        manageUsers: false
                                    });
                                }}
                                className='px-4 py-2 max-2xl:px-3 max-2xl:py-1 bg-[#0A6637] text-white cursor-pointer rounded-lg flex items-center gap-3'
                            >
                                <i className="fa-solid fa-circle-plus"></i>Add User Role
                            </button>
                        </div>

                        <div className='mt-10'>
                            {Array.isArray(jobRole) && jobRole.map((item) => (
                                <div key={item._id} className='p-3 rounded-xl bg-white shadow flex justify-between items-center mb-5'>
                                    <h3 className='font-medium'>{item.roleName}</h3>
                                    <div className='flex gap-3'>
                                        <i
                                            onClick={() => handleRoleEdit(item._id)}
                                            className="fa-solid fa-pen-to-square cursor-pointer"
                                        ></i>
                                        <i onClick={() => handleRoleDelete(item._id)} className="fa-solid fa-trash-can cursor-pointer"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {openAddUserPopup && (
                        <section className="fixed inset-0 z-50 flex items-center  justify-center bg-[#2424242a]">
                            <div className="z-50 flex">
                                <div className="bg-white rounded-lg inset-0 m-auto w-[800px] ">
                                    <div className="rounded-lg shadow-sm">
                                        <div className="p-4">
                                            <div className="flex justify-between items-center pb-3 max-xl:pb-1 border-b">
                                                <h1 className="font-bold text-xl max-xl:text-lg text-center text-[#0A6637]">
                                                    {editJobRole ? "Edit User Role" : "New User Role"}
                                                </h1>
                                                <button
                                                    onClick={() => setOpenAddUserPopup(false)}
                                                    className="text-gray-400 hover:text-gray-600 transition"
                                                >
                                                    <i className="fa-solid fa-xmark cursor-pointer"></i>
                                                </button>
                                            </div>

                                            <form onSubmit={handleNewUserSubmit} className="mt-5 space-y-5">
                                                <div className="flex flex-col gap-3">
                                                    <div>
                                                        <label htmlFor="roleName" className="block text-lg font-semibold text-gray-700 mb-2">
                                                            User Role
                                                        </label>
                                                        <input
                                                            id="roleName"
                                                            value={roleName}
                                                            onChange={(e) => setRoleName(e.target.value)}
                                                            className="border border-[#0A6637] px-3 py-1.5 rounded-md w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#0A6637]"
                                                            type="text"
                                                            required
                                                            placeholder="Enter User Role"
                                                        />
                                                    </div>

                                                    {permissionFields.map(({ label, field }) => (
                                                        <div key={field} className="flex justify-between items-center mb-1 max-xl:mb-3 max-2xl:mb-4">
                                                            <label className="text-base font-medium">{label}</label>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggle(field)}
                                                                className={`w-12 h-6 max-xl:h-5  flex items-center rounded-full p-1 ${access[field] ? "bg-[#0A6637]" : "bg-gray-300"}`}
                                                            >
                                                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${access[field] ? "translate-x-6" : ""}`}></div>
                                                            </button>
                                                        </div>
                                                    ))}

                                                    <div className="flex justify-center">
                                                        <button
                                                            type="submit"
                                                            className="bg-[#0A6637] mt-6 max-xl:mt-2 max-2xl:mt-3 text-white cursor-pointer font-medium rounded-md px-5 py-2 h-10 w-full md:w-auto hover:bg-[#0A6637] transition"
                                                        >
                                                            {editJobRole ? "Update Role" : "Add Role"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </section>
            </main>
        </div>
    );
}

export default JobRole;
