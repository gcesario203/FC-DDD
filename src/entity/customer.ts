import Address from "./address";

export default class Customer {
     private _id: string;
     private _name: string;
     private _address!: Address;
     private _active: boolean = true;
     private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;

        this._name = name;

        this.validate();
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }
    get id(): string {
        return this._id;
    }


    validate() {
        if (!!!this._name || this._name.length === 0)
            throw Error('Name is required');

        if (!!!this._id || this._id.length === 0)
            throw Error('Id is required');
    }

    set name(name: string) {
        this._name = name;
    }

    changeName(name: string) {
        this._name = name;

        this.validate();
    }

    activate() {
        if (!this._address)
            throw Error('Address is mandatory to activate a costumer');

        this._active = true;
    }

    isActive(){
        return this._active;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    set Address(address: Address){
        this._address = address;
    }
}