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
    
      <div className="fixed bottom-[16px] z-10 grid grid-cols-24 items-end  gap-1  lg:hidden">
        {settings.info?.map((item) => {
          return (
            <Box
              key={item._key}
              className={clsx('col-span-8 flex flex-col gap-[6px]')}
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
    
  );
};

export default SettingsItemsMobile;
