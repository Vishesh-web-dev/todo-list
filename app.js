const inputTxt = document.querySelector(".input-txt");
let moonsun = 1;
inputTxt.value = "Create a new todo...";
inputTxt.addEventListener("click", function () {
  inputTxt.value = "";
  if (moonsun == 1) {
    inputTxt.classList.add("input-txt-clr-l");
  } else {
    inputTxt.classList.add("input-txt-clr");
  }
});
inputTxt.addEventListener("blur", function () {
  inputTxt.value = "Create a new todo...";
  if (moonsun == 1) {
    inputTxt.classList.remove("input-txt-clr-l");
  } else {
    inputTxt.classList.remove("input-txt-clr");
  }
  inputTxt.classList.remove("input-txt-clr");
});

const addition = document.querySelector(".addition");
const boxCount = document.querySelector(".box-count");
let count = 0;
let i = 1;
function lgtordrk() {
  if (moonsun == 1) {
    return "box-l";
  }
  return "";
}
//everytime i persskey this happens
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && inputTxt.value != "") {
    addition.innerHTML += `<div class="box ${lgtordrk()}" id="box-${i}" >
        <div class="img-holder"> 
          <img src="./images/icon-check.svg" alt="" class="check-img hidden">
        </div>
        <div class="save-txt">${inputTxt.value}</div>
        <img src="./images/icon-cross.svg" alt="" class="cross hidden">
      </div>`;
    count++;
    boxCount.textContent = `${count}`;
    inputTxt.value = "";
    i++;
  }
  //these variables keep gets update every time a key is pressed
  const imgHolder = document.querySelectorAll(".img-holder");
  const checkImg = document.querySelectorAll(".check-img");
  const saveTxt = document.querySelectorAll(".save-txt");
  const boxes = document.querySelectorAll(".box");
  const clearCompleted = document.querySelector(".clear-completed");
  const all = document.querySelector(".all");
  all.classList.add("clr-blue");
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
      if (!saveTxt[i].classList.contains("cutme")) {
        count--;
        boxCount.textContent = `${count}`;
      }
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

//sun and moon
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

moon.addEventListener("click", function () {
  moonsun = 0;
  document.body.classList.remove("body-l");
  document.querySelector(".bg").classList.remove("bg-l");
  moon.classList.add("hidden");
  sun.classList.remove("hidden");
  document.querySelector(".write").classList.remove("write-l");
  document.querySelector(".input-txt").classList.remove("input-txt-l");
  document.querySelector(".input-txt").classList.remove("input-txt-clr-l");
  document.querySelector(".main-box").classList.remove("main-box-l");
  for (let i = 0; i < document.querySelectorAll(".box").length; i++) {
    document.querySelectorAll(".box")[i].classList.remove("box-l");
  }
  console.log(document.querySelectorAll(".pointer"));
  document.querySelector("footer").classList.remove("footer-l");
  for (let i = 0; i < document.querySelectorAll(".pointer").length; i++) {
    document.querySelectorAll(".pointer")[i].classList.remove("pointer-l");
  }
  document.querySelector(".saving-desc").classList.remove("saving-desc-l");
  document.querySelector(".what-to-show").classList.remove("what-to-show-l");
});

sun.addEventListener("click", function () {
  moonsun = 1;
  document.body.classList.add("body-l");
  document.querySelector(".bg").classList.add("bg-l");
  moon.classList.remove("hidden");
  sun.classList.add("hidden");
  document.querySelector(".write").classList.add("write-l");
  document.querySelector(".input-txt").classList.add("input-txt-l");
  document.querySelector(".input-txt").classList.add("input-txt-clr-l");
  document.querySelector(".main-box").classList.add("main-box-l");
  for (let i = 0; i < document.querySelectorAll(".box").length; i++) {
    document.querySelectorAll(".box")[i].classList.add("box-l");
  }
  document.querySelector("footer").classList.add("footer-l");
  for (let i = 0; i < document.querySelectorAll(".pointer").length; i++) {
    document.querySelectorAll(".pointer")[i].classList.add("pointer-l");
  }
  document.querySelector(".saving-desc").classList.add("saving-desc-l");
  document.querySelector(".what-to-show").classList.add("what-to-show-l");
});
