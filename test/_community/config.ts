import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'path'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser, regularUser } from '../credentials.js'
import { MediaCollection } from './collections/Media/index.js'
import { MembersCollection } from './collections/Members/index.js'
import { PostsCollection, postsSlug } from './collections/Posts/index.js'
import { UsersCollection } from './collections/Users/index.js'
import { MenuGlobal } from './globals/Menu/index.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [PostsCollection, MediaCollection, MembersCollection, UsersCollection],
  admin: {
    user: UsersCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor({}),
  globals: [
    // ...add more globals here
    MenuGlobal,
  ],
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
        roles: ['admin'],
      },
    })

    await payload.create({
      collection: 'users',
      data: {
        email: regularUser.email,
        password: regularUser.password,
        roles: ['user'],
      },
    })

    await payload.create({
      collection: postsSlug,
      data: {
        title: 'example post',
      },
    })

    await payload.create({
      collection: 'members',
      data: {
        email: devUser.email,
        password: devUser.password,
        name: devUser.email,
      },
    })
  },
  typescript: {
    autoGenerate: true,
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
