export default function isFavorite(name, array) {
	let index = array.findIndex(elem => elem.properties.name === name);
	if (index === -1) {
		return false;
	} else {
		return true;
	}
}
