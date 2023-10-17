'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import Lightbulb from '@/assets/lottie/lightbulb.json';
import { useRef } from 'react';

type AnswerProps = {
  answer?: string;
};

const Answer = ({ answer }: AnswerProps) => {
  const playerRef = useRef<Player | null>(null);

  if (!answer) return null;

  const handleLottieReplay = () => {
    playerRef.current?.play();
    playerRef.current?.setLoop(true);
  };

  const handleLottieHoverLeave = () => {
    playerRef.current?.setLoop(false);
  };

  return (
    <article className="gap-4 mt-12 flex items-center">
      <div
        onMouseOver={handleLottieReplay}
        onMouseLeave={handleLottieHoverLeave}
        className="w-20 h-auto"
      >
        <Player ref={playerRef} src={Lightbulb} autoplay />
      </div>
      <div className="flex flex-col gap-3">
        <h3>Here&apos; what the AI has to say:</h3>
        <p>{answer}</p>
      </div>
    </article>
  );
};

export default Answer;
