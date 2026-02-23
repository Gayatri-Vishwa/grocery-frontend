import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isSeller, setIsSeller, setShowUserLogin, navigate, axios } =
    useContext(AppContext);
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller,navigate]);


  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
}, { withCredentials: true });
      // if(data.success){
      //     console.log(" email ", email, " password ", password);
      //    setIsSeller(true);
      //    navigate('/seller')
      //     toast.success(data.message)
      //      console.log(" email ", email, " password ", password);
      // }
        if (data.success) {
  setIsSeller(true);
  toast.success(data.message);
}
      else{
        toast.error(data.message)
      }
      // console.log(" email ", email, " password ", password);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);

    }
  };

  return (
       !isSeller && (
 
      
    // it will make the form close when click outside the login form but issue  frorm also close so    //    we have to add onclick((e)=> e.stopPropagation()) on form
       <div 
      // onClick={() => {
      //   setShowUserLogin(false);
       
      // }}
      className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-black/50 text-gray-600"
    >
      
      <form
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">Seller</span> Login
          {/* {state === "login" ? "Login" : "Sign Up"} */}
        </p>

        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
              autoComplete="current-email"
            placeholder="enter email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
              autoComplete="current-password"
            placeholder="enter password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>

        <button    type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>
      </form>
    </div>
       )
  );
}

export default SellerLogin;

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// function SellerLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { isSeller, setIsSeller, setShowUserLogin, navigate, axios } =
//     useContext(AppContext);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isSeller) {
//       navigate("/seller");
//     }
//   }, [isSeller, navigate]);

//   const submitHandler = async (e) => {
//     e.preventDefault(); // prevent default form submission
//     try {
//       const { data } = await axios.post(
//         "/api/seller/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (data.success) {
//         setIsSeller(true); // update context state
//         toast.success(data.message); // show toast only after login
//         setShowUserLogin(false); // close modal after login
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // Close modal when clicking outside
//   const handleBackgroundClick = () => {
//     setShowUserLogin(false);
//   };

//   // Prevent modal from closing when clicking inside form
//   const handleFormClick = (e) => {
//     e.stopPropagation();
//   };

//   // Only show login modal if user is NOT logged in
//   if (isSeller) return null;

//   return (
//     <div
//       onClick={handleBackgroundClick}
//       className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-black/50 text-gray-600"
//     >
//       <form
//         onSubmit={submitHandler}
//         onClick={handleFormClick}
//         className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
//       >
//         <p className="text-2xl font-medium m-auto">
//           <span className="text-indigo-500">Seller</span> Login
//         </p>

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             type="email"
//             required
//             autoComplete="current-email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
//           />
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             type="password"
//             required
//             autoComplete="current-password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SellerLogin;
