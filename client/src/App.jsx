import { } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Orders from './pages/orders/Orders'
import Products from './pages/Product/Products'
import Customers from './pages/Customers/Customers'
import ProductBrands from './pages/Productsbrands/ProductBrands'
import Categories from './pages/Categories/Categories'
import SubCategories from './pages/SubCategories/SubCategories'
import Inventory from './pages/inventory/Inventory'
import PantryLocation from './pages/location/PantryLocation'
import Vendors from './pages/vender/Vendors'
import Users from './pages/users/Users'
import AddNewCustomers from './pages/Customers/AddNewCustomers'
import EditCustomers from './pages/Customers/EditCustomers'
import AddNewProductBrand from './pages/Productsbrands/AddNewProductBrand'
import AddNewCategories from './pages/Categories/AddNewCategories'
import AddSubCategories from './pages/SubCategories/AddSubCategories'
import AddNewProduct from './pages/Product/AddNewProduct'
import ProductView from './pages/Product/ProductView'
import EditProduct from './pages/Product/EditProduct'
import AddNewLocation from './pages/location/AddNewLocation'
import EditLocation from './pages/location/EditLocation'
import AddNewVender from './pages/vender/AddNewVender'
import AddNewOrder from './pages/orders/AddNewOrder'
import ViewOrder from './pages/orders/ViewOrder'
import Login from './components/Login'
import JobRole from './pages/users/JobRole'
import GenerateInvoice from './pages/orders/GenerateInvoice'
import FrontPannel from './pages/FrontPannel/FrontPannel'
import SelectCategorie from './pages/FrontPannel/SelectCategorie'
import Table from './pages/FrontPannel/Table'
import CloseTable from './pages/FrontPannel/CloseTable'
import Invoice from './pages/FrontPannel/Invoice'
import Admin from './pages/Admin'
import Balence from './pages/Balence'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/addneworder' element={<AddNewOrder />} />
        <Route path='/orders/vieworder' element={<ViewOrder />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/addnewproduct' element={<AddNewProduct />} />
        <Route path='/products/editproduct' element={<EditProduct />} />
        <Route path='/products/productview' element={<ProductView />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/customers/Addnewcustomer' element={<AddNewCustomers />} />
        <Route path='/customers/editcustomer' element={<EditCustomers />} />
        <Route path='/brands' element={<ProductBrands />} />
        <Route path='/brands/newbrand' element={<AddNewProductBrand />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/addnewcategories' element={<AddNewCategories />} />
        <Route path='/subcategories' element={<SubCategories />} />
        <Route path='/subcategories/addsubcategories' element={<AddSubCategories />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/location' element={<PantryLocation />} />
        <Route path='/location/addnewlocation' element={<AddNewLocation />} />
        <Route path='/location/editlocation' element={<EditLocation />} />
        <Route path='/vendors' element={<Vendors />} />
        <Route path='/vendors/addnewvender' element={<AddNewVender />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/jobrole' element={<JobRole />} />
        <Route path='/orders/vieworder/generateinvoice' element={<GenerateInvoice />} />
        <Route path='/table' element={<Table />} />
        <Route path='/frontpannel' element={<FrontPannel />} />
        <Route path='/frontpannel/selectcategorie' element={<SelectCategorie />} />
        <Route path='/closetable' element={<CloseTable />} />
        <Route path='/invoice' element={<Invoice />} />
         <Route path='/admin' element={<Admin/>} />
          <Route path='/balence' element={<Balence/>} />
      </Routes>
    </>
  )
}

export default App
