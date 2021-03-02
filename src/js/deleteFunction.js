export default function deleteItemFromArray(array, lookForIndex) {
	let deleteArray = Array.from(array);
	let index = deleteArray.findIndex(index => index === lookForIndex);
	deleteArray.splice(index, 1);
	return deleteArray;
}
