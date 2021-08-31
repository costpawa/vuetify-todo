<template>
  <div>
    <v-text-field
      v-model="$store.state.newTaskTitle"
      @click:append="$store.commit('addTask')"
      @keyup.enter="$store.commit('addTask')"
      class="pa-3"
      outlined
      label="Add Task"
      append-icon="mdi-plus"
      clearable
      hide-details
    ></v-text-field>
    <v-list
      flat
      class="pt-0"
      v-if="$store.state.tasks.length > 0"
    >
      <div
        v-for="(task, idx) in $store.state.tasks"
        :key="idx"
      >
        <v-list-item
          @click="$store.commit('doneTask', task.id)"
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
                  <v-list-item>
                    <v-list-item-title @click="$store.commit('editTask', task.id)">Edit Task</v-list-item-title>
                    <v-list-item-title @click="$store.commit('sortTasks')">Sort</v-list-item-title>
                    <v-list-item-title @click="$store.commit('setDate', task.id)">Set Date</v-list-item-title>
                    <v-list-item-title @click="$store.commit('deleteTask', task.id)">Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <div>
        <v-dialog
          v-model="$store.state.dialogEdit"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              Edit Task
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="$store.state.editTaskTitle"
                @click:append="$store.state.editTask"
                @keyup.enter="$store.state.editTask"
                class="pa-3"
                outlined
                append-icon="mdi-pencil"
                hide-details
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="secondary"
                text
                @click="$store.commit('closeDialog')"
              >
                Close
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="$store.commit('updateTask', $store.state.editItemId)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="$store.state.dialogDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              Delete Task
            </v-card-title>
            <v-card-text>Are you sure to delete {{ $store.state.deleteTaskTitle }} task?</v-card-text>
            <v-card-actions>
              <v-btn
                color="secondary"
                text
                @click="$store.commit('closeDialog')"
              >
                Close
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="$store.commit('deleteTask', $store.state.deleteItemId)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-snackbar
          v-model="$store.state.snackbar"
          timeout="3000"
        >
          {{ $store.state.snackbarText }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="$store.commit('closeSnackbar')"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-list>
    <div v-else class="pl-3 text-center">
      <div>
        <v-icon
          color="green"
          size="128"
        >
          mdi-check
        </v-icon>
      </div>
      <h1 class="font-weight-regular">No task</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Todo',
  }
</script>
