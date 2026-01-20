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
    
      <div className="fixed bottom-[16px] left-1 z-10 flex flex-col w-fit h-fit  items-start  gap-[6px]  lg:hidden">
         <Link
          href={'/'}
          className={
            'sticky top-[16px] lg:top-75 col-span-7 lg:col-span-4 flex gap-1  h-fit flex-row lg:flex-row lg:gap-1 lg:pl-1'
          }
          
        >
          <Text>Simon Birk</Text>
          <Text>Photographer</Text>
        </Link>
        {settings.info?.map((item) => {
          return (
            <Box
              key={item._key}
              className={clsx('flex flex-row gap-1')}
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
