import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

function ManageProduct() 
{
    const [catid,setcatid] = useState();
    const [prodid,setprodid] = useState();
    const [imgname,setimgname] = useState();
    const [editmode,seteditmode] = useState(false);
    const [pname,setpname] = useState();
    const [rate,setrate] = useState();
    const [dis,setdis] = useState();
    const [stock,setstock] = useState();
    const [feat,setfeat] = useState();
    const [descrip,setdescrip] = useState();

    const [catdata,setcatdata] = useState([]);
    const [prodsdata,setprodsdata] = useState([]);
    const [picfile,setpicfile] = useState(null);

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
            formdata.append("cid",catid);
            formdata.append("pname",pname);
            formdata.append("rate",rate);
            formdata.append("dis",dis);
            formdata.append("stock",stock);
            formdata.append("feat",feat);
            formdata.append("description",descrip);
            if(picfile!==null)
            {
                formdata.append("pic",picfile);
            }
            const apiresp = await axios.post(`http://localhost:9000/api/saveproduct`,formdata)
            if(apiresp.data.success===1)
            {
              toast.success("Product added successfully")
              clearfields();
            }
            else if(apiresp.data.success===0)
            {  
               toast.error("Product not added")
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

    useEffect(()=>
        {
            if(catid!=="")
            {
                fetchprodsbycat();
            }
        },[catid])
        async function fetchprodsbycat()
        {
            try
            {
                const apiresp = await axios.get(`http://localhost:9000/api/getprodsbycat?cid=${catid}`)
                if(apiresp.data.success===1)
                {
                   setprodsdata(apiresp.data.pdata)
                }
                else if(apiresp.data.success===0)
                {
                   setprodsdata([])
                   toast.info("No products found")
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

     async function handleupdate(prodinfo)
    {
        // alert(JSON.stringify(catinfo))
        seteditmode(true)
        setpname(prodinfo.prodname)
        setprodid(prodinfo._id)
        setrate(prodinfo.rate)
        setdis(prodinfo.discount)
        setstock(prodinfo.stock)
        setfeat(prodinfo.featured)
        setdescrip(prodinfo.description)
        setimgname(prodinfo.picname)
    }

        async function clearfields()
        {
            seteditmode(false)
            setimgname("")
            setpname("")
            setrate("")
            setdis("")
            setstock("")
            setdescrip("")
            setfeat("")
            setcatid("")
            setprodid("")
            setpicfile(null);
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
                const apiresp = await axios.delete(`http://localhost:9000/api/delprod/${id}`)
                if(apiresp.data.success===1)
                {
                    toast.info("Product deleted successfully")
                    fetchprodsbycat();
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

    const updateproduct=async()=>
    {
        try
        {
            const formdata = new FormData();
            formdata.append("prodname",pname);
            if(picfile!==null)
            {
                formdata.append("pic",picfile);
            }

            formdata.append("oldpicname",imgname)
            formdata.append("cid",catid)
            formdata.append("pid",prodid)
            formdata.append("pname",pname);
            formdata.append("rate",rate);
            formdata.append("dis",dis);
            formdata.append("stock",stock);
            formdata.append("feat",feat);
            formdata.append("description",descrip);

            const apiresp = await axios.put(`http://localhost:9000/api/updateprod`,formdata)

            if(apiresp.data.success===1)
            {
              toast.success("Product updated successfully")
              clearfields();
              fetchprodsbycat();
            }
            else if(apiresp.data.success===0)
            {  
               toast.error("Product not updated")
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
                        <li className="active">Manage Product</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Manage Product</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={handlesubmit}>
                        <select name="cat" value={catid} className="form-control" onChange={(e)=>setcatid(e.target.value)}>
                            <option value="">Choose Category</option>
                            {
                                catdata.length>0?
                                catdata.map((data,i)=>
                                    <option value={data._id} key={i}>{data.catname}</option>
                                ):null
                            }
                        </select>
        <input type="text" value={pname} name="pname" placeholder="Product Name" required="" onChange={(e)=>setpname(e.target.value)} />
        <input type="text" value={rate} name="rate" placeholder="Rate" required="" onChange={(e)=>setrate(e.target.value)} /><br/>
        <input type="text" value={dis} name="disount" placeholder="Discount(in percent, do not add percent symbol)" required="" onChange={(e)=>setdis(e.target.value)} /><br/>
        <input type="text" value={stock} name="stock" placeholder="Stock" required="" onChange={(e)=>setstock(e.target.value)} /><br/>
                       
            <label><input type="radio" checked={feat==='yes'} name="featured" value="yes" onChange={(e)=>setfeat(e.target.value)}/>Yes</label> &nbsp;
            <label><input type="radio" checked={feat==='no'} name="featured" value="no" onChange={(e)=>setfeat(e.target.value)}/>No</label>
            <br/> <br/>

                        <textarea value={descrip} placeholder="Description" onChange={(e)=>setdescrip(e.target.value)} name="description" className="form-control"></textarea>

                        {editmode?<><br/><img src={`uploads/${imgname}`} height='75' alt="prodpic"/><br/></>:null}
                        
                        <br/><input type="file" ref={fileInputRef} name="ppic" onChange={(e)=>setpicfile(e.target.files[0])} />
                        
                        {
                            editmode?
                            <>
                                <br/>
                                <input type="button" onClick={updateproduct} className="btn btn-primary" name="btn" value="Update Product" /> &nbsp;
                                <input type="button" onClick={clearfields} className="btn btn-primary" name="btn" value="Cancel" /><br/><br/>
                            </> : <input type="submit" name="btn" value="Add Product" />
                        }

                        </form>
                    </div><br/>
                    {
                    prodsdata.length>0?
                    <>
                        <h2>Added Products</h2><br/>
                        <table className="timetable_sub">
                            <tbody>
                                <tr>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Rate</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                {
                                    prodsdata.map((data,i)=>
                                        <tr key={i}>
                                        <td><img src={`uploads/${data.picname}`} height='75' alt="prodpic"/></td>
                                        <td>{data.prodname}</td>
                                        <td>{data.rate}</td>
                                        <td><button onClick={()=>handleupdate(data)} className="btn btn-primary">Update</button></td>
                                        <td><button onClick={()=>handledelete(data._id)} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <br/>
                        {prodsdata.length} products found
                    </>:null
                    }
                </div>
            </div>
        </>
    )
}
export default ManageProduct;