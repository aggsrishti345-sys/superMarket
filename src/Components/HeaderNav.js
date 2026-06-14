import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { datacontext } from "../App"
import { toast } from "react-toastify";

function HeaderNav()
{
	const {udata,setudata} = useContext(datacontext)//reading udata,setudata of app.js through context
	const navigate = useNavigate();
	const [stext,setstext]= useState();
	const handlelogout=()=>
	{
		setudata(null);
		sessionStorage.removeItem("uinfo");
		navigate("/login")
		toast.info('You have succesfully logged out')
	}
	const handlesearch=(e)=>
	{
		e.preventDefault();
		navigate(`/search?s=${stext}`)
	}
    return(
        <>
            <div className="agileits_header">
		<div className="container">
			<div className="w3l_offers">
				<p>Welcome {udata===null?"Guest":udata.name}</p>
			</div>
			<div className="agile-login">
				<ul>
					{
					udata===null?
					<>
						<li><Link to="/signup">Create Account</Link></li>
						<li><Link to="/login">Login</Link></li>
					</>:
					<>
						<li><Link to="/changepassword">Change Password</Link></li>
						<li><Link to="/orderhistory">Order History</Link></li>
						<li><button className="btn btn-primary" onClick={handlelogout}>Logout</button></li>
					</>
					}
				
				</ul>
			</div>
			<div className="product_list_header">  
					
	{udata!==null?		
	<button onClick={()=>navigate("/showcart")} className="w3view-cart" type="submit" name="submit" value=""><i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>:null}
					
			</div>
			<div className="clearfix"> </div>
		</div>
	</div>

	<div className="logo_products">
		<div className="container">
		<div className="w3ls_logo_products_left1">
				<ul className="phone_email">
					<li><i className="fa fa-phone" aria-hidden="true"></i>Order online or call us : 9873462702 </li>
					
				</ul>
			</div>
			<div className="w3ls_logo_products_left">
				<h1><Link to="/">SUPER MARKET</Link></h1>
			</div>
		<div className="w3l_search">
			<form name="form1" onSubmit={handlesearch}>
				<input type="search" name="Search" onChange={(e)=>setstext(e.target.value)} placeholder="Search for a Product..." required=""/>
				<button type="submit" className="btn btn-default search" aria-label="Left Align">
					<i className="fa fa-search" aria-hidden="true"> </i>
				</button>
				<div className="clearfix"></div>
			</form>
		</div>
			
			<div className="clearfix"> </div>
		</div>
	</div>

	<div className="navigation-agileits">
		<div className="container">
			<nav className="navbar navbar-default">
							<div className="navbar-header nav_2">
								<button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
							</div> 
							<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
								<ul className="nav navbar-nav">
									<li><Link to="/homepage">Home</Link></li>
									<li><Link to="/categories">Products</Link></li>
									<li><a href="contact.html">Contact</a></li>
								</ul>
							</div>
							</nav>
			</div>
		</div>


        </>
    )
}
export default HeaderNav