// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
function App() {

  const dispatch=useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)



  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(SummaryApi.current_user.url,{
      method:SummaryApi.current_user.method,
      credentials:'include'
    })
    const dataApi=await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    
  }


  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }


  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])
  return (
   <>
    <Context.Provider value={{
        fetchUserDetails, //user details fetch
        cartProductCount, // current user add to cart product count,
        fetchUserAddToCart        
    }}>
   <ToastContainer />
   <Header/>
   <main  className='min-h-[calc(100vh-120px)] pt-16'>
      <Outlet/>
   </main>
    
    <Footer/>
    
   </Context.Provider>
   </>
  );
}

export default App;
