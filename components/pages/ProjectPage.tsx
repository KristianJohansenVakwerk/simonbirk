import ThreeDTest from '@components/shared/3dTest/3dTest';
import { QueryProjectBySlugResult } from '@/sanity/types/sanity.types';

type Props = {
  project: QueryProjectBySlugResult;
};

const ProjectPage = (props: Props) => {
  const { project } = props;

  return (
    <>
      <ThreeDTest data={project} />
    </>
  );
};

export default ProjectPage;
