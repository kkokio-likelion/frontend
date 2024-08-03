import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useSpeech from 'utils/hooks/use-speech';
import useOrderAssistant, {
  OrderAssistantDisplayAction,
} from 'utils/hooks/use-order-assistant';
import useTTS from 'utils/hooks/use-tts';
import MicrophoneWave from './microphone-wave';
import UserInputOverlay from './user-input-overlay';
import TextMessageBox from './text-message-box';
import { useParams } from 'react-router-dom';

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
  } = useSpeech(parseInt(storeId!));

  const { status, initAssistant, sendMessage, handleThread } =
    useOrderAssistant(parseInt(storeId!));

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

  useEffect(() => {
    if (userMessage && lastUserMessage !== userMessage && !isSpeaking) {
      console.log('요청!!!!!');
      sendAndProcessMessage(userMessage);
      setLastUserMessage(userMessage);
      appendMessage('user', userMessage);
    }
  }, [lastUserMessage, userMessage, isSpeaking]);

  return (
    <main className="flex flex-col justify-between flex-1">
      <div className="bg-white h-1/2 rounded-b-3xl">{displayAction}</div>
      <div className="self-start px-8 flex-1 w-full h-0 overflow-y-scroll scrollbar-none">
        <div className="flex flex-col-reverse gap-2 py-4">
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
        </div>
      </div>
      <div className="py-4">
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
