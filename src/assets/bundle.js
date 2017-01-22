(function () {
'use strict';

var infoMessage = "Loaded from test-module";

var signal = "You've successfully planned your journey!";

var message = "Message from index.js";
var alteredMessage = "This message says: " + infoMessage;

var mOne = document.querySelector(".message-base");
var mTwo = document.querySelector(".message-info");
var mThree = document.querySelector(".message-success");

mOne.textContent = message;
mTwo.textContent = alteredMessage;
mThree.textContent = signal;

}());
