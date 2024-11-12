const { Component, mount, xml, useState } = owl;

class Task extends Component {
  static template = xml`
         <li t-attf-style="background-color:#{props.task.color}" class="list-group-item d-flex justify-content-between align-items-center form-check">
            <div class="form-check me-auto mb-0">
            <input
                class="form-check-input"
                type="checkbox"
                value=""
                t-att-id="props.task.id"
            />
            <label class="form-check-label" t-att-for="props.task.id">
                <t t-esc="props.task.name"/>
            </label>
            </div>
            <div>
            <button class="btn btn-warning mx-2">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger">
                <i class="bi bi-trash"></i>
            </button>
            </div>
        </li>
    `;
  static props = ["task"];
}

class Root extends Component {
  static template = xml`
  <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col my-5">
          <div class="card">
            <div class="card-header">
              <h2 class="text-center">Todo List</h2>
            </div>
            <div class="card-body">
              <div class="input-group-lg d-flex align-items-center border mb-4">
                <input
                  type="text"
                  id="todo"
                  class="form-control flex-fill border-0"
                  placeholder="Add Todo"
                  t-att-value="state.name"
                  t-model="state.name"
                />
                <input
                  type="color"
                  class="form-control form-control-color mx-2 border-0 input-sm"
                  name=""
                  id=""
                  t-att-value="state.color"
                  t-model="state.color"
                />
                <button class="btn btn-primary" id="add-todo" t-on-click="addTask">
                  <i class="bi bi-plus"></i>
                </button>
              </div>

            
              <ul class="list-group" id="todo-list">
                <t t-foreach="tasks" t-as="task" t-key="task.id">
                   <Task task="task"/>
                </t>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  static components = { Task };

  setup() {
    this.state = useState({
      name: "",
      color: "#ffff00",
      isCompleted: false,
    });

    this.tasks = useState([]);
  }

  addTask() {
    if (this.state.name.length > 0) {
      const id = Math.random().toString().substring(2, 12);
      this.tasks.push({
        id: id,
        name: this.state.name,
        color: this.state.color,
        isCompleted: false,
      });
    } else {
      return;
    }

    // after submit clean inputs
    this.state = { ...this.state, name: "", color: "#ffff00" };
  }
}

mount(Root, document.getElementById("root"));
