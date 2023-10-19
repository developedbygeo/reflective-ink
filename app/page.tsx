import Link from 'next/link';
import { auth } from '@clerk/nextjs';

import { Button } from '@/components/UI/Button';
import MovingGradient from '@/components/UI/MovingGradient';

const Homepage = () => {
  const { userId } = auth();
  const href = userId ? '/my-journal' : '/new-user';
  const linkText = userId ? 'My Journal' : 'Sign up';

  return (
    <div className="h-screen bg-gray-100 dark:bg-darkGray flex justify-center items-center text-white relative">
      <MovingGradient className="pointer-events-none" />
      <article className="w-full container">
        <h1 className="text-4xl w-2/3 mb-4">Welcome to Reflective Ink.</h1>
        <p className="text-xl font-light h-4/5 text-gray-300 mb-6">
          An AI-powered app for tracking your mood. Interested in learning more?
        </p>
        <Button size="xl" asChild>
          <Link href={href}>{linkText}</Link>
        </Button>
      </article>
    </div>
  );
};

export default Homepage;
