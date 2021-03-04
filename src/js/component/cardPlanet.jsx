import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

//Import Store,actions
import { Context } from "../store/appContext.js";

//Import Link to other pages
import { Link, useParams } from "react-router-dom";

//Import Boostrap components
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

//Import icons from FontAwesome
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

//Import public functions
import { myFetch } from "../fetchFunction.js";
import isFavorite from "../isFavorite.js";

export default function Card2(props) {
	const { store, actions } = useContext(Context);
	const [planet, setPlanet] = useState(null);
	let favorite = false;
	let msdate = 0;

	//Obtener de la API las propiedades de cada personaje
	useEffect(() => {
		myFetch(store.demo[2].baseURL, "planets/" + props.uid).then(data => {
			setPlanet(data.result);
			let planetsArray = Array.from(store.planets);
			planetsArray.push(data.result);
			actions.setPlanets(planetsArray);
		});
	}, []);

	if (planet != null) {
		favorite = isFavorite(planet.properties.name, store.favorites);
	}

	function addToFavorites(name, array, favorite) {
		let index = array.findIndex(elem => elem.properties.name === name);
		let favoritesArray = Array.from(array);
		if (!favorite) {
			favoritesArray.push(planet);
		} else {
			favoritesArray.splice(index, 1);
		}
		actions.setFavorites(favoritesArray);
	}

	//nos entrega la fecha en ms que luego pasamos a la web generadora de imagenes como parametro,
	//esto nos permite que nos cargue una imagen diferente en cada Card pq detecta que son peticiones diferentes, sino la misma en todas las cards

	let date = new Date();
	msdate = date.getTime();

	return (
		<li>
			{planet != null ? (
				<Card style={{ width: "18rem" }}>
					<Card.Img variant="top" src={"https://picsum.photos/400/300/?t" + msdate} />
					<Card.Body>
						<Card.Title />
						<h3> {planet.properties.name}</h3>
						<Card.Text>
							<div>
								{" "}
								Population:
								{planet.properties.population}
							</div>
							<div>Terrain: {planet.properties.terrain} </div>
						</Card.Text>
						<div className="d-flex justify-content-between">
							<Link to={"descriptionPlanet/" + props.uid}>
								<Button className="btnLearnMore" href={planet.properties.url}>
									Learn More!
								</Button>
							</Link>

							<Button
								variant="outline-warning"
								onClick={() => addToFavorites(planet.properties.name, store.favorites, favorite)}>
								{favorite ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={farHeart} />}
							</Button>
						</div>
					</Card.Body>
				</Card>
			) : (
				""
			)}
		</li>
	);
}

Card2.propTypes = {
	uid: PropTypes.string
};
