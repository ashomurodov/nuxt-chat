import type { Message } from '~/types/chat'

const messages = ref<Message[]>([])
const isLoadingMessages = ref(false)
const isSending = ref(false)
const rateLimitError = ref('')
const rateLimitCooldown = ref(0)

export const MAX_MESSAGE_LENGTH = 500

let cooldownTimer: ReturnType<typeof setInterval> | null = null

export function useChatMessages() {
  async function loadMessages(roomId: string) {
    isLoadingMessages.value = messages.value.length === 0
    try {
      const { messages: data } = await $fetch<{ messages: Message[] }>('/api/messages', {
        query: { roomId }
      })
      messages.value = data
    } catch (e) {
      console.error('Failed to load messages:', e)
    } finally {
      isLoadingMessages.value = false
    }
  }

  function startCooldownTimer(seconds: number) {
    rateLimitCooldown.value = seconds
    if (cooldownTimer) clearInterval(cooldownTimer)
    cooldownTimer = setInterval(() => {
      rateLimitCooldown.value--
      if (rateLimitCooldown.value <= 0) {
        rateLimitCooldown.value = 0
        rateLimitError.value = ''
        if (cooldownTimer) {
          clearInterval(cooldownTimer)
          cooldownTimer = null
        }
      }
    }, 1000)
  }

  async function sendMessage(content: string, roomId: string): Promise<boolean> {
    if (!content.trim()) return false
    if (rateLimitCooldown.value > 0) return false

    isSending.value = true
    try {
      await $fetch('/api/messages', {
        method: 'POST',
        body: {
          content: content.slice(0, MAX_MESSAGE_LENGTH),
          chatRoomId: roomId
        }
      })
      await loadMessages(roomId)
      return true
    } catch (e: any) {
      if (e?.response?.status === 429 || e?.statusCode === 429) {
        const msg = e?.response?._data?.statusMessage || e?.statusMessage || ''
        const match = msg.match(/(\d+)\s*seconds/)
        const seconds = match ? parseInt(match[1]) : 5
        rateLimitError.value = msg || 'Too many messages. Please slow down.'
        startCooldownTimer(seconds)
      }
      console.error('Failed to send message:', e)
      return false
    } finally {
      isSending.value = false
    }
  }

  function addMessage(message: Message) {
    if (!messages.value.find(m => m.id === message.id)) {
      messages.value.push(message)
    }
  }

  function clearMessages() {
    messages.value = []
  }

  function formatTime(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return {
    messages,
    isLoadingMessages,
    isSending,
    rateLimitError,
    rateLimitCooldown,
    loadMessages,
    sendMessage,
    addMessage,
    clearMessages,
    formatTime,
  }
}
