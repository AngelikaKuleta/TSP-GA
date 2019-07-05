import Route from './Route.js';
import Population from './Population.js';

export function evolvePopulation(pop, mrate) {
    let newPop = new Population(pop.routes.slice());

    for (let i = 0; i < pop.routes.length; i=i+2) {
        // Select parents
        let parent1 = pop.routes[i];
        let parent2 = pop.routes[i+1];

        // Crossover parents
        let pos = Math.floor(Math.random() * parent1.cities.length)+1;
        let child1 = crossover(parent1, parent2, pos);
        let child2 = crossover(parent2, parent1, pos);

        // Mutation
        mutate(child1, mrate);
        mutate(child2, mrate);

        newPop.addRoute(new Route(child1));
        newPop.addRoute(new Route(child2));
    }

    // Selection
    newPop.routes.sort((a,b) => a.distance - b.distance);
    newPop.routes = newPop.routes.slice(0, pop.routes.length);

    return newPop;
}

function crossover(p1, p2, pos) {
    let child = [];

    for (let i = 0; i < pos; i++) {
        child.push(p1.cities[i]);
    }

    for (let c of p2.cities) {
        // If child doesn't have the city add it
        if (child.some(el => el.x == c.x && el.y == c.y) == false) {
            child.push(c); 
        }
    }
    return child;
}

function mutate(child, mrate) {
    for(let pos1=0; pos1 < child.length; pos1++){
        
        // Apply mutation rate
        if(Math.random() < mrate){
            let pos2 = Math.floor(child.length * Math.random());

            // Swap them around
            [child[pos1], child[pos2]] = [child[pos2], child[pos1]];
        }
    }
}