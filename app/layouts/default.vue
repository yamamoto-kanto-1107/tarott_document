<template>
  <v-app>
    <v-app-bar height="72" app elevation="2" color="white">
      <v-app-bar-title class="d-flex justify-center">
        My App
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
</script>