export const variants = {
  show: {
    opacity: 1,
    visibility: 'visible',
    transition: {
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
    },
  },
  hide: {
    opacity: 0,
    visibility: 'hidden',
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

export const introVariants = {
  initial: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    visibility: 'visible' as const,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  hide: {
    opacity: 0,
    visibility: 'hidden' as const,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export const menuVariants = {
  initial: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1],
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0, 0, 0.2, 1], // easeOut
    },
  },
};
