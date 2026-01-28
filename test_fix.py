#!/usr/bin/env python3
"""
Test script to verify the Grok API fix
"""
import asyncio
import json
import requests
from core import Grok

def test_grok_direct():
    """Test Grok class directly"""
    print("Testing Grok class initialization...")
    try:
        # Test with different models
        grok = Grok("grok-3-fast")
        print(f"✓ Grok initialized successfully with session: {type(grok.session)}")
        print(f"  Session headers: {list(dict(grok.session.headers).keys())[:3]}...")  # Show first 3 header keys
        return True
    except Exception as e:
        print(f"✗ Error initializing Grok: {e}")
        return False

def test_api_connection():
    """Test API server connection"""
    print("\nTesting API server connection...")
    try:
        # Test the root endpoint
        response = requests.get("http://localhost:6969/")
        if response.status_code == 200:
            data = response.json()
            print(f"✓ API server connected. Version: {data.get('version', 'unknown')}")
            return True
        else:
            print(f"✗ API server returned status: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Error connecting to API server: {e}")
        print("  Hint: Make sure the server is running with 'python api_server.py'")
        return False

def test_chat_endpoint():
    """Test chat endpoint"""
    print("\nTesting chat endpoint...")
    try:
        payload = {
            "message": "Hello, how are you?",
            "model": "grok-3-fast",
            "jailbreak": False
        }
        response = requests.post(
            "http://localhost:6969/api/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        print(f"Response status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Chat endpoint responded successfully")
            print(f"  Success: {data.get('success', 'N/A')}")
            return True
        else:
            print(f"✗ Chat endpoint returned error: {response.text}")
            return False
    except Exception as e:
        print(f"✗ Error calling chat endpoint: {e}")
        return False

if __name__ == "__main__":
    print("Testing Grok API fix...\n")
    
    # Test direct Grok functionality
    success1 = test_grok_direct()
    
    # Test API server connection
    success2 = test_api_connection()
    
    # Test chat endpoint if server is running
    if success2:
        success3 = test_chat_endpoint()
    else:
        success3 = False
    
    print(f"\nResults:")
    print(f"- Grok initialization: {'PASS' if success1 else 'FAIL'}")
    print(f"- API connection: {'PASS' if success2 else 'FAIL'}")
    print(f"- Chat endpoint: {'PASS' if success3 else 'FAIL'}")
    
    if success1 and success2:
        print("\n✓ Basic functionality appears to be working!")
    else:
        print("\n✗ Some tests failed. Check the implementation.")