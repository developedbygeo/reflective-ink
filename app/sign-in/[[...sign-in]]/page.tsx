import { SignIn } from '@clerk/nextjs';

import MovingGradient from '@/components/UI/MovingGradient';
import { authDialogueStyle } from '@/common/authStyling';

const SignInPage = () => {
  return (
    <section className="flex items-center w-screen h-screen justify-center bg-pur">
      <MovingGradient className="pointer-events-none">
        <SignIn appearance={authDialogueStyle} />
      </MovingGradient>
    </section>
  );
};

export default SignInPage;
