const characterNotification = document.getElementById("character-notification");

function charactersNotificationClean(message){
    $("#character-notification").append("")
    $("#character-notification").append(message);
}

function charactersResultsClean(){
    let character = document.querySelectorAll(".character-item");
    let li;
    for (let i=0; li=character[i]; i++){
        li.parentNode.removeChild(li);
    }
}

function characterSearch(){
    let characterName = document.getElementById("character-name").value;
    if (characterName !== ""){
        fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${characterName}&limit=99&ts=1&apikey=b2ecab084d4bcf291a6e227d03051c39&hash=87a58fd245d31989c4da906d2db06de7`)
        .then ( response => {
            if(!response.ok){
                charactersNotificationClean(`${response.status}`);
            }
            return response.json()
        })
        .then (apiResponse => characterInfo(apiResponse))
        .catch (error => {
            charactersNotificationClean(error);
        });   
    } else {
        charactersNotificationClean("please enter a character name");
    }
    return;

    function characterInfo(apiResponse){
        charactersNotificationClean("");
        apiResponse.data.results.map((character, index) => {
            characterNotification.innerText= `There are ${index+1} results for your search`
            $("#characters-list").append(`
                <li class="results-item mt-2 mb-2">
                    <div class="d-flex comic-container">
                        <img src=${character.thumbnail.path}.${character.thumbnail.extension} class="avatar">
                        <div class="ml-2 comic-details">
                            <h3>${character.name}</h3>
                            <h6>ID: ${character.id}</h6>
                            <p>${character.description}</p>
                            <div>
                                <div class="btn btn-success info-btn">Comics: ${character.comics.available}</div>
                                <div class="btn btn-success info-btn">Series: ${character.series.available}</div>
                                <div class="btn btn-success info-btn">Stories: ${character.stories.available}</div>
                                <div class="btn btn-success info-btn">Events: ${character.events.available}</div>
                            </div>
                        </div>
                    </div>
                </li>`);
        }); // Closing map
        $("body").css("height", "100%");
    }// closing characterInfo function
}

$("#character-search").click(function(event){
    event.preventDefault();
    charactersNotificationClean("");
    charactersResultsClean();
    characterSearch();
    $("#character-name").val('').focus();
});