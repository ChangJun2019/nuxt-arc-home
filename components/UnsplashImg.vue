<script setup lang="ts">
import { StorageSerializers, useStorage } from '@vueuse/core'
import type { RandomPhoto } from '@/server/api/unsplash/random.get'

interface UnsplashStore {
  current: number
  list: RandomPhoto[] | null
}

const loading = ref(true)
const unsplash = ref<RandomPhoto | null>(null)
const storedObject = useStorage<UnsplashStore>('my-unsplash-store', null, localStorage, { serializer: StorageSerializers.object })
const { pixelRatio } = useDevicePixelRatio()
const modifiers = computed(() => {
  return {
    dpr: pixelRatio.value,
    auto: 'format,compress',
  }
})

async function init() {
  if (!storedObject.value) {
    const { data: list } = await useFetch('/api/unsplash/random')
    if (list.value?.length)
      storedObject.value = { current: 0, list: list.value }
  }
  if (storedObject.value && storedObject.value.list) {
    const _unsplash = storedObject.value.list![storedObject.value.current]
    unsplash.value = _unsplash
    storedObject.value.current++
    if (storedObject.value.current === storedObject.value.list.length)
      storedObject.value = null
  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <CommonBox rel="imgBox" class="flex flex-col w-full h-full relative top-0 left-0">
    <nuxt-img
      v-if="unsplash?.url"
      class="absolute top-0 left-0 w-full h-full object-cover"
      provider="unsplash"
      quality="80"
      fit="crop"
      preload
      sizes="xs:320 sm:640 md:768 lg:1024 xl:1280 xxl:1536"
      :src="unsplash?.url"
      :modifiers="modifiers"
      @load="loading = false"
    />
    <div v-if="loading" class="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center animate-pulse">
      <nuxt-img
        v-if="unsplash?.url"
        class="absolute top-0 left-0 w-full h-full object-cover blur-sm"
        provider="unsplash"
        :width="400"
        :src="unsplash?.url"
      />
    </div>
    <p v-if="unsplash" class="absolute right-4 bottom-4 px-4 z-11 backdrop-blur-sm bg-dark/5 rounded-md">
      <a class="font-extrabold cursor-pointer" :href="unsplash?.html" target="_blank">Photo</a> by
      <a class="font-extrabold cursor-pointer" :href="unsplash?.author.url" target="_blank">{{ unsplash?.author.name }}</a>
    </p>
  </CommonBox>
</template>
