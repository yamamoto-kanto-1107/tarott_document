<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col class="d-flex justify-center">
            <p class="text-h3">{{ Card[0].card_name }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="border-sm border-info border-lg">
            <p>{{ Card[0].base_confirm }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-9">
      <v-col cols="5">
        <div>
          <img src="" alt="">
        </div>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="6" class="d-flex justify-center">
                <p>正位置</p>
              </v-col>
              <v-col cols="6" class="d-flex justify-center">
                <p>逆位置</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col class="text-caption border mr-3">
                <p>{{ Card[0].normal[0].base }}</p>
              </v-col>
              <v-col class="text-caption border">
                <p>{{ Card[0].reverse[0].base }}</p>
              </v-col>
            </v-row>
            <v-row v-for="(items,index) in genreArr" :key="index">
              <v-col cols="6" class="d-flex align-center">
                <v-chip class="mr-3" :color="items.cl">{{ items.value }}</v-chip>
                <p>{{ Card[0].normal[0][items.key] }}</p>
              </v-col>
              <v-col cols="6" class="d-flex align-center">
                <v-chip class="mr-3" :color="items.cl">{{ items.value }}</v-chip>
                <p>{{ Card[0].reverse[0][items.key] }}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const route = useRoute()
const {id} = route.params
const category = route.query.category
const {getCardId} = useMajorAlcana()
const {getCardIdSmall} = useMinorAlcana()
const genreArr = [
  {
    value:'恋愛',
    key:'love',
    cl:'pink'
  },
  {
    value:'仕事',
    key:'work',
    cl:'blue'
  },
  {
    value:'対人',
    key:'personal',
    cl:'green'
  },
  {
    value:'決断',
    key:'desicion',
    cl:'red'
  }
]
const Card = ref([{
  card_name:'',
  base_confirm:'',
  normal:[{ base:'', love:'', work:'', personal:'', desicion:'' }],
  reverse:[{ base:'', love:'', work:'', personal:'', desicion:'' }]
}])

onMounted(async () =>{
  if(id == 'new'){
    return
  }
  if(category == 'bigalcana'){
    Card.value = await getCardId(id)
  }
  if(category == 'smallalcana'){
    Card.value = await getCardIdSmall(id)
  }
})
</script>