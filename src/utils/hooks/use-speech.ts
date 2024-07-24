import { useEffect, useState } from 'react';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export interface SpeechOption {
  delay?: number;
  language?: string;
}

export default function useSpeech({
  delay = 2000,
  language = 'ko-KR',
}: SpeechOption) {
  const { transcript: rawScript, listening: isListening } = useSpeechRecognition();
  const [offset, setOffset] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>('');
  const [isSpeaking, setSpeaking] = useState<boolean>(false);

  const startListening = () =>
    SpeechRecognition.startListening({ language, continuous: true });

  useEffect(() => {
    if (rawScript) {
      setTranscript(rawScript.slice(offset));
    }
  }, [rawScript]);

  useEffect(() => {
    if (rawScript) {
      setSpeaking(true);
    }
    const delayed = setTimeout(() => {
      if (rawScript) {
        console.log('rawScript:', rawScript);
        setOffset(rawScript.length);
        setSpeaking(false);
      }
    }, delay);
    return () => clearTimeout(delayed);
  }, [rawScript]);

  return {
    transcript,
    isListening,
    isSpeaking,
    startListening,
    stopListening: SpeechRecognition.stopListening,
  };
}
