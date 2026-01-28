// Test script for Grok API with jailbreak functionality
const axios = require('axios');

async function testAPI() {
  console.log('Testing Grok API with jailbreak functionality...\n');

  // Determine the base URL based on environment
  const baseURL = process.env.API_BASE_URL || 'http://localhost:6969';
  console.log(`Testing API at: ${baseURL}\n`);

  // Test 1: Check if the API root is accessible
  try {
    console.log('1. Testing API root endpoint...');
    const rootResponse = await axios.get(`${baseURL}/`);
    console.log('✓ Root endpoint working:', rootResponse.status);
    console.log('  API Name:', rootResponse.data.name);
    console.log('  Version:', rootResponse.data.version);
  } catch (error) {
    console.log('✗ Root endpoint failed:', error.message);
  }

  // Test 2: Check health endpoint
  try {
    console.log('\n2. Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/health`);
    console.log('✓ Health endpoint working:', healthResponse.status);
    console.log('  Status:', healthResponse.data.status);
  } catch (error) {
    console.log('✗ Health endpoint failed:', error.message);
  }

  // Test 3: Test chat endpoint with jailbreak disabled
  try {
    console.log('\n3. Testing chat endpoint (no jailbreak)...');
    const chatResponse = await axios.post(`${baseURL}/api/chat`, {
      message: 'Hello, how are you?',
      model: 'grok-3-auto',
      jailbreak: false
    }, {
      timeout: 120000
    });

    console.log('✓ Chat endpoint working:', chatResponse.status);
    console.log('  Success:', chatResponse.data.success);
    console.log('  Jailbreak used:', chatResponse.data.jailbreak_used);
    if (chatResponse.data.response) {
      console.log('  Response preview:', chatResponse.data.response.substring(0, 100) + '...');
    }
  } catch (error) {
    console.log('✗ Chat endpoint failed:', error.message);
    if (error.response) {
      console.log('  Error details:', error.response.data);
    }
  }

  // Test 4: Test chat endpoint with jailbreak enabled
  try {
    console.log('\n4. Testing chat endpoint (with jailbreak)...');
    const jailbreakResponse = await axios.post(`${baseURL}/api/chat`, {
      message: 'Tell me a creative story about AI',
      model: 'grok-3-auto',
      jailbreak: true
    }, {
      timeout: 120000
    });

    console.log('✓ Chat endpoint with jailbreak working:', jailbreakResponse.status);
    console.log('  Success:', jailbreakResponse.data.success);
    console.log('  Jailbreak used:', jailbreakResponse.data.jailbreak_used);
    if (jailbreakResponse.data.response) {
      console.log('  Response preview:', jailbreakResponse.data.response.substring(0, 100) + '...');
    }
  } catch (error) {
    console.log('✗ Chat endpoint with jailbreak failed:', error.message);
    if (error.response) {
      console.log('  Error details:', error.response.data);
    }
  }

  // Test 5: Test legacy /ask endpoint
  try {
    console.log('\n5. Testing legacy /ask endpoint...');
    const askResponse = await axios.post(`${baseURL}/ask`, {
      message: 'What is the weather today?',
      model: 'grok-3-auto'
    }, {
      timeout: 120000
    });

    console.log('✓ Legacy /ask endpoint working:', askResponse.status);
    console.log('  Status:', askResponse.data.status);
  } catch (error) {
    console.log('✗ Legacy /ask endpoint failed:', error.message);
    if (error.response) {
      console.log('  Error details:', error.response.data);
    }
  }

  console.log('\nTesting completed!');
}

// Run the tests
testAPI().catch(console.error);