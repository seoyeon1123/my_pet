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
        // Directly type `payload.new` as `Message`
        const newMessage = payload.new; // No need for type casting anymore
        console.log('새 메시지:', newMessage);
        onMessage(newMessage); // Pass the typed message to the callback
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
