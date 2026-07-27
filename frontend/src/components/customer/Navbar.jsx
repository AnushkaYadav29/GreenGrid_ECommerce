import { Link } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";

import { FaHeart } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";

function Navbar(){

    return(

<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">

<div className="container">

<Link className="navbar-brand fw-bold fs-3 text-success" to="/">

🌱 GreenGrid

</Link>

<button
className="navbar-toggler"
data-bs-toggle="collapse"
data-bs-target="#nav">

<span className="navbar-toggler-icon"></span>

</button>

<div className="collapse navbar-collapse" id="nav">

<ul className="navbar-nav mx-auto">

<li className="nav-item">

<Link className="nav-link" to="/">

Home

</Link>

</li>

<li className="nav-item">

<Link className="nav-link" to="/products">

Products

</Link>

</li>

<li className="nav-item">

<Link className="nav-link" to="/categories">

Categories

</Link>

</li>

<li className="nav-item">

<Link className="nav-link" to="/about">

About

</Link>

</li>

</ul>

<form className="d-flex me-4">

<input

className="form-control"

placeholder="Search eco products"

/>

</form>

<div className="d-flex align-items-center gap-3">

<Link to="/wishlist" className="text-dark fs-5">

<FaHeart/>

</Link>

<Link to="/cart" className="text-dark fs-5">

<FaShoppingCart/>

</Link>

<Link to="/login" className="btn btn-green">

Login

</Link>

<FaUserCircle
size={32}
className="text-success"/>

</div>

</div>

</div>

</nav>

    )

}

export default Navbar;