import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { listMessages, sendContactMessage, setMessageReplied } from '../services/messages'

export function useMessages() {
  return useQuery({ queryKey: ['messages'], queryFn: listMessages, retry: false })
}

export function useToggleReplied() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, replied }: { id: string; replied: boolean }) =>
      setMessageReplied(id, replied),
    onSuccess: () => client.invalidateQueries({ queryKey: ['messages'] }),
  })
}

export function useSendMessage() {
  return useMutation({ mutationFn: sendContactMessage })
}
