<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select label="アルカナを選択してください" :items="alcana" v-model="searchAlcana"></v-select>
      </v-col>
      <v-col v-if="searchAlcana == '小アルカナ'">
        <v-select :items="genre" label="小アルカナのジャンル" v-model="searchGenre"></v-select>
      </v-col>
      <v-col>
        <v-text-field label="カード名" v-model="searchCard"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card v-for="(items,index) in inputSearchCard" :key="index" class="my-3">
          <v-card-title>
            {{ items.card_name }}
          </v-card-title>
          <v-card-text>
            <v-row class="d-flex" align="center">
              <v-chip color="red">正位置</v-chip>
              <v-col>
                <p>恋愛：</p>
                <p>{{ items.normal[0].love }}</p>
              </v-col>
              <v-col>
                <p>仕事：</p>
                <p>{{ items.normal[0].work }}</p>
              </v-col>
              <v-col>
                <p>対人：</p>
                <p>{{ items.normal[0].personal }}</p>
              </v-col>
              <v-col>
                <p>決断：</p>
                <p>{{ items.normal[0].desicion }}</p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="d-flex" align="center">
              <v-chip color="blue">逆位置</v-chip>
              <v-col>
                <p>恋愛</p>
                <p>{{ items.reverse[0].love }}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const alcana = ['大アルカナ','小アルカナ']
const genre = ['カップ','ワンド','ソード','ペンタクル']
const {getCard} = useMajorAlcana()
const {getCardSmall} = useMinorAlcana()
const major = ref()
const minor = ref()
const card = ref()
const searchAlcana = ref()
const searchGenre = ref()
const searchCard = ref()


onMounted(async() =>{
  major.value = await getCard()
  minor.value = await getCardSmall()
  card.value = [
    ...major.value.map(c => ({ ...c, type: "major" })),
    ...minor.value.map(c => ({ ...c, type: "minor" }))
  ]
  console.log(card.value)
})

const inputSearchCard = computed(() => {
  let filtered = card.value ?? []

  // 大アルカナ/小アルカナで絞る
  if (searchAlcana.value === '大アルカナ') {
    filtered = filtered.filter(alcana => alcana.type === 'major')
  } else if (searchAlcana.value === '小アルカナ') {
    filtered = filtered.filter(alcana => alcana.type === 'minor')
  }

  // ジャンルでさらに絞る
  if (searchGenre.value === 'カップ') {
    filtered = filtered.filter(alcana => alcana.genre === 'カップ')
  }else if(searchGenre.value === 'ワンド'){
    filtered = filtered.filter(alcana => alcana.genre === 'ワンド')
  }else if(searchGenre.value === 'ソード'){
    filtered = filtered.filter(alcana => alcana.genre === 'ソード')
  }else if(searchGenre.value === 'ペンタクル'){
    filtered = filtered.filter(alcana => alcana.genre === 'ペンタクル')
  }

  if(searchCard.value != undefined){
    const keyword = searchCard.value.toLowerCase()
    filtered = filtered.filter(alcana =>
      alcana.card_name.toLowerCase().includes(keyword)
    )
  }

  return filtered
})

</script>