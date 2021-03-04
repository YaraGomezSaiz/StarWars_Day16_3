// import React
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.css";

//include your index.scss file into the bundle
import "../../styles/home.scss";

//Import public functions
import { myFetch } from "../fetchFunction.js";
//Import Components
import Card2 from "../component/cardCharacter.jsx";
import Planet from "../component/cardPlanet.jsx";

export default function Home() {
	const { store } = useContext(Context);
	const [characters, setCharacters] = useState(null);
	const [planets, setPlanets] = useState(null);

	//OBTENER LISTADO COMPLETO AL CARGAR LA PAGINA
	useEffect(() => {
		loadPeople();
		loadPlanets();
	}, []);

	async function loadPeople() {
		let resultJson = await myFetch(store.demo[2].baseURL, "people/");
		setCharacters(resultJson.results);
	}
	async function loadPlanets() {
		let resultJson = await myFetch(store.demo[2].baseURL, "planets/");
		setPlanets(resultJson.results);
	}

	//

	return (
		<div className="container-fluid">
			<h1 className="title">Characters</h1>

			<div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
				<div className="col-5">
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

			<div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
				<div className="col-5">
					{planets != null ? (
						<ul>
							{planets.map(planet => {
								return <Planet key={planet.uid} uid={planet.uid} />;
							})}
						</ul>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
