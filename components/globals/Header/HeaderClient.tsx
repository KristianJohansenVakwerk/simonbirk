'use client';
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

  const { globalIntroDone, resetGlobalScrollPosition, setGlobalShowMenu } =
    useStore((state) => state);

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
        className={'sticky top-75 col-span-2 flex h-fit flex-row pl-1'}
        onClick={goHome}
      >
        <Text>Simon Birk</Text>
      </Link>
      <div className="col-span-6 mt-75">
        <NavController projects={projects} />
      </div>

      {settings && <SettingsItems settings={settings} />}
    </header>
  );
};

export default HeaderClient;
