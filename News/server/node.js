
let express = require("express");
let app = express();

app.use(express.static("client"));
app.listen(3000)
