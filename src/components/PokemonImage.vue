<template>
    <div v-if="!isLoad"
          class="bg-gray-100 h-48 w-48 mx-auto rounded flex justify-center items-center">
          <i class="h-auto h-48 w-48 fas fa-fan animate-spin text-9xl text-gray-300"></i>
    </div>
    <img v-bind:class="{ 'hidden': !isLoad}" 
          :src="avatarUrl" @load="loaded"
          class="48 w-48 mx-auto bg-gray-100 rounded"/>
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
    watch: { 
      images(newImages, oldImages) { 
        if (!newImages || newImages.front_default===oldImages.front_default) { return };
        this.avatarUrl = this.setAvatarUrl(newImages);
      }
    },
    data() {
      return{
        isLoad:false,
        avatarUrl:this.setAvatarUrl(this.images)
      }
    },
    methods: {
      setAvatarUrl(images:any){
        this.isLoad=false;
        return images.other['official-artwork'].front_default?
          images.other['official-artwork'].front_default:
          images.front_default;
      },
      loaded(){
        this.isLoad=true;
      }
    }
  })
</script>