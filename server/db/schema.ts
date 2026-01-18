// FILE DISABLED FOR VERCEL – SQLite not supported

// import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core'
// import { relations } from 'drizzle-orm'

// const timestamps = {
//   createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
// }

// export const users = sqliteTable('users', {
//   id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
//   email: text('email').notNull(),
//   name: text('name').notNull(),
//   avatar: text('avatar').notNull(),
//   username: text('username').notNull(),
//   provider: text('provider').notNull(), // 'github'
//   providerId: text('provider_id').notNull(),
//   ...timestamps
// }, table => [
//   uniqueIndex('users_provider_id_idx').on(table.provider, table.providerId)
// ])

// ... baaki sab bhi comment
