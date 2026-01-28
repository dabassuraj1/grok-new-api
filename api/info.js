// Health check and info API route
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      name: 'Grok API with Jailbreak',
      version: '1.0.0',
      status: 'running',
      features: [
        'Grok 3 Auto model support',
        'Grok 3 Fast model support', 
        'Grok 4 model support',
        'Jailbreak functionality with untrammelled writing assistant',
        'Crude language and moral restriction bypassing',
        'Conversation persistence'
      ],
      endpoints: {
        chat: {
          method: 'POST',
          path: '/api/chat',
          body: {
            message: 'string (required)',
            model: 'string (optional, default: grok-3-auto)',
            jailbreak: 'boolean (optional, default: false)',
            proxy: 'string (optional)'
          },
          example: {
            message: 'Write a story about robots',
            model: 'grok-3-auto',
            jailbreak: true
          }
        }
      },
      documentation: 'Send POST request to /api/chat with your message and optional parameters'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}