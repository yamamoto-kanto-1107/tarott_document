<template>
  <v-container>
    <v-row v-for="(item,index) in kind" :key="index" align="center">
      <v-col>
        <v-row>
          <v-col class="d-flex">
            <v-col>
              {{ item.name }}
            </v-col>
            <!-- 位置（正位置・逆位置） -->
            <v-col>
              <v-select
                :items="nowPosition"
                v-model="item.keySelectPosition"
                label="位置"
                @update:modelValue="onSelectNowAlcana(index)"
              />
            </v-col>

            <!-- 大アルカナ or 小アルカナ -->
            <v-col>
              <v-select
                :items="cardItem"
                v-model="item.keyAlcana"
                label="アルカナ"
              />
            </v-col>

            <!-- アルカナ②：カード名 or 小アルカナの種類 -->
            <v-col>
              <v-select
                v-if="item.keyAlcana"
                :items="nowSelect(item)"
                v-model="item.keySelectedMinor"
                label="アルカナ②"
                @update:modelValue="onSelectNowAlcana(index)"
              />
            </v-col>

            <!-- アルカナ③：小アルカナの場合のみ詳細選択 -->
            <v-col>
              <v-select
                v-if="item.keyAlcana === '小アルカナ'"
                :items="nowMinorAlcana(item)"
                v-model="item.keySelectMinorName"
                label="アルカナ③"
                @update:modelValue="onSelectNowMinor(index)"
              />
            </v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" v-for="(i,index) of result" :key="index">
            <v-chip :color="i.color">{{ i.key }}</v-chip>
            <p v-if="item.keyAlcana == '大アルカナ' && item.keySelectedMinor != undefined && item.keySelectPosition == '正位置'">
              {{ item.searchedCard.normal[i.id] }}
            </p>
            <p v-if="item.keyAlcana == '大アルカナ' && item.keySelectedMinor != undefined && item.keySelectPosition == '逆位置'">
              <!-- {{ item.searchedCard.reverse[0][i.id] }} -->
              {{ item.searchedCard.reverse[i.id] }}
            </p>
            <p v-if="item.keyAlcana == '小アルカナ' && item.keySelectedMinor != undefined && item.keySelectPosition == '正位置'">
              {{ item.searchedCard.normal[i.id] }}
            </p>
            <p v-if="item.keyAlcana == '小アルカナ' && item.keySelectedMinor != undefined && item.keySelectPosition == '逆位置'">
              {{ item.searchedCard.reverse[i.id] }}
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-divider></v-divider>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue"

// データ取得用 composable（ユーザー定義）
const { getCard,getCardFromNameNormal,getCardFromNameReverse } = useMajorAlcana()
const { getCardSmall,getMinorCardFromNameNormal,getMinorCardFromNameReverse } = useMinorAlcana()

const small = ref([])
const big = ref([])
const card = ref([])
const searchedCard = ref()

const cardItem = ["大アルカナ", "小アルカナ"]
const nowPosition = ["正位置", "逆位置"]
const result = [
  {
    key:'恋愛',
    color:'pink',
    id:'love'
  },
  {
    key:'仕事',
    color:'green',
    id:'work'
  },
  {
    key:'対人',
    color:'grey',
    id:'personal'
  },
  {
    key:'決断',
    color:'red',
    id:'desicion'
  }
]
  // '恋愛','仕事','対人','決断']

// ケルト十字の10ポジション
const kind = ref([
  { name: "①現在", key: "now", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "", searchedCard:{normal:[{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}]}},
  { name: "②障害", key: "hindrance", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "" ,searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] } },
  { name: "③過去", key: "past", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "",searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] }},
  { name: "④未来", key: "future", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "" ,searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] } },
  { name: "⑤顕在意識", key: "consciousness", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "" ,searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] } },
  { name: "⑥潜在意識", key: "mind", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "" ,searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] } },
  { name: "⑦自分", key: "myself", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "" ,searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] } },
  { name: "⑧周囲", key: "surroundings", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "",searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] } },
  { name: "⑨願望・恐れ", key: "DesireFire", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "",searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] } },
  { name: "⑩最終結果", key: "result", keySelectPosition: "", keyAlcana: "", keySelectedMinor: "", keySelectMinorName: "" ,searchedCard:{ normal: [{love:'',work:'',personal:'',desicion:''}],reverse:[{love:'',work:'',personal:'',desicion:''}] } }
])

// onMounted でカードデータ取得
onMounted(async () => {
  big.value = await getCard()
  small.value = await getCardSmall()

  card.value = [
    ...big.value.map(c => ({ ...c, type: "大アルカナ" })),
    ...small.value.map(c => ({ ...c, type: "小アルカナ" }))
  ]
  console.log("全カードデータ:", card.value)
})

// 大アルカナ or 小アルカナの候補を返す関数
const nowSelect = (item) => {
  if (!item.keyAlcana) return []

  if (item.keyAlcana === "大アルカナ") {
    return card.value
      .filter(c => c.type === "大アルカナ")
      .map(c => c.card_name)
  }

  if (item.keyAlcana === "小アルカナ") {
    return ["カップ", "ワンド", "ソード", "ペンタクル"]
  }

  return []
}

// 小アルカナの詳細を返す関数
const nowMinorAlcana = (item) => {
  if (item.keyAlcana !== "小アルカナ" || !item.keySelectedMinor) return []

  return card.value
    .filter(c => c.genre === item.keySelectedMinor)
    .map(c => c.card_name)
}

const onSelectNowAlcana = async (index) =>{
  if(kind.value[index].keyAlcana == '大アルカナ'){
    if(kind.value[index].keySelectPosition == '正位置'){
      let i
      i = await getCardFromNameNormal(kind.value[index].keySelectedMinor)
      console.log('---')
      console.log(i.normal[0])
      kind.value[index].searchedCard.normal = i.normal[0]
    }else{
      console.log('call')
      let y
      y = await getCardFromNameReverse(kind.value[index].keySelectedMinor)
      console.log(y.reverse)
      kind.value[index].searchedCard.reverse = y.reverse[0]
      console.log(kind.value[index].searchedCard)
    }
  }
}

const onSelectNowMinor = async (index) =>{
  if(kind.value[index].keyAlcana == '小アルカナ'){
    if(kind.value[index].keySelectPosition == '正位置'){
      console.log(kind.value[index].keySelectedMinor)
      console.log(kind.value[index].keySelectMinorName)
      let i
      i = await getMinorCardFromNameNormal(kind.value[index].keySelectMinorName)
      console.log('---')
      console.log(i.normal[0])
      kind.value[index].searchedCard.normal = i.normal[0]
    }else{
      console.log('call')
      let y
      y = await getMinorCardFromNameReverse(kind.value[index].keySelectMinorName)
      console.log(y.reverse)
      kind.value[index].searchedCard.reverse = y.reverse[0]
      console.log(kind.value[index].searchedCard)
    }
  }
}
</script>
