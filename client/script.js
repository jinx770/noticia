(async () => {

    try {

        // DOM Declarations
        let KEY_WORD;
        let trendingURL = `/trending`;
        let searchURL = `/search?KEY_WORD=${KEY_WORD}`

        let menuButton = document.querySelector("#menuButton");
        let categories = document.querySelectorAll(".category");
        let searchInput = document.querySelector(".search");
        let logo = document.querySelector(".logo");
        let profileCard = document.querySelector(".profile-card");

    // ------------------------------------------------------------------------------------------------------------

        // Function for getting and shorting the date.
        // To create a more readable format to display.
        let getDate = (shortDate) => {
            let newDate = new Date(shortDate);
            let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            shortDate = newDate.getDate();
            shortMonth = newDate.getMonth();
            fixedDate = monthNames[shortMonth] + " " + shortDate;
            return fixedDate
        }

    // ------------------------------------------------------------------------------------------------------------

        // Quick function for removing elements in an array.
        let removeElements = (elms) => elms.forEach(el => el.remove());

    // ------------------------------------------------------------------------------------------------------------

        // Go to homepage if they click logo
        logo.addEventListener('click', () => cardData(trendingURL))

    // ------------------------------------------------------------------------------------------------------------

        // Page setup handles what cards are on the page.
        let pageSetup = async () => {

            // Dropdown menu for navigation.
            menuButton.addEventListener('change', () => {
                if (menuButton.checked) {
                    document.querySelector(".the-bass").classList.add("dropped");
                } else {
                    document.querySelector(".the-bass").classList.remove("dropped");
                }
            });

            // Basic switch case function used for handling -
            // what the user clicks on in the navigation.
            for (let category of categories) {
                category.addEventListener('click', () => {

                    let searchQuery = category.textContent;
                    searchQuery = searchQuery.toLowerCase();

                    // After getting the entered text if the user have entered any of these -
                    // it'll call a function relevant to what they click.
                    switch (searchQuery) {

                        case "trending":
                            cardData(trendingURL);
                            break;

                        case "search":
                            searchFunction();
                            break;

                        case "credits":
                            displayCredits();
                            break;

                        default:
                            cardData(`/news?searchQuery=${searchQuery}`);
                            break;
                    }

                });
            }

            // Loads trending news regardless - as a sort of homepage?
            cardData(trendingURL);
        }

// ------------------------------------------------------------------------------------------------------------

        // Function for clicking on the search button in navigation.
        let searchFunction = () => {

            // Remove all cards on the page.
            removeElements(document.querySelectorAll(".newCard"))

            // Changes to blank to give the feel of a text area.
            // Its still just a label that you can write on in the DOM.
            searchInput.textContent = ""

            // Checks to see if the key they press is enter, if it is -
            // get the entered text and search using that as a query.
            searchInput.addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {

                    // Stops you from new lining.
                    event.preventDefault();

                    KEY_WORD = searchInput.textContent
                    cardData(`/search?KEY_WORD=${KEY_WORD}`)

                }
            });

            // If you click oof, label reverts to "Search".
            searchInput.addEventListener('focusout', () => {
                searchInput.textContent = "Search"
            });
        }

        // Used for allowing the user to open up each news card in their browser -
        // if they choose to click on it.
        let createLink = () => {

            // Had to add a setTimeout, didn't know how to use await in this case -
            // due to it running before any cards were created in the DOM.
            setTimeout(() => {
                let allCards = document.querySelectorAll(".newCard")
                for (let i = 0; i < allCards.length; i++) {
                    allCards[i].addEventListener('click', () => {
                        window.open(currentNewsArray[i].url)
                    });
                }
            }, 1500)
        }

// ------------------------------------------------------------------------------------------------------------

        // Used for creating the data behind each card.
        let cardData = async (url) => {

            let results = await fetch(url);
            let data = await results.json();

            // Empty array being created to run a loop through to create -
            // multiple cards.
            window.currentNewsArray = []

            // For loop used for creating multiple arrays with objects in them.
            for (object of data.articles) {

                // Quick filter to remove irrelevant -
                // or articles that ruin site aesthetics.
                if (object.hasOwnProperty("urlToImage") && object.urlToImage !== "" && object.title.length < 70) {

                    // Pushing objects to an array
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

            // Calling create card function now that we've gathered the relevant data.
            createCards();

            // Returning data just incase I need it later.
            return currentNewsArray
        }

    // ------------------------------------------------------------------------------------------------------------

        // Creating cards function with data sent through earlier.
        let createCards = async () => {

            // Removing existing cards just incase.
            removeElements(document.querySelectorAll(".newCard"))

            // For loop creating dynamic HTML using the earlier objects created.
            // Card represents each object, currentNewsArray being the array of objects.
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

            // Calling function that will allow the user to click on each news card.
            createLink()

            // Removing credits container if its still in DOM.
            if (document.querySelector(".container")) {
                document.querySelector(".container").remove()
            }
        }

    // ------------------------------------------------------------------------------------------------------------

        // Creating entire dynamic DOM element for credits -
        // tried to do it via html but was annoying my other elements.
        let displayCredits = () => {

            // Remove all previous cards.
            removeElements(document.querySelectorAll(".newCard"))
            document.querySelector(".body").innerHTML += `
                    <div class="container">
                      <div class="profile-card">
                        <div class="profile-clip">
                          <div class="cover-clip">
                            <img class="cover" src="https://alder.vercel.app/assets/img/portfolio/Image224.jpg"/>
                          </div>
                        </div>
                        <div class="profile-wrap">
                          <img alt="developers name" class="profile-pic" src="https://alder.vercel.app/assets/img/portfolio/Image107.jpg"/>
                          <i class="zmdi zmdi-close close"></i>
                          <div class="name">
                            jinx770
                            <span class="info">
                              Junior UX Designer
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="profile-content">
                        <div class="placeholder-wrap left">
                          <div class="placeholder box1"></div>
                        </div>
                        <div class="placeholder-wrap right">
                          <div class="placeholder box2"></div>
                          <div class="placeholder box3"></div>
                        </div>
                      </div>
                    </div>
                `

            // Click event for the credits page, dunno why but when I set it to
            // variables, they stopped working, so I used querySelectors.
            document.querySelector(".profile-card").addEventListener('click', () => {
                if (!document.querySelector(".profile-card").classList.contains("expand")) {
                    document.querySelector(".profile-pic").style.display = "none";
                } else {
                    document.querySelector(".profile-pic").style.display = "block";
                }
            });
        }

        // For the credits page, jquery seemed easier for this amount of classes.
        $(document).on('click', '.profile-card, .content', () => {
            $('.profile-card, .profile-clip, .profile-pic, .cover, .button, .name, .info, .left, .right, .content').toggleClass('expand');
        });

        // Create page.
        pageSetup()


    } catch (err) {
        console.error(err)
    }

})();
