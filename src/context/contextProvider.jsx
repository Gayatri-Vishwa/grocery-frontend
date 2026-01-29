import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

import { toast } from "react-hot-toast";
import axios from 'axios'                   //axios
axios.defaults.withCredentials=true    
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(null);
  const [products, setproducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState([]);
  const [showAddress, setShowAddress] = useState([]);
    const [cartArray, setCartArray] = useState([]);
    // State

let server_url='http://localhost:5000'
  

//check seller status



const logoutUser = async () => {
  try {
    await axios.get("/api/user/logout");
    
    setUser(null);
    setCartItems({});
    navigate("/");

    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Logout failed",error.message);
  }
};





const fetchSeller=async()=>{
  try {
      const {data}=await axios.get('/api/seller/is-auth')
      if(data.success){
        setIsSeller(true)
      }
      else{
        setIsSeller(false)
      }
  } catch (error) {
    toast.error(error.message)
  }
}




const fetchUser=async()=>{
  try {
    const {data}=await axios.get('/api/user/is-auth')
    
      if (data.success) {
  setUser(data.user);               //store user object
  setCartItems(data.user.cartItems || {}); // cart from DB
}

      else{
        // User is not logged in — no toast needed
      setUser(null);  // make sure state is null
      setCartItems({});
      }
  } catch (error) {
      // Only show toast for real errors (not 401/403)
    if (!error.response || error.response.status >= 500) {
      toast.error("Failed to fetch user");
    }
    console.log("fetchUser error:", error.response?.data || error.message);
  
  }
}




  // fetch all products data
  const fetchProducts = async () => {
    try {
      const {data}=await axios.get("/api/product/list")
      if(data.success){
        setproducts(data.products)
      }else {
  setUser(null); // silently fail
}

    } catch (error) {
       toast.error(error.message) 
    }
  };



const addToCart = async (itemId) => {
  const updatedCart = structuredClone(cartItems || {});
  updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;

  setCartItems(updatedCart);

  if (user) {
    try {
      await axios.post("/api/cart/update", { cartItems: updatedCart });
    } catch (error) {
      toast.error("Cart update failed");
    }
  }
};



  const updateCartItems = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems({ ...cartItems, [id]: quantity });
    }
  };

  //total all cart items
  const cartCount = () => {
    let totalCount = 0;
      for (let item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
    
  };

  // total ammount of cart items
  const totalCartAmmount = () => {
    let totalAmount = 0;
    for (let items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
        totalAmount += cartItems[items] * itemInfo.offerPrice;
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  //remove from cart
  const removeFromCart = async(itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
        // ✅ backend update only if logged in
    if (user) {
      try {
        await axios.post("/api/cart/update", { cartItems: cartData });
      } catch (error) {
        toast.error("Cart update failed");
        console.log(error);
      }
    }
      toast.success("removed from cart");
    }
  };

// useEffect(() => {
//   if (!user || Object.keys(cartItems).length === 0) return;

//   axios.post("/api/cart/update", { cartItems });
// }, [cartItems, user]);








// Update cart array whenever cartItems or products change
useEffect(() => {
  const tempArray = [];
  for (const key in cartItems) {
    const product = products.find(p => p._id === key);
    if (product) tempArray.push({ ...product, quantity: cartItems[key] });
  }
  setCartArray(tempArray);
}, [cartItems, products]);


  useEffect(() => {
    fetchProducts();
    // fetchSeller();
    fetchUser();
  }, []);





  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    updateCartItems,
    cartCount,
    totalCartAmmount,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    cartArray,
    showAddress,
    server_url,
    setShowAddress,
    axios,
    fetchProducts,
    fetchSeller,
    logoutUser,
    // getCart,
    setCartArray,
    fetchUser,
  
    setCartItems,
    
   
    
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
