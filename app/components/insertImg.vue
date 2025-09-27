<template>
  <div class="position-relative">
    <v-btn
        @dragover.prevent="isDragged = true"
        @dragleave.prevent="isDragged = false"
        @drop.prevent="onFileDropped"
        :width="props.width"
        :height="props.height"
        max-height="100%"
        max-width="100%"
        class="text-none border"
        variant='outlined'
        depressed
        @click="openFileSelect"
    >
      <v-progress-circular
          v-if="isSelecting"
          class="mx-12 my-6"
          indeterminate
          color="white"
      />
      <v-row v-if="!isSelecting" class="text-center" justify="center">
          <v-col class="mt-2 mb-n2" cols="10">
              <v-icon :icon="mdiCloudUpload" size="40"></v-icon>
          </v-col>
          <v-col class="text-truncate mb-2 mt-n2" cols="10">
              {{ displayText }}
          </v-col>
      </v-row>
    </v-btn>
    <v-card
      class="position-absolute top-0 cursor-pointer image-wrapper"
      elevation="3"
      :width="props.width"
      :height="props.height"
      @dragover.prevent="isDragged = true"
      @dragleave.prevent="isDragged = false"
      @drop.prevent="onFileDropped"
      @click="openFileSelect"
      depressed
      v-if="thumbnail_url"
    >
      <div
        class="position-relative"
        :width="props.width"
        :height="props.height"
      >
        <v-img
          :width="props.width"
          :height="props.height"
          cover
          :src="thumbnail_url"
          v-if="fileType === 'image'"
        ></v-img>
        <video
          :src="thumbnail_url"
          v-if="fileType === 'movie'"
          style="object-fit: cover; object-position: center center;"
          :style="{ width: props.width, height: props.height }"
        ></video>
        <v-btn v-if="selectedFile" variant="text" color="warning" :icon="mdiCloseCircleOutline" class="position-absolute" style="top: -10px; right: -10px;" @click.stop="clearImage"></v-btn>
      </div>
    </v-card>
    <input ref="uploader" class="d-none" type="file" :accept="props.accept" @change="onFileSelectChange">
    <p class="text-caption font-weight-bold" v-if="imgLimit || movLimit">サイズ上限: <span v-if="imgLimit">画像{{imgLimit}}MB</span> <span v-if="movLimit">動画{{movLimit}}MB</span></p>
  </div>
</template>
<script setup>
import { mdiCloudUpload,mdiCloseCircleOutline } from '@mdi/js';
const isSelecting = ref(false)
const uploader = ref(null)
const isDragged = ref(false)
const selectedFile = defineModel()
const thumbnail_url = ref(null)
const fileType = ref(null)
const emit = defineEmits(['send'])
const props = defineProps({
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "160px"
  },
  buttonTitle: {
    type: String,
    default: "ファイルを選択"
  },
  accept : {
    type: String,
    default: ".png, .jpg, .jpeg, .mp4"
  },
  prevUrl: {
    type: String,
    default: null
  },
  prevType: {
    type: String,
    default: "image"
  },
  imgLimit: {
    type: Number,
    default: null
  },
  movLimit: {
    type: Number,
    default: null
  }
})

thumbnail_url.value = props.prevUrl
fileType.value = props.prevType

function onFileSelectChange(e){
  console.log(e)
  if (!e) {
    return
  }

  const target = e.target
  const files = target.files
  const file = files[0]
  if(!file){
    return
  }

  // console.log("file.size", file.size)
  // console.log("props.limit", 1024 * 1024 * props.limit)

  const tmpFileType = getFileType(file)

  if(tmpFileType == "image"){
    if(props.imgLimit && file.size > 1024 * 1024 * props.imgLimit){
      alert(`ファイルサイズの上限を超えています。　上限: ${props.imgLimit}MB`)
      return
    }
  }

  if(tmpFileType == "movie"){
    if(props.movLimit && file.size > 1024 * 1024 * props.movLimit){
      alert(`ファイルサイズの上限を超えています。　上限: ${props.movLimit}MB`)
      return
    }
  }

  selectedFile.value = file
  fileType.value = tmpFileType
  const fr = new FileReader();
  fr.onload = () =>{
    thumbnail_url.value = fr.result
  }
  fr.readAsDataURL(file);
  emit('send',file)
}

function openFileSelect(){
  isSelecting.value = true
  window.addEventListener('focus', () => {
    isSelecting.value = false
  }, { once: true })
  uploader.value?.click()
  console.log(uploader.value)
}

function onFileDropped(e){
  isDragged.value = false
  if (!e) {
    return
  }

  if (!e.dataTransfer) {
    return
  }

  if (e.dataTransfer.files.length === 0) {
    return
  }
  const file = e.dataTransfer.files[0]

  const tmpFileType = getFileType(file)

  if(tmpFileType == "image"){
    if(props.imgLimit && file.size > 1024 * 1024 * props.imgLimit){
      alert(`ファイルサイズの上限を超えています。　上限: ${props.imgLimit}MB`)
      return
    }
  }

  if(tmpFileType == "movie"){
    if(props.movLimit && file.size > 1024 * 1024 * props.movLimit){
      alert(`ファイルサイズの上限を超えています。　上限: ${props.movLimit}MB`)
      return
    }
  }

  selectedFile.value = file
  fileType.value = tmpFileType

  const fr = new FileReader();
  fr.onload = () =>{
    thumbnail_url.value = fr.result
  }
  fr.readAsDataURL(file);
}

const displayText = computed(() => {
  switch (true) {
    case isDragged.value:
      return "離すとアップロード"
    case selectedFile.value != null:
      return selectedFile.value.name
    default:
      return props.buttonTitle
  }
})

function clearImage(){
  thumbnail_url.value = props.prevUrl
  selectedFile.value = null
  fileType.value = props.prevType
}

function getFileType(file){
  if (!file) {
    return null
  }

  const imgs = ["jpg", "jpeg", "png"]
  const movie = ["mp4"]

  const mine = file.name.slice(file.name.lastIndexOf(".") + 1)
  if(imgs.includes(mine)){
    return "image"
  }
  if(movie.includes(mine)){
    return "movie"
  }

  return null
}
</script>

<style lang="scss">
.image-wrapper {
  left: 50%;
  transform: translateX(-50%);
}
</style>