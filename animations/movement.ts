import { Variants } from 'framer-motion';
import { AnimationMovement } from '@/types/animation';

export const gradientMovement: Variants = {
  hidden: (i: AnimationMovement) => ({
    x: i.x,
    y: i.y,
    opacity: i.newY ? 0.5 : 1,
  }),
  visible: (i: AnimationMovement) => ({
    x: i.newX || i.x,
    y: i.newY || i.y,
    opacity: 1,
    transition: {
      delay: i.delay || 0,
      ease: 'linear',
      duration: i.duration || 1,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  }),
};
