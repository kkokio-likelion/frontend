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

export default function Main() {
  const [isStarted, setStarted] = useState<boolean>(false);
  const [serverMessage, setServerMessage] =
    useState<string>('무엇을 도와드릴까요?');
  const [displayAction, setDisplayAction] =
    useState<OrderAssistantDisplayAction>('NO_ACTION');
  const [lastUserMessage, setLastUserMessage] = useState<string>('');

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
  } = useSpeech();

  const { status, initAssistant, sendMessage, handleThread } =
    useOrderAssistant();

  const { speak } = useTTS();

  useEffect(() => {
    initAssistant();
    return () => {
      stopListening();
    };
  }, []);

  const sendAndProcessMessage = async (message: string) => {
    const response = await sendMessage(message);
    if (!response) {
      setServerMessage('서버에 연결할 수 없어요.');
      return;
    }
    const processed = await handleThread(response);
    // handle response
    console.log(processed);

    if (!processed) {
      setServerMessage('서버에 연결할 수 없어요.');
      return;
    }

    // display message
    setServerMessage(processed.text_message || '무슨 말인지 모르겠어요.');

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
    }
  }, [lastUserMessage, userMessage, isSpeaking]);

  return (
    <main className="flex flex-col justify-between px-8 flex-1">
      <div className="self-start">
        <TextMessageBox>{serverMessage}</TextMessageBox>
      </div>
      <div>
        {displayAction && (
          <TextMessageBox>화면 표시: {displayAction}</TextMessageBox>
        )}
      </div>
      <div className="flex flex-col pb-2 gap-4">
        {(isSpeaking || isProcessing || userMessage) && (
          <TextMessageBox color="yellow">
            {userMessage}
            {(isSpeaking || isProcessing) && '...'}
          </TextMessageBox>
        )}
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
