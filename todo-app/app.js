const { Component, mount, xml, useState } = owl;

class Task extends Component {
  static template = xml`
    <li t-attf-style="background-color:#{props.task.color}" class="list-group-item d-flex justify-content-between align-items-center form-check">
        <div t-if="state.isEditing" class="input-group d-flex flex-fill align-items-center " style="width:auto">
            <input
                type="text"
                id="todo"
                class="form-control flex-fill "
                placeholder="Add Todo"
                t-model="state.name"
            />
            <input
                type="color"
                class="form-control-color ms-2 rounded"
                style="background:white"
                t-att-value="props.task.color"
                t-model="state.color"
            />
        </div>
        <div t-if="!state.isEditing" class="form-check me-auto mb-0">
            <input
                class="form-check-input"
                type="checkbox"
                t-att-id="state.id"
                t-att-value="state.isCompleted"
                t-on-click="toggleTask"
            />
            <label class="form-check-label" t-att-for="state.id" t-attf-class="#{state.isCompleted ? 'text-decoration-line-through' : ''}">
                <t t-esc="state.name"/>
            </label>
        </div>
        <div>
        <button class="btn btn-warning mx-2" t-on-click="toggleEdit">
            <t t-if="state.isEditing"><i class="bi bi-floppy"></i></t>
            <t t-else=""><i class="bi bi-pencil"></i></t>
        </button>
        <button class="btn btn-danger" t-on-click="deleteTask">
            <i class="bi bi-trash"></i>
        </button>
        </div>
    </li>
`;
  static props = ["task", "onDelete", "onEdit"];

  setup() {
    this.state = useState({
      id: this.props.task.id,
      name: this.props.task.name,
      color: this.props.task.color,
      isCompleted: this.props.task.isCompleted,
      isEditing: false,
    });
  }
  toggleTask() {
    this.state.isCompleted = !this.state.isCompleted;
  }
  deleteTask() {
    this.props.onDelete(this.props.task);
  }
  toggleEdit() {
    this.state.isEditing = !this.state.isEditing;
    this.props.onEdit(this.state);
    console.log(this.state);
  }
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
                  class="form-control-color mx-2 border-0 input-sm"
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
                   <Task task="task" onDelete.bind="deleteTask" onEdit.bind="editTask"/>
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
  deleteTask(task) {
    const index = this.tasks.findIndex((t) => t.id == task.id);
    this.tasks.splice(index, 1);
  }
  editTask(task) {
    const index = this.tasks.findIndex((t) => t.id == task.id);
    this.tasks.splice(index, 1, task);
    console.log(this.tasks);
  }
}

mount(Root, document.getElementById("root"));
