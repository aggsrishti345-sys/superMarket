import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function SearchResults() {
    const [prodsdata, setprodsdata] = useState([]);
    const [params] = useSearchParams();
    const stext = params.get("s")

    useEffect(()=>
    {
        if(stext!=="")
        {
            searchprods();
        }
    },[stext])
    async function searchprods()
    {
        try
        {
            const apiresp = await axios.get(`http://localhost:9000/api/searchproducts?q=${stext}`)
            if(apiresp.data.success===1)
            {
               setprodsdata(apiresp.data.pdata)
            }
            else if(apiresp.data.success===0)
            {
               setprodsdata([])
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
                            <Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Search Results</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
            {
                prodsdata.length > 0 ?
                    <>
                        <h2>Search Results</h2><br />
                        {
                            prodsdata.map((data, i) =>
                                <div key={i} className="col-md-4 top_brand_left">
                                    <div className="hover14 column">
                                        <div className="agile_top_brand_left_grid">
                                            <div className="agile_top_brand_left_grid1">
                                                <figure>
                                                    <div className="snipcart-item block" >
                                                        <div className="snipcart-thumb">
                                                            <Link to={`/details?id=${data._id}`}>
                                                            <img height='125' title=" " alt=" " src={`uploads/${data.picname}`} />
                                                            <p>{data.prodname}</p>
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
                    </> : <h2>No products found</h2>
            }
                </div>
            </div>
        </>
    )
}
export default SearchResults;