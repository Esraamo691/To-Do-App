var inputTask = document.getElementById("task");
var btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  addTodo();
});

async function addTodo() {
  let object = {
    method: "POST",
    body: JSON.stringify({
      title: inputTask.value,
      apiKey: "6666f61c60a208ee1fdba11b",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(
    "https://todos.routemisr.com/api/v1/todos",
    object
  );
  let data = await response.json();
  console.log(data);
  if (data.message == "success") {
    getAllTodo();
  }
}

async function getAllTodo() {
  let response = await fetch(
    "https://todos.routemisr.com/api/v1/todos/6666f61c60a208ee1fdba11b"
  );
  let data = await response.json();
  console.log(data.todos);
  display(data.todos);
}

function display(alltasks) {
  var content = ``;
  for (var i = 0; i < alltasks.length; i++) {
    content += `
 <div class="${
   alltasks[i].completed ? "bg-danger" : ""
 } tasks my-3 rounded text-light d-flex justify-content-between w-75 m-auto px-3 py-2 align-items-center">
 <div class="task">
     <p class="${
       alltasks[i].completed ? "text-decoration-line-through" : ""
     } task-text m-0 p-0">${alltasks[i].title}</p>
 </div>
 <div>
    <i onclick="markCompleted('${
      alltasks[i]._id
    }')" class="fa-regular fa-circle-check"></i>
     <i onclick="deleteTodo('${
       alltasks[i]._id
     }')" class="fa-solid fa-trash mx-2"></i>
 </div> 
 </div>

`;
  }
  document.getElementById("tasks").innerHTML = content;
}

getAllTodo();
async function markCompleted(id) {
  console.log(id);
  let obj = {
    todoId: id,
  };
  let response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  console.log(data);
  if (data.message == "success") {
    getAllTodo();
  }
}
async function deleteTodo(id) {
  let obj = {
    todoId: id,
  };
  let response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "DELETE",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  console.log(data);
  if (data.message == "success") {
    getAllTodo();
  }
}
