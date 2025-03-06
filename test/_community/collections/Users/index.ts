import type { CollectionConfig } from 'payload'

export const UsersCollection: CollectionConfig<'users'> = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      options: ['admin', 'user'],
      hasMany: true,
    },
  ],
}
