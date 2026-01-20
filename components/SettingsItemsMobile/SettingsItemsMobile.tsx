'use client';
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
      {/* <div className="fixed top-[24px] z-10 flex h-fit w-full flex-row gap-1 px-1 lg:hidden">
        <Link
          href={'/'}
          onClick={goHome}
        >
          <Text>Simon Birk</Text>
        </Link>
        <Text>Photographer</Text>
      </div> */}
      <div className="fixed bottom-[24px] z-10 flex h-fit w-full flex-row items-end justify-between gap-1 px-1 lg:hidden">
        {settings.info?.map((item) => {
          return (
            <Box
              key={item._key}
              className={clsx('flex flex-col gap-[6px]')}
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
