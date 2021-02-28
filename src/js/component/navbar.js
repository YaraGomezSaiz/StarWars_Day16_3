import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//include your index.scss file into the bundle
import "../../styles/home.scss";

//Import Store,actions
import { Context } from "../store/appContext.js";

//Import Boostrap components
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
	const { store } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img
					className="logo"
					src="https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo_logotype.png"
					width="100"
					heigth="80"
				/>
			</Link>
			<div className="ml-auto">
				{/* <Link to="/demo"> */}
				<Dropdown>
					<Dropdown.Toggle variant="primary" id="dropdown-basic">
						Favorites {store.favorites.length}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				{/* </Link> */}
			</div>
		</nav>
	);
}
