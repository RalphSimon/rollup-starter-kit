import { infoMessage } from "./modules/test-module";
import { signal } from "./modules/module-two";

const message = "Message from index.js";
const alteredMessage = `This message says: ${infoMessage}`;

const mOne = document.querySelector(".message-base");
const mTwo = document.querySelector(".message-info");
const mThree = document.querySelector(".message-success");

mOne.textContent = message;
mTwo.textContent = alteredMessage;
mThree.textContent = signal;
