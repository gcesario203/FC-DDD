export default class Address {
     private _street: string;
     private _zip: string;
     private _city: string;
     private _number: number;

    constructor(street: string, zip: string, city: string, number: number) {
        this._street = street;

        this._zip = zip;

        this._city = city;

        this._number = number;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get zipCode(): string {
        return this._zip;
    }
    get city(): string {
        return this._city;
    }

    get number(): number {
        return this._number;
    }

    validate() {
        if (this.isNullOrEmpty(this._city))
            throw Error('Required Field')
        if (this.isNullOrEmpty(this._street))
            throw Error('Required Field')
        if (this.isNullOrEmpty(this._zip))
            throw Error('Required Field')
        if (this._number <= 0)
            throw Error('Required Field')
    }

     isNullOrEmpty(property: string): boolean {
        return !!!property || property.length === 0;
    }

    toString(){
        return `${this._street}, ${this._number}, ${this._zip} - ${this._number}`
    }
}