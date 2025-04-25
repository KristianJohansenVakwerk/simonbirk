import MenuItemTexts from '@components/globals/Menu/MenuItemTexts';
import ThreeDTest from '@components/shared/ui/3dTest/3dTest';
import Box from '@components/shared/ui/Box/Box';
import Text from '@components/shared/ui/Text/Text';
import Link from 'next/link';

const ProjectPage = () => {
  return (
    <>
      <header className="fixed z-20 grid w-full grid-cols-20 gap-1">
        <Link
          href={'/'}
          className={
            'sticky top-75 col-span-2 flex h-fit flex-row justify-center'
          }
        >
          <Text>Simon Birk</Text>
        </Link>
        <div className={'col-span-6 mt-75'}>
          <Box
            className={
              'relative mb-2 grid cursor-pointer grid-cols-6 justify-between transition-colors duration-300 last:mb-0'
            }
          >
            <Box className={'col-span-3'}>
              <Box className={'relative left-0 top-0 z-10 col-span-3'}>
                <Box className={'grid grid-cols-3 hover:text-hover'}>
                  <Box className={'col-span-1'}>
                    <Text>2024</Text>
                  </Box>
                  <Box className={'col-span-2 flex items-end justify-end pr-1'}>
                    <Text>Addidas Magazine</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
        <Text className="sticky top-75 col-span-3 h-fit">Photographer</Text>

        <Box className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <Text>Agency</Text>
          <Text>Preview</Text>
        </Box>

        <Box className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <Text>Email</Text>
          <Text>info@simonbirk.com</Text>
        </Box>

        <Box className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <Text>Instagram</Text>
          <Text>@simonbirk</Text>
        </Box>
      </header>
      <ThreeDTest />
    </>
  );
};

export default ProjectPage;
