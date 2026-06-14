import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
function UpdateStatus() {
    const [params] = useSearchParams();
    const [newstatus,setnewstatus] = useState();
    const orderid = params.get("oid");
    const currstatus = params.get("currst");
    const navigate = useNavigate();
    
        useEffect(()=>
            {
                if(sessionStorage.getItem("uinfo")===null)// if this conditions satisfies then it means user has not logged in
                {
                    toast.info("Please login to access the page");
                    navigate("/login");
                }
                else if(sessionStorage.getItem("uinfo")!==null)//it means user has already logged in
                {
                    const userdata = JSON.parse(sessionStorage.getItem("uinfo"))//here we are checking logged in user type
                    if(userdata.usertype!=="admin")
                    {
                        toast.info("Please login with proper credentials to access the page");
                        navigate("/login");
                    }
                }
            },[])
    async function handlesubmit(e)
    {
        e.preventDefault();
        try
        {
            const apidata ={orderid,newstatus}
            const apiresp = await axios.put(`http://localhost:9000/api/updatestatus`,apidata)
            if(apiresp.data.success===1)
            {
               toast.success("Status updated successfully")
               navigate("/vieworders")
            }
            else if(apiresp.data.success===0)
            {
               toast.success("Status not updated")
            }
            else
            {
               toast.error("Some error occured, try again")
            }
        }
        catch(e)
        {
            toast.error("Error Occured " + e.message)
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Admin Home</Link></li>
                        <li className="active">Update Status</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Update Status</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={handlesubmit}>
                         <b>Current Status :- </b> {currstatus}<br/><br/>
                         <select className="form-control" name="newt" onChange={(e)=>setnewstatus(e.target.value)}>
                            <option value="">Choose New Status</option>
                            <option>Packed</option>
                            <option>Shipped</option>
                            <option>In-Transit</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                            <option>Returned</option>
                         </select>
                        <input type="submit" name="btn" value="Update Status" /><br/><br/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateStatus;