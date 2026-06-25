const express = require("express");
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 4000;
app.use(express.json());

require("./config/database").connect();

// import routes

const User = require("./routes/user");
app.use("/api/v1" , User);

app.listen(PORT , () => {
    console.log(`Server Started at Port${PORT}`);
});