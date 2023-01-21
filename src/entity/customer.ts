import Address from "./address";

class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;

        this._name = name;

        this.validate();
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
            throw Error('Error is mandatory to activate a costumer');

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    set address(address: Address){
        this._address = address;
    }
}