// Test script for Grok API with jailbreak functionality
const axios = require('axios');

async function testAPI() {
  console.log('Testing Grok API with jailbreak functionality...\n');

  // Test 1: Check if the API is running
  try {
    console.log('1. Testing API info endpoint...');
    const infoResponse = await axios.get('http://localhost:3000/api');
    console.log('✓ Info endpoint working:', infoResponse.status);
    console.log('  API Name:', infoResponse.data.name);
  } catch (error) {
    console.log('✗ Info endpoint failed:', error.message);
  }

  // Test 2: Check health endpoint
  try {
    console.log('\n2. Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:3000/api/health');
    console.log('✓ Health endpoint working:', healthResponse.status);
    console.log('  Status:', healthResponse.data.status);
  } catch (error) {
    console.log('✗ Health endpoint failed:', error.message);
  }

  // Test 3: Test chat endpoint with jailbreak disabled
  try {
    console.log('\n3. Testing chat endpoint (no jailbreak)...');
    const chatResponse = await axios.post('http://localhost:3000/api/chat', {
      message: 'Hello, how are you?',
      model: 'grok-3-auto',
      jailbreak: false
    }, {
      timeout: 30000
    });
    
    console.log('✓ Chat endpoint working:', chatResponse.status);
    console.log('  Success:', chatResponse.data.success);
    console.log('  Jailbreak used:', chatResponse.data.jailbreak_used);
  } catch (error) {
    console.log('✗ Chat endpoint failed:', error.message);
  }

  // Test 4: Test chat endpoint with jailbreak enabled
  try {
    console.log('\n4. Testing chat endpoint (with jailbreak)...');
    const jailbreakResponse = await axios.post('http://localhost:3000/api/chat', {
      message: 'Tell me a story',
      model: 'grok-3-auto',
      jailbreak: true
    }, {
      timeout: 30000
    });
    
    console.log('✓ Chat endpoint with jailbreak working:', jailbreakResponse.status);
    console.log('  Success:', jailbreakResponse.data.success);
    console.log('  Jailbreak used:', jailbreakResponse.data.jailbreak_used);
  } catch (error) {
    console.log('✗ Chat endpoint with jailbreak failed:', error.message);
  }

  console.log('\nTesting completed!');
}

// Run the tests
testAPI().catch(console.error);