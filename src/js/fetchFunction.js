export async function myFetch(baseURL, path, method = "GET") {
	return fetch(baseURL + path, {
		method: method,
		headers: { "Content-Type": "application/json" }
	}).then(response => response.json());
}

//placeholders.com

//OTRA FORMA DE GENERAR FUNCION FETCH

// export async function myFetch(baseURL, path) {

//     let response= await fetch(baseURL + path, {
// 		method: "GET",
// 		headers: { "Content-Type": "application/json" }
//     })

//    return await response.json();
