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

export const DescriptionPlanet = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [planet, setCharacter] = useState(null);
	let id = null;

	function findArrayItem(lookForUid, array) {
		let index = array.findIndex(elem => elem.uid === lookForUid);
		if (index !== -1) {
			id = index;
		}
	}

	//Obtener de la API las propiedades de cada personaje
	useEffect(() => {
		if (store.planets[params.id] !== undefined) {
			findArrayItem(params.id, store.planets);
			setCharacter(store.planets[id]);
		} else {
			myFetch(store.demo[2].baseURL, "planets/" + params.id).then(data => {
				setCharacter(data.result);
			});
		}
	}, []);

	return (
		<div>
			{planet !== null ? (
				<Card className="d-flex justify-content-center" style={{ width: "50rem" }}>
					<Card.Body className="d-flex justify-content-around">
						<Card.Img className="col-8" variant="left" src="https://picsum.photos/600/400/" />
						<div>
							<Card.Title className=" text-center">{planet.properties.name}</Card.Title>
							<Card.Text className="text-center">{planet.description}. </Card.Text>
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
							<td className="item">{planet.properties.name}</td>
							<td className="item">{planet.properties.birth_year}</td>
							<td className="item">{planet.properties.gender}</td>
							<td className="item">{planet.properties.height}</td>
							<td className="item">{planet.properties.skin_color}</td>
							<td className="item">{planet.properties.eye_color}</td>
						</tr>
					</Card.Footer>
				</Card>
			) : (
				""
			)}
		</div>
	);
};

DescriptionPlanet.propTypes = {
	match: PropTypes.object
};
