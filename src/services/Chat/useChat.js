import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKET_SERVER_URL } from 'react-native-dotenv';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId }
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (newMessage) => {
      setMessages((oldMessage) => [...oldMessage, newMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (message) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, message);
  };

  return { messages, sendMessage, setMessages };
};

export default useChat;
