const eventsNotification = document.getElementById("events-notification");

function eventsNotificationClean(message){
    $("#character-notification").append("");
    $("#character-notification").append(message);
}

function eventsResultsClean(){
    let event = document.querySelectorAll(".event-item");
    let div;
    for (let i=0; div=event[i]; i++){
        div.parentNode.removeChild(div);
    }
}

function eventSearch(){
    let eventName = document.getElementById("events-name").value;
    if (eventName !=="" ){
        fetch(`https://gateway.marvel.com:443/v1/public/events?nameStartsWith=${eventName}&limit=99&ts=1&apikey=b2ecab084d4bcf291a6e227d03051c39&hash=87a58fd245d31989c4da906d2db06de7`)
        .then (response => {
            if (!response.ok){
                eventsNotificationClean(`${response.status}`);
            }
            return response.json()
        })
        .then (apiResponse => eventsInfo(apiResponse))
        .catch (error => {
            eventsNotificationClean(error);
        });
    } else {
        eventsNotificationClean("Please, enter a event name")
    }
    return;

    function eventsInfo(apiResponse){
        eventsNotificationClean("");
        apiResponse.data.results.map((event, index) =>{
            eventsNotification.innerText = `There are ${index+1} results for your search`;
            $("#events-container").append(`
                <div class="event-item mt-2 mb-2">
                    <div class="d-flex event-container">
                        <img src=${event.thumbnail.path}.${event.thumbnail.extension} class="avatar">
                        <div class="ml-2 comic-details">
                            <h3>${event.title}</h3>
                            <h6>ID: ${event.id}</h6>
                            <p>${event.description}</p>
                            <p> Start Year: ${event.startYear} End Year: ${event.endYear} </p>
                            <div></div>
                        </div>
                    </div>
                </div> 
            `); 
        }); // Closing map
        $("body").css("height", "100%");
    } // closing eventsInfo Function
}

$("#events-search").click(function(event){
    event.preventDefault();
    eventsNotificationClean("");
    eventsResultsClean();
    eventSearch();
    $("#character-name").val('').focus();
})