<script lang="ts" setup>
import { parseImageUrl } from '@/utlis/unsplash'

const { data } = await useFetch('/api/unsplash/random')
const imgSrc = computed(() => {
  return parseImageUrl(data.value?.url)
})
</script>

<template>
  <div class="flex flex-col w-full h-screen relative top-0 left-0">
    <nuxt-img preload provider="unsplash" :src="imgSrc" class="absolute top-0 left-0 w-full h-full object-cover" />
  </div>
</template>

<style scoped></style>
