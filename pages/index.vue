<script lang="ts" setup>
const { data: unsplash } = await useFetch('/api/unsplash/random')

const { pixelRatio } = useDevicePixelRatio()
const { width } = useWindowSize()
const modifiers = computed(() => {
  return {
    dpr: pixelRatio,
    auto: 'format,compress',
  }
})

const loading = ref(true)

function doSomethingOnLoad() {
  loading.value = false
}
</script>

<template>
  <div class="flex flex-col w-full h-screen relative top-0 left-0">
    <nuxt-img
      class="absolute top-0 left-0 w-full h-full object-cover"
      preload
      provider="unsplash"
      quality="85"
      fit="crop"
      sizes="xs:320 sm:640 md:768 lg:1024 xl:1280 xxl:1536 xxxl:1920 2k:2560 4k:3840"
      densities="x1 x2"
      loading="lazy"
      :width="width"
      :src="unsplash?.url"
      :modifiers="modifiers"
      @load="doSomethingOnLoad"
    />
    <div class="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center">
      <CommonLoading :loading="loading" />
    </div>
    <p v-if="unsplash" class="absolute bottom-5 right-3 text-right px-2 backdrop-blur-sm bg-dark/5 rounded-md animate-fade-in">
      <a class="font-semibold cursor-pointer" :href="unsplash?.html" target="_blank">Photo</a> by
      <a class="font-semibold cursor-pointer" :href="unsplash?.author.url" target="_blank">{{ unsplash?.author.name }}</a>
    </p>
  </div>
</template>

<style scoped></style>
