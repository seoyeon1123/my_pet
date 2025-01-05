import { supabase } from './supabaseClient';

interface Message {
  id: number;
  content: string;
  userId: number;
  chatRoomId: number;
  createdAt: Date;
}

export const subscribeToMessages = (chatRoomId: number, onMessage: (message: Message) => void) => {
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
      (payload: { new: Message }) => {
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
