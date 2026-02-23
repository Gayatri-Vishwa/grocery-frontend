import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import { useLocation } from 'react-router-dom'
import MyOrders from './pages/MyOrders'
import Auth from './models/Auth'
import ProductCategory from './pages/ProductCategory'
import Footer from './components/Footer'
import {Toaster} from 'react-hot-toast'
import AddAddress from './pages/AddAddress'
import Sellerlayout from './pages/seller/Sellerlayout'
import SellerLogin from './components/seller/SellerLogin'
import AddProducts from './pages/seller/AddProducts'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import EditProduct from './pages/seller/EditProduct'

function App() {
const {showUserLogin ,logoutUser , isSeller}=useContext(AppContext)
const isSellerPath =useLocation().pathname.includes('/seller')   //path dfine for seller here


  return (
    <>
<div className='text-default  min-h-screen'>
  {/* on sellerpathh  navbar hide */}
{isSellerPath ? null:  <Navbar/>} 
{showUserLogin?<Auth/>:null}
<Toaster/>                                                
{/* when we call the toaster then it ill show the toast */}
  <div className='px-5 md:px-16 lg:px-24 xl:px-32'>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/products" element={<Product/>}/>
      <Route path="/products/:category/:id" element={<ProductDetails/>}/> 
      <Route path="/products/:category" element={<ProductCategory/>}/>
      <Route path="/my-orders" element={<MyOrders/>}/>
      <Route path="/add-address" element={<AddAddress/>}/>


{/*  no need  / slash in child path of seller*/}
      <Route path="/seller" element={isSeller ?<Sellerlayout/>:<SellerLogin/>}> 
            <Route path='add-product' index element={isSeller?<AddProducts/>:null}/>
            <Route path="/seller/edit-product/:id" element={<EditProduct />} />

            <Route path='product-list' element={isSeller?<ProductList/>:null}/>
            <Route path='orders' element={isSeller?<Orders/>:null}/>
            
     </Route>

    </Routes>
  </div>
  {isSellerPath?null:<Footer/>}
</div>
    </>
  )
}

export default App
