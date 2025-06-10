require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
app.use('/uploads', express.static('uploads'));
const connectDB = require("./config/db")

connectDB()
app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'));

app.use("/api",require("./routes/Login"))
app.use("/api",require("./routes/Customers"))
app.use("/api",require("./routes/ProductBrand"))
app.use("/api",require("./routes/Categorie"))
app.use("/api",require("./routes/SubCategorite"))
app.use("/api",require("./routes/Vender"))
app.use("/api",require("./routes/Product"))
app.use("/api",require("./routes/Order"))
app.use("/api",require("./routes/Location"))
app.use("/api",require("./routes/CreateUser"))
app.use("/api",require("./routes/ManageRole"))
app.use("/api",require("./routes/Pantry_User/CustomerData"))
app.use("/api",require("./routes/Pantry_User/Balence"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})