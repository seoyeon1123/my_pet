import { IChatRoomMessageProps } from '@/types/chatMessage';
import { supabase } from './supabaseClient';

export const subscribeToMessages = (chatRoomId: number, onMessage: (message: IChatRoomMessageProps) => void) => {
  const subscription = supabase
    .channel(`chatRoom:${chatRoomId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'Message',
        filter: `chatRoomId=eq.${chatRoomId}`,
      },
      (payload: { new: IChatRoomMessageProps }) => {
        const newMessage = payload.new;
        console.log('새 메시지:', newMessage);
        onMessage(newMessage);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
