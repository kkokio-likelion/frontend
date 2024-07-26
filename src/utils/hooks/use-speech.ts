import { useEffect, useState } from 'react';
import OpenAI from 'openai';
import useMicrophone from './use-microphone';
import { Api } from 'utils/api/api';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default function useSpeech() {
  const [transcript, setTranscript] = useState<string>('');
  const [audio, setAudio] = useState<Blob>();
  const [isProcessing, setProcessing] = useState<boolean>(false);

  const {
    isListening,
    isSpeaking,
    getLevel,
    recorder,
    startListening,
    stopListening,
  } = useMicrophone({
    threshold: -20,
  });

  const startRecording = async () => {
    try {
      if (!recorder) {
        throw new Error('recorder is not initialized');
      }
      await recorder.start();
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recorder) {
        throw new Error('recorder is not initialized');
      }
      if (recorder.state !== 'started') {
        return;
      }
      const audio = await recorder.stop();
      return audio;
    } catch (err) {
      console.error(err);
    }
  };

  const convertSTT = async (audio: Blob) => {
    setProcessing(true);
    try {
      const menuRes = await Api.getMenus();
      const categoryNames = Object.keys(menuRes);
      const menuNames = Object.values(menuRes).flatMap((menu) =>
        menu.map((m) => m.name.replace(/,/g, '_'))
      );
      const res = await openai.audio.transcriptions.create({
        file: new File([audio], 'audio.webm'),
        model: 'whisper-1',
        response_format: 'json',
        prompt:
          '식당에서 메뉴를 주문하는 상황이며 메뉴 이름은 다음 중 하나입니다: ' +
          menuNames.join(',') +
          ',' +
          categoryNames.join(','),
      });
      if (
        res.text &&
        // 멍청 방지
        !(
          res.text.replace(/ /g, '').includes('시청해주셔서감사합니다') ||
          res.text.replace(/ /g, '').includes('다음중하나입니다') ||
          res.text.replace(/ /g, '').includes('구독,좋아요') ||
          res.text.replace(/ /g, '').includes('좋아요,알림설정') ||
          res.text
            .replace(/ /g, '')
            .includes('식당에서메뉴를주문하는상황이며') ||
          res.text.replace(/ /g, '').includes('메뉴1,2,3')
        )
      ) {
        setTranscript(res.text);
      }
    } catch (err) {
      console.error(err);
    }
    setProcessing(false);
  };

  const handleRecording = async () => {
    if (!recorder || !isListening) {
      return;
    }
    console.log('state', recorder.state);

    if (isSpeaking && recorder.state === 'stopped') {
      startRecording();
    } else if (!isSpeaking && recorder.state === 'started') {
      const audio = await stopRecording();
      if (audio) {
        setAudio(audio);
        convertSTT(audio);
      }
    }
  };

  useEffect(() => {
    handleRecording();
  }, [isListening, isSpeaking, recorder]);

  return {
    transcript,
    isListening,
    isSpeaking,
    isProcessing,
    startListening,
    stopListening,
    getLevel,
    audio,
  };
}
