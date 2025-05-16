import { CogIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Simon Birk Photography')
    .items([
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(S.editor().id('settings').schemaType('settings')),
      S.documentTypeListItem('project').title('Projects'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !['project', 'settings'].includes(item.getId()!),
      ),
    ]);
