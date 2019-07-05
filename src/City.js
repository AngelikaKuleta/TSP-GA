export default class City {    
    constructor(x, y) {
        
        this.x = x || Math.random()*401;
        this.y = y || Math.random()*401;
    }
    
    distanceTo(city) {
        let dx = Math.abs(this.x - city.x);
        let dy = Math.abs(this.y - city.y);
        return Math.floor(Math.sqrt(dx*dx + dy*dy));
    }
}
