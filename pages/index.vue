<script lang="ts" setup>
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
const { width } = useWindowSize()
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
  <div class="flex flex-col w-full h-screen relative top-0 left-0">
    <nuxt-img
      v-if="unsplash?.url"
      class="absolute top-0 left-0 w-full h-full object-cover animate-fade-in"
      provider="unsplash"
      quality="85"
      fit="crop"
      sizes="xs:320 sm:640 md:768 lg:1024 xl:1280 xxl:1536 xxxl:1920 2k:2560 4k:3840"
      densities="x1 x2"
      :width="width"
      :src="unsplash?.url"
      :modifiers="modifiers"
      @load="loading = false"
    />
    <div v-if="loading" class="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center">
      <nuxt-img
        v-if="unsplash?.url"
        class="absolute top-0 left-0 w-full h-full object-cover blur-sm"
        provider="unsplash"
        fit="crop"
        densities="x1 x2"
        :width="400"
        :src="unsplash?.url"
      />
    </div>
    <p v-if="unsplash" class="absolute bottom-5 right-3 text-right px-2 z-11 backdrop-blur-sm bg-dark/5 rounded-md animate-fade-in">
      <a class="font-semibold cursor-pointer" :href="unsplash?.html" target="_blank">Photo</a> by
      <a class="font-semibold cursor-pointer" :href="unsplash?.author.url" target="_blank">{{ unsplash?.author.name }}</a>
    </p>
  </div>
</template>

<style scoped></style>
