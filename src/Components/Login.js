import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";

function Login() 
{
    const [uname,setuname] = useState();
    const [pass,setpass] = useState();
    const navigate = useNavigate();

    const {setudata}=useContext(datacontext)

    async function onlogin(e)
    {
        e.preventDefault();
        const apidata = {uname,pass}
        try
        {
            const apiresp = await axios.post("http://localhost:9000/api/login",apidata)
            if(apiresp.data.success===1)
            {    
                setudata(apiresp.data.udata) 
                //setting the value in udata variable of app.js which was shared through context
                sessionStorage.setItem("uinfo",JSON.stringify(apiresp.data.udata)) //json oject to json string 

                if(apiresp.data.udata.usertype==="admin")
                    {
                        navigate("/adminhome")
                    }
                    else
                    {
                        navigate("/homepage")
                    }
            }        
            else if(apiresp.data.success===0)
            {
                toast.info("Incorrect Username/Password")
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
                        <li className="active">Login Page</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Login Form</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onlogin}>
                            <input type="email" name="em" placeholder="Email Address" required="" onChange={(e)=>setuname(e.target.value)} />
                            <input type="password" name="pass" placeholder="Password" required="" onChange={(e)=>setpass(e.target.value)} />
                            <input type="submit" name="btn" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;