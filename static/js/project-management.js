// ==== Project Management Tool ====

class ProjectManagement {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    this.projects = JSON.parse(localStorage.getItem('pm_projects')) || [];
    this.render();
  }

  save() {
    localStorage.setItem('pm_projects', JSON.stringify(this.projects));
  }

  addProject(name) {
    if (!name.trim()) return alert('Jina la mradi haliruhusiwi kuwa tupu');
    this.projects.push({ id: Date.now(), name, tasks: [] });
    this.save();
    this.render();
  }

  removeProject(id) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.save();
    this.render();
  }

  addTask(projectId, taskName) {
    if (!taskName.trim()) return alert('Jina la kazi haliruhusiwi kuwa tupu');
    const proj = this.projects.find(p => p.id === projectId);
    proj.tasks.push({ id: Date.now(), name: taskName, done: false });
    this.save();
    this.render();
  }

  toggleTask(projectId, taskId) {
    const proj = this.projects.find(p => p.id === projectId);
    const task = proj.tasks.find(t => t.id === taskId);
    task.done = !task.done;
    this.save();
    this.render();
  }

  removeTask(projectId, taskId) {
    const proj = this.projects.find(p => p.id === projectId);
    proj.tasks = proj.tasks.filter(t => t.id !== taskId);
    this.save();
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <h2 class="text-xl font-bold mb-4">Usimamizi wa Miradi</h2>
      <div class="mb-4">
        <input id="newProjectInput" class="border p-2 mr-2 rounded" placeholder="Jina la mradi mpya" />
        <button id="addProjectBtn" class="bg-blue-600 text-white px-3 py-1 rounded">Ongeza Mradi</button>
      </div>
      <div id="projectsList">
        ${this.projects.map(p => `
          <div class="mb-6 border p-4 rounded shadow bg-gray-50">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-lg">${p.name}</h3>
              <button data-id="${p.id}" class="remove-project text-red-600 hover:underline">Futa Mradi</button>
            </div>
            <div>
              <input id="taskInput-${p.id}" placeholder="Andika kazi mpya" class="border p-1 rounded w-3/4 mr-2" />
              <button data-id="${p.id}" class="add-task bg-green-600 text-white px-2 rounded">Ongeza Kazi</button>
            </div>
            <ul class="mt-3">
              ${p.tasks.map(t => `
                <li class="flex items-center space-x-2 ${t.done ? 'line-through text-gray-500' : ''}">
                  <input type="checkbox" data-project-id="${p.id}" data-task-id="${t.id}" class="toggle-task" ${t.done ? 'checked' : ''} />
                  <span>${t.name}</span>
                  <button data-project-id="${p.id}" data-task-id="${t.id}" class="remove-task ml-auto text-red-500 hover:underline">Futa</button>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;

    this.addEventListeners();
  }

  addEventListeners() {
    document.getElementById('addProjectBtn').onclick = () => {
      const input = document.getElementById('newProjectInput');
      this.addProject(input.value);
      input.value = '';
    };

    Array.from(this.root.querySelectorAll('.remove-project')).forEach(btn => {
      btn.onclick = () => {
        const id = +btn.getAttribute('data-id');
        this.removeProject(id);
      };
    });

    Array.from(this.root.querySelectorAll('.add-task')).forEach(btn => {
      btn.onclick = () => {
        const projectId = +btn.getAttribute('data-id');
        const taskInput = document.getElementById(`taskInput-${projectId}`);
        this.addTask(projectId, taskInput.value);
        taskInput.value = '';
      };
    });

    Array.from(this.root.querySelectorAll('.toggle-task')).forEach(chk => {
      chk.onchange = () => {
        const projectId = +chk.getAttribute('data-project-id');
        const taskId = +chk.getAttribute('data-task-id');
        this.toggleTask(projectId, taskId);
      };
    });

    Array.from(this.root.querySelectorAll('.remove-task')).forEach(btn => {
      btn.onclick = () => {
        const projectId = +btn.getAttribute('data-project-id');
        const taskId = +btn.getAttribute('data-task-id');
        this.removeTask(projectId, taskId);
      };
    });
  }
}

// Init the Project Management tool inside a div with id "projectManagementRoot"
window.onload = () => {
  new ProjectManagement('projectManagementRoot');
};
