import { sql } from '@vercel/postgres'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

async function runMigration() {
  try {
    console.log('🚀 Starting database migration...\n')
    
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'src/lib/schema.sql')
    
    if (!fs.existsSync(schemaPath)) {
      console.error(`❌ Schema file not found at: ${schemaPath}`)
      process.exit(1)
    }
    
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    
    // Split by semicolons to handle multiple statements
    // But we need to be careful with plpgsql functions which have internal semicolons
    const statements = schema
      .split(/;(?=\s*$)/gm)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    console.log(`Found ${statements.length} statements to execute\n`)
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      
      // Skip empty statements
      if (!statement || statement.length < 10) continue
      
      // Try to identify what we're doing for logging
      const isCreate = statement.toLowerCase().includes('create')
      const isAlter = statement.toLowerCase().includes('alter')
      const isIndex = statement.toLowerCase().includes('index')
      const isTrigger = statement.toLowerCase().includes('trigger')
      
      let type = 'statement'
      if (isCreate) type = 'create'
      if (isAlter) type = 'alter'
      if (isIndex) type = 'index'
      if (isTrigger) type = 'trigger'
      
      try {
        await sql.query(statement)
        console.log(`✓ [${i + 1}/${statements.length}] ${type}`)
      } catch (error: any) {
        // Some errors are expected (like IF NOT EXISTS)
        const isExpectedError = error.message.includes('already exists') || 
                                error.message.includes('duplicate')
        
        if (isExpectedError) {
          console.log(`⊘ [${i + 1}/${statements.length}] ${type} (already exists)`)
        } else {
          console.error(`✗ [${i + 1}/${statements.length}] ${type} failed:`)
          console.error(`  ${error.message}`)
        }
      }
    }
    
    console.log('\n✅ Migration complete!')
    console.log('\nNext steps:')
    console.log('1. Run "npm run db:check" to verify tables were created')
    console.log('2. Start testing your tools')
    
  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message)
    console.error('\nPossible issues:')
    console.error('1. DATABASE_URL environment variable not set')
    console.error('2. Database connection failed')
    console.error('3. Check the error message above for details')
    process.exit(1)
  }
}

runMigration()

