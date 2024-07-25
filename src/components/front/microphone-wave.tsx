import { useEffect, useState } from 'react';
import WaveAnimation from './wave-animation';

export interface Props {
  getLevel: () => number;
}

export default function MicrophoneWave({ getLevel }: Props) {
  const [level, setLevel] = useState<number>(-99999);

  useEffect(() => {
    const loop = setInterval(() => {
      setLevel(getLevel());
    }, 100);
    return () => {
      clearInterval(loop);
    };
  }, [getLevel]);

  return (
    <WaveAnimation
      level={level}
      threshold={-60}
      className="w-[80%] h-16 mx-auto"
    />
  );
}
