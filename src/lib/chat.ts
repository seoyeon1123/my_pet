import { supabase } from './supabaseClient';

export const subscribeToMessages = (chatRoomId: number, onMessage: (message: any) => void) => {
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
      (payload) => {
        console.log('새 메시지:', payload.new);
        onMessage(payload.new);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
