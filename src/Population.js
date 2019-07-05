export default class Population {
    // Construct a population
    constructor(routes) {
        this.routes = routes || [];
    }

    getFittest() {
        let fittest = this.routes[0];
        for (let i = 1; i < this.routes.length; i++) {
            if (fittest.distance < this.routes[i].distance) {
                fittest = this.routes[i];
            }
        }
        return fittest;
    }

    addRoute(route) {
        this.routes.push(route);
    }
}