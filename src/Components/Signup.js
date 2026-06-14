import axios from "axios";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

function Signup() 
{
    const [pname,setpname] = useState();
    const [phone,setphone] = useState();
    const [uname,setuname] = useState();
    const [pass,setpass]= useState();
    const [cpass,setcpass] = useState();
    const [terms,setterms] = useState(false);
    const navigate = useNavigate();
   
    var handlesubmit=async(e)=>
    {
        e.preventDefault();
       
        if(terms===true)
        {
            if(pass===cpass)
            {
                    const signupdata = {pname,phone,uname,pass}
                    try
                    {
                    const apiresp=await axios.post("http://localhost:9000/api/register",signupdata)
                    if(apiresp.data.success===true)
                    {
                        navigate("/thanks")
                        toast.info(apiresp.data)
                        toast.info("User Added Successfully")
                    }

                    else if(apiresp.data.success===false)
                    {
                        toast.info("Some error occured,try again")
                    }
                }
                catch(e)
                {
                    toast.error("Error Occured " + e.message)
                }
            }         
            else 
            {
                toast.warn("Password and confirm password doesn't match")
            }
        }
        else
        {
            toast.info("Please accept terms and conditions")
        }
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Signup Page</li>
                    </ol>
                </div>
            </div>
            <div className="register">
                <div className="container">
                    <h2>Register Here</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1" onSubmit={handlesubmit}>
                            <input type="text" placeholder="Name..." name="pname" required="" onChange={(e)=>setpname(e.target.value)} />
                            <input type="text" placeholder="Phone..." name="ph" required="" onChange={(e)=>setphone(e.target.value)}/>
                        <h6>Login information</h6>
                            <input type="email" placeholder="Email Address(Username)" required=" " name="em" onChange={(e)=>setuname(e.target.value)}/>
                            <input type="password" placeholder="Password" required=" " name="pass" onChange={(e)=>setpass(e.target.value)}/>
                            <input type="password" placeholder="Password Confirmation" required=" " name="cpass" onChange={(e)=>setcpass(e.target.value)}/>
                            <div className="register-check-box">
                                <div className="check">
                                    <label className="checkbox"><input type="checkbox" name="checkbox" onChange={(e)=>setterms(e.target.checked)}/><i> </i>I accept the terms and conditions</label>
                                </div>
                            </div>
                            <input name="btn" type="submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup;