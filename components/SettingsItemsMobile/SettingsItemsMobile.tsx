import Link from 'next/link';
import Box from '../shared/ui/Box/Box';
import Text from '../shared/ui/Text/Text';
import { QuerySettingsResult } from '@/sanity/types/sanity.types';
import clsx from 'clsx';

type Props = {
  settings: QuerySettingsResult;
};
const SettingsItemsMobile = (props: Props) => {
  const { settings } = props;

  if (!settings) return;

  return (
    <>
      <div className="fixed top-1 z-10 flex h-fit w-full flex-row items-end justify-between gap-1 px-1 lg:hidden">
        <Text>Simon Birk</Text>
        <Text>Photographer</Text>
      </div>
      <div className="fixed bottom-[32px] z-10 flex h-fit w-full flex-row items-end justify-between gap-1 px-1 lg:hidden">
        {settings.info?.map((item, index) => {
          return (
            <Box
              key={item._key}
              className={clsx('flex flex-col gap-[6px]', {
                hidden: index === 0,
              })}
            >
              <Text>{item.title}</Text>

              {item.href ? (
                <Link
                  className="gap-0 font-sans text-base leading-none capsize"
                  href={item.href}
                  target="_blank"
                >
                  {item.hrefLabel}
                </Link>
              ) : (
                <Text>{item.hrefLabel}</Text>
              )}
            </Box>
          );
        })}
      </div>
    </>
  );
};

export default SettingsItemsMobile;
