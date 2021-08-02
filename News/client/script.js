(async() => {

    try {

        let KEY_WORD;
        let API_KEY = `0657b40e70d14c16bb3a05fbd6bbdfdf`;
        let trendingURL = `https://newsapi.org/v2/top-headlines?sources=CNN,fox-news&apiKey=${API_KEY}`;
        let searchURL = `https://newsapi.org/v2/everything?q=${KEY_WORD}&sources=CNN,fox-news&sortBy=publishedAt&apiKey=${API_KEY}`

        let menuButton = document.querySelector("#menuButton");
        let categories = document.querySelectorAll(".category");
        let searchInput = document.querySelector(".search");
        let logo = document.querySelector(".logo");

        let removeElements = (elms) => elms.forEach(el => el.remove());

        let getDate = (shortDate) => {
            let newDate = new Date(shortDate);
            let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            shortDate = newDate.getDate();
            shortMonth = newDate.getMonth();
            fixedDate = monthNames[shortMonth] + " " + shortDate;
            return fixedDate
        }

        let pageSetup = async() => {

            menuButton.addEventListener('change', () => {
                if (menuButton.checked) {
                    document.querySelector(".the-bass").classList.add("dropped");
                } else {
                    document.querySelector(".the-bass").classList.remove("dropped");
                }
            });

            for (let category of categories) {
                category.addEventListener('click', () => {

                    let searchQuery = category.textContent;
                    searchQuery = searchQuery.toLowerCase();

                    switch (searchQuery) {
                        case "trending":
                            console.log(`Changing query to trending`)
                            cardData(trendingURL);
                            break;

                        case "search":
                            searchFunction()
                            break;

                            // case credits
                            //     displayCredits();
                            //     break;

                        default:
                            console.log(`Changing query to ${searchQuery}`)
                            cardData(`https://newsapi.org/v2/top-headlines?category=${searchQuery}&country=us&apiKey=${API_KEY}`);
                            break;
                    }

                });
            }

            cardData(trendingURL);
        }

        let searchFunction = () => {
            removeElements(document.querySelectorAll(".newCard"))
            searchInput.textContent = ""

            searchInput.addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {

                    event.preventDefault();
                    KEY_WORD = searchInput.textContent
                    cardData(`https://newsapi.org/v2/everything?q=${KEY_WORD}&sources=CNN&sortBy=publishedAt&apiKey=${API_KEY}`)

                }
            });

            searchInput.addEventListener('focusout', () => {
                searchInput.textContent = "Search"
            });
        }

        let cardData = async(url) => {
            let results = await fetch(url);
            let data = await results.json();
            window.currentNewsArray = []

            for (object of data.articles) {
                if (object.hasOwnProperty("urlToImage") && object.urlToImage !== "null" && object.title.length < 70) {
                    currentNewsArray.push({
                        image: object.urlToImage,
                        date: [getDate(object.publishedAt).split(" ")[0], getDate(object.publishedAt).split(" ")[1]],
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

        let createCards = async() => {
            removeElements(document.querySelectorAll(".newCard"))
            for (card of currentNewsArray) {
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
        logo.addEventListener('click', () => cardData(trendingURL))


    } catch (err) {
        console.error(err)
    }

})();
