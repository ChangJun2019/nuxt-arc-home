<script lang="ts" setup>
const { data } = await useFetch('/api/unsplash/random')
</script>

<template>
  <div class="flex flex-col w-full h-screen relative top-0 left-0">
    <nuxt-img preload :src="data?.url" fit="cover" class="absolute top-0 left-0 w-full h-full" />
  </div>
</template>

<style scoped></style>
