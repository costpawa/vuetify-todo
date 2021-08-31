import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tasks: [],
    newTaskTitle: '',
    dialogEdit: false,
    editTaskTitle: '',
    editItemId: null,
    dialogDelete: false,
    deleteTaskTitle: '',
    deleteItemId: null,
    snackbar: false,
    snackbarText: '',
    taskOperations: [
      {
        "action": "edit",
        "name": "Edit Task",
      },
      {
        "action": "sort",
        "name": "Sort",
      },
      {
        "action": "setDate",
        "name": "Set Date",
      },
      {
        "action": "delete",
        "name": "Delete",
      }
    ],
  },
  mutations: {
    addTask(state) {
      let newTask = {
        id: Date.now(),
        title: state.newTaskTitle,
        done: false,
      }
      state.tasks.push(newTask)
      state.newTaskTitle = ''
      state.snackbarText = 'Task created successfully.'
      state.snackbar = true
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
      state.snackbarText = 'Task deleted successfully.'
      state.snackbar = true
    },
    confirmDeleteTask(state, payload) {
      state.dialogDelete = true
      state.deleteItemId = payload.id
      state.deleteTaskTitle = state.tasks.filter(task => task.id === payload.id)[0].title
    },
    editTask(state, id) {
      state.dialogEdit = true
      state.editItemId = id
      state.editTaskTitle = state.tasks.filter(task => task.id === id)[0].title
    },
    updateTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.title = state.editTaskTitle
      state.dialogEdit = false
      state.snackbarText = 'Task updated successfully.'
      state.snackbar = true
    },
    sortTasks(state) {
      state.snackbarText = 'Tasks sorted successfully.'
      state.snackbar = true
    },
    setDate(state, id) {
      state.snackbarText = 'Date changed successfully.'
      state.snackbar = true
    },
    closeDialog(state) {
      state.dialogEdit = false
      state.dialogDelete = false
    },
    closeSnackbar(state) {
      state.snackbar = false
    },
    // reaction(state, payload) {
    //   switch(payload.action) {
    //     case "edit": this.editTask(payload.id); break;
    //     case "sort": this.sortTasks(payload.id); break;
    //     case "setDate": this.setDate(payload.id); break;
    //     case "delete": this.confirmDeleteTask(payload.id); break;
    //   }
    // },
    // pushSnackbar(state, message) {
    //   this.snackbarText = message
    //   this.snackbar = true
    // }
  },
  actions: {
  },
  modules: {
  }
})

export default store
