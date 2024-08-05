import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useSpeech from 'utils/hooks/use-speech';
import { useParams } from 'react-router-dom';
import useOrderAssistant, {
  OrderAssistantDisplayAction,
} from 'utils/hooks/use-order-assistant';
import useTTS from 'utils/hooks/use-tts';
import MicrophoneWave from './microphone-wave';
import UserInputOverlay from './user-input-overlay';
import TextMessageBox from './text-message-box';

export type MessageType = {
  role: 'system' | 'user';
  content: string;
};

export default function Main() {
  const [isStarted, setStarted] = useState<boolean>(false);
  const [messages, setMessage] = useState<MessageType[]>([
    {
      role: 'system',
      content: '무엇을 도와드릴까요?',
    },
  ]);
  const [displayAction, setDisplayAction] =
    useState<OrderAssistantDisplayAction>('NO_ACTION');
  const [lastUserMessage, setLastUserMessage] = useState<string>('');

  const { storeId } = useParams();

  const _storeId = parseInt(storeId!);

  const {
    transcript: userMessage,
    isListening,
    isSpeaking,
    isProcessing,
    startListening,
    stopListening,
    getLevel,
    setContext,
    audio,
  } = useSpeech(_storeId);

  const { status, initAssistant, sendMessage, handleThread } =
    useOrderAssistant(_storeId);

  const { speak } = useTTS();

  useEffect(() => {
    initAssistant();
    return () => {
      stopListening();
    };
  }, []);

  const appendMessage = (role: 'system' | 'user', content: string) => {
    setMessage((prev) => [...prev, { role, content }]);
  };

  const sendAndProcessMessage = async (message: string) => {
    const response = await sendMessage(message);
    if (!response) {
      appendMessage('system', '서버에 연결할 수 없어요.');
      return;
    }
    const processed = await handleThread(response);
    // handle response
    console.log(processed);

    if (!processed) {
      appendMessage('system', '서버에 연결할 수 없어요.');
      return;
    }

    // display message
    appendMessage(
      'system',
      processed.text_message || '무슨 말인지 모르겠어요.'
    );

    // audio message
    if (processed.voice_message) {
      const audio = await speak(processed.voice_message);
      const audioUrl = URL.createObjectURL(audio);
      const audioElement = new Audio(audioUrl);
      audioElement.play();
    }

    // display action
    setDisplayAction(processed.display_action);
    setContext(processed.display_action);
  };

  const sendUserMessage = (message: string) => {
    sendAndProcessMessage(message);
    appendMessage('user', message);
  };

  useEffect(() => {
    if (userMessage && lastUserMessage !== userMessage && !isSpeaking) {
      console.log('요청!!!!!');
      setLastUserMessage(userMessage);
      sendUserMessage(userMessage);
    }
  }, [lastUserMessage, userMessage, isSpeaking]);

  return (
    <main className="flex flex-col justify-between h-0 flex-1">
      <div className="bg-white h-2/3 rounded-b-3xl">
      </div>
      <div className="w-full h-0 flex-1 relative">
        <ul className="w-full h-full flex flex-col-reverse gap-4 py-4 px-8 pb-16 overflow-y-scroll scrollbar-none">
          {(isSpeaking || isProcessing) && (
            <TextMessageBox role="user">
              {userMessage}
              {(isSpeaking || isProcessing) && '...'}
            </TextMessageBox>
          )}
          {[...messages].reverse().map((msg) => (
            <TextMessageBox key={msg.content} role={msg.role}>
              {msg.content}
            </TextMessageBox>
          ))}
        </ul>
        <div className="w-full h-16 bg-gradient-to-b from-gray-50 to-transparent absolute top-0"></div>
        <div className="w-full h-28 bg-gradient-to-t from-10% from-gray-50 to-transparent absolute bottom-0"></div>
      </div>
      <div className="w-full px-8 py-4 fixed bottom-2 mx-auto">
        <MicrophoneWave getLevel={getLevel} />
      </div>
      <AnimatePresence>
        {!isStarted && (
          <UserInputOverlay
            onClick={() => {
              setStarted(true);
              startListening();
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
