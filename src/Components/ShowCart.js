import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";
function ShowCart() {
    const [cartdata,setcartdata] = useState([]);
    const {udata} = useContext(datacontext)
    const [gtotal,setgtotal] = useState()
    const navigate = useNavigate();

    useEffect(()=>
    {
        if(sessionStorage.getItem("uinfo")===null)
        {
            toast.info("Please login to access the page");
            navigate("/login");
        }
    },[])

    async function fetchcart()
    {
        try
        {
            const apiresp = await axios.get(`http://localhost:9000/api/getcart?uname=${udata.username}`)
            if(apiresp.data.success===1)
            {
               setcartdata(apiresp.data.cdata)
            }
            else if(apiresp.data.success===0)
            {
               setcartdata([])
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
            fetchcart();
        }
    },[udata])

    useEffect(()=>
    {
        var gtot=0;
        for(var x=0;x<cartdata.length;x++)
        {
            gtot=gtot+cartdata[x].totalcost
        }
        setgtotal(gtot)
    },[cartdata])

    async function handledelete(id)
    {
        try
        {
            if(window.confirm("Are you sure to delete?"))
            {
                const apiresp = await axios.delete(`http://localhost:9000/api/delfromcart/${id}`)
                if(apiresp.data.success===1)
                {
                    toast.info("Product deleted from cart successfully")
                    fetchcart();
                }
                else if(apiresp.data.success===0)
                {
                    toast.info("Product not deleted")
                }
                else
                {
                    toast.error("Some error occured, try again")
                }
            }
        }
        catch(e)
        {
            toast.error("Error Occured " + e.message)
        }
    }
    const oncheckout=()=>
    {
        sessionStorage.setItem("carttotal",gtotal);
        navigate("/checkout");
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Your shopping cart</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        cartdata.length>0?
                        <>
                            <h2>Your shopping cart</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Quantity</th>
                                        <th>Total Cost</th>
                                        <th>Delete</th>
                                    </tr>
                                    {
                                        cartdata.map((data,i)=>
                                            <tr key={i}>
                                                <td><img src={`uploads/${data.picname}`} alt="prdpic" height='75'/></td>
                                                <td>{data.pname}</td>
                                                <td>{data.rate}</td>
                                                <td>{data.qty}</td>
                                                <td>{data.totalcost}</td>
                                                <td><button onClick={()=>handledelete(data._id)} className="btn btn-danger">Delete</button></td>
                                            </tr>
                                        )
                                    }
                                    <br/>
                                </tbody>
                            </table>
                            {cartdata.length} product(s) found<br/>
                            Your total bill amount is Rs.{gtotal}/-<br/><br/>
                            <button className="btn btn-primary" onClick={oncheckout}>Checkout</button>
                        </>:<h2>No products added in cart yet</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ShowCart;
