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
    <div className="fixed bottom-[8px] left-1 z-10 flex h-fit w-fit flex-col items-start gap-[6px] lg:hidden">
      <Link
        href={'/'}
        className={
          'sticky top-[16px] col-span-7 flex h-fit flex-row gap-1 lg:top-75 lg:col-span-4 lg:flex-row lg:gap-1 lg:pl-1'
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
