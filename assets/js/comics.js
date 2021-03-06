const comicsNotification = document.getElementById("comic-notification");
const comicSearchButton  = document.getElementById("comic-search");

/*This function cleans the content (if exist) in the comic notification line 
and also parse an error message to that line */
function notificationClean (message){
    comicsNotification.innerText = "";
    comicsNotification.innerText = `${message}`;
}

/* This function cleans the results (if exist) of a previous search.
   It search for all of "li" elements with a class ".comic-item" then
   remove all of them from its "ul" parent element */
function resultsClean(){
    let comicsListItem = document.querySelectorAll(".comic-item");
    let li;
    for (let i=0; li=comicsListItem[i]; i++){
        li.parentNode.removeChild(li);
    }
}

/*This function get the information from MARVEL API */
function comicSearch(){
    let comicName = document.getElementById("comic-name").value;
    if (comicName !== ""){fetch(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${comicName}&limit=20&ts=1&apikey=b2ecab084d4bcf291a6e227d03051c39&hash=87a58fd245d31989c4da906d2db06de7`)
        .then (response => {
            if (!response.ok){
                notificationClean(`${response.status}`);
            }
            return response.json();
        })
        .then (apiResponse => comicInfo(apiResponse))
        .catch (error => {
            notificationClean(error);
        });
    } else {
    notificationClean("Please enter a comic name");
    }
    return;
    
    // This function appends the api response to html elements
    function comicInfo(apiResponse){
        // First, we need to clean our screen
        notificationClean("");
        apiResponse.data.results.map((comic, index) =>{
            comicsNotification.innerText = `There are ${index +1} results for your search`;
            // Then, append API response to our HTML
            $("#comics-list").append(`
                <li class="results-item mt-2 mb-2">
                    <div class="d-flex comic-container">
                        <img src=${comic.thumbnail.path}.${comic.thumbnail.extension} class="avatar">
                        <div class="comic-details ml-2">
                            <h3>${comic.title}</h3>
                            <h6>ID: ${comic.id}  ISSN: ${comic.issn}  ISBN: ${comic.isbn}</h6>
                            <p> Total Pages: ${comic.pageCount}
                            <p> Series: ${comic.series.name}</p>
                            <p> Description: ${comic.description}</p>
                            <p> Creation Date: ${comic.dates[1].date} </p>
                            <p> On-Sale Date: ${comic.dates[0].date} </p>
                        </div>
                    </div>
                </li>
            `);  
        }); //Closing Map
        $("body").css("height", "100%");
    } //Closing comicInfo function
}//Closing comicSearch function

//Making a API Call when Search button is clicked
comicSearchButton.addEventListener('click', function(event){
    event.preventDefault();
    resultsClean();
    comicSearch();
    $("#comic-name").val('').focus();
});