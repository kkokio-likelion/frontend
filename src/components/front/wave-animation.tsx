import { useRef } from 'react';

export interface Props {
  className?: string;
  level: number;
  threshold: number;
}

export default function WaveAnimation({ className, level, threshold }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);

  const duration = 300;
  const state = useRef({
    currentTime: 0,
    lastUpdatedTime: Date.now(),
    prevStep: 0,
    step: 0,
  });

  const waves = [
    {
      color: '72, 170, 227',
      x: 50,
      w: 100,
      amp: 1,
      xSpeed: 0.2,
      offset: 0.0,
      visibility: 7,
      seed: 23412341112,
    },
    {
      color: '72, 170, 227',
      x: 100,
      w: 100,
      amp: 1,
      xSpeed: 0.2,
      offset: 0.8,
      visibility: 7,
      seed: 23412341112,
    },
    {
      color: '173, 57, 76',
      x: 100,
      w: 70,
      amp: 0.6,
      xSpeed: -0.2,
      offset: 0.1,
      visibility: 7,
      seed: 1234123113,
    },
    {
      color: '48, 220, 155',
      x: 150,
      w: 30,
      amp: 0.3,
      xSpeed: 0.3,
      offset: 0.2,
      visibility: 5,
      seed: 12323114,
    },
    {
      color: '72, 170, 227',
      x: 40,
      w: 50,
      amp: 0.5,
      xSpeed: -0.4,
      offset: 0.5,
      visibility: 5,
      seed: 123115,
    },
    {
      color: '72, 170, 227',
      x: 100,
      w: 50,
      amp: 0.5,
      xSpeed: 0.4,
      offset: 0.3,
      visibility: 5,
      seed: 12322115,
    },
    {
      color: '173, 57, 76',
      x: 100,
      w: 70,
      amp: 0.6,
      xSpeed: -0.2,
      offset: 0.1,
      visibility: 5,
      seed: 23116,
    },
    {
      color: '48, 220, 155',
      x: 200,
      w: 50,
      amp: 0.4,
      xSpeed: 0.05,
      offset: 0.2,
      visibility: 5,
      seed: 3117,
    },
    {
      color: '48, 220, 155',
      x: 90,
      w: 50,
      amp: 0.4,
      xSpeed: -0.15,
      offset: 0.4,
      visibility: 3,
      seed: 312217,
    },
    {
      color: '173, 57, 76',
      x: 30,
      w: 70,
      amp: 0.6,
      xSpeed: 0.1,
      offset: 0.3,
      visibility: 7,
      seed: 1234123113,
    },
    {
      color: '173, 57, 76',
      x: 230,
      w: 50,
      amp: 0.6,
      xSpeed: 0,
      offset: 0.4,
      visibility: 4,
      seed: 34123113,
    },
    {
      color: '72, 170, 227',
      x: 200,
      w: 100,
      amp: 0.6,
      xSpeed: -0.4,
      offset: 0.7,
      visibility: 7,
      seed: 2341231112,
    },
  ];

  const amplitude = Math.min(Math.max((level - threshold) / -threshold, 0), 1);

  const drawWave = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    style: string
  ) => {
    ctx.fillStyle = style;
    ctx.strokeStyle = style;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + width / 4,
      y,
      x + (width / 4) * 1.5,
      y + height,
      x + width / 2,
      y + height
    );
    ctx.bezierCurveTo(
      x + (width / 4) * 2.5,
      y + height,
      x + (width / 4) * 3,
      y,
      x + width,
      y
    );
    ctx.bezierCurveTo(
      x + (width / 4) * 3,
      y,
      x + (width / 4) * 2.5,
      y - height,
      x + width / 2,
      y - height
    );
    ctx.bezierCurveTo(
      x + (width / 4) * 1.5,
      y - height,
      x + width / 4,
      y,
      x,
      y
    );
    ctx.fill();
  };

  const draw = () => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;

    const width = canvas.current.width;
    const height = canvas.current.height;
    const now = Date.now();
    state.current.currentTime += now - state.current.lastUpdatedTime;
    state.current.step = Math.floor(state.current.currentTime / duration);

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    const step = (state.current.currentTime % duration) / duration;
    for (const wave of waves) {
      const offsetedStep = (step + wave.offset) % 1;
      if (
        (Math.floor(
          (state.current.currentTime + wave.offset * duration) / duration
        ) *
          wave.seed) %
          10 >
        wave.visibility
      )
        continue;
      drawWave(
        ctx,
        wave.x +
          ((Math.sin((offsetedStep * Math.PI) / 2) * 100 * wave.xSpeed) / 300) *
            width,
        height / 2,
        (wave.w / 300) * width,
        (height / 2) * wave.amp * Math.sin(offsetedStep * Math.PI) * amplitude,
        `rgb(${wave.color})`
      );
    }
    state.current.lastUpdatedTime = now;
    state.current.prevStep = step;
    requestAnimationFrame(draw);
  };

  // useEffect(() => {
  draw();
  // }, [canvas.current]);

  return (
    <div id="mic-wave" className={className}>
      <canvas ref={canvas} className="w-full h-full" />
    </div>
  );
}
