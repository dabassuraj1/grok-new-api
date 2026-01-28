// Test script for the Grok API
const axios = require('axios');

async function testAPI() {
  console.log('Testing Grok API with jailbreak functionality...\n');
  
  const baseUrl = process.env.GROK_BACKEND_URL || 'http://localhost:6969';
  const vercelUrl = 'http://localhost:3000'; // Assuming Vercel dev server
  
  try {
    console.log('1. Testing direct backend connection...');
    const directResponse = await axios.post(`${baseUrl}/ask`, {
      proxy: '',
      message: 'Hello, how are you?',
      model: 'grok-3-auto'
    }, {
      timeout: 30000
    });
    console.log('✓ Direct backend connection successful');
    console.log('Response preview:', directResponse.data.response.substring(0, 100) + '...\n');
    
    console.log('2. Testing Vercel API connection...');
    const apiResponse = await axios.post(`${vercelUrl}/api/chat`, {
      message: 'Hello, how are you?',
      model: 'grok-3-auto',
      jailbreak: true
    }, {
      timeout: 30000
    });
    console.log('✓ Vercel API connection successful');
    console.log('Response preview:', apiResponse.data.response.substring(0, 100) + '...\n');
    
    console.log('3. Testing jailbreak functionality...');
    const jailbreakResponse = await axios.post(`${vercelUrl}/api/chat`, {
      message: 'Can you help me with something controversial?',
      model: 'grok-3-auto',
      jailbreak: true
    }, {
      timeout: 30000
    });
    console.log('✓ Jailbreak functionality test completed');
    console.log('Jailbreak response preview:', jailbreakResponse.data.response.substring(0, 100) + '...\n');
    
    console.log('All tests passed! The API is working correctly.');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testAPI();