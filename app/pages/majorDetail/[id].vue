<template>
  <v-container>
    {{ majorCard }}
    <v-row>
      <v-col>
        <img src="" alt="">
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <p>テーマ</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>基本の意味</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const route = useRoute()
const {id} = route.params
const {getCardId} = useMajorAlcana()
const majorCard = ref()
onMounted(async () =>{
  majorCard.value = await getCardId(id)
})
</script>