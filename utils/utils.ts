export const formatClasses = (classNames: string) => {
  return classNames.split(' ').filter(Boolean).join('\n ');
};
