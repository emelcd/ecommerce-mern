import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {v4} from "uuid";

const Schema = mongoose.Schema;

const itemShopSchema = new Schema({
    id : Number,
    title: String,
    price: Number,
    image: String,
    quantity: Number,
    price: Number,
    description: String,
    category: String,
    rating: {
        rate: Number,
        count: Number
    }
});

const ticketShopSchema = new Schema({
    id : String,
    date: String,
    products: [itemShopSchema]
});

const ticketShop = mongoose.model('ticketShop', ticketShopSchema);
const itemShop = mongoose.model('itemShop', itemShopSchema);
const app = express();

app.use(cors());

async function connectToDatabase() {
  try {
      await mongoose.connect('mongodb://localhost:27017', {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log('Connected to database');
  }
  catch (error) {
    console.log(error);
  }
}

connectToDatabase();

app.use(express.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())

app.get("/products", (req, res) => {
    itemShop.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(data);
        }
    });
});

app.post("/buy", (req, res) => {
    const obj = {
        id: v4(),
        date: new Date().toLocaleString(),
        products: req.body
    }
    try {
        const ticket = new ticketShop(obj);
        ticket.save();
        res.send({
            status: 201
        });
    }
    catch (error) {
        res.status(500).send(error);
    }

    
});

app.listen(4000,()=>{
    console.log('server is running on port 4000')
}
)

console.log("https://fakestoreapi.com/products")
