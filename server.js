const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();
const {readdirSync} = require("fs")
const dotenv = require("dotenv")
dotenv.config()

app.use(cors());
app.use(express.json());

readdirSync("./routes").map((route) => {
 app.use("/", require("./routes/" + route))
})

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}).then(() => console.log("Database is connection")).catch((err) => console.log("Conneting error", err))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server is running on " + PORT)
})