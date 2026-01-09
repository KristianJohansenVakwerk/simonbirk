'use client';
import Link from 'next/link';
import Menu from '@components/globals/Menu/Menu';
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
import ProjectTitle from '@/components/ProjectTitle/ProjectTitle';

const HeaderClient = (props: Props) => {
  const { projects, settings } = props;

  const {
    globalIntroDone,
    globalShowMenu,
    globalActiveProjectIndex,
    setGlobalShowMenu,
  } = useStore((state) => state);

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
        onClick={() => setGlobalShowMenu(true)}
      >
        <Text>Simon Birk</Text>
      </Link>
      <div className="col-span-6 mt-75">
        {globalShowMenu ? (
          <Menu data={projects} />
        ) : (
          <div className={'w-[100%]'}>
            <ProjectTitle
              title={projects?.[globalActiveProjectIndex]?.title ?? null}
              year={projects?.[globalActiveProjectIndex]?.year ?? null}
            />
          </div>
        )}
      </div>

      {settings && <SettingsItems settings={settings} />}
    </header>
  );
};

export default HeaderClient;
