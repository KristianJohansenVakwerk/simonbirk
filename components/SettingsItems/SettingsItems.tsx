import Link from 'next/link';
import Box from '../shared/ui/Box/Box';
import Text from '../shared/ui/Text/Text';
import { QuerySettingsResult } from '@/sanity/types/sanity.types';

type Props = {
  settings: QuerySettingsResult;
};
const SettingsItems = (props: Props) => {
  const { settings } = props;

  if (!settings) return;

  return (
    <>
      {settings.info?.map((item) => {
        return (
          <Box
            className="sticky top-75 col-span-3 hidden h-fit flex-row gap-1 lg:flex"
            key={item._key}
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
    </>
  );
};

export default SettingsItems;
