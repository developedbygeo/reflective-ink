'use client';

import { motion, useWillChange, useReducedMotion } from 'framer-motion';

import { gradientMovement } from '@/animations/movement';
import { CommonProps } from '@/types/UI';

type MovingGradientProps = CommonProps & {
  children?: React.ReactNode;
};

const MovingGradient = ({ children, className }: MovingGradientProps) => {
  const prefersReducedMotion = useReducedMotion();
  const willChange = useWillChange();

  const isDark = 'light';

  return (
    <>
      <div className="relative z-20">{children}</div>
      <div
        className={`absolute inset-0 isolate h-full w-full overflow-hidden ${className}`}
      >
        <div className="absolute inset-x-0 transform-gpu blur-3xl sm:top-[-20rem]">
          <motion.svg
            variants={gradientMovement}
            style={{ willChange }}
            custom={{
              x: '2rem',
              y: '-10rem',
              newX: '-20rem',
              newY: '30rem',
              duration: 15,
              delay: 2,
            }}
            initial="hidden"
            animate="visible"
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity={isDark ? 0.15 : 0.5}
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        <div className="absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <motion.svg
            variants={gradientMovement}
            style={{ willChange }}
            custom={{
              x: '-20vw',
              y: '-15rem',
              newX: '-20rem',
              newY: '-35rem',
              duration: 15,
              delay: 2,
            }}
            initial="hidden"
            animate="visible"
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ee0717bf-3e43-49df-b1bd-de36422ed3d3)"
              fillOpacity={isDark ? 0.2 : 0.5}
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ee0717bf-3e43-49df-b1bd-de36422ed3d3"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>
      </div>
    </>
  );
};

export default MovingGradient;
