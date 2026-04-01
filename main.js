// Dom vars
const namespan = document.querySelector(".name span");
const blockContainor = document.querySelector(".game-blocks");
let blocks = Array.from(blockContainor.children);
let duration = 1000;
let orderRange = [...Array(blocks.length).keys()];
let player;
// start a single player game
document.querySelector(".pl1").onclick = function () {
  // number of players
  player = "single";
  // cahnge the name
  let name = prompt("what is your name");
  // check if the name is empty
  name !== ""
    ? (namespan.textContent = name)
    : (namespan.textContent = "Donkey");
  // remove controles
  document.querySelector(".controles").remove();
};
// start a 2 player game
document.querySelector(".pl2").onclick = function () {
  // number of players
  player = "1";
  // cahnge the name
  document.querySelector(".inf1").style.display = "none";
  document.querySelector(".inf2").style.display = "block";
  // remove controles
  document.querySelector(".controles").remove();
};
shuffle(orderRange);
//add order css property
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    flipblock(block);
  });
});
// check the cards function
function check(play) {
  let flipedBlocks = blocks.filter((block) => block.classList.contains("flip"));
  let correct = blocks.filter((block) => block.classList.contains("fliped"));
  let player1points = document.querySelector(".inf2 .name span");
  let player2points = document.querySelector(".inf2 .trys span");
  if (flipedBlocks.length === 2) {
            blockContainor.classList.add("stop");
    setTimeout(() => {
      // if thie match
      if (flipedBlocks[0].dataset.imoji === flipedBlocks[1].dataset.imoji) {
          blockContainor.classList.remove("stop");
        flipedBlocks.forEach((block) => {
          block.classList.add("fliped");
          block.classList.remove("flip");
        });

        if (play === 1) {
          // if player 1 matched them
          flipedBlocks.forEach((block) => {
            block.classList.add("fliped");
            block.classList.add("fliped1");
            block.classList.remove("flip");
            console.log(block.children);
          });
          player1points.textContent++;
        } else {
          // if player 2 matched them
          flipedBlocks.forEach((block) => {
            block.classList.add("fliped");
            block.classList.add("fliped2");
            console.log(block.children);
            block.classList.remove("flip");
          });
          player2points.textContent++;
        }
        if (correct.length + 2 === blocks.length) {
          if (player1points.textContent > player2points.textContent) {
            document.querySelector(".win span").textContent = "Player 1 wins";
            document.querySelector(".win").style.background = "#2196f3";
          } else if (player1points.textContent === player2points.textContent) {
            document.querySelector(".win span").textContent = "tie losers";
            document.querySelector(".win").style.background = "#607d88";
          } else {
            document.querySelector(".win span").textContent = "Player 2 wins";
            document.querySelector(".win").style.background = "#de0000";
          }
          document.querySelector(".win").style.display = "block";
        }
      } else {
        // if wrong
        flipedBlocks.forEach((block) => block.classList.remove("flip"));
        if (play === 1) {
          // if player 1 fail
          player = "2";
          blocks.forEach((block) => {
            if (block.classList.contains("fliped1")) {
            } else {
              block.classList.add("turn");
            }
          });
        } else {
          // if player 2 fail
          player = "1";
          blocks.forEach((block) => {
            if (block.classList.contains("fliped2")) {
            } else {
              block.classList.remove("turn");
            }
          });
        }
          blockContainor.classList.remove("stop");
        document.querySelector(".trys span").textContent++;
      }
    }, duration);
  }
}
// flip block function
function flipblock(item) {
  item.classList.add("flip");
  let flipedBlocks = blocks.filter((block) => block.classList.contains("flip"));
  let correct = blocks.filter((block) => block.classList.contains("fliped"));
  // add the flip class to the block
  //all fliped block

  if (player === "single") {
    if (flipedBlocks.length === 2) {
      blockContainor.classList.add("stop");
      setTimeout(() => {
        if (flipedBlocks[0].dataset.imoji === flipedBlocks[1].dataset.imoji) {
          blockContainor.classList.remove("stop");
          flipedBlocks.forEach((block) => {
            block.classList.add("fliped");
            block.classList.remove("flip");
          });
          if (correct.length + 2 === blocks.length) {
            document.querySelector(".win").style.display = "block";
          }
        } else {
          flipedBlocks.forEach((block) => block.classList.remove("flip"));
          blockContainor.classList.remove("stop");
          document.querySelector(".trys span").textContent++;
        }
      }, duration);
    }
  } else {
    if (player === "1") {
      check(1);
    } else if (player === "2") {
      check(2);
    }
  }
}
// win relods the page
document.querySelector(".win span").onclick = () => {
  window.location.reload();
};
// stop clikeng function
function stopcliking() {
  blockContainor.classList.toggle("stop");
}
// shoufle
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }
  return array;
}
