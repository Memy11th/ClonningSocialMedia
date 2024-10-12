import { serialize } from 'cookie';

export default function handler(req, res) {
  const { token } = req.body; // Get the token from the request body

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  // Set the token in a cookie (server-side)
  res.setHeader('Set-Cookie', serialize('AuthenticationToken', token, {
    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Protects against CSRF attacks
    maxAge: 60 * 60 * 24 * 7, // 1 week expiration
    path: '/', // Cookie is accessible on all routes
  }));

  // Send a success response
  return res.status(200).json({ message: 'Token set successfully' });
}