import { Button } from '@/components/UI/Button';
import MovingGradient from '@/components/UI/MovingGradient';

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gray-100 dark:bg-darkGray flex justify-center items-center text-white relative">
      <MovingGradient />
      <article className="w-full max-w-[40rem] mx-auto">
        <h1 className="text-4xl w-2/3 mb-4">Welcome to Reflective Ink.</h1>
        <p className="text-xl font-light h-4/5 text-gray-300 mb-6">
          An AI-powered app for tracking your mood. Interested in learning more?
        </p>
        <Button size="xl">Get Started</Button>
      </article>
    </div>
  );
}
