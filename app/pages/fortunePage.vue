<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <v-btn color="red" @click="onClickConfirmCard">カード確認</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="purple">過去、現在、未来を知る</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="blue" to="/celticCross">ケルト十字</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const onClickConfirmCard = () =>{
  navigateTo('/confirmCard')
}

</script>