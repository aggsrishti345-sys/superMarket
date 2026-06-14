import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
function OrderItems() {
    const [oitems,setoitems] = useState([]);

    const [params] = useSearchParams();
    const orderid=params.get("oid");

    async function fetchorderitems()
    {
        try
        {
            const apiresp = await axios.get(`http://localhost:9000/api/fetchorderitems?oid=${orderid}`)
            if(apiresp.data.success===1)
            {
               setoitems(apiresp.data.items)
            }
            else if(apiresp.data.success===0)
            {
               setoitems([])
               toast.info("No items found")
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
        fetchorderitems();
    },[])

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Order Items</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        oitems.length>0?
                        <>
                            <h2>Order Items</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Quantity</th>
                                        <th>Total Cost</th>
                                    </tr>
                                    {
                                        oitems.map((data,i)=>
                                            <tr key={i}>
                                                <td><img src={`uploads/${data.picname}`} height='75' alt="itempic"/></td>
                                                <td>{data.pname}</td>
                                                <td>{data.rate}</td>
                                                <td>{data.qty}</td>
                                                <td>{data.totalcost}</td>
                                            </tr>
                                        )
                                    }
                                    <br/>
                                    {oitems.length} items found
                                </tbody>
                            </table>
                        </>:null
                    }
                </div>
            </div>
        </>
    )
}
export default OrderItems;