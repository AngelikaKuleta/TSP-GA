import City from './City.js';
import Route from './Route.js';
import Population from './Population.js';
import { evolvePopulation } from './geneticAlgorithm.js';

let canvas = document.getElementById("graph");
let ctx = canvas.getContext("2d");

const citiesCount = 20

let cities = [];
let i = 0
while (i < citiesCount) {
    cities.push(new City());
    i++
}

drawPoints(cities);
document.getElementById('generate').addEventListener("click", generate);
let result = document.getElementById("result");


function generate(e) {
    e.preventDefault();

    //initialize
    let size = parseInt(document.getElementById("population").value);
    let mutationRate = parseFloat(document.getElementById("mrate").value);
    let generations = parseInt(document.getElementById("generations").value);
    let text = "";

    let population = new Population();
    for (let i = 0; i < size; i++) {
        let c = sortRandomize(cities).slice()
        let route = new Route(c);
        population.addRoute(route);
    }

    text += `<li>Initial distance: ${population.getFittest().distance}</li>`;

    // Evolve population for x generations
    for (let i = 0; i < generations; i++) {
        population = evolvePopulation(population, mutationRate);
    }

    text += `<li>Final distance: ${population.routes[0].distance}</li>`;
    drawRoute(population.routes[0].cities);
    result.innerHTML = text;
}

function drawPoints(cities) {	 

	for (let i in cities) {
		ctx.moveTo(cities[i].x+50, cities[i].y+50)
		ctx.arc(cities[i].x+50, cities[i].y+50, 2, 0, Math.PI*2);
    }	

    ctx.fill();
    
}

function sortRandomize(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function drawRoute(cities) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    drawPoints(cities);
    ctx.font = "14px Segoe UI,Helvetica,Arial,sans-serif";
    ctx.fileStyle = "#000";
    ctx.moveTo(cities[0].x+50, cities[0].y+50)

    for (i = 0; i < cities.length; i++) {
        ctx.lineTo(cities[i].x+50, cities[i].y+50)
        ctx.fillText(i+1, cities[i].x+54, cities[i].y+50);
    }	
    ctx.lineTo(cities[0].x+50, cities[0].y+50)
    ctx.closePath();
    ctx.stroke();
}