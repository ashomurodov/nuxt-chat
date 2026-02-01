import type { Message } from '~/types/chat'

const messages = ref<Message[]>([])
const isLoadingMessages = ref(false)
const isSending = ref(false)

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

  async function sendMessage(content: string, roomId: string): Promise<boolean> {
    if (!content.trim()) return false

    isSending.value = true
    try {
      await $fetch('/api/messages', {
        method: 'POST',
        body: {
          content,
          chatRoomId: roomId
        }
      })
      await loadMessages(roomId)
      return true
    } catch (e) {
      console.error('Failed to send message:', e)
      return false
    } finally {
      isSending.value = false
    }
  }

  function addMessage(message: Message) {
    // Avoid duplicates
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
    loadMessages,
    sendMessage,
    addMessage,
    clearMessages,
    formatTime,
  }
}
