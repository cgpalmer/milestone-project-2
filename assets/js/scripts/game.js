//API tutorial used for initial ajax calls. It has been edited for my project. See README.md. 
//It has been modified for my benefit
var types = ["darkness", "water", "lightning", "fighting", "metal", "grass", "fire", "psychic", "fairy", "dragon", "colorless"];
var ajaxCalls = [];
var apiResponseArray = ["placeholder"];
results = ["-", "-"];
resultsTime = ["-", "-"];
pairMatch = 0;


//***************************************************************Results

$("#startGame").click(function() {
	timeTaken = 0;
	movesTaken = 0;

	function resultToString() {
		recordMoves = results.toString(",");
		recordTimes = resultsTime.toString(",");
	}

	function storageToArray() {
		results = sessionStorage.getItem("recordedMoves").split(",");
		resultsTime = sessionStorage.getItem("recordedTime").split(",");
	}

	if (sessionStorage.getItem("recordedMoves") === null || sessionStorage.getItem("recordedMoves") === null) {
		resultToString();
		sessionStorage.setItem("recordedMoves", recordMoves);
		sessionStorage.setItem("recordedTime", recordTimes);

		storageToArray();
	} else {
		storageToArray();
	}

	var stopWatch = setInterval(timer, 1000);

	function timer() {
		if (pairMatch < 6) {
			timeTaken++;
			$("#gridItemTimerDisplay").html(timeTaken + " seconds");
		} else {
			clearInterval(stopWatch);
			results.unshift(movesTaken);
			results.sort(function(a, b) {
				return a - b;
			});
			resultsTime.unshift(timeTaken);
			resultsTime.sort(function(a, b) {
				return a - b;
			});

			$("#totalMoves").html(`<h6>Total moves: ${movesTaken} </h6>`);
			$("#timeTaken").html(`<h6>Time taken: ${timeTaken} seconds<h6>`);

			for (i = 1; i < 4; i++) {
				$(`#resultMove${i}`).html(` ${results[i-1]}`);
			}

			for (j = 1; j < 4; j++) {
				$(`#resultTime${j}`).html(` ${resultsTime[j-1]} seconds`);
			}
			resultToString();

			sessionStorage.setItem("recordedMoves", recordMoves);
			sessionStorage.setItem("recordedTime", recordTimes);


		}
	}
});

$("#easyButton").click(function() {
	if (apiResponseArray.length == 1) {
		for (i = 0; i < 6; i++) {
			var pokemonID = Math.floor((Math.random() * 645) + 1);
			$.ajax({
				method: "GET",
				url: "https://cors-anywhere.herokuapp.com/https://api.pokemontcg.io/v1/cards?nationalPokedexNumber=" + pokemonID
			}).then(function(response) {
				ajaxCalls.push(Number(response.cards.length));
				apiResponseArray.unshift(response.cards[Math.floor(Math.random() * response.cards.length)].imageUrlHiRes);
			});
		}
	}
});


$("#mediumButton").click(function() {
	if (apiResponseArray.length == 1) {
		var pageNumber = [Math.floor(Math.random() * 4)];
		$.ajax({
			method: "GET",
			url: "https://cors-anywhere.herokuapp.com/https://api.pokemontcg.io/v1/cards?types=" + types[Math.floor(Math.random() * 11)] + "&&page" + pageNumber
		}).then(function(response) {
			ajaxCalls.push(Number(response.cards.length));
			for (i = 0; i < 6; i++) {
				apiResponseArray.unshift(response.cards[Math.floor(Math.random() * response.cards.length)].imageUrlHiRes);
			}
		});
	}
});

$("#hardButton").click(function() {
	if (apiResponseArray.length == 1) {
		for (i = 0; i < 3; i++) {
			var pokemonID = Math.floor((Math.random() * 645) + 1);
			$.ajax({
				method: "GET",
				url: "https://cors-anywhere.herokuapp.com/https://api.pokemontcg.io/v1/cards?nationalPokedexNumber=" + pokemonID
			}).then(function(response) {
				ajaxCalls.push(Number(response.cards.length));
				const firstHalfHardCard = response.cards.length / 2;

				do {
					var hardCard1 = response.cards[Math.floor(Math.random() * firstHalfHardCard)].imageUrlHiRes;

				} while (hardCard1 == apiResponseArray[0]) {
					apiResponseArray.unshift(hardCard1);

				}


				do {
					var hardCard2 = response.cards[Math.floor(Math.random() * (response.cards.length - firstHalfHardCard) + firstHalfHardCard)].imageUrlHiRes;

				} while (hardCard2 == apiResponseArray[0]) {
					apiResponseArray.unshift(hardCard2);

				}


			});
		}
	}
});

//This will be the code for animating the cards
/* Tutorial from in the credits. It has been modified to fit my purpose */
$("#easyButton, #mediumButton, #hardButton").click(function() {
	for (j = 1; j < 7; j++) {
		pairCounterArray[j] = 0;
	}
});

//Selecting a card and deciding if it is a pair or not.
//Which card has been selected

pairCounterArray = ["placeholder", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var whichCardClicked;

$('#gameRow').on('click', '#card1', function() {
	whichCardClicked = 1;
});

$('#gameRow').on('click', '#card2', function() {
	whichCardClicked = 2;
});

$('#gameRow').on('click', '#card3', function() {
	whichCardClicked = 3;
});

$('#gameRow').on('click', '#card4', function() {
	whichCardClicked = 4;
});

$('#gameRow').on('click', '#card5', function() {
	whichCardClicked = 5;
});

$('#gameRow').on('click', '#card6', function() {
	whichCardClicked = 6;

});

$('#gameRow').on('click', '#card7', function() {
	whichCardClicked = 7;

});

$('#gameRow').on('click', '#card8', function() {
	whichCardClicked = 8;

});

$('#gameRow').on('click', '#card9', function() {
	whichCardClicked = 9;

});

$('#gameRow').on('click', '#card10', function() {
	whichCardClicked = 10;

});

$('#gameRow').on('click', '#card11', function() {
	whichCardClicked = 11;

});

$('#gameRow').on('click', '#card12', function() {
	whichCardClicked = 12;
});

var cardSelected;

function clickedCard(whichCardClicked) {

	if (whichCardClicked == 1) return cardSelected = `#card1`;
	else if (whichCardClicked == 2) return cardSelected = `#card2`;
	else if (whichCardClicked == 3) return cardSelected = `#card3`;
	else if (whichCardClicked == 4) return cardSelected = `#card4`;
	else if (whichCardClicked == 5) return cardSelected = `#card5`;
	else if (whichCardClicked == 6) return cardSelected = `#card6`;
	else if (whichCardClicked == 7) return cardSelected = `#card7`;
	else if (whichCardClicked == 8) return cardSelected = `#card8`;
	else if (whichCardClicked == 9) return cardSelected = `#card9`;
	else if (whichCardClicked == 10) return cardSelected = `#card10`;
	else if (whichCardClicked == 11) return cardSelected = `#card11`;
	else if (whichCardClicked == 12) return cardSelected = `#card12`;
	else cardSelected;
}

var cardA;
var cardB;
var cardPair;

function pairSelected(whichCardClicked) {
	if (whichCardClicked == 1 || whichCardClicked == 2) cardA = 1, cardB = 2, cardPair = 1;
	else if (whichCardClicked == 3 || whichCardClicked == 4) cardA = 3, cardB = 4, cardPair = 2;
	else if (whichCardClicked == 5 || whichCardClicked == 6) cardA = 5, cardB = 6, cardPair = 3;
	else if (whichCardClicked == 7 || whichCardClicked == 8) cardA = 7, cardB = 8, cardPair = 4;
	else if (whichCardClicked == 9 || whichCardClicked == 10) cardA = 9, cardB = 10, cardPair = 5;
	else cardA = 11, cardB = 12, cardPair = 6;
}


//Actions once a card is clicked
var animationInProgress = 0;

function notAPair() {
	animationInProgress = 1;
	var wrongWait = setTimeout(pairNotFound, 750);

	function pairNotFound() {
		turningCardsFaceDown();
		clearTimeout(wrongWait);
	}

	for (j = 1; j < 13; j++) {
		pairCounterArray[j] = 0;
	}

	var animationResetDelay = setTimeout(resetAnimationValue, 750);

	function resetAnimationValue() {
		animationInProgress = 0;

		whichCardClicked = 0;
		cardSelected = null;

	}

}

$('#gameRow').on('click', '.card', function() {
	if (animationInProgress == 0) {
		clickedCard(whichCardClicked);
		pairSelected(whichCardClicked);
		$(".cover", this).css("transform", "perspective( 600px ) rotateY( -180deg )");
		$(".face", this).css("transform", "perspective( 600px ) rotateY( 0deg )");
	}
});

$('#gameRow').on('click', cardSelected, function() {

	if (cardSelected != null) {

		if (animationInProgress == 0) {

			movesTaken++
			pairCounterArray[whichCardClicked] = 1;

			if (pairCounterArray[cardA] == 1 && pairCounterArray[cardB] == 1) {
				pairMatch++;

				pairCounterArray[cardA] = 0;
				pairCounterArray[cardB] = 0;
				if (sessionStorage.muted == 0) {
					$("#matchingPairMusic").get(0).play();
				}


				animationInProgress = 1;

				var wait = setTimeout(pairFound, 1000);

				function pairFound() {

					$(`.cardMatchID${cardPair}`).fadeOut();

					var wait2 = setTimeout(pairFound2, 400);

					function pairFound2() {
						$(`.pairFound${cardPair}`).removeClass("display");
					}

					var animationResetDelay = setTimeout(resetAnimationValue, 500);

					function resetAnimationValue() {
						animationInProgress = 0;

						whichCardClicked = 0;
						cardSelected = null;
					}

				}

			} else {
				//Resets if a pair isn't found.
				pairCounterArray[whichCardClicked] = 0;

				var checking = 0;
				for (let i = 1; i < 13; i++) {
					if (pairCounterArray[i] == 1) {
						checking++;
					}
				}
				if (checking > 0) {
					notAPair();
				} else {
					pairCounterArray[whichCardClicked] = 1;
					whichCardClicked;
					cardSelected;
				}
			}
		}
	} else {

	}
});

//Actions for once the game has finished

//Opening up the finished modal
$("#game").click(function() {
	$("#startGame").addClass("display");
	if (pairMatch == 6) {

		var revealTime = setTimeout(revealCards, 2000);

		function revealCards() {
			toggleGameTheme();
			if (sessionStorage.muted == 0) {
				$(endTheme).prop('muted', false);
				toggleEndOfGameTheme();
				toggleSpeakerIconToLoud();
			} else {
				playEndOfGameThemeOnMute();
			}

			for (j = 1; j < 13; j++) {
				$(`#card${j}Match`).addClass("display");
			}
			for (i = 1; i < 13; i++) {
				$(`#card${i}`).css("display", "block");
			}
			$(".card > .cover").css("transform", "perspective( 600px ) rotateY( -180deg )");
			$(".card > .face").css("transform", "perspective( 600px ) rotateY( 0deg )");
		}
		var wait = setTimeout(finishedModal, 4000);

		function finishedModal() {
			$("#finishedModal").css("display", "block").addClass("in").addClass("show");
			$("#indexBody").addClass("modal-open");
			pairMatch = 0;
			for (k = 0; k < 7; k++) {
				apiResponseArray.pop();
			}

		}
	}
});