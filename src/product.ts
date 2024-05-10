export class Product {
    public name: string;
    public price: number;
    public quantity: number;
    private id: number;
    private _id: number = 0;

    constructor(name: string, price: number, quantity: number) {
        this.id = this.generateId();
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Method to generate id
    generateId(): number {
        return (++this._id);
    }
}

