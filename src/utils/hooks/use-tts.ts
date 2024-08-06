import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const baseURL = import.meta.env.VITE_OPENAI_PROXY_URL;
const openai = new OpenAI({ baseURL, apiKey, dangerouslyAllowBrowser: true });

export default function useTTS() {
  const speak = async (text: string) => {
    const res = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: 'nova',
      input: text,
      response_format: 'opus',
    });
    const audio = await res.blob();
    return audio;
  };

  return { speak };
}
