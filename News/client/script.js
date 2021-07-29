(async () => {

    try {

        let API_KEY = `0657b40e70d14c16bb3a05fbd6bbdfdf`
        let searchButton = document.querySelector("#searchButton");

        let search = async (KEY_WORD) => {
            let url = `https://newsapi.org/v2/everything?q=${KEY_WORD}&from=2021-07-29&sortBy=popularity&apiKey=${API_KEY}`
            let result = await fetch(url);
            let data = await result.json()

            for (object of data.articles) {
                console.log(`Image: ${object.urlToImage} \nTitle: ${object.title} \nContent: ${object.content}\nURL: ${object.url}\n`)
            }

            switch (data.totalResults) {
                case 0:
                    console.log('No results :(')
                    break;
                default:
                    break
            }
            console.log(`Total: ${data.totalResults}`)

        }

        searchButton.addEventListener('click', (event) => {
            let searchQuery = document.querySelector("#searchQuery").value;
            search(searchQuery)


            event.preventDefault()
        });


    } catch (err) {
        console.error(err)
    }

})();




// let url = `https://newsapi.org/v2/everything?q=Apple&from=2021-07-29&sortBy=popularity&apiKey=${API_KEY}`;
