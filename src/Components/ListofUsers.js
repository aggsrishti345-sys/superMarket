import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ListofUsers() 
{
    const [alludata,setalludata] = useState([]);
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

    async function fetchallusers()
    {
        try
        {
            const apiresp = await axios.get("http://localhost:9000/api/getallusers")
            if(apiresp.data.success===1)
            {
                setalludata(apiresp.data.udata)
            }
            else if(apiresp.data.success===0)
            {
                setalludata([])
                toast.info("No Users Found")
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
    
    useEffect(()=>
    {
        fetchallusers();
    },[])

    async function handledelete(uid)
    {
        try
        {
            if(window.confirm("Are you sure to delete?"))
            {
            const apiresp = await axios.delete(`http://localhost:9000/api/deluser/${uid}`)
            if(apiresp.data.success===1)
            {
                toast.info("User Deleted Successfully")
                fetchallusers();
            }
            else if(apiresp.data.success===0)
            {
                toast.info("User Not Deleted")
            }
            else
            {
                toast.error("Some error occured try again")
            }
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
                        <li className="active">List Of Users</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="table-responsive">
                    {
                        alludata.length>0?
                        <>
                            <h2>List Of Users</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>UserName</th>
                                        <th>Delete</th>
                                    </tr>
                                    {
                                        alludata.map((data,i)=>
                                        <tr key={i}>
                                            <td>{data.name}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.username}</td>
                                            <td><button onClick={()=>handledelete(data._id)}className="btn btn-danger">Delete</button></td>
                                        </tr>
                                        )
                                    }
                                    <br/>
                                    {alludata.length} users found.
                                </tbody>
                            </table>
                        </>:null
                    }
                </div>
            </div>
        </>
    )
}
export default ListofUsers;