import buddiesData from '../data/buddies.json'
import messagesData from '../data/messages.json'
import type { Buddy, Message } from '../types'

const buddies = buddiesData as Buddy[]
const messages = messagesData as Record<string, Message[]>

export const BuddyService = {
  getBuddies(): Buddy[] {
    return buddies
  },

  getBuddy(id: string): Buddy | undefined {
    return buddies.find((b) => b.id === id)
  },

  getMessages(buddyId: string): Message[] {
    return messages[buddyId] ?? []
  },
}
