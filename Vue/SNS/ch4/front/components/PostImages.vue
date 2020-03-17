<template>
  <div v-if="images.length === 0"></div>
  <div v-else-if="images.length === 1">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      contain
      aspect-ratio="2"
    /> <!--contain을 하면 이미지가 안짤려, aspect-ratio="2" : 가로가 두개 더 긴거-->
  </div>
  <div v-else-if="images.length === 2" style="display:flex">
    <v-img 
      :src="`http://localhost:3085/${images[0].src}`"
      contain
      aspect-ratio="2"    
      style="flex:1"
    />
    <v-img 
      :src="`http://localhost:3085/${images[1].src}`"
      contain
      aspect-ratio="2"    
      style="flex:1"
    />
  </div>
  <div v-else-if="images.length > 2"></div>
</template>>

<script>
  export default {
    props: {
      images: {
        type: Array,
        required: true,
      }
    }
  }
</script>