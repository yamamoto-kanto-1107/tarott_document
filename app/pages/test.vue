<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="入力して" v-model="inputMessage"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="onClickInput">Click</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const inputMessage = ref()
const max = ref(-1)
const min = ref(101)

const onClickInput = () =>{
  if(inputMessage.value == 999){
    if(max.value == -1){
      console.log('値が入力されていません')
      return
    }
    console.log(min.value)
    console.log(max.value)
    return
  }
  if(inputMessage.value > max.value){
    max.value = inputMessage.value
  }
  if(inputMessage.value < min.value){
    min.value = inputMessage.value
  }
}


</script>