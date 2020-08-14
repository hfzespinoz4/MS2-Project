const seriesNotification = document.getElementById("series-notification");

function seriesNotificationsClean(message){
    $("#series-notification").append("");
    $("#series-notification").append(message);
}

function seriesResultsClean(){
    let serie = document.querySelectorAll(".serie-item");
    let div;
    for(let i=0; div=serie[i]; i++){
        div.parentNode.removeChild(div);
    }
}

function seriesSearch(){
    let seriesName = document.getElementById("series-name").value;
    if (seriesName !=="") {
        fetch(`https://gateway.marvel.com:443/v1/public/series?titleStartsWith=${seriesName}&limit=99&ts=1&apikey=b2ecab084d4bcf291a6e227d03051c39&hash=87a58fd245d31989c4da906d2db06de7`)
        .then(response => {
            if (!response.ok) {
                seriesNotificationsClean(`${response.status}`);
            }
            return response.json()
        })
        .then (apiResponse => seriesInfo(apiResponse))
        .catch (error => {
            seriesNotificationsClean(error);
        });
    } else {
        seriesNotificationsClean("Please, enter a serie name")
    }
    return;

    function seriesInfo(apiResponse){
        seriesNotificationsClean("");
        apiResponse.data.results.map((serie, index) =>{
            seriesNotification.innerText = `There are ${index+1} results for your search`;
            $("#series-container").append(`
                <div class="results-item mt-2 mb-2" col-12 col-sm-12 col-md-4 col-lg-4>
                    <div class="d-flex">
                        <img src="${serie.thumbnail.path}.${serie.thumbnail.extension}" class="avatar">
                        <div class="ml-2 comic-details">
                            <h3>${serie.title}</h3>
                            <h6>${serie.id}</h6>
                            <p>${serie.description}</p>
                            <p>Start Year: ${serie.startYear} End Year: ${serie.endYear} </p>
                        </div>
                    </div>
                </div> 
            `);
        });
        $("body").css("height", "100%");
    }
}

$("#series-search").click(function(event){
    event.preventDefault();
    seriesNotificationsClean("");
    seriesResultsClean();
    seriesSearch();
    $("#series-name").val('').focus();
})