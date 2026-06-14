import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";

function ProdDetails() {
    const [params] = useSearchParams();
    const pid=params.get("id");
    const [pinfo,setpinfo] = useState({});
    const [remcost,setremcost] = useState();
    const [qty,setqty] = useState();

    const [availqty,setavailqty] = useState([]);

    const {udata} = useContext(datacontext)

    const navigate = useNavigate();

    async function fetchprodetails()
    {
        try
        {
            const apiresp = await axios.get(`http://localhost:9000/api/getproddetailsbyid?prodid=${pid}`)
            if(apiresp.data.success===1)
            {
               setpinfo(apiresp.data.pdata)
            }
            else if(apiresp.data.success===0)
            {
               setpinfo({})
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
        if(pid!=="")
        {
            fetchprodetails();
        }
    },[pid])

    useEffect(()=>
    {
        setremcost(pinfo.rate-(pinfo.rate*pinfo.discount/100));

        var stockarr=[];
        if(pinfo.stock>10)
        {
            for(var x=1;x<=10;x++)
            {
                stockarr.push(x);
            }
        }
        else
        {
            for(var x=1;x<=pinfo.stock;x++)
            {
                stockarr.push(x);
            }
        }
        setavailqty(stockarr);
    },[pinfo])

    const handlesubmit=async(e)=>
    {
        e.preventDefault();
        if(udata!==null)
        {
            try
            {
                var tc=remcost*qty;
                const apidata = {pid,prodname:pinfo.prodname,remcost,qty,tc,picname:pinfo.picname,uname:udata.username}
                const apiresp = await axios.post("http://localhost:9000/api/savetocart",apidata)
                if(apiresp.data.success===1)
                {
                    navigate("/showcart")
                }
                else if(apiresp.data.success===0)
                {
                    toast.info("Problem while adding to cart, try again")
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
            toast.info("Please login to add to cart")
            navigate("/login")
        }
    }

    return (
        <>
          <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Product Details</li>
                    </ol>
                </div>
            </div>
            <div className="products">
                <div className="container">
                    <div className="agileinfo_single">

                        <div className="col-md-4 agileinfo_single_left">
                            <img id="example" src={`uploads/${pinfo.picname}`} alt=" " className="img-responsive" />
                        </div>
                        <div className="col-md-8 agileinfo_single_right">
                            <h2>{pinfo.prodname}</h2>
                            <div className="w3agile_description">
                                <h4>Description :</h4>
                                <p>{pinfo.description}</p>
                            </div>
                            <div className="snipcart-item block">
                                <div className="snipcart-thumb agileinfo_single_right_snipcart">
                                    <h4 className="m-sing">₹{remcost}/- <span>₹{pinfo.rate}/-</span></h4>
                                </div>
                                {
                                pinfo.stock>0?
                                <div className="snipcart-details agileinfo_single_right_details">
                                    <form name="form1" onSubmit={handlesubmit}>
                                        <fieldset>
                                            <select name="qty" required onChange={(e)=>setqty(e.target.value)}>
                                                <option value="">Choose Quantity</option>
                                                {
                                                    availqty.length>0?
                                                    availqty.map((st,i)=>
                                                        <option key={i}>{st}</option>
                                                    ):null
                                                }
                                            </select><br/><br/>
                                            <input type="submit" name="submit" value="Add to cart" className="button" />
                                        </fieldset>
                                    </form>
                                </div>:<h3>Out of stock</h3>
                                }
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProdDetails;