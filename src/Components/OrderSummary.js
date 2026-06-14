import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";

function OrderSummary() {
    const {udata} = useContext(datacontext)
    const [oinfo,setoinfo] = useState({})
    const navigate = useNavigate();
 
    useEffect(()=>
    {
        if(sessionStorage.getItem("uinfo")===null)
        {
            toast.info("Please login to access the page");
            navigate("/login");
        }
    },[])
    async function fetchorderdetails()
    {
        try
        {
            const apiresp = await axios.get(`http://localhost:9000/api/getorderdetails?un=${udata.username}`)
            if(apiresp.data.success===1)
            {
                setoinfo(apiresp.data.odata)
            }
            else if(apiresp.data.success===0)
            {
               toast.error("Some error occured, try again")
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
    useEffect(()=>
    {
        if(udata!==null)
        {
            fetchorderdetails();
        }
    },[udata])
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Order Summary</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Order Summary</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                      Thanks for shopping on our website. Your order number is {oinfo._id}.<br/>
                      Your order will be delivered at {oinfo.address}
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrderSummary;