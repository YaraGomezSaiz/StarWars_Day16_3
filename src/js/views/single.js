import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

//Import Boostrap components
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "../../styles/demo.scss";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	console.log(store.characters[params.id]);
	console.log(params.id);
	let id = 0;

	function findArrayItem(lookForUid, array, idResult) {
		let index = array.findIndex(elem => elem.uid === lookForUid);
		if (index !== -1) {
			id = index;
		}
	}

	findArrayItem(params.id, store.characters, id);

	return (
		<Card className="d-flex justify-content-center" style={{ width: "50rem" }}>
			<Card.Body className="d-flex justify-content-around">
				<Card.Img className="col-8" variant="left" src="https://picsum.photos/600/400/" />
				<div>
					<Card.Title className=" text-center">{store.characters[id].properties.name}</Card.Title>
					<Card.Text className="text-center">{store.characters[id].description}. </Card.Text>
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
					<td className="item">{store.characters[id].properties.name}</td>
					<td className="item">{store.characters[id].properties.birth_year}</td>
					<td className="item">{store.characters[id].properties.gender}</td>
					<td className="item">{store.characters[id].properties.height}</td>
					<td className="item">{store.characters[id].properties.skin_color}</td>
					<td className="item">{store.characters[id].properties.eye_color}</td>
				</tr>
			</Card.Footer>
		</Card>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
