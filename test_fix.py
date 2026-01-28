#!/usr/bin/env python3
"""
Test script to verify the Grok API fix
"""
import requests
import json

def test_api_fix():
    """
    Test the API to ensure the script_content1 error is fixed
    """
    # Test data
    test_payload = {
        "message": "Hello, how are you?",
        "model": "grok-3-fast",
        "jailbreak": False
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        # Send request to local server
        response = requests.post(
            "http://localhost:6969/api/chat",
            headers=headers,
            json=test_payload,
            timeout=30
        )
        
        # Check if the response is successful
        if response.status_code == 200:
            data = response.json()
            if "success" in data and data["success"]:
                response_text = data.get('response', '')
                if response_text:
                    char_count = len(response_text)
                else:
                    char_count = 0
                print("✅ API fix verified! The script_content1 error has been resolved.")
                print(f"Response received: {char_count} characters")
                return True
            else:
                print("❌ API returned unexpected response format")
                print(f"Response: {data}")
                return False
        else:
            print(f"❌ API returned error status: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API server. Make sure it's running on http://localhost:6969")
        return False
    except Exception as e:
        print(f"❌ Error testing API: {str(e)}")
        return False

if __name__ == "__main__":
    print("Testing Grok API fix for script_content1 error...")
    success = test_api_fix()
    if success:
        print("\n🎉 The fix is working correctly!")
    else:
        print("\n💥 The fix may not be working properly.")