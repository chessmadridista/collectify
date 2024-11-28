<script setup>
import { useGeneralStore } from '@/stores'

const generalStore = useGeneralStore()
</script>
<template>
  <v-snackbar
    v-model="generalStore.snackbar"
    :color="generalStore.snackbarColor"
    location="top right"
  >
    {{ generalStore.snackbarMessage }}
  </v-snackbar>
</template>
