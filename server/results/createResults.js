import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'results.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()

// Set default data
db.data ||= { posts: [] }

// Create and query items using plain JS
db.data.posts.push('hello world')
const firstPost = db.data.posts[0]

// Finally write db.data content to file
await db.write()
