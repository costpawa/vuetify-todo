<template>
  <div>
    <v-dialog
      v-model="dialogDelete"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          Delete Task
        </v-card-title>
        <v-card-text>Are you sure to delete task?</v-card-text>
        <v-card-actions>
          <v-btn
            color="secondary"
            text
            @click="$store.dispatch('closeDialog')"
          >
          No
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="$store.dispatch('deleteTask', deleteItemId)"
          >
          Yes
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
        'deleteItemId', 'dialogDelete'
      ])
    }
  }
</script>
