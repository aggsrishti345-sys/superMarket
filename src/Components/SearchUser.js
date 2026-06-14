import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SearchUser() 
{
    const [email,setemail] = useState();
    const [uinfo,setuinfo] = useState({});

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
            const apiresp = await axios.get(`http://localhost:9000/api/searchuser?em=${email}`)
            if(apiresp.data.success===1)
            {
                setuinfo(apiresp.data.udata)
            }
            else if(apiresp.data.success===0)
            {
                setuinfo({})
                toast.info("Incorrect Username");
            }
            else
            {
                toast.error("Some error occured.try again");
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
                        <li className="active">Search User</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Search User</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={handlesubmit}>
                            <input type="email" name="em" placeholder="Email Address" required="" onChange={(e)=>setemail(e.target.value)} />
                            <input type="submit" name="btn" value="Search" /><br></br>
                            {
                                Object.keys(uinfo).length>0?
                                <>
                                    <b>Name:-</b> {uinfo.name}<br/>
                                    <b>Phone:-</b> {uinfo.phone}<br/>
                                </>:null
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchUser;