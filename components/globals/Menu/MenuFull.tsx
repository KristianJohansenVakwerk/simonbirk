import Box from '@components/shared/ui/Box/Box';
import Text from '@components/shared/ui/Text/Text';

type Props = {
  data: {
    title: string;
    year: string;
    img: string;
    url: string;
  }[];
  handleClick: (url: string) => void;
  onMouseLeave: () => void;
};
export const MenuFull = (props: Props) => {
  const { data, handleClick, onMouseLeave } = props;

  return (
    <div className="relative mb-[7px] grid grid-cols-6">
      <div
        className="col-span-3"
        onMouseLeave={onMouseLeave}
      >
        {data.map((item, index) => {
          return (
            <Box
              key={item.title + index}
              className={
                'relative mb-[7px] grid cursor-pointer grid-cols-3 justify-between transition-colors duration-300 last:mb-0'
              }
              onClick={() => handleClick(item.url)}
            >
              <Box className={'col-span-3'}>
                <Box className={'relative left-0 top-0 z-10 col-span-3'}>
                  <Box className={'grid grid-cols-3 hover:text-hover'}>
                    <Box className={'col-span-2'}>
                      <Text>{item.title}</Text>
                    </Box>
                    <Box
                      className={'col-span-1 flex items-end justify-end pr-1'}
                    >
                      <Text>{item.year}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default MenuFull;
