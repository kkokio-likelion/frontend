import { useCallback, useRef, useState } from 'react';
import * as Tone from 'tone';

export interface MicrophoneOption {
  threshold?: number;
  releaseTime?: number;
}

export default function useMicrophone({
  threshold = -25,
  releaseTime = 600,
}: MicrophoneOption) {
  const [mic, setMic] = useState<Tone.UserMedia>();
  const [gate, setGate] = useState<Tone.Gate>();
  const [recorder, setRecorder] = useState<Tone.Recorder>();
  const [meter, setMeter] = useState<Tone.Meter>();
  const [loop, setLoop] = useState<NodeJS.Timeout>();
  const [isListening, setListening] = useState<boolean>(false);
  const [isSpeaking, setSpeaking] = useState<boolean>(false);

  const delayedSetSpeaking = useRef<NodeJS.Timeout>();

  const getLevel = () => {
    return (meter?.getValue() as number) ?? -99999;
  };

  const loopUpdateLevel = (meter: Tone.Meter) => {
    if ((meter.getValue() as number) > threshold) {
      setSpeaking(true);
      if (delayedSetSpeaking.current) {
        clearTimeout(delayedSetSpeaking.current);
        delayedSetSpeaking.current = undefined;
      }
    } else {
      if (!delayedSetSpeaking.current) {
        delayedSetSpeaking.current = setTimeout(() => {
          setSpeaking(false);
        }, releaseTime);
      }
    }
  };

  const startListening = useCallback(async () => {
    const mic = new Tone.UserMedia();
    const gate = new Tone.Gate(threshold);
    const recorder = new Tone.Recorder();
    const meter = new Tone.Meter();

    await mic.open();
    console.log('mic opened');
    mic.connect(gate);
    gate.connect(meter);
    mic.connect(recorder);
    setListening(true);
    setMic(mic);
    setGate(gate);
    setRecorder(recorder);
    setMeter(meter);
    setLoop(setInterval(loopUpdateLevel, 50, meter));
  }, []);

  const stopListening = useCallback(() => {
    mic?.dispose();
    gate?.dispose();
    meter?.dispose();
    setListening(false);
    clearInterval(loop);
  }, [mic, gate, meter, loop]);

  return {
    isListening,
    isSpeaking,
    getLevel,
    meter,
    recorder,
    startListening,
    stopListening,
  };
}
