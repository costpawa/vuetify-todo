<template>
  <div>
    <v-list
      flat
      class="pt-0"
    >
      <div
        v-for="(task, idx) in tasks"
        :key="idx"
      >
        <v-list-item
        @click="$store.dispatch('doneTask', task.id)"
        :class="{ 'blue lighten-5' : task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through' : task.done }"
              >
              {{ task.title }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-menu
                left
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="$store.dispatch('editTask', task.id)">
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="$store.dispatch('confirmDeleteTask', task.id)">
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      
      <div>
        <edit-task-dialog></edit-task-dialog>
        <delete-task-dialog></delete-task-dialog>
      </div>
    </v-list>
  </div>
</template>

<script>
  import EditTaskDialog from '@/components/EditTaskDialog.vue'
  import DeleteTaskDialog from '@/components/DeleteTaskDialog.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      'edit-task-dialog': EditTaskDialog,
      'delete-task-dialog': DeleteTaskDialog,
    },
    computed: {
    ...mapGetters([
        'tasks'
      ]),
    }
  }
</script>
