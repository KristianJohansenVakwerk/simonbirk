'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Text from '@components/shared/ui/Text/Text';
import { useStore } from '@/store/store';

import {
  QueryProjectsResult,
  QuerySettingsResult,
} from '@/sanity/types/sanity.types';

type Props = {
  projects: QueryProjectsResult | null;
  settings: QuerySettingsResult | null;
};

import clsx from 'clsx';
import SettingsItems from '@/components/SettingsItems/SettingsItems';
import NavController from '../NavController/NavController';
import SettingsItemsMobile from '@/components/SettingsItemsMobile/SettingsItemsMobile';

const HeaderClient = (props: Props) => {
  const { projects, settings } = props;

  const {
    globalIntroDone,
    resetGlobalScrollPosition,
    setGlobalShowMenu,
    setGlobalProjectOrder,
  } = useStore((state) => state);

  useEffect(() => {
    if (projects) {
      setGlobalProjectOrder(projects);
    }
  }, [projects, setGlobalProjectOrder]);

  const goHome = () => {
    setGlobalShowMenu(true);
    resetGlobalScrollPosition();
  };

  return (
    <>
      <header
        className={clsx(
          'relative z-20 flex h-auto flex-col gap-1 px-1 transition-opacity delay-500 duration-1000 ease-in-out lg:grid lg:grid-cols-24 lg:px-0',
          {
            'opacity-0': !globalIntroDone,
            'opacity-100': globalIntroDone,
            'pointer-events-none': !globalIntroDone,
            'pointer-events-auto': globalIntroDone,
          },
        )}
      >
        <Link
          href={'/'}
          className={
            'sticky top-[16px] col-span-7 hidden h-fit flex-col gap-[6px] lg:top-75 lg:col-span-4 lg:flex lg:flex-row lg:gap-1 lg:pl-1'
          }
          onClick={goHome}
        >
          <Text>Simon Birk</Text>
          <Text>Photographer</Text>
        </Link>
        {settings && <SettingsItemsMobile settings={settings} />}
        <div className="w-full lg:col-span-8 lg:mt-75 lg:w-auto">
          <NavController projects={projects} />
        </div>

        {settings && <SettingsItems settings={settings} />}
      </header>
    </>
  );
};

export default HeaderClient;
