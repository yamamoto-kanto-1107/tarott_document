<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon variant="text" color="black" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Tarot Card</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list
        :items="items"
        @click:select="onClickItem"
      ></v-list>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
const drawer = ref(false)
const items = [
  {
    'title':'カード一覧',
    'value':'/'
  },
  {
    'title':'占い',
    'value':'fortunePage'
  }
]

const onClickItem = (item) =>{
  navigateTo(`${item.id}`)
}
</script>