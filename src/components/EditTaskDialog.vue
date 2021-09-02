<template>
  <div>
    <v-dialog
      v-model="dialogEdit"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          Edit Task
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="$store.state.editTaskTitle"
            @click="$store.dispatch('editTask', editItemId)"
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
            @click="$store.dispatch('closeDialog')"
          >
          Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="$store.dispatch('updateTask', {'id': editItemId, 'title': $store.state.editTaskTitle})"
          >
          Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
    ...mapGetters([
        'editItemId', 'dialogEdit'
      ])
    }
  }
</script>
