import { useEffect, useState } from 'react';
import useSpeech from 'utils/hooks/use-speech';
import useTTS from 'utils/hooks/use-tts';
import MicrophoneWave from './microphone-wave';

export default function Main() {
  const [serverMessage, setServerMessage] =
    useState<string>('무엇을 도와드릴까요?');
  const [lastUserMessage, setLastUserMessage] = useState<string>('');

  const {
    transcript: userMessage,
    isListening,
    isSpeaking,
    startListening,
    getLevel,
    audio,
  } = useSpeech();

  const { status, initAssistant, sendMessage, handleThread } =
    useOrderAssistant();

  const { speak } = useTTS();

  useEffect(() => {
    initAssistant();
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
      <div className="px-4 py-2 rounded-2xl bg-white text-2xl self-start">
        {serverMessage}
      </div>
      <div className="w-1 h-[10rem] bg-red-500/10"></div>
      <div className="flex flex-col">
        <div className="px-4 py-2 rounded-2xl bg-white text-2xl self-end">
          {userMessage || <>&nbsp;</>}
          {isSpeaking && '...'}
        </div>
        <div className="">
          <button onClick={startListening}>시작</button>
          <MicrophoneWave getLevel={getLevel} />
          <br />
          isListening: {isListening ? 'O' : 'X'}
          <br />
          isSpeaking: {isSpeaking ? 'O' : 'X'}
          {audio && <audio src={URL.createObjectURL(audio)} controls />}
        </div>
      </div>
    </main>
  );
}
