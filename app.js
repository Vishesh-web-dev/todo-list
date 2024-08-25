const inputTxt = document.querySelector(".input-txt");
const addition = document.querySelector(".addition");
const boxCount = document.querySelector(".box-count");
const clearCompleted = document.querySelector(".clear-completed");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

let moonsun = 1;
let count = 0;
let taskId = 1;

function initialize() {
  inputTxt.value = "Create a new todo...";
  inputTxt.addEventListener("click", onInputClick);
  inputTxt.addEventListener("blur", onInputBlur);
  document.addEventListener("keydown", onKeyDown);
  clearCompleted.addEventListener("click", clearCompletedTasks);
  all.addEventListener("click", showAllTasks);
  active.addEventListener("click", showActiveTasks);
  completed.addEventListener("click", showCompletedTasks);
  moon.addEventListener("click", switchToDarkMode);
  sun.addEventListener("click", switchToLightMode);
}

function onInputClick() {
  inputTxt.value = "";
  inputTxt.classList.add(moonsun === 1 ? "input-txt-clr-l" : "input-txt-clr");
}

function onInputBlur() {
  inputTxt.value = "Create a new todo...";
  inputTxt.classList.remove(
    moonsun === 1 ? "input-txt-clr-l" : "input-txt-clr"
  );
}

function onKeyDown(e) {
  if (e.key === "Enter" && inputTxt.value.trim() !== "") {
    addTask(inputTxt.value);
    inputTxt.value = "";
  }
}

function addTask(taskText) {
  const taskHtml = `
    <div class="box ${moonsun === 1 ? "box-l" : ""}" id="box-${taskId}">
      <div class="img-holder"> 
        <img src="./images/icon-check.svg" alt="" class="check-img hidden">
      </div>
      <div class="save-txt">${taskText}</div>
      <img src="./images/icon-cross.svg" alt="" class="cross hidden">
    </div>`;

  addition.insertAdjacentHTML("beforeend", taskHtml);

  count++;
  updateTaskCount();

  const box = document.getElementById(`box-${taskId}`);
  const imgHolder = box.querySelector(".img-holder");
  const saveTxt = box.querySelector(".save-txt");
  const cross = box.querySelector(".cross");

  imgHolder.addEventListener("click", () =>
    toggleTaskCompletion(imgHolder, saveTxt)
  );
  box.addEventListener("mouseover", () => cross.classList.remove("hidden"));
  box.addEventListener("mouseout", () => cross.classList.add("hidden"));
  cross.addEventListener("click", () => removeTask(box, saveTxt));

  taskId++;
}

function toggleTaskCompletion(imgHolder, saveTxt) {
  const isCompleted = saveTxt.classList.toggle("cutme");
  imgHolder.classList.toggle("check-bg", isCompleted);
  imgHolder
    .querySelector(".check-img")
    .classList.toggle("hidden", !isCompleted);

  count += isCompleted ? -1 : 1;
  updateTaskCount();
}

function removeTask(box, saveTxt) {
  box.remove();
  if (!saveTxt.classList.contains("cutme")) {
    count--;
    updateTaskCount();
  }
}

function updateTaskCount() {
  boxCount.textContent = `${count}`;
}

function clearCompletedTasks() {
  document
    .querySelectorAll(".box .cutme")
    .forEach((box) => box.parentElement.remove());
}

function showAllTasks() {
  setFilterState(all);
  toggleTaskVisibility(() => true);
}

function showActiveTasks() {
  setFilterState(active);
  toggleTaskVisibility((task) => !task.classList.contains("cutme"));
}

function showCompletedTasks() {
  setFilterState(completed);
  toggleTaskVisibility((task) => task.classList.contains("cutme"));
}

function toggleTaskVisibility(predicate) {
  document.querySelectorAll(".box").forEach((task) => {
    task.classList.toggle(
      "hidden",
      !predicate(task.querySelector(".save-txt"))
    );
  });
}

function setFilterState(activeFilter) {
  [all, active, completed].forEach((button) =>
    button.classList.toggle("clr-blue", button === activeFilter)
  );
}

function switchToDarkMode() {
  moonsun = 0;
  toggleModeClass(false);
}

function switchToLightMode() {
  moonsun = 1;
  toggleModeClass(true);
}

function toggleModeClass(isLightMode) {
  document.body.classList.toggle("body-l", isLightMode);
  document.querySelector(".bg").classList.toggle("bg-l", isLightMode);
  moon.classList.toggle("hidden", !isLightMode);
  sun.classList.toggle("hidden", isLightMode);
  document.querySelector(".write").classList.toggle("write-l", isLightMode);
  document
    .querySelector(".input-txt")
    .classList.toggle("input-txt-l", isLightMode);
  document
    .querySelector(".main-box")
    .classList.toggle("main-box-l", isLightMode);
  document.querySelector("footer").classList.toggle("footer-l", isLightMode);
  document
    .querySelectorAll(".box")
    .forEach((box) => box.classList.toggle("box-l", isLightMode));
  document
    .querySelectorAll(".pointer")
    .forEach((pointer) => pointer.classList.toggle("pointer-l", isLightMode));
  document
    .querySelector(".saving-desc")
    .classList.toggle("saving-desc-l", isLightMode);
  document
    .querySelector(".what-to-show")
    .classList.toggle("what-to-show-l", isLightMode);
}

initialize();
