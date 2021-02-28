import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

//Import Store,actions
import { Context } from "../store/appContext.js";

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

export default function Card2(props) {
	const { store } = useContext(Context);
	const [character, setCharacter] = useState(null);
	const [favorite, setFavorite] = useState(false);
	const [showSolidIcon, setShowSolidIcon] = useState(false);

	//Obtener de la API las propiedades de cada personaje
	useEffect(() => {
		myFetch(store.demo[2].baseURL, "people/" + props.uid).then(data => {
			setCharacter(data.result);
		});
	}, []);

	function addToFavorites() {
		if (!favorite) {
			store.favorites.push(character.properties.name);
		} else {
			let index = store.favorites.findIndex(index => index === character.properties.name);
			store.favorites.splice(index, 1);
		}
		setFavorite(!favorite);
		console.log(store.favorites);
		console.log(store.favorites.length);
	}

	return (
		<li>
			{character != null ? (
				<Card style={{ width: "18rem" }}>
					<Card.Img variant="top" src="https://picsum.photos/400/300/" />
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
							<Button className="btnLearnMore" href={character.properties.url} target="_blank">
								Learn More!
							</Button>
							<Button
								className="btnFavorites"
								href=""
								onClick={addToFavorites}
								onMouseOver={() => setShowSolidIcon(true)}
								onMouseLeave={() => setShowSolidIcon(false)}>
								{favorite || showSolidIcon ? (
									<FontAwesomeIcon icon={faHeart} />
								) : (
									<FontAwesomeIcon icon={farHeart} />
								)}
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
