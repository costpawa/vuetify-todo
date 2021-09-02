<template>
  <div>
    <add-task></add-task>
    <div v-if="taskCount > 0">
      <task-list></task-list>
    </div>
    <div v-else class="pl-3 text-center">
      <no-task></no-task>
    </div>
    <snackbar></snackbar>
  </div>
</template>

<script>
  import AddTask from '@/components/AddTask.vue'
  import TaskList from '@/components/TaskList.vue'
  import NoTask from '@/components/NoTask.vue'
  import Snackbar from '@/components/Snackbar.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Todo',
    components: {
      'add-task': AddTask,
      'task-list': TaskList,
      'no-task': NoTask,
      'snackbar': Snackbar,
    },
    computed: {
      ...mapGetters([
        'taskCount'
      ])
    }
  }
</script>
