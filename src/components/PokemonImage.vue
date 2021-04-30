<template>
    <img v-if="images"
         v-lazy="{ src: images.other['official-artwork'].front_default?
         images.other['official-artwork'].front_default:
         images.front_default, 
                    loading: 'https://craftypixels.com/placeholder-image/100x100/fafafa/fafafa',
                    error: 'your error image url' }" 
          class="h-48 w-48 mx-auto rounded"/>
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