import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

//Import Boostrap components
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

//funciones propias
import { myFetch } from "../fetchFunction.js";

import "../../styles/demo.scss";

export const DescriptionCharacter = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [character, setCharacter] = useState(null);
	let id = null;

	function findArrayItem(lookForUid, array) {
		let index = array.findIndex(elem => elem.uid === lookForUid);
		if (index !== -1) {
			id = index;
		}
	}

	//Obtener de la API las propiedades de cada personaje
	useEffect(() => {
		if (store.characters[params.id] !== undefined) {
			findArrayItem(params.id, store.characters);
			setCharacter(store.characters[id]);
		} else {
			myFetch(store.demo[2].baseURL, "people/" + params.id).then(data => {
				setCharacter(data.result);
			});
		}
	}, []);

	return (
		<div>
			{character !== null ? (
				<Card className="d-flex justify-content-center" style={{ width: "50rem" }}>
					<Card.Body className="d-flex justify-content-around">
						<Card.Img className="col-8" variant="left" src="https://picsum.photos/600/400/" />
						<div>
							<Card.Title className=" text-center">{character.properties.name}</Card.Title>
							<Card.Text className="text-center">{character.description}. </Card.Text>
						</div>
					</Card.Body>

					<Card.Footer className="justify-content-center">
						<tr className="col-5 footer_table ">
							<th className="item">Name</th>
							<th className="item">Birth Year</th>
							<th className="item">Gender</th>
							<th className="item">Height</th>
							<th className="item">Skin Color</th>
							<th className="item">Eye Color</th>
						</tr>
						<tr className="col-5 footer_table">
							<td className="item">{character.properties.name}</td>
							<td className="item">{character.properties.birth_year}</td>
							<td className="item">{character.properties.gender}</td>
							<td className="item">{character.properties.height}</td>
							<td className="item">{character.properties.skin_color}</td>
							<td className="item">{character.properties.eye_color}</td>
						</tr>
					</Card.Footer>
				</Card>
			) : (
				""
			)}
		</div>
	);
};

DescriptionCharacter.propTypes = {
	match: PropTypes.object
};
