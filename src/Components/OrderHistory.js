import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";
function OrderHistory() {
    const [ordersdata,setordersdata] = useState([]);
    const navigate = useNavigate();
     const {udata} = useContext(datacontext)

     useEffect(()=>
    {
        if(sessionStorage.getItem("uinfo")===null)
        {
            toast.info("Please login to access the page");
            navigate("/login");
        }
    },[])

    async function fetchorders()
    {
        try
        {
            const apiresp = await axios.get(`http://localhost:9000/api/getuserorders?uname=${udata.username}`)
            if(apiresp.data.success===1)
            {
               setordersdata(apiresp.data.odata)
            }
            else if(apiresp.data.success===0)
            {
               setordersdata([])
               toast.info("No orders found")
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
            fetchorders();
        }
    },[udata])
    
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Order History</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        ordersdata.length>0?
                        <>
                            <h2>List of Orders</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Address</th>
                                        <th>Payment Mode</th>
                                        <th>Bill</th>
                                        <th>Status</th>
                                       
                                    </tr>
                                    {
                                        ordersdata.map((data,i)=>
                                            <tr key={i}>
                                                <td><Link to={`/orderitems?oid=${data._id}`}>{data._id}</Link></td>
                                                <td>{data.address}</td>
                                                <td>{data.pmode}</td>
                                                <td>{data.billamt}</td>
                                                <td>{data.status}</td>
                                            </tr>
                                        )
                                    }
                                    <br/>
                                    {ordersdata.length} orders found
                                </tbody>
                            </table>
                        </>:null
                    }
                </div>
            </div>
        </>
    )
}
export default OrderHistory;