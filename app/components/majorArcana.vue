<template>
  <v-container>
    <draggable v-model="majorCard" item-key="id" @end="onDraggCard">
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
  </v-container>
</template>
<script setup>
import draggable from 'vuedraggable'
import {
  mdiDrag,
  mdiInformation
} from "@mdi/js"
const {getCard,updateOrder} = useMajorAlcana()
const majorCard = ref()

onMounted(async() =>{
  majorCard.value = await getCard()
})

const onDraggCard = async () =>{
  let index = 0
  for(let i of majorCard.value){
    const order = index + 1
    console.log(order)
    const result =  await updateOrder(i.id,order)
    index +=1

    if(!result){
      alert('並び替えの更新に失敗しました')
    }
  }
}

const onClickNavigate = (id) =>{
  navigateTo(`/majorDetail/${id}`)
}


const onClickEdit = (id) =>{
  const param = {id:id, category:'bigalcana'}
  navigateTo({ path: `/cardEdit/${id}`, query: param });
}

const onClickPreview = (id) =>{
  const param = {id:id, category:'bigalcana'}
  navigateTo({ path: `/cardPreview/${id}`, query: param });
}
</script>