'use client';
import Box from '@components/shared/ui/Box/Box';
import clsx from 'clsx';

type Props = {
  data: {
    title: string;
    year: string;
    img: string;
  }[];
  activeIndex: number | null;
};

const Thumbnails = (props: Props) => {
  const { data, activeIndex } = props;
  return (
    <Box
      className={
        'pointer-events-none fixed right-0 top-0 z-10 h-full w-full will-change-transform'
      }
    >
      {data.map((item, index) => (
        <img
          key={item.title + index}
          src={item.img}
          alt={item.title}
          width={245}
          height={311}
          className={clsx(
            'absolute right-0 top-0 h-full w-auto transition-opacity duration-300',
            activeIndex === index ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
    </Box>
  );
};

export default Thumbnails;
