<template>
  <v-container fluid class="">
    <v-row class="d-flex justify-space-between">
      <v-col>
        <v-tabs v-model="tab" color="blue">
          <v-tab value="1">大アルカナ</v-tab>
          <v-tab value="2">小アルカナ</v-tab>
        </v-tabs>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <v-btn @click="onClickAddCard">新規追加</v-btn>
      </v-col>
    </v-row>
    <v-window v-model="tab">
      <v-window-item value="1">
        <majorArcana></majorArcana>
      </v-window-item>
      <v-window-item value="2">
        <minorArcana></minorArcana>
      </v-window-item>
    </v-window>
  </v-container>
</template>
<script setup>
const tab = ref(null)

const onClickAddCard = () =>{
  navigateTo('/cardEdit/new')
}
</script>