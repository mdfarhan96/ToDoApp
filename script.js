var taskName;
var taskItems;
var firstItem;
var deleteTask;
var listItems;
var value_id;
var done_button;
var title_for_list;
var temp;

function addItem() {
  document.getElementById("modal-div").style.display = "block";
  document.getElementById("no_task_text").style.display = "none";
}
function addTask() {
  taskName = document.getElementById("modal-input-box").value;
  createObj(taskName);

  closeTask();
}
function closeTask() {
  document.getElementById("modal-div").style.display = "none";
}

var subtask = new Map();
var arr_of_obj = new Set();
function createObj(title) {
  var card_obj = {
    title: title,
    id: Date.now(),
    subtask,
  };
  arr_of_obj.add(card_obj);
  createCard(card_obj.id);
}

function addList() {
  listItems = document.querySelector(".this-list-element").cloneNode(true);
  taskItems = document.getElementById("modal-input-box-card").value;

  listItems.innerText = taskItems;
  listItems.style.display = "block";
  listItems.setAttribute("id", `${Date.now()}`);
  listItems.setAttribute("value", `${Date.now()}`);
  listItems.setAttribute("style", "margin-left: 10px;");
  done_button = document.createElement("button");
  done_button.setAttribute("id", `check-done-${Date.now()}`);
  done_button.setAttribute("class", "mark-as-done-class");
  done_button.setAttribute("value", `${Date.now()}`);
  done_button.setAttribute("onclick", "completedTask(this.value)");

  done_button.innerText = "Task complete";
  done_button.setAttribute(
    "style",
    "font-size:15 px;cursor:pointer; height:10px; border-radius:5px;"
  );

  listItems.appendChild(done_button);

  listItems.setAttribute("onClick", "completedTask(this.value)");

  for (obj of arr_of_obj) {
    for (prop in obj) {
      if (obj.id == value_id) {
        obj.subtask.set(`${taskItems}`, `${Date.now()}`);
        //title_for_list = obj.title;
        taskItems = "";
        break;
      }
    }
  }

  document
    .getElementById(`${value_id}`)
    .getElementsByClassName("add-list-after-this")[0]
    .appendChild(listItems)
    .appendChild(done_button);

  listItems = "";
  closeList();
}

function closeList() {
  document.getElementById("modal-div-card").style.display = "none";
}

function addSubtask(val) {
  document.getElementById("modal-div-card").style.display = "block";

  value_id = val;
}

function deleteCard(val) {
  deleteTask = document.getElementById(`${val}`);

  for (obj of arr_of_obj) {
    for (prop in obj) {
      if (obj.id == val) arr_of_obj.delete(obj);
      break;
    }
  }
  deleteTask.parentNode.removeChild(deleteTask);
  firstItem = 0;
  console.log(arr_of_obj);
  if (arr_of_obj.size == 0) {
    document.getElementById("no_task_text").style.display = "block";
  }
}

function createCard() {
  if (arr_of_obj.size == 0) {
    document.getElementById("outer-container").innerHTML = "EMPTY";
    firstItem = 0;
  } else {
    firstItem = document.querySelector(".card").cloneNode(true);
    display(firstItem);
  }
}
function completedTask(value) {
  document.getElementById(`${value}`).style.textDecoration = "line-through";

  document.getElementById(`${value}`).style.color = "green";

  document.getElementById(`check-done-${value}`).remove();
}
function display(card) {
  if (card == 0) {
    document.getElementById("outer-container").innerHTML = "EMPTY";
  } else {
    arr_of_obj.forEach((element) => {
      card.id = element.id;
      card.querySelector(".card-head").innerHTML = element.title;
      card.querySelector(".card-head").setAttribute("value", `${element.id}`);
      card.setAttribute("value", `${element.id}`);
      card.setAttribute("display", "block");
      card.setAttribute("min-height", "300px");
      card
        .querySelector(".delete-button-in-card")
        .setAttribute("value", `${element.id}`);
      card
        .querySelector(".delete-button-in-card")
        .setAttribute("onClick", "deleteCard(this.value)");
      card
        .querySelector(".add-button-in-card")
        .setAttribute("value", `${element.id}`);
      card
        .querySelector(".add-button-in-card")
        .setAttribute("onClick", "addSubtask(this.value)");
    });
    card.style.display = "block";
    document.getElementById("outer-container").appendChild(card);
    showAll();
  }
}

function addingCards(val) {
  var card_header;

  for (let ele of arr_of_obj) {
    for (let id in ele) {
      if (ele[id] == val) {
        card_header = ele.title;
        break;
      }
    }
  }

  document.querySelector("#naming").style.display = "none";
  document.querySelector("#add-button-text").style.display = "none";
  for (let ele of arr_of_obj) {
    if (ele.id == val) {
      document.getElementById(`${ele.id}`).style.display = "block";
    } else {
      document.getElementById(`${ele.id}`).style.display = "none";
    }
  }
  document.getElementById("dynamicCard").innerText = `${card_header}`;
  document.getElementById("dynamicCard").style.display = "flex";
  document.getElementById("back-button").style.display = "block";
}

function showAll() {
  document.querySelector("#naming").style.display = "block";
  document.querySelector("#add-button-text").style.display = "inline-block";
  document.getElementById("back-button").style.display = "none";
  for (let ele of arr_of_obj) {
    document.getElementById(`${ele.id}`).style.display = "block";
  }
  document.getElementById("dynamicCard").innerText = ``;
  document.getElementById("dynamicCard").style.display = "none";
}
