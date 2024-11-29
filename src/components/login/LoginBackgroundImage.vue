<script setup>
import loginBackground from '@/assets/login_background.jpg'
</script>
<template>
  <v-img :src="loginBackground" class="background-img" width="100%" height="100%" cover />
</template>
<style scoped>
.background-img {
  position: fixed;
  filter: blur(5px);
}
</style>
