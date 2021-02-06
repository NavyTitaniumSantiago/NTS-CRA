import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'


const Navbar: React.FC = props =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark navbar-default m-2">
            <div className="container-fluid">
                <Link to = {{pathname: "/", key: "1"}}className = "navbar-brand ps-3 fs-3">Work Out App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    </ul>
                    <ul className="nav navbar-nav ml-auto ">
                        <Link to="/signup" className="nav-link d-flex align-items-center justify-content-center"><li className="nav-item">
                            Sign Up
                        </li></Link>

                        <Link to="/login" className="nav-link d-flex align-items-center justify-content-center">
                        <li className="nav-item"> Login</li>
                        </Link>
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}


export default Navbar