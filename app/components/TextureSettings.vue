<template>
  <!-- Texture Background -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <div
      class="absolute inset-0"
      :style="{
        backgroundImage: `url(${currentTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: `${settings.positionX}% ${settings.positionY}%`,
        backgroundRepeat: 'no-repeat',
        filter: `grayscale(${settings.grayscale / 100})`,
        opacity: settings.opacity / 100,
        transform: `rotate(${settings.rotation}deg) scale(1.5)`,
      }"
    />
  </div>

  <!-- Settings Cog Button -->
  <button
    class="fixed bottom-5 right-5 z-50 w-9 h-9 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/50 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-all duration-300"
    :class="{ '!text-gray-600 !bg-white/90 shadow-md': open }"
    @click.stop="open = !open"
  >
    <svg
      class="w-[15px] h-[15px] transition-transform duration-500 ease-out"
      :class="{ 'rotate-90': open }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </button>

  <!-- Click-outside overlay -->
  <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />

  <!-- Settings Panel -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-2 scale-95"
  >
    <div
      v-if="open"
      class="fixed bottom-16 right-5 z-50 w-[252px] bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden"
      @click.stop
    >
      <div class="p-4">
        <!-- Header -->
        <p class="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">Background</p>

        <!-- Texture Grid -->
        <div class="grid grid-cols-7 gap-1.5 mb-4">
          <button
            v-for="(url, index) in textures"
            :key="index"
            class="w-full aspect-square rounded-md bg-cover bg-center border-2 transition-all duration-150 hover:scale-110 cursor-pointer"
            :class="
              settings.texture === index + 1
                ? 'border-gray-900 shadow-sm'
                : 'border-white/60 hover:border-gray-300'
            "
            :style="{ backgroundImage: `url(${url})` }"
            @click="settings.texture = index + 1"
          />
        </div>

        <!-- Grayscale Slider -->
        <div class="mb-3">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] text-gray-500">Grayscale</span>
            <span class="text-[11px] text-gray-400 tabular-nums w-8 text-right">{{ settings.grayscale }}%</span>
          </div>
          <input
            v-model.number="settings.grayscale"
            type="range"
            min="0"
            max="100"
            class="settings-slider"
          />
        </div>

        <!-- Opacity Slider -->
        <div class="mb-3">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] text-gray-500">Opacity</span>
            <span class="text-[11px] text-gray-400 tabular-nums w-8 text-right">{{ settings.opacity }}%</span>
          </div>
          <input
            v-model.number="settings.opacity"
            type="range"
            min="0"
            max="100"
            class="settings-slider"
          />
        </div>

        <!-- Position Sliders -->
        <div class="mb-3">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] text-gray-500">Position X</span>
            <span class="text-[11px] text-gray-400 tabular-nums w-8 text-right">{{ settings.positionX }}%</span>
          </div>
          <input
            v-model.number="settings.positionX"
            type="range"
            min="0"
            max="100"
            class="settings-slider"
          />
        </div>

        <div class="mb-3">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] text-gray-500">Position Y</span>
            <span class="text-[11px] text-gray-400 tabular-nums w-8 text-right">{{ settings.positionY }}%</span>
          </div>
          <input
            v-model.number="settings.positionY"
            type="range"
            min="0"
            max="100"
            class="settings-slider"
          />
        </div>

        <!-- Rotation Slider -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] text-gray-500">Rotation</span>
            <span class="text-[11px] text-gray-400 tabular-nums w-8 text-right">{{ settings.rotation }}°</span>
          </div>
          <input
            v-model.number="settings.rotation"
            type="range"
            min="0"
            max="360"
            class="settings-slider"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const settings = useTextureSettings()
const open = ref(false)

const textureModules = import.meta.glob('~/assets/images/texture*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const textures = Object.entries(textureModules)
  .map(([path, url]) => {
    const match = path.match(/texture(\d*)\.jpg$/)
    const num = match?.[1] ? parseInt(match[1]) : 1
    return { num, url }
  })
  .sort((a, b) => a.num - b.num)
  .map(t => t.url)

const currentTexture = computed(() => textures[settings.texture - 1] || textures[0])
</script>

<style scoped>
.settings-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 3px;
  background: #e5e7eb;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.settings-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #111827;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.settings-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.settings-slider::-webkit-slider-thumb:active {
  transform: scale(0.95);
}

.settings-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #111827;
  cursor: pointer;
  border: none;
}
</style>
