(async () => {

    try {

        let API_KEY = `0657b40e70d14c16bb3a05fbd6bbdfdf`
        let newsCard = document.querySelectorAll(".newCard");
        let menuButton = document.querySelector("#menuButton");

        let search = async (KEY_WORD) => {
            let url = `https://newsapi.org/v2/everything?q=${KEY_WORD}&sources=CNN&sortBy=publishedAt&apiKey=${API_KEY}`
            let result = await fetch(url);
            let data = await result.json()
            for (object of data.articles) {
                let searchResultsObject = {
                    image: object.urlToImage,
                    title: object.title,
                    content: object.content,
                    url: object.url
                }
                console.log(searchResultsObject)
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

        let getDate = (shortDate) => {
            let newDate = new Date(shortDate)
            let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            shortDate = newDate.getDate()
            shortMonth = newDate.getMonth()
            fixedDate = monthNames[shortMonth] + " " + shortDate

            return fixedDate
        }


        let pageSetup = async () => {


            menuButton.addEventListener('change', () => {
                if (menuButton.checked) {
                    document.querySelector(".the-bass").classList.add("dropped");
                } else {
                    document.querySelector(".the-bass").classList.remove("dropped");
                }
            })






            let url = `https://newsapi.org/v2/top-headlines?sources=CNN,fox-news&apiKey=${API_KEY}`
            let results = await fetch(url);
            let data = await results.json();
            window.currentNewsArray = []

            for (object of data.articles) {
                if (object.hasOwnProperty("urlToImage") && object.title.length < 70) {
                    currentNewsArray.push({
                        image: object.urlToImage,
                        date: [getDate(object.publishedAt).split(" ")[0],getDate(object.publishedAt).split(" ")[1]],
                        title: object.title.split("-")[0],
                        description: object.description,
                        content: object.content,
                        url: object.url
                    });
                }
            }
            createCards();
            return currentNewsArray
        }

        let createCards = async () => {
            for (card of currentNewsArray) {
                console.log(card)
                document.querySelector(".body").innerHTML += `
                    <div class="newCard">
                        <img src="${card.image}" alt="pr-sample13" />
                        <div class="date"><span class="day">${card.date[1]}</span><span class="month">${card.date[0].split('').splice(0, 3).join('')}</span></div>
                        <div class="content">
                            <h3>${card.title}</h3>
                            <p>${card.description}</p>
                        </div>
                        <div class="hover"><i class="ion-android-open"></i></div>
                    </div>
                `
            }
        }


        pageSetup()

        // for (let card of newsCard) {
        //     card.querySelector("h3").innerHTML = currentNewsObject.title
        //     // card.addEventListener('click', () => {
        //     //     openArticle(card)
        //     // });
        // }


    } catch (err) {
        console.error(err)
    }

})();




// let url = `https://newsapi.org/v2/everything?q=Apple&from=2021-07-29&sortBy=popularity&apiKey=${API_KEY}`;
