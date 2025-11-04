/**
 * API Test Script
 * Run this to verify all tracking tool APIs are responding correctly
 * 
 * Usage: npx tsx test-apis.ts
 */

const BASE_URL = 'http://localhost:3000'

interface TestResult {
  endpoint: string
  method: string
  status: number
  success: boolean
  message: string
}

const results: TestResult[] = []

async function testAPI(endpoint: string, method: string, expectedStatus: number, description: string) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const success = response.status === expectedStatus
    const message = success 
      ? `✅ ${description}` 
      : `❌ ${description} (got ${response.status}, expected ${expectedStatus})`

    results.push({
      endpoint,
      method,
      status: response.status,
      success,
      message
    })

    console.log(message)
    return success
  } catch (error) {
    const message = `❌ ${description} - Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    results.push({
      endpoint,
      method,
      status: 0,
      success: false,
      message
    })
    console.log(message)
    return false
  }
}

async function runTests() {
  console.log('🧪 Testing BipolarPeople.com APIs...\n')
  console.log('=' .repeat(60))
  console.log('Note: All endpoints should return 401 (Unauthorized) without auth')
  console.log('This confirms the endpoint exists and auth is working!')
  console.log('=' .repeat(60))
  console.log()

  // Mood API Tests
  console.log('📊 MOOD TRACKER API')
  await testAPI('/api/mood', 'GET', 401, 'Mood entries - GET')
  await testAPI('/api/mood', 'POST', 401, 'Mood entries - POST')
  await testAPI('/api/mood?id=1', 'DELETE', 401, 'Mood entries - DELETE')
  console.log()

  // Medications API Tests
  console.log('💊 MEDICATIONS API')
  await testAPI('/api/medications', 'GET', 401, 'Medications - GET')
  await testAPI('/api/medications', 'POST', 401, 'Medications - POST')
  await testAPI('/api/medications', 'PUT', 401, 'Medications - PUT')
  await testAPI('/api/medications?id=1', 'DELETE', 401, 'Medications - DELETE')
  console.log()

  // Medication Logs API Tests
  console.log('📝 MEDICATION LOGS API')
  await testAPI('/api/medications/logs', 'GET', 401, 'Medication logs - GET')
  await testAPI('/api/medications/logs', 'POST', 401, 'Medication logs - POST')
  await testAPI('/api/medications/logs', 'PUT', 401, 'Medication logs - PUT')
  await testAPI('/api/medications/logs?id=1', 'DELETE', 401, 'Medication logs - DELETE')
  console.log()

  // Episode Plans API Tests
  console.log('🗓️  EPISODE PLANNER API')
  await testAPI('/api/episodes/plans', 'GET', 401, 'Episode plans - GET')
  await testAPI('/api/episodes/plans', 'POST', 401, 'Episode plans - POST')
  await testAPI('/api/episodes/plans', 'PUT', 401, 'Episode plans - PUT')
  await testAPI('/api/episodes/plans?id=1', 'DELETE', 401, 'Episode plans - DELETE')
  console.log()

  // Journal API Test (already working)
  console.log('📔 JOURNAL API (Reference)')
  await testAPI('/api/journal', 'GET', 401, 'Journal entries - GET')
  console.log()

  // Summary
  console.log('=' .repeat(60))
  console.log('📈 SUMMARY')
  console.log('=' .repeat(60))
  
  const total = results.length
  const passed = results.filter(r => r.success).length
  const failed = total - passed

  console.log(`Total Tests: ${total}`)
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log()

  if (failed > 0) {
    console.log('❌ FAILED TESTS:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ${r.method} ${r.endpoint} - Status: ${r.status}`)
    })
    console.log()
    console.log('⚠️  Some APIs are not responding correctly.')
    console.log('   Common issues:')
    console.log('   1. Dev server not running (run: npm run dev)')
    console.log('   2. API route file missing or has syntax errors')
    console.log('   3. Wrong port (check if running on port 3000)')
  } else {
    console.log('🎉 ALL TESTS PASSED!')
    console.log()
    console.log('✅ All API endpoints exist and return 401 (auth working)')
    console.log('✅ Ready for manual testing with authentication')
    console.log()
    console.log('Next steps:')
    console.log('1. Open http://localhost:3000/login in your browser')
    console.log('2. Login with your account')
    console.log('3. Test each tool:')
    console.log('   - Mood Tracker: http://localhost:3000/tools/mood-tracker')
    console.log('   - Medication Tracker: http://localhost:3000/tools/medication')
    console.log('   - Episode Planner: http://localhost:3000/tools/episode-planner')
  }
  console.log()
}

// Run the tests
console.log('⏳ Starting API tests...\n')
runTests().catch(error => {
  console.error('❌ Test suite failed:', error)
  process.exit(1)
})

