import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { toast } from 'react-toastify';
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}
const fadeImages = [
    {
        url: 'images/11.jpg'
    },
    {
        url: 'images/22.jpg',
    },
    {
        url: 'images/44.jpg'
    },
];

function Home() {
    const [prodsdata, setprodsdata] = useState([]);

    useEffect(() => {
        fetchlatestprods();
    }, [])

    async function fetchlatestprods() {
        try {
            const apiresp = await axios.get(`http://localhost:9000/api/getlatestprods`)
            if (apiresp.data.success === 1) {
                setprodsdata(apiresp.data.pdata)
            }
            else if (apiresp.data.success === 0) {
                setprodsdata([])
            }
            else {
                toast.error("Some error occured, try again")
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
    }

    return (
        <>
            <div className="slide-container">
                <Fade>
                    {fadeImages.map((fadeImage, index) => (
                        <div key={index}>
                            <img height='450' style={{ width: '100%' }} src={fadeImage.url} />
                        </div>
                    ))}
                </Fade>
            </div>
            <div className="login">
                <div className="container">
                    {
                        prodsdata.length > 0 ?
                            <>
                                <h2>Latest Products</h2><br />
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
export default Home;