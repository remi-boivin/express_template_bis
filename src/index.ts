const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// Parse URL-encoded bodies (as sent by HTML forms)
const bodyParser = require('body-parser');
//use cors to accept other non domain websites to access api
const cors = require('cors');
//parse cookies sent via http requests
//const cookieParser = require('cookie-parser');
require('dotenv-flow').config();
import { apiRouter } from './modules/apiRouter'

app.use(cors());
//app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use((err, req, res) => {
    console.log("handleError", err.message)
    handleError(err, res)
})

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});

module.exports = app

function handleError(err, res) {
    res.status(err.statusCode || 500).send(err.message || "Unkown error"); // TODO: remove stack when on PROD.
}