import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//Import Boostrap components
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function Card2(props) {
	const [character, setCharacter] = useState(null);
	let baseURL = "https://www.swapi.tech/api/";

	function fetchGET(baseURL, extURL, result) {
		fetch(baseURL + extURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				result(data.result);
			});
	}

	//OBTENER LISTADO COMPLETO AL CARGAR LA PAGINA
	useEffect(() => {
		fetchGET(baseURL, "people/" + props.uid, setCharacter);
	}, []);

	return (
		<div ClassName="container">
			<div>
				{character != null ? (
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180" />
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
							<Card.Link href={character.properties.url}>Learn More</Card.Link>
						</Card.Body>
					</Card>
				) : (
					""
				)}
			</div>
		</div>
	);
}

Card2.propTypes = {
	uid: PropTypes.string
};
