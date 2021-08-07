
const getResource = async (url) => {
    const res = await fetch(url);
    return await res.json();
}

getResource('https://swapi.dev/api/people/1')
    .then((body) => {
        console.log(body);
    });

// fetch('https://swapi.dev/api/people/1')
//     .then((res) => {
//         return res.json();
//     })
//     .then((body) => {
//         console.log(body);
//     });