<template>
    <img v-if="images"
         v-lazy="{ src: images.other['official-artwork'].front_default, 
                    loading: 'your loading image url', 
                    error: 'your error image url' }" 
          class="ml-auto mr-auto h-80 w-80 bg-gray-200 mt-10 rounded-md"
    />
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