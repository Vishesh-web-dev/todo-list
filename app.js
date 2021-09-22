const addition = document.querySelector(".addition");
const inputTxt = document.querySelector(".input-txt");
const boxCount = document.querySelector(".box-count");
let count = 0;

document.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && inputTxt.value != "") {
    addition.innerHTML += `<div class="box">
        <div class="img-holder"> 
          <img src="./images/icon-check.svg" alt="" class="check-img hidden">
        </div>
        <div class="save-txt">${inputTxt.value}</div>
        <img src="./images/icon-cross.svg" alt="" class="cross hidden">
      </div>`;
      count++;
      boxCount.textContent = `${count}`;
  }

  const imgHolder = document.querySelectorAll(".img-holder");
  const checkImg = document.querySelectorAll(".check-img");
  const saveTxt = document.querySelectorAll(".save-txt");
  const boxes = document.querySelectorAll(".box");
  const clearCompleted = document.querySelector(".clear-completed");
  const all = document.querySelector(".all");
  const active = document.querySelector(".active");
  const completed = document.querySelector(".completed");
  const cross = document.querySelectorAll(".cross");

  //select note and deselect note and cross on hover and onclick hover removes note
  for (let i = 0; i < imgHolder.length; i++) {
    imgHolder[i].addEventListener("click", function () {
      if (!saveTxt[i].classList.contains("cutme")) {
        imgHolder[i].classList.add("check-bg");
        checkImg[i].classList.remove("hidden");
        saveTxt[i].classList.add("cutme");
        count--;
        boxCount.textContent = `${count}`;
      } else if (saveTxt[i].classList.contains("cutme")) {
        imgHolder[i].classList.remove("check-bg");
        checkImg[i].classList.add("hidden");
        saveTxt[i].classList.remove("cutme");
        count++;
        boxCount.textContent = `${count}`;
      }
    });
    boxes[i].addEventListener("mouseover", function () {
      cross[i].classList.remove("hidden");
    });
    boxes[i].addEventListener("mouseout", function () {
      cross[i].classList.add("hidden");
    });
    cross[i].addEventListener("click", function () {
      boxes[i].remove();
      count--;
      boxCount.textContent = `${count}`;
    });
  }

  //clear complete
  clearCompleted.addEventListener("click", function () {
    for (let i = 0; i < boxes.length; i++) {
      if (saveTxt[i].classList.contains("cutme")) {
        boxes[i].remove();
      }
    }
  });

  //show all notes
  all.addEventListener("click", function () {
    all.classList.add("clr-blue");
    active.classList.remove("clr-blue");
    completed.classList.remove("clr-blue");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].classList.remove("hidden");
    }
  });

  //show only active notes
  active.addEventListener("click", function () {
    all.classList.remove("clr-blue");
    active.classList.add("clr-blue");
    completed.classList.remove("clr-blue");
    for (let i = 0; i < boxes.length; i++) {
      if (saveTxt[i].classList.contains("cutme")) {
        boxes[i].classList.add("hidden");
      } else if (!saveTxt[i].classList.contains("cutme")) {
        boxes[i].classList.remove("hidden");
      }
    }
  });

  //show completed notes
  completed.addEventListener("click", function () {
    all.classList.remove("clr-blue");
    active.classList.remove("clr-blue");
    completed.classList.add("clr-blue");
    for (let i = 0; i < boxes.length; i++) {
      if (!saveTxt[i].classList.contains("cutme")) {
        boxes[i].classList.add("hidden");
      } else if (saveTxt[i].classList.contains("cutme")) {
        boxes[i].classList.remove("hidden");
      }
    }
  });
});
