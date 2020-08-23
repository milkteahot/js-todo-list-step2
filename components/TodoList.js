import { COMPLETED, TOGGLE, EDIT, EDITING, ESC, ENTER } from "../utils/data.js";

export default function TodoList({
  todoList,
  elementId,
  deleteTodo,
  toggleTodo,
  editTodo,
}) {
  this.init = () => {
    if (!(this instanceof TodoList)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.state = {
      todoList: todoList,
    };
    this.$todoList = document.querySelector(`.${elementId}`);
    this.deleteTodo = deleteTodo;
    this.toggleTodo = toggleTodo;
    this.editTodo = editTodo;
  };
  this.render = () => {
    this.$todoList.innerHTML = `
        ${this.state.todoList
          .map(
            ({ contents, isCompleted, _id }) => `
              <li data-id=${_id} class=${isCompleted ? COMPLETED : ""}>
                  <div class="view">
                      <input class=${TOGGLE} type="checkbox" ${
              isCompleted ? "checked" : ""
            } />
                      <label class="label">${contents}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class=${EDIT} value="${contents}" />
              </li>
            `
          )
          .join("")}
    `;
  };
  this.setState = (todoList) => {
    this.state.todoList = todoList;
    this.render();
  };
  this.clickHandler = (evt) => {
    if (
      evt.target.tagName === "INPUT" &&
      evt.target.classList.contains(TOGGLE)
    ) {
      this.toggleTodo({ id: evt.target.closest("li").dataset.id });
    }
    if (evt.target.tagName === "BUTTON") {
      this.deleteTodo({ id: evt.target.closest("li").dataset.id });
    }
  };
  this.dblClickHandler = (evt) => {
    if (evt.target.tagName === "LABEL") {
      evt.target.closest("li").classList.toggle(EDITING);
      evt.target.closest("li").childNodes[3].focus();
      const input = evt.target.closest("li").querySelector("input.edit");
      input.setSelectionRange(input.value.length, input.value.length);
    }
  };
  this.keydownHandler = (evt) => {
    if (
      evt.target.tagName === "INPUT" &&
      evt.target.classList.contains(EDIT) &&
      evt.key === ESC
    ) {
      evt.target.parentNode.classList.toggle(EDITING);
    } else if (evt.target.tagName === "INPUT" && evt.key === ENTER) {
      this.editTodo({
        contents: evt.target.value,
        _id: evt.target.parentNode.dataset.id,
      });
    }
  };
  this.bindEventListener = () => {
    this.$todoList.addEventListener("click", this.clickHandler);
    this.$todoList.addEventListener("dblclick", this.dblClickHandler);
    this.$todoList.addEventListener("keydown", this.keydownHandler);
    this.$todoList.addEventListener("keydown", this.enterHandler);
  };
  this.init();
  this.render();
  this.bindEventListener();
}