import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Categories() {
    const [catdata, setcatdata] = useState([]);
    async function fetchcategories() {
        try {
            const apiresp = await axios.get(`http://localhost:9000/api/getallcat`)
            if (apiresp.data.success === 1) {
                setcatdata(apiresp.data.cdata)
            }
            else if (apiresp.data.success === 0) {
                setcatdata([])
                toast.info("No categories found")
            }
            else {
                toast.error("Some error occured, try again")
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
    }
    useEffect(() => {
        fetchcategories();
    }, [])

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Categories</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
            {
                catdata.length > 0 ?
                    <>
                        <h2>Product Categories</h2><br />
                        {
                            catdata.map((data, i) =>
                                <div key={i} className="col-md-4 top_brand_left">
                                    <div className="hover14 column">
                                        <div className="agile_top_brand_left_grid">
                                            <div className="agile_top_brand_left_grid1">
                                                <figure>
                                                    <div className="snipcart-item block" >
                                                        <div className="snipcart-thumb">
                                                            <Link to={`/products?id=${data._id}`}>
                                                            <img height='125' title=" " alt=" " src={`uploads/${data.picname}`} />
                                                            <p>{data.catname}</p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </> : null
            }
                </div>
            </div>
        </>
    )
}
export default Categories;