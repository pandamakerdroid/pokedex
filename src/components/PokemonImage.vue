<template>
  <div class="bg-gray-100 h-48 w-48 rounded mx-auto flex justify-center items-center">
    <div v-if="!isLoad">
          <i class="fas fa-fan animate-spin text-9xl text-gray-300"></i>
    </div>
    <img v-bind:class="{ 'hidden': !isLoad}" 
          :src="avatarUrl" @load="loaded"/>
  </div>
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