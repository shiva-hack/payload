import type { CollectionConfig } from 'payload'

export const membersSlug = 'members'

export const MembersCollection: CollectionConfig<'members'> = {
  slug: membersSlug,
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: ({ req: { user } }) =>
      Boolean(user?.collection === 'users' && user.roles?.includes('admin')),
    update: ({ req: { user } }) => {
      // TODO: there is no way to block the payloadcms user only role from editing the auth fields like email and password.
      return Boolean(user?.collection === 'users')
    },
    // TODO: we need something like this to block the payloadcms user only role from updating the auth fields like email and password.
    // auth: ({ req: { user } }) =>
    //   Boolean(user?.collection === 'users' && user.roles?.includes('admin')),
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
  ],
}
