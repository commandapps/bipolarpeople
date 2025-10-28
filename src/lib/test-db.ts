import { db } from './db';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    const user = await db.getUserByEmail('test@example.com');
    console.log('✅ Database connection successful!');
    console.log('User found:', user ? 'Yes' : 'No (expected)');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

testConnection();