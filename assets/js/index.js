// Set variables and arrays
var nameChosen = 0;
var backupCardsArrayEasy = ["https://images.pokemontcg.io/xy7/4_hires.png", "https://images.pokemontcg.io/xyp/XY05_hires.png", "https://images.pokemontcg.io/xy11/41_hires.png", "https://images.pokemontcg.io/xy7/21_hires.png", "https://images.pokemontcg.io/dp6/107_hires.png", "https://images.pokemontcg.io/xy0/14_hires.png"]
var backupCardsArrayMedium = ["https://images.pokemontcg.io/xy0/15_hires.png", "https://images.pokemontcg.io/dp1/9_hires.png", "https://images.pokemontcg.io/ex16/56_hires.png", "https://images.pokemontcg.io/ex16/64_hires.png", "https://images.pokemontcg.io/ex8/34_hires.png", "https://images.pokemontcg.io/ex16/99_hires.png"]
var backupCardsArrayHard = ["https://images.pokemontcg.io/pl4/1_hires.png", "https://images.pokemontcg.io/ex3/100_hires.png", "https://images.pokemontcg.io/xy7/98_hires.png", "https://images.pokemontcg.io/bw6/85_hires.png", "https://images.pokemontcg.io/xy8/144_hires.png", "https://images.pokemontcg.io/dp6/11_hires.png"]
const mainTheme = document.getElementById("mainThemeMusic");
const gameTheme = document.getElementById("gameThemeMusic");
const matchTheme = document.getElementById("matchingPairMusic");
const endTheme = document.getElementById("endOfGameThemeMusic");
var mute;
var supportPageSelected;

// Sound Support

//https://stackoverflow.com/questions/27368778/how-to-toggle-audio-play-pause-with-one-button-or-link
function toggleMainTheme(){
     return mainTheme.paused ? mainTheme.play() : mainTheme.pause();
}

function toggleGameTheme(){
     return gameTheme.paused ? gameTheme.play() : gameTheme.pause();
}

function toggleMatchingPairTheme(){
     return matchTheme.paused ? matchTheme.play() : matchTheme.pause();
}

function toggleEndOfGameTheme(){
     return endTheme.paused ? endTheme.play() : endTheme.pause();
}

function toggleSpeakerIconToMuted(){
    $(".fa-volume-up").css("display", "none");
    $(".fa-volume-mute").css("display", "inline-block");
}

function toggleSpeakerIconToLoud(){
    $(".fa-volume-up").css("display", "inline-block");
    $(".fa-volume-mute").css("display", "none");
}

function playMainThemeOnMute(){
    toggleMainTheme();
        if(sessionStorage.muted == 1){
            toggleSpeakerIconToMuted();
            $("#mainThemeMusic").prop('muted', true);
        }
}

function playGameThemeOnMute(){
    toggleGameTheme();
        if(sessionStorage.muted == 1){
            toggleSpeakerIconToMuted();
            $("#gameThemeMusic").prop('muted', true);
        }
}

function playMatchingPairThemeOnMute(){
     toggleMatchingPairTheme();
        if(sessionStorage.muted == 1){
            toggleSpeakerIconToMuted();
            $("#matchingPairMusic").prop('muted', true);
        }
}

function playEndOfGameThemeOnMute(){
     toggleEndOfGameTheme();
        if(sessionStorage.muted == 1){
            toggleSpeakerIconToMuted();
            $("#endOfGameThemeMusic").prop('muted', true);
        }
}


   
   
$(".fa-volume-up, #volumeNotAllowed").click(function(){
    toggleSpeakerIconToMuted();
    //https://codepen.io/calebzahnd/pen/VvZZeJ
    $("#mainThemeMusic").prop('muted', true);
     mute = 1;
     console.log(mute);
     sessionStorage.setItem("muted", mute);
     console.log(sessionStorage.getItem("muted"));
});

$(".fa-volume-mute, #volumeAllowed").click(function(){
    toggleSpeakerIconToLoud();
    mute = 0;
     console.log(mute);
     sessionStorage.setItem("muted", mute);
     console.log(sessionStorage.getItem("muted"));
    //https://codepen.io/calebzahnd/pen/VvZZeJ
    $("#mainThemeMusic").prop('muted', false);   
});

function turningCardsFaceDown(){
    $(".cover").css("transform", "perspective( 600px ) rotateY( 0deg )");
    $(".face").css("transform", "perspective( 600px ) rotateY( 180deg )");
   
}

// *******************************************************************************

// Checking if this is the first time loggin on. 
$( document ).ready(function(){    
    if (sessionStorage.name == null){
        $("#volumeModal").css("display", "block").addClass("in").addClass("show").addClass("modal-open");
        $("#gridItemHeader, #gridItemGameInfo, #gridItemGame").addClass("display");

    $(".volume").click(function(){
        $("#volumeModal").css("display", "none").removeClass("in").removeClass("show").removeClass("modal-open");
        if(sessionStorage.muted == 0){
                toggleMainTheme();  
                toggleSpeakerIconToLoud();  
        } else {
                    playSongOnMute();
                }
        var time = setTimeout(removeJumbo, 2000);
        function removeJumbo(){           
            $("#gridItemHeader, #gridItemGameInfo, #gridItemGame").removeClass("display");
             $(".jumbotron").slideUp("slow"); 
            var welcomeModalTime = setTimeout(revealWelcomeModal, 750)
            function revealWelcomeModal(){
                $("#welcomeModal").css("display", "block").addClass("in").addClass("show");
                $("#indexBody").addClass("modal-open");
            }
        }
        });
    } else {
              //https://stackoverflow.com/questions/8489710/play-an-audio-file-using-jquery-when-a-button-is-clicked
            if(sessionStorage.muted == 0){
               toggleMainTheme();
               toggleSpeakerIconToLoud();
               
                } else {
                
                    playSongOnMute();
                }
                $("#playerName").html(sessionStorage.getItem("playerName"));
                $(".jumbotron").slideUp();
                $("#difficultyModalTitle").html("Are you ready, " + sessionStorage.getItem("playerName") + "?");
                $("#difficultyModal").css("display", "block").addClass("in").addClass("show").addClass("modal-open");
                
            }        
});



// Storing the players name when the user inputs the data
$("#enterName").click(function(){
    userInteraction = 1;
    console.log(userInteraction);
    sessionStorage.setItem("userInteraction", userInteraction);

    var playerName = document.getElementById("nameInput").value;
	sessionStorage.setItem("playerName", playerName);
    sessionStorage.setItem("name", "1");

    $("#welcomeModal").css("display", "none").removeClass("in").removeClass("show");
    $("#indexBody").removeClass("modal-open");

    $("#playerName").html(sessionStorage.getItem("playerName"));
    $("#difficultyModalTitle").html(`Welcome, ${playerName}!`);
});

// Triggering the loading modal
$("#easyButton, #mediumButton, #hardButton").click(function(){
    $("#difficultyModal").css("display", "none").removeClass("in").removeClass("show");
    $("#indexBody").removeClass("modal-open");
    
    var timeBackup = setTimeout(backupCards, 60000);
    function backupCards(){
        if(apiResponseArray.length < 6){
            $("#startGame").removeClass("display");
        }
    }

    var time = setInterval(loadingArray, 1000);
    function loadingArray(){
            if(apiResponseArray.length == 6){
                $("#startGame").removeClass("display");
                clearInterval(time);
            }
    }
});

// Highlighting which difficulty the user has selected.
$("#easyButton").click(function(){
    difficultyMode = 1;
    selectingActiveLink();
});

$("#mediumButton").click(function(){
    difficultyMode = 2;
    selectingActiveLink();
});

$("#hardButton").click(function(){
    difficultyMode = 3;
    selectingActiveLink();
});


var activeLink;
var nonActiveLink;
function selectingActiveLink(difficultyMode2){
        console.log(difficultyMode);
        if(difficultyMode == 1) activeLink = "#easy";
        else if(difficultyMode == 2) activeLink = "#medium";
        else activeLink = "#hard";
        $(activeLink).addClass("active-mode");

}

//Opening up the display cards modal
$("#seeCardsButton").click(function(){
    $("#finishedModal").css("display", "none").removeClass("in").removeClass("show");
    $("#indexBody").removeClass("modal-open");
});
 
//Distributing card images.
var cardIDArray = [1,2,3,4,5,6,7,8,9,10,11,12];

//Shuffling the array ID number
//Shuffling array found at this tutorial
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
$("#startGame").click(function(){
     
    $("#mainThemeMusic").get(0).pause();
    $("#gameThemeMusic").get(0).play();
    $("#gameThemeMusic").prop("volume", "0.1");
    
    var shuffledCardID = shuffle(cardIDArray);
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
         return array;
    }
    
    //Generating html for each card
    var pairMatchID = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12];
    for(i=0; i<12; i++){
        $("#gameRow").append(`
                    <div id="card${shuffledCardID[i]}" class="col-6 col-sm-2  col-md-3 col-lg-2 col-xl-2 eight-cards card">
                        <div id="card${shuffledCardID[i]}Cover" class=" eight-cards cover"></div> 
                        <div id="card${shuffledCardID[i]}Face" class=" eight-cards face"></div> 
                    </div>
                    <div id="card${shuffledCardID[i]}Match" class="col-6 col-sm-2  col-md-3 col-lg-2 col-xl-2 cover eight-cards match card display"></div>
                    `);
    }
    
    // Adding images to the correct cards and display cards
    for(j=1;j<13;j++){
        var pairArray =["placeholder",1,1,2,2,3,3,4,4,5,5,6,6];
        $(`#card${j}Face`).addClass(`pair${pairArray[j]}`);
        $(`#card${j}`).addClass(`cardMatchID${pairArray[j]}`);
        $(`#card${j}Cover`).addClass(`pairMatchID${pairArray[j]}`);
        $(`#card${j}Match`).addClass(`pairFound${pairArray[j]}`);
    }   
            
    for(k=1; k<7; k++){
        $(`#displayCard${k}`).addClass(`pair${k}`);
    }     
    
    //Hiding the name to increase screen size
    $("#gridItemName").toggleClass("display");

    //Ensuring all the cards are face down
    turningCardsFaceDown();

     var imageContainerArray = [];
        var backupCardsArray;
        function selectImages(difficultyMode){
            if(apiResponseArray.length == 6) backupCardsArray = apiResponseArray;
            else if(difficultyMode == 1) backupCardsArray = backupCardsArrayEasy;
            else if (difficultyMode == 2) backupCardsArray = backupCardsArrayMedium;
            else backupCardsArray = backupCardsArrayHard;

            for(let i=0; i<6; i++){
               var image = backupCardsArray[i].toString();
               imageContainerArray.push('url('+ '"' + image + '"' + ')');
            }
        }
        selectImages(difficultyMode);
        for (j=1; j<7; j++){
            $(`.pair${j}`).css("background-image", imageContainerArray[j-1]);
        }
    
    
});


//Closing 'play again' modal
$("#playAgainButton").click(function(){
    $("#finishedModal").css("display", "none").removeClass("in").removeClass("show");
    $("#indexBody").removeClass("modal-open");
});

// Calculating the number of ajax calls previously made and alerting the user if they are close to the limit
$("#playAgainButton, #playAgainButtonDisplay").click(function(){
    $("#gameRow").html(``);
        var ajaxCallsSum = ajaxCalls.reduce(function(a, b){
                return a + b;
                }, 0);
        var totalAjaxCalls = (5000 - ajaxCallsSum);

        if(totalAjaxCalls < 1000){
            $("#usageWarning").removeClass("display");
            if(totalAjaxCalls < 400){
            $("#usageWarning").html("This is your final game. Please play again in one hour!");
            } else {$("#usageWarning").html("You have only have a few games left before you reach the hourly limit! We will tell you when you have one game left.");
        } 
    }

   $("#endOfGameThemeMusic").get(0).pause();
//    $("#mainThemeMusic").get(0).play();
   toggleMainTheme();
    // Displaying difficulty modal at the beginning of each new game.
    $("#gridItemTimerDisplay").html("0 seconds");
   turningCardsFaceDown();
    $("#difficultyModal").css("display", "block").addClass("in").addClass("show").addClass("modal-open");
});


