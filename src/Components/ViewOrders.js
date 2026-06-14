import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
function ViewOrders() {
    const [ordersdata,setordersdata] = useState([]);
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
    async function fetchorders()
    {
        try
        {
            const apiresp = await axios.get(`http://localhost:9000/api/getallorders`)
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
        fetchorders();
    },[])
    
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Admin Home</Link></li>
                        <li className="active">View Orders</li>
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
                                        <th>Username</th>
                                        <th>Address</th>
                                        <th>Payment Mode</th>
                                        <th>Bill</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                    </tr>
                                    {
                                        ordersdata.map((data,i)=>
                                            <tr key={i}>
                                                <td><Link to={`/orderitems?oid=${data._id}`}>{data._id}</Link></td>
                                                <td>{data.username}</td>
                                                <td>{data.address}</td>
                                                <td>{data.pmode}</td>
                                                <td>{data.billamt}</td>
                                                <td>{data.status}</td>
                                        <td><button onClick={()=>navigate(`/updatestatus?oid=${data._id}&currst=${data.status}`)} className="btn btn-danger">Update</button></td>
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
export default ViewOrders;