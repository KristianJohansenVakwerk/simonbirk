import {defineAssetAspect, defineField} from 'sanity'

export default defineAssetAspect({
  name: 'aspects',
  title: 'aspects',
  type: 'object',
  fields: [
    defineField({
      name: 'string',
      title: 'Plain String',
      type: 'string',
    }),
  ],
})
