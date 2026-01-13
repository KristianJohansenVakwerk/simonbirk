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
    <header
      className={clsx(
        'relative z-20 grid h-auto grid-cols-20 gap-1 transition-opacity delay-500 duration-1000 ease-in-out',
        {
          'opacity-0': !globalIntroDone,
          'opacity-100': globalIntroDone,
        },
      )}
    >
      <Link
        href={'/'}
        className={
          'col-span-20 sticky top-[32px] hidden h-fit flex-row pl-1 lg:top-75 lg:col-span-2 lg:flex'
        }
        onClick={goHome}
      >
        <Text>Simon Birk</Text>
      </Link>
      <div className="col-span-20 lg:col-span-6 lg:mt-75">
        <NavController projects={projects} />
      </div>

      {settings && <SettingsItems settings={settings} />}
    </header>
  );
};

export default HeaderClient;
