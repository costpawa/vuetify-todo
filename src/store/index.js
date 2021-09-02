import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
let db = new Localbase('db')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tasks: [],
    dialogEdit: false,
    editItemId: null,
    editTaskTitle: null,
    dialogDelete: false,
    deleteItemId: null,
    snackbar: {
      show: false,
      text: '',
    }
  },

  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },

    addTask(state, newTask) {
      state.tasks.push(newTask)
      state.newTaskTitle = ''
    },

    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },

    confirmDeleteTask(state, id) {
      state.dialogDelete = true
      state.deleteItemId = id
    },

    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },

    editTask(state, payload) {
      state.editItemId = payload.id
      state.editTaskTitle = payload.title
      state.dialogEdit = true
    },

    updateTask(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },

    closeDialog(state) {
      state.dialogEdit = false
      state.dialogDelete = false
    },
    
    showSnackbar(state, text) {
      state.snackbar.show = true
      state.snackbar.text = text
    },

    closeSnackbar(state) {
      state.snackbar.show = false
    },
  },

  actions: {
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks).then(() => {
        commit('setTasks', tasks)
      })
    },

    getTasks({ commit }) {
      db.collection('tasks').get().then(documents => {
        commit('setTasks', documents)
      })
    },

    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
      }

      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task created successfully.')
      })
    },

    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
      })
    },

    confirmDeleteTask({ commit }, id) {
      commit('confirmDeleteTask', id)
    },

    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Task deleted successfully.')
        commit('closeDialog')
      })
    },

    editTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      commit('editTask', {'id': id, 'title': task.title})
    },

    updateTask({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTask', payload)
        commit('closeDialog')
        commit('showSnackbar', 'Task updated successfully.')
      })
    },

    closeDialog({ commit }) {
      commit('closeDialog')
    },

    closeSnackbar({ commit }) {
      commit('closeSnackbar')
    },
  },

  getters: {
    tasks: state => {
      return state.tasks
    },

    taskCount: state => {
      return state.tasks.length
    },

    snackbar: state => {
      return state.snackbar
    },

    editItemId: state => {
      return state.editItemId
    },

    dialogEdit: state => {
      return state.dialogEdit
    },

    deleteItemId: state => {
      return state.deleteItemId
    },

    dialogDelete: state => {
      return state.dialogDelete
    },
  },

  modules: {
  }
})

export default store
