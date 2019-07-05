export default class Route {
    constructor(cities) {
        this.cities = cities 
        this.distance = this.getDistance();
    }
    
    getDistance(){
        let d = 0;    
        for (let i in this.cities) { 
            let sourceCity = this.cities[i], destinationCity;
            if(i < this.cities.length-1){
                destinationCity = this.cities[parseInt(i)+1];
            }
            else {
                destinationCity = this.cities[0]
            }
            d += sourceCity.distanceTo(destinationCity);
        }
        return d;
    }
}