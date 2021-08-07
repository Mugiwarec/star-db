const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
    }

    return await res.json();
}

getResource('https://swapi.dev/api/people/123232')
    .then((body) => {
        console.log(body);
    })
    .catch((err) => {
        console.error('Could not fetch', err);
    });
