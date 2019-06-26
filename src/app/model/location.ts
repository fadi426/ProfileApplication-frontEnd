export class Location {
    _name: string;
    _longitude: string;
    _latitude: string;
    _province: string;
    _country: string;

    constructor(name, longitude, latitude, province, country){
        this._name = name;
        this._longitude = longitude;
        this._latitude = latitude;
        this._province = province;
        this._country = country;
    }
    
    get name(): string {
        return this._name;
    }

    get longitude(): string {
        return this.longitude;
    }

    get latitude(): string {
        return this._latitude;
    }

    get province(): string {
        return this._province;
    }

    get country(): string {
        return this._country;
    }
}
