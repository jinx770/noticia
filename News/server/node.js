
let express = require('express');
let app = express();
let config = require(`${process.cwd()}/config.json`);
let fetch = require('node-fetch');


app.get('/trending', async (request, response) => {
    fetch(`https://newsapi.org/v2/top-headlines?sources=CNN,fox-news&apiKey=${config.API_KEY}`)
        .then(res => res.json())
        .then(json => response.send(json));
});

app.get('/news', async (request, response) => {
    let searchQuery = request.query.searchQuery;
    fetch(`https://newsapi.org/v2/top-headlines?category=${searchQuery}&country=us&apiKey=${config.API_KEY}`)
        .then(res => res.json())
        .then(json => response.send(json));
});

app.get('/search', async (request, response) => {
    let KEY_WORD = request.query.KEY_WORD;
    fetch(`https://newsapi.org/v2/everything?q=${KEY_WORD}&sources=CNN,fox-news&sortBy=publishedAt&apiKey=${config.API_KEY}`)
        .then(res => res.json())
        .then(json => response.send(json));
});


app.use(express.static("client"));
app.listen(3000)
