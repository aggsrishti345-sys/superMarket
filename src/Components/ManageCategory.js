import axios from "axios";
import { useEffect, useRef ,useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

function ManageCategory() 
{
    const [cname,setcname] = useState("");
    const [imgname,setimgname] = useState();

    const [editmode,seteditmode] = useState(false);

    const [picfile,setpicfile] = useState(null);

    const [catdata,setcatdata] = useState([]);
    const [catid,setcatid]=useState();

    const fileInputRef = useRef(null);

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
            const formdata = new FormData();
            formdata.append("catname",cname);
            if(picfile!==null)
            {
                formdata.append("pic",picfile);
            }
            const apiresp = await axios.post(`http://localhost:9000/api/savecategory`,formdata)
            if(apiresp.data.success===1)
            {
              toast.success("Category added successfully")
              handlecancel();
            }
            else if(apiresp.data.success===0)
            {  
               toast.error("Category not added")
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

    async function fetchcategories()
    {
        try
        {
            const apiresp = await axios.get(`http://localhost:9000/api/getallcat`)
            if(apiresp.data.success===1)
            {
               setcatdata(apiresp.data.cdata)
            }
            else if(apiresp.data.success===0)
            {
               setcatdata([])
               toast.info("No categories found")
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
        fetchcategories();
    },[])

    async function handleupdate(catinfo)
    {
        // alert(JSON.stringify(catinfo))
        seteditmode(true)
        setcname(catinfo.catname)
        setimgname(catinfo.picname)
        setcatid(catinfo._id)
    }
    async function handlecancel()
    {
        // alert(JSON.stringify(catinfo))
        seteditmode(false)
        setcname("")
        setimgname("")
        setpicfile(null)
        setcatid("")
        if(fileInputRef.current) 
        {
            fileInputRef.current.value = "";            // clears the file input
        }
    }

    async function handledelete(id)
    {
        try
        {
            if(window.confirm("Are you sure to delete?"))
            {
                const apiresp = await axios.delete(`http://localhost:9000/api/delcat/${id}`)
                if(apiresp.data.success===1)
                {
                    toast.info("Category deleted successfully")
                    fetchcategories();
                }
                else if(apiresp.data.success===0)
                {
                    toast.info("Category not deleted")
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

    const updatecategory=async()=>
    {
        try
        {
            const formdata = new FormData();
            formdata.append("catname",cname);
            if(picfile!==null)
            {
                formdata.append("pic",picfile);
            }
            formdata.append("oldpicname",imgname)

            formdata.append("cid",catid)

            const apiresp = await axios.put(`http://localhost:9000/api/updatecategory`,formdata)

            if(apiresp.data.success===1)
            {
              toast.success("Category updated successfully")
              handlecancel();
              fetchcategories();
            }
            else if(apiresp.data.success===0)
            {  
               toast.error("Category not updated")
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

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Admin Home</Link></li>
                        <li className="active">Manage Category</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Manage Category</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={handlesubmit}>
                        <input type="text" value={cname} name="cname" placeholder="Category Name" required="" onChange={(e)=>setcname(e.target.value)} />
                        
                        {editmode?<><br/><img src={`uploads/${imgname}`} height='75' alt="catpic"/><br/></>:null}

                        <br/><input type="file" ref={fileInputRef} name="cpic" onChange={(e)=>setpicfile(e.target.files[0])} />
                        
                        {
                            editmode?
                            <>
                                <br/>
                                <input type="button" onClick={updatecategory} className="btn btn-primary" name="btn" value="Update Category" /> &nbsp;
                                <input type="button" onClick={handlecancel} className="btn btn-primary" name="btn" value="Cancel" /><br/><br/>
                            </> : <input type="submit" name="btn" value="Add Category" />
                        }
                        </form>
                    </div><br/>
                    {
                    catdata.length>0?
                    <>
                        <h2>Added Categories</h2><br/>
                        <table className="timetable_sub">
                            <tbody>
                                <tr>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                {
                                    catdata.map((data,i)=>
                                        <tr key={i}>
                                        <td><img src={`uploads/${data.picname}`} height='75' alt="catpic"/></td>
                                        <td>{data.catname}</td>
                                        <td><button onClick={()=>handleupdate(data)} className="btn btn-primary">Update</button></td>
                                        <td><button onClick={()=>handledelete(data._id)} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    )
                                }
                                {catdata.length} categories found.
                            </tbody>
                        </table>
                        <br/>
                    </>:null
                    }
                </div>
            </div>
        </>
    )
}
export default ManageCategory;