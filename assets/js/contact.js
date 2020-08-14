
let formName = document.getElementById("name");
let formEmail = document.getElementById("email");
let formSubject = document.getElementById("subject");
let formMessage = document.getElementById("message");

function sendMail(){
    emailjs.send("gmail", "marvelcontact", {
        "email-name": formName.value,
        "email-adress": formEmail.value,
        "email-subject": formSubject.value,
        "email-message": formMessage.value,
        "email-copy": formEmail.value,
    })
    .then (function (response){
        $("#contact-notification").css("visibility", "visible").append(`
        <div class="alert alert-success" role="alert">
        Your email has been successfully sent and you´ll receive a copy of it.
    </div>
        `);
        $('form :input').val('');
        console.log ("SUCCESS", response);
    },
    function(error){
        $("#contact-notification").css("visibility", "visible").append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        There is the following error with your request: ${error}.
        Please, try again later or refresh this page
    </div>
        `)
        console.log ("FAILED", error)
    });   
    return false;
}

$("#submit-button").click(function(event){
    event.preventDefault();
    sendMail();
    $("#name").focus();
});