import Address from "./address";

export default class Customer {
     _id: string;
     _name: string;
     _address!: Address;
     _active: boolean = true;

    constructor(id: string, name: string) {
        this._id = id;

        this._name = name;

        this.validate();
    }

    get name(): string {
        return this._name;
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

    set Address(address: Address){
        this._address = address;
    }
}