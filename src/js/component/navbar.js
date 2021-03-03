import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//include your index.scss file into the bundle
import "../../styles/home.scss";

//Import icons from FontAwesome
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//Import Store,actions
import { Context } from "../store/appContext.js";

//Import Boostrap components
import { Navbar, NavDropdown, Dropdown, Button } from "react-bootstrap";

//Import public functions
import deleteItemFromArray from "../deleteFunction.js";

export default function NavbarFixed() {
	const { store, actions } = useContext(Context);

	function deleteFavoriteItem(lookForIndex) {
		let favoritesArray = Array.from(store.favorites);
		let index = favoritesArray.findIndex(index => index === lookForIndex);
		favoritesArray.splice(index, 1);
		actions.setFavorites(favoritesArray);
	}

	return (
		<nav className="navbar navbar-light bg-light mb-3" sticky="top">
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
						Favorites <span className="bg-secondary"> {store.favorites.length}</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{store.favorites.length > 0
							? store.favorites.map(favorite => {
									return (
										<Dropdown.Item
											className="d-flex justify-content-between"
											key={favorite.properties.name}>
											<Link to={"single/" + favorite.uid}>
												<Button variant="link">{favorite.properties.name}</Button>
											</Link>
											<Button
												className="deleteBtn"
												variant="link"
												text="black"
												onClick={() => deleteFavoriteItem(favorite.properties.name)}>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
										</Dropdown.Item>
									);
							  })
							: "Empty"}
					</Dropdown.Menu>
				</Dropdown>
				{/* </Link> */}
			</div>
		</nav>
	);
}
