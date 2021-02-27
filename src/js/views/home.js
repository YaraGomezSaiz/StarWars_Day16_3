// import React
import React, { useState, useEffect } from "react";

//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.css";

//include your index.scss file into the bundle
import "../../styles/index.scss";

//Import public functions
import { myFetch } from "../fetchFunction.js";
//Import Components
import Card2 from "../component/card.jsx";

export default function Home() {
	const [characters, setCharacters] = useState(null);

	let baseURL = "https://www.swapi.tech/api/";

	async function loadPeople() {
		let peopleJson = await myFetch(baseURL, "people/");

		setCharacters(peopleJson.results);
	}

	//OBTENER LISTADO COMPLETO AL CARGAR LA PAGINA
	useEffect(() => {
		// // fetchGET(baseURL, "planets/", setPlanets, setPlanetsLoad);
		// myFetch(baseURL, "people/").then(data => {
		// 	setCharacters(data);
		// });
		loadPeople();
	}, []);

	return (
		<div className="text-center mt-5">
			{/* {planetsHTML} */}

			<h1>Characters</h1>
			<div className="">
				{characters != null ? (
					<ul>
						{characters.map(person => {
							return <Card2 key={person.uid} uid={person.uid} />;
						})}
					</ul>
				) : (
					""
				)}
			</div>
		</div>
	);
}
