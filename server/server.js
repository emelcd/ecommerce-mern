import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

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

app.get("/", (req, res) => {
    res.send({
        message: "Hello World"
    });
});

app.post("/buy", (req, res) => {
    console.log(
        req.body
    )
    res.send({
        status: 201
    });
});

app.listen(4000,()=>{
    console.log('server is running on port 4000')
}
)

