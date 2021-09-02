<template>
  <div>
    <v-text-field
      v-model="newTaskTitle"
      @click:append="$store.dispatch('addTask', newTaskTitle); newTaskTitle = null"
      @keyup.enter="$store.dispatch('addTask', newTaskTitle); newTaskTitle = null"
      class="pa-3"
      outlined
      label="Add Task"
      append-icon="mdi-plus"
      clearable
      hide-details
    ></v-text-field>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTaskTitle: null
      }
    }
  }
</script>
