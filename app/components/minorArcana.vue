<template>
  <v-container>
    <div v-for="(items,index) in minorArray" :key="index">
      <v-btn @click="items.display = !items.display" class="mt-3" color="black">{{items.name}}の一覧</v-btn>
      <v-expand-transition class="mb-5">
        <div v-show="items.display">
          <draggable v-model="items.card" item-key="id" @end="onDraggCard(index)">
            <template #item="{ element }">
              <v-card variant="outlined" class="mt-3 cursor-grab">
                <v-card-title justify="center" class="d-flex justify-space-between">
                  <div class="d-flex">
                    <v-icon :icon="mdiDrag" class="mr-5"></v-icon>
                    <div>
                      {{ element.card_name }}
                    </div>
                  </div>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-icon :icon="mdiInformation" class="cursor-default" v-bind="props"></v-icon>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          <v-btn variant="text" @click="onClickPreview(element.id)">プレビュー</v-btn>
                        </v-list-item-title>
                        <v-list-item-title>
                          <v-btn variant="text" @click="onClickEdit(element.id)">編集</v-btn>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>
              </v-card>
            </template>
          </draggable>
        </div>
      </v-expand-transition>
    </div>
  </v-container>
</template>
<script setup>
import draggable from 'vuedraggable'
import {
  mdiDrag,
  mdiInformation
} from "@mdi/js"
const {getSord,getWand,getPentacle,getCup,updateOrder} = useMinorAlcana()
const majorCard = ref()
const minorArray = ref([
  {
    'name':'カップ',
    'display':true,
    'card':[]
  },
  {
    'name':'ワンド',
    'display':true,
    'card':[]
  },
  {
    'name':'ソード',
    'display':true,
    'card':[]
  },
  {
    'name':'ペンタクル',
    'display':true,
    'card':[]
  }
])
const cupCard = ref()
const wandCard = ref()
const sordCard = ref()
const pentacleCard = ref()

onMounted(async() =>{
  cupCard.value = await getCup()
  wandCard.value = await getWand()
  sordCard.value = await getSord()
  pentacleCard.value = await getPentacle()
  minorArray.value[0].card = cupCard.value
  minorArray.value[1].card = wandCard.value
  minorArray.value[2].card = sordCard.value
  minorArray.value[3].card = pentacleCard.value
})

const onDraggCard = async (index) =>{
  console.log(index)
  console.log(minorArray.value[index].card)
  console.log(minorArray.value[index])

  let num = 0
  for(let i of minorArray.value[index].card){
    const order = num + 1
    const result =  await updateOrder(i.id,order)
    console.log(i)
    num +=1

    if(!result){
      alert('並び替えの更新に失敗しました')
    }
  }
}

const onClickNavigate = (id) =>{
  navigateTo(`/majorDetail/${id}`)
}


const onClickPreview = (id) =>{
  const param = {id:id, category:'smallalcana'}
  navigateTo({ path: `/cardPreview/${id}`, query: param });
}
const onClickEdit = (id) =>{
  const param = {id:id, category:'smallalcana'}
  navigateTo({ path: `/cardEdit/${id}`, query: param });
}
</script>