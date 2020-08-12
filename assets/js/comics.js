const comicsList = document.getElementById("comics-list");
const comicsNotification = document.getElementById("comic-notification");
let comicName = document.getElementById("comic-name").value;

function notificationClean (message){
    comicsNotification.innerText = "";
    comicsNotification.innerText = `${message}`;
}

function resultsClean(){
    let list = document.querySelectorAll(".comic-item");
    for (i=0; li=comicsList[i]; i++);
};

/*This function get the information from MARVEL API */
function comicSearch(){

    if (comicName != ""){fetch(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${comicName}&limit=99&ts=1&apikey=b2ecab084d4bcf291a6e227d03051c39&hash=87a58fd245d31989c4da906d2db06de7`)
        .then (response => {
            if (!response.ok){
                throw Error (`Exception ${response.status}`);
            }
            return response.json();
        })
        .then (apiResponse => comicInfo(apiResponse))
        .catch (error => {
            notificationClean(error);
        });
    } else {
    notificationClean("Please enter a comic name");
    };
    return;
    
    function comicInfo(apiResponse){
        
    }
}