interface TextureSettingsState {
  texture: number
  grayscale: number
  opacity: number
  positionX: number
  positionY: number
  rotation: number
}

const settings = reactive<TextureSettingsState>({
  texture: 5,
  grayscale: 100,
  opacity: 10,
  positionX: 50,
  positionY: 50,
  rotation: 0,
})

let loaded = false
let watchSet = false

export function useTextureSettings() {
  if (import.meta.client && !watchSet) {
    watchSet = true
    watch(settings, () => {
      localStorage.setItem('texture-settings', JSON.stringify({
        texture: settings.texture,
        grayscale: settings.grayscale,
        opacity: settings.opacity,
        positionX: settings.positionX,
        positionY: settings.positionY,
        rotation: settings.rotation,
      }))
    })
  }

  if (import.meta.client && !loaded) {
    loaded = true
    onMounted(() => {
      try {
        const saved = localStorage.getItem('texture-settings')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed.texture >= 1 && parsed.texture <= 14) settings.texture = parsed.texture
          if (parsed.grayscale >= 0 && parsed.grayscale <= 100) settings.grayscale = parsed.grayscale
          if (parsed.opacity >= 0 && parsed.opacity <= 100) settings.opacity = parsed.opacity
          if (parsed.positionX >= 0 && parsed.positionX <= 100) settings.positionX = parsed.positionX
          if (parsed.positionY >= 0 && parsed.positionY <= 100) settings.positionY = parsed.positionY
          if (parsed.rotation >= 0 && parsed.rotation <= 360) settings.rotation = parsed.rotation
        }
      } catch {}
    })
  }

  return settings
}
