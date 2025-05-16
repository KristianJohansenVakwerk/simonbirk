import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { projectType } from './projectType';
import { settingsType } from './settingsType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, projectType, settingsType],
};
