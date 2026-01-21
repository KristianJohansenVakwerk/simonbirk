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
  show: {
    opacity: 1,
    visibility: 'visible' as const,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hide: {
    opacity: 0,
    visibility: 'hidden' as const,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const menuVariants = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};
