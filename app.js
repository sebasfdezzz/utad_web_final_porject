const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const swaggerUi = require("swagger-ui-express");
const userRouter = require('./routes/users');
const merchantsRouter = require('./routes/merchants');
const webpagesRouter = require('./routes/webpages');
//const swaggerSpecs = require("./docs/swagger");
require("dotenv").config();
const dbConnect = require("./config/mongo");

const app = express();

app.use(cors());
app.use(express.json());

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))  //DOCUMENTACION

// morganBody(app, {
//     noColors: true,
//     skip: function(req, res) {
//         return res.statusCode < 400                                  //ERROR LOG
//     },
//     stream: loggerStream
// })

app.use("/users", userRouter);
app.use("/merchants", merchantsRouter);
app.use("/webpages", webpagesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
    dbConnect();
})

module.exports = app;