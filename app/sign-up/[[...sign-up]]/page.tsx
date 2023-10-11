import { SignUp } from '@clerk/nextjs';

import MovingGradient from '@/components/UI/MovingGradient';
import { authDialogueStyle } from '@/common/clerkStyling';

const SignupPage = () => {
  return (
    <section className="flex items-center w-screen h-screen justify-center bg-pur">
      <MovingGradient className="pointer-events-none">
        <SignUp
          afterSignUpUrl="/new-user"
          redirectUrl="/new-user"
          appearance={authDialogueStyle}
        />
      </MovingGradient>
    </section>
  );
};

export default SignupPage;
