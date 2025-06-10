import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoFull from '../assets/images/logo-second.png';
import LogoSmall from '../assets/images/para-logo 2.png';
import DashboardIcon from '../assets/images/Property 1=Dashboard.png';
import OrdersIcon from '../assets/images/Property 1=shopping-cart.png';
import ProductsIcon from '../assets/images/Property 1=Product.png';
import CustomersIcon from '../assets/images/Property 1=Customer.png';
import BrandsIcon from '../assets/images/Property 1=tag.png';
import CategoriesIcon from '../assets/images/Property 1=Category.png';
import SubcategoriesIcon from '../assets/images/Property 1=Subcategory.png';
import InventoryIcon from '../assets/images/Property 1=Inventory.png';
import LocationIcon from '../assets/images/Property 1=map-pin.png';
import VendorsIcon from '../assets/images/Property 1=Vendor.png';
import UsersIcon from '../assets/images/Property 1=Users.png';
import axios from 'axios';
function Sidebar() {

  const [isOpen, setIsOpen] = useState(true);
  const [managerole, setManagerole] = useState({});

  const fetchRoleData = async () => {
    const jobRole = localStorage.getItem('jobrole');
    if (!jobRole) return;

    try {
      const res = await axios.get('https://poskartik.onrender.com/api/getRole');
      const roleData = res.data.find((role) => role.roleName === jobRole);
      setManagerole(roleData || {});
    } catch (error) {
      console.error('Failed to fetch role data', error);
    }
  };

  useEffect(() => {
    fetchRoleData();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
    {
      name: "Orders",
      path: "/orders",
      icon: OrdersIcon,
      permission: "manageOrder",
    },
    {
      name: "Products",
      path: "/products",
      icon: ProductsIcon,
      permission: "manageProduct",
    },
    {
      name: "Customer",
      path: "/customers",
      icon: CustomersIcon,
      permission: "manageCustomer",
    },
    {
      name: "Product Brands",
      path: "/brands",
      icon: BrandsIcon,
      permission: "manageProductBrand",
    },
    {
      name: "Categories",
      path: "/categories",
      icon: CategoriesIcon,
      permission: "manageCategories",
    },
    {
      name: "Sub Categories",
      path: "/subcategories",
      icon: SubcategoriesIcon,
      permission: "manageSubCategories",
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: InventoryIcon,
      permission: "manageInventory",
    },
    {
      name: "Pantry Location",
      path: "/location",
      icon: LocationIcon,
      permission: "manageLocation",
    },
    {
      name: "Vendors",
      path: "/vendors",
      icon: VendorsIcon,
      permission: "manageVendors",
    },
    {
      name: "Users",
      path: "/users",
      icon: UsersIcon,
      permission: "manageUsers",
    },
    {
      name: "Table",
      icon: OrdersIcon,
      isExternal: true,
      externalPath: "/table",
    },
    {
      name: "Balence", path: "/balence", icon: DashboardIcon
    },
    { name: "Admin", path: "/admin", icon: DashboardIcon },
  ];

  const filteredLinks = sidebarLinks.filter(
    (link) => !link.permission || managerole?.[link.permission] === true
  );
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate("/dashboard")
  }
  return (
    <aside className={`overflow-y-auto table-scroll-wrapper transition-all duration-300 bg-[#F3F7F9] h-full ${isOpen ? 'w-80 max-2xl:w-60 max-xl:w-56' : 'w-20'} overflow-hidden`}>
      <div className="flex items-center justify-between p-5">
        <img
          onClick={handleNavigate}
          src={isOpen ? LogoFull : LogoSmall}
          alt="Logo"
          className={`cursor-pointer max-xl:h-8 ${isOpen ? "h-10" : "h-8"}`}
        />
        <div onClick={toggleSidebar} className="cursor-pointer ml-3">
          <i className={`fa-solid ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </div>
      </div>
      <nav className="p-4 ">
        {filteredLinks.map((link) => {
          const isExternal = link.isExternal;
          const handleLinkClick = (e) => {
            if (isExternal) {
              e.preventDefault();
              window.open(link.externalPath, '_blank', 'noopener,noreferrer');
            }
          };

          return (
            <NavLink
              key={link.name}
              to={isExternal ? '#' : link.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-2 mb-2 p-3 rounded-lg max-2xl:mb-1 max-2xl:p-2 max-xl:text-sm text-base cursor-pointer hover:bg-white hover:shadow font-medium ${isActive && !isExternal ? "bg-white shadow" : "text-[#505050]"} transition-colors duration-200`
              }
            >
              <img src={link.icon} alt={link.name} className={`${isOpen ? "h-5 max-2xl:h-4 " : "h-6"} `} />
              {isOpen && <span>{link.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;



