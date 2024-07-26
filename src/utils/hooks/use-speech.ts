import { useEffect, useState } from 'react';
import OpenAI from 'openai';
import useMicrophone from './use-microphone';
import { Api } from 'utils/api/api';
import { OrderAssistantDisplayAction } from './use-order-assistant';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default function useSpeech() {
  const [transcript, setTranscript] = useState<string>('');
  const [audio, setAudio] = useState<Blob>();
  const [isProcessing, setProcessing] = useState<boolean>(false);

  // 맥락 프롬프트 보조
  const [context, setContext] =
    useState<OrderAssistantDisplayAction>('NO_ACTION');

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

  // TODO: 더 많은 상황 정보 넣을 수 있게(현재 주문서에 있는 메뉴 등)
  const getPromptByContext = async (context: OrderAssistantDisplayAction) => {
    const menuRes = await Api.getMenus();
    const categoryNames = Object.keys(menuRes);
    const sideNames = Object.values(menuRes).flatMap((menu) =>
      menu.flatMap((m) => m.side.map((o) => o.name.replace(/,/g, '_')))
    );
    const menuNames = Object.values(menuRes).flatMap((menu) =>
      menu.map((m) => m.name.replace(/,/g, '_'))
    );
    switch (context) {
      case 'NO_ACTION':
      case 'LIST_CATEGORY':
      default:
        return (
          '식당에서 메뉴를 주문하는 상황이며 메뉴 이름은 다음 중 하나입니다: ' +
          menuNames.join(',') +
          ',' +
          categoryNames.join(',')
        );
      case 'LIST_MENU':
        return (
          '식당에서 메뉴를 주문하는 상황이며 메뉴 이름은 다음 중 하나입니다: ' +
          menuNames.join(',')
        );
      case 'MENU_DETAILS':
        return (
          '식당에서 메뉴를 주문하는 상황이며 어떤 메뉴를 고른 뒤 추가 옵션을 선택하는 상황입니다. 옵션을 선택하지 않고 다른 메뉴를 고를 수 있으며 메뉴와 옵션 이름은 다음 중 하나입니다: ' +
          menuNames.join(',') +
          ',' +
          sideNames.join(',')
        );
      case 'ADDED_MENU':
        return (
          '식당에서 메뉴를 주문하는 상황이며 메뉴 하나를 주문서에 담았습니다. 다른 메뉴를 주문하거나 주문을 종료할 수 있으며 메뉴 이름은 다음 중 하나입니다: ' +
          menuNames.join(',')
        );
      case 'SHOW_ORDERS':
        return (
          '식당에서 메뉴를 주문하는 상황이며 주문을 다 하고 확인하는 과정입니다 주문을 수정하거나 완료할 수 있습니다. 메뉴 이름은 다음 중 하나입니다: ' +
          menuNames.join(',')
        );
    }
  };

  // 멍청 방지
  const isDumbResult = (text: string) =>
    text.replace(/ /g, '').includes('시청해주셔서감사합니다') ||
    text.replace(/ /g, '').includes('다음중하나입니다') ||
    text.replace(/ /g, '').includes('구독') ||
    text.replace(/ /g, '').includes('좋아요,알림설정') ||
    text.replace(/ /g, '').includes('한음악') ||
    text.replace(/ /g, '').includes('식당에서메뉴를주문하는상황이며') ||
    text.replace(/ /g, '').includes('메뉴1,2,3');

  const convertSTT = async (audio: Blob) => {
    setProcessing(true);
    try {
      const prompt = await getPromptByContext(context);
      const res = await openai.audio.transcriptions.create({
        file: new File([audio], 'audio.webm'),
        model: 'whisper-1',
        response_format: 'json',
        prompt,
      });
      if (res.text && !isDumbResult(res.text)) {
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
    setContext,
  };
}
