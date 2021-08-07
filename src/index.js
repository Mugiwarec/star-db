class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        console.log(`full url: ${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}${url}` +
                `, received ${res.status}`);
        }

        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results;
    };

    async getPerson(id) {
        return await this.getResource(`/people/${id}`);
    };

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results;
    };

    async getPlanet(id) {
        return await this.getResource(`/planets/${id}`);
    };

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results;
    };

    async getStarship(id) {
        return await this.getResource(`/starships/${id}`);
    };
}

const swapi = new SwapiService();

swapi.getPerson(3).then((person) => {
    console.log(person.name);
});

swapi.getAllPeople().then((people) => {
    people.forEach((p) => {
        console.log(p.name);
    });
}).catch((err) => {
    console.log(err);
});

