<template>
    <img v-if="images"
         v-lazy="{ src: images.other['official-artwork'].front_default?
         images.other['official-artwork'].front_default:
         images.front_default, 
                    loading: 'your loading image url', 
                    error: 'your error image url' }" 
          class="h-48 w-48 mx-auto"/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'PokemonImage',
    props: {
      images: {
        type: Object,
        required: true
      }
    },

  })
</script>