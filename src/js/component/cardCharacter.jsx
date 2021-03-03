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
	const [character, setCharacter] = useState(null);
	// const [showSolidIcon, setShowSolidIcon] = useState(false);
	let favorite = false;
	let msdate = 0;

	//Obtener de la API las propiedades de cada personaje
	useEffect(() => {
		myFetch(store.demo[2].baseURL, "people/" + props.uid).then(data => {
			setCharacter(data.result);
			let charactersArray = Array.from(store.characters);
			charactersArray.push(data.result);
			actions.setCharacters(charactersArray);
		});
	}, []);

	if (character != null) {
		favorite = isFavorite(character.properties.name, store.favorites);
	}

	function addToFavorites(name, array, favorite) {
		let index = array.findIndex(elem => elem.properties.name === name);
		let favoritesArray = Array.from(array);
		if (!favorite) {
			favoritesArray.push(character);
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
			{character != null ? (
				<Card style={{ width: "18rem" }}>
					<Card.Img variant="top" src={"https://picsum.photos/400/300/?t" + msdate} />
					<Card.Body>
						<Card.Title />
						<h3>{character.properties.name}</h3>
						<Card.Text>
							<div>
								{" "}
								Gender:
								{character.properties.gender}
							</div>
							<div>Hair Color: {character.properties.hair_color} </div>
							<div>Eye-Color: {character.properties.eye_color}</div>
						</Card.Text>

						<div className="d-flex justify-content-between">
							<Link to={"single/" + props.uid}>
								<Button className="btnLearnMore" href={character.properties.url}>
									Learn More!
								</Button>
							</Link>

							<Button
								variant="outline-warning"
								onClick={() => addToFavorites(character.properties.name, store.favorites, favorite)}

								// onMouseOver={() => setShowSolidIcon(true)}
								// onMouseLeave={() => setShowSolidIcon(false)}
							>
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
