function handleFormSubmit(event) {
  event.preventDefault();
  const container = document.getElementById("container");
  const expenseAmoutToAdd = document.getElementById("expenseAmount").value;
  const descriptionToAdd = document.getElementById("description").value;
  const categoryToSelect = document.getElementById("category").value;

  let expenseDetail = {
    amount: expenseAmoutToAdd,
    description: descriptionToAdd,
    category: categoryToSelect,
  };
  const expenseDetails = JSON.stringify(expenseDetail);
  localStorage.setItem(descriptionToAdd, expenseDetails);

  const newUl = document.createElement("ul");
  newUl.className = "list-group fs-3";
  const newLi = document.createElement("li");
  newLi.id = "listItem";

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "d-flex";

  const detailDiv = document.createElement("div");
  detailDiv.className = "d-flex mx-1";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-danger mx-2";
  deleteBtn.id = "delBtn";
  deleteBtn.addEventListener("click", deleteItem);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.type = "button";
  editBtn.className = "btn btn-info  mx-2";
  editBtn.id = "editBtn";
  editBtn.addEventListener("click", editItem);

  newLi.className = "list-group-item d-flex mt-5 justify-content-evenly";
  detailDiv.innerHTML =
    expenseAmoutToAdd + " - " + descriptionToAdd + " - " + categoryToSelect;
  buttonDiv.appendChild(editBtn);
  buttonDiv.appendChild(deleteBtn);
  newLi.appendChild(detailDiv);
  newLi.appendChild(buttonDiv);
  newUl.appendChild(newLi);
  container.appendChild(newUl);

  document.getElementById("expenseAmount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
}

function deleteItem(event) {
  const listItem = event.target.closest("#listItem");
  const description = listItem.querySelector("div").textContent.split(" - ")[1];
  localStorage.removeItem(description);
  listItem.remove();
}

function editItem(event) {
  const listItem = event.target.closest("#listItem");
  const detailDiv = listItem.querySelector("div");

  const [amount, description, category] = detailDiv.textContent.split(" - ");
  document.getElementById("expenseAmount").value = amount.trim();
  document.getElementById("description").value = description.trim();
  document.getElementById("category").value = category.trim();

  localStorage.removeItem(description);

  listItem.remove();
}
