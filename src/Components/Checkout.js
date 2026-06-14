import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";
function Checkout() {
    const [pmode,setpmode] = useState();
    const [addr,setaddr] = useState();
    const [hname,sethname] = useState();
    const [cardno,setcardno] = useState();
    const [cvv,setcvv] = useState();
    const [exp,setexp] = useState();
    const {udata} = useContext(datacontext)
    const navigate = useNavigate();

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
        const cardetails={hname,cardno,cvv,exp}
        const apidata={billamt:sessionStorage.getItem("carttotal"),addr,pmode,cardetails,uname:udata.username}
        try
        {
            const apiresp = await axios.post("http://localhost:9000/api/saveorder",apidata)
            if(apiresp.data.success===1)
            {                
               navigate("/ordersummary");
            }
            else if(apiresp.data.success===0)
            {
                toast.info("Error while placing order")
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
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Checkout</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Checkout</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={handlesubmit}>
                            Your total bill amount is Rs. {sessionStorage.getItem("carttotal")}/-<br/><br/>
                            <textarea className="form-control" name="saddr" placeholder="Shipping Address" onChange={(e)=>setaddr(e.target.value)}></textarea><br/>
                            Choose Payment Option<br/>
<label><input type="radio" name="pmode" onChange={(e)=>setpmode(e.target.value)} value="cash on delivery"/>Cash on Delivery</label>&nbsp;
<label><input type="radio" name="pmode" value="card" onChange={(e)=>setpmode(e.target.value)}/>Card Payment</label><br/><br/>

                            {
                            pmode==="card"?
                            <>
                                <input type="text" name="hname" placeholder="Holder Name" onChange={(e)=>sethname(e.target.value)}/><br/>
                                <input type="text" name="cardno" placeholder="Card No" onChange={(e)=>setcardno(e.target.value)}/>
                                <input type="password" name="cvv" placeholder="CVV" onChange={(e)=>setcvv(e.target.value)}/><br/>
                                <input type="text" name="exp" placeholder="Expiry" onChange={(e)=>setexp(e.target.value)}/>
                            </>:null
                            }
                            <input type="submit" name="btn" value="Confirm Order" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Checkout;