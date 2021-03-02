const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
				{
					baseURL: "https://www.swapi.tech/api/"
				},
				{ name: "yara" }
			],
			characters: [],
			planets: [],
			favorites: []
			// favorite: false
		},
		actions: {
			setCharacters(characters) {
				setStore({ characters: characters });
			},

			setPlanets(planets) {
				setStore({ planets: planets });
			},

			setFavorites(favorites) {
				setStore({ favorites: favorites });
			},

			// lookForFavorites(name) {
			// 	let index = favorites.findIndex(index => index === name);
			// 	let favorite;
			// 	if (index === -1) {
			// 		setFavorite(true);
			// 	} else {
			// 		setFavorite(false);
			// 	}
			// },

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
