import { Resend } from 'resend';

async function checkResendAPI() {
  // Use your actual API key from .env.local
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    console.log('🔍 Checking Resend API...');
    console.log('API Key:', process.env.RESEND_API_KEY ? '✅ Found' : '❌ Missing');
    
    // List API keys
    console.log('\n📋 Fetching API keys...');
    const { data, error } = await resend.apiKeys.list();
    
    if (error) {
      console.error('❌ Error fetching API keys:', error);
    } else {
      console.log('✅ API keys fetched successfully!');
      console.log('Keys:', JSON.stringify(data, null, 2));
    }
    
    // Test domains
    console.log('\n🌐 Fetching domains...');
    const domainsResult = await resend.domains.list();
    
    if (domainsResult.error) {
      console.error('❌ Error fetching domains:', domainsResult.error);
    } else {
      console.log('✅ Domains fetched successfully!');
      console.log('Domains:', JSON.stringify(domainsResult.data, null, 2));
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Load environment variables
import { config } from 'dotenv';
config({ path: '.env.local' });

checkResendAPI();
