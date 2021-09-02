<template>
  <div>
    <v-snackbar
      v-model="snackbar.show"
      timeout="3000"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="$store.dispatch('closeSnackbar')"
        >
        Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'snackbar'
      ])
    }
}
</script>