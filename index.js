// Index file for the Grok API
export { default as handler } from './api/chat.js';

// Export a simple health check
export const config = {
  api: {
    externalResolver: true,
  },
};

// For direct access
export default function Home() {
  return {
    message: "Grok API is running",
    endpoints: {
      chat: "/api/chat (POST)"
    },
    documentation: "Send POST request with {message, model, jailbreak}"
  };
}