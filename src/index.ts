import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
// import product
import { Product } from './product';

// create express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// create product list
const products: Product[] = [];


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});


// mapping product path for post request
app.post('/product', (req: Request, res: Response) => {

    // destructuring name, price, quantity from request body
    const { name, price, quantity } = req.body;

    // check if name, price, quantity is not empty
    if (!name || !price || !quantity) {
        return res.status(400).send('Missing required parameters');
    }

    let product = new Product(name, price, quantity);
    products.push(product);

    res.status(200).send('Product added successfully');

});

app.get('/product/searchByName', (req: Request, res: Response) => {
    
    // destructuring name from query
    const { name } = req.query;

    // check if name is not empty
    if (!name) {
        return res.status(400).send('Missing name parameters');
    }
    let nameProduct = name.toString().toLowerCase();
    // find product by name
    const product = products.find((product) => product.name.toLocaleLowerCase() === nameProduct);

    if (!product) {
        return res.status(404).send('Product not found');
    }
    // send product details
    res.status(200).json({
        name: product.name,
        price: product.price,
        quantity: product.quantity
    });
    

});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});