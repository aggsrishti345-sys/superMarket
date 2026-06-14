import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";

function ChangePassword() 
{
    const [cpass,setcpass] = useState();
    const [newpass,setnewpass] = useState();
    const [cnewpass,setcnewpass] = useState();
    const navigate = useNavigate();

    const {udata,setudata}=useContext(datacontext)

    useEffect(()=>
        {
            if(sessionStorage.getItem("uinfo")===null)
            {
                toast.info("Please login to access the page");
                navigate("/login");
            }
        },[])

    async function handlesubmit(e)
    {
        e.preventDefault();
        if(newpass===cnewpass && newpass!==cpass)
        {
        const apidata = {cpass,newpass,uname:udata.username}
        try
        {
            const apiresp = await axios.put("http://localhost:9000/api/changepassword",apidata)
            if(apiresp.data.success===1)
            {
                toast.success("Password changed successfully")   
                setudata(null);
                sessionStorage.removeItem("uinfo");
                navigate("/login")
                toast.info("You have been logged out,login again with new password") 
            }
            else if(apiresp.data.success===0)
            {
                toast.info("Incorrect Username/Password")
            }
            else
            {
                toast.error("Some error occured try again")
            }
        }
        catch(e)
        {
            toast.error("Error Occured " + e.message)
        }
    }
    else
    {
        toast.info("New Password and Confirm New Password doesn't match or new password and old password is same")
    }
}
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Change Password</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Change Password</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={handlesubmit}>
                    <input type="password" name="pass" placeholder="Current Password" required="" onChange={(e)=>setcpass(e.target.value)} />
                    <input type="password" name="pass" placeholder="New Password" required="" onChange={(e)=>setnewpass(e.target.value)} />
                    <input type="password" name="pass" placeholder="Confirm New Password" required="" onChange={(e)=>setcnewpass(e.target.value)} />
                    <input type="submit" name="btn" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChangePassword;