<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn v-if="id == 'new'" color="red" @click="onClickCreate()">新規追加</v-btn>
        <v-btn v-else color="red" @click="onClickUpdate()">更新</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-row>
          <v-col>
            <v-text-field label="カードの名前" v-model="Card[0].card_name" width="200"></v-text-field>
          </v-col>
        </v-row>
        <div v-if="id == 'new'" class="mt-3">
          <v-row>
            <v-col>
              <v-select :items="selectGenre" label="ジャンル選択" v-model="selectedGenre"></v-select>
            </v-col>
          </v-row>
          <v-row v-if="selectedGenre == '小アルカナ'">
            <v-col>
              <v-select :items="selectMinor" label="小アルカナのジャンル" v-model="selectedMinor"></v-select>
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col>
            <p class="text-grey text-subtitle-1">カードの画像</p>
            <insert-img height="250"></insert-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="height: 400px;">
            <v-textarea label="基本の意味" v-model="Card[0].base_confirm" style="height: 100%;"></v-textarea>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
      </v-col>
      <v-col cols="5">
        <div class="mb-3">
          <v-btn @click="normalFlg = !normalFlg " color="black">正位置</v-btn>
        </div>
        <v-expand-transition>
          <div v-show="normalFlg">
            <v-row>
              <v-col>
                <v-textarea label="基本の意味" v-model="Card[0].normal[0].base"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="恋愛" v-model="Card[0].normal[0].love"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="仕事" v-model="Card[0].normal[0].work"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="対人" v-model="Card[0].normal[0].personal"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="決断" v-model="Card[0].normal[0].desicion"></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
        <div class="my-5">
          <v-btn @click="reverseFlg = !reverseFlg " color="black">逆位置</v-btn>
        </div>
        <v-expand-transition>
          <div v-show="reverseFlg">
            <v-row>
              <v-col>
                <v-textarea label="基本の意味" v-model="Card[0].reverse[0].base"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="恋愛" v-model="Card[0].reverse[0].love"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="仕事" v-model="Card[0].reverse[0].work"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="対人" v-model="Card[0].reverse[0].personal"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="決断" v-model="Card[0].reverse[0].desicion"></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const route = useRoute()
const {id} = route.params
const category = route.query.category
const {getCardId,updateMajorAlcana,createMajorAlcana} = useMajorAlcana()
const {getCardIdSmall,createMinorAlcana,updateMinorAlcana} = useMinorAlcana()
const normalFlg = ref(true)
const reverseFlg = ref(true)
const selectGenre = ref(['大アルカナ','小アルカナ'])
const selectMinor = ref(['カップ','ワンド','ソード','ペンタクル'])
const selectedGenre = ref()
const selectedMinor = ref()
// const Card = ref(
//   [
//     {
//       'card_name':'',
//       'normal':[
//         {
//           'base':''
//         }
//       ],
//       'reverse':[
//         {
//           'base':''
//         }
//       ]
//     }
//   ]
// )
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

const onClickUpdate = async () =>{
  if(category == 'bigalcana'){
    const result = await updateMajorAlcana(id,Card.value)

    if(result){
      navigateTo('/')
    }else{
      alert('正常に更新できませんでした')
    }
  }
  if(category == 'smallalcana'){
    const result = await updateMinorAlcana(id,Card.value)

    if(result){
      navigateTo('/')
    }else{
      alert('正常に更新できませんでした')
    }
  }
}

const onClickCreate = async () =>{
  if(selectedGenre.value == '大アルカナ'){
    const result = await createMajorAlcana(Card.value)

    if(result){
      navigateTo('/')
    }else{
      alert('新規追加に失敗しました')
    }
  }else if(selectedGenre.value == '小アルカナ'){
    //小アルカナのジャンルが選択されていない場合はアラート出す
    if(selectedMinor.value == null){
      alert('小アルカナのジャンルが選択されていません')
      return
    }
    const result = await createMinorAlcana(Card.value,selectedMinor.value)

    if(result){
      navigateTo('/')
    }
    alert('新規追加に失敗しました')
  }else{
    alert('ジャンルが選択されていません')
    return
  }
}
</script>