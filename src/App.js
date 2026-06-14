import HeaderNav from './Components/HeaderNav';
import Footer from './Components/Footer';
import SiteRoutes from './Components/SiteRoutes';
import { ToastContainer } from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
import AdminHeaderNav from './Components/AdminHeaderNav';
const datacontext = createContext();

function App() {
  const [udata,setudata]=useState(null);

  useEffect(()=>
  {
    if(sessionStorage.getItem("uinfo")!==null) //it means user has alreay logged in 
    {
      setudata(JSON.parse(sessionStorage.getItem("uinfo")));
      //checking whether uinfo exists in the session or not.if it exists that means user has already logged in and we will fetch the value from sessionstorage and set it into the state
      
      //convert a JavaScript Object Notation (JSON) string into an object.
    }
  },[])
  return (
    <>
    <ToastContainer theme="colored"/>
    <datacontext.Provider value={{udata,setudata}}>
    {
      udata===null?
      <HeaderNav/>
      :udata.usertype==="admin"?<AdminHeaderNav/>:<HeaderNav/>
    }
    <SiteRoutes/>
    <Footer/>
    </datacontext.Provider>
    </>
  );
}

export default App;
export {datacontext};
