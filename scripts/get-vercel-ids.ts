import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Simple script to display Vercel project IDs
 * Run: npx tsx scripts/get-vercel-ids.ts
 */

const vercelProjectPath = join(process.cwd(), '.vercel', 'project.json');

console.log('\n🔍 Looking for Vercel project configuration...\n');

if (!existsSync(vercelProjectPath)) {
  console.error('❌ No .vercel/project.json file found!');
  console.log('\n📋 To create this file, run:');
  console.log('   npm run vercel:link');
  console.log('   or');
  console.log('   vercel link\n');
  process.exit(1);
}

try {
  const projectConfig = JSON.parse(readFileSync(vercelProjectPath, 'utf-8'));
  
  console.log('✅ Found Vercel project configuration!\n');
  console.log('📝 Add these to your GitHub repository secrets:\n');
  console.log('─'.repeat(60));
  console.log(`VERCEL_ORG_ID`);
  console.log(`→ ${projectConfig.orgId}\n`);
  console.log(`VERCEL_PROJECT_ID`);
  console.log(`→ ${projectConfig.projectId}\n`);
  console.log('─'.repeat(60));
  console.log('\n📌 Note: You still need to create VERCEL_TOKEN');
  console.log('   Get it from: https://vercel.com/account/tokens\n');

} catch (error) {
  console.error('❌ Error reading project configuration:', error);
  console.log('\nTry running: npm run vercel:link\n');
  process.exit(1);
}

