import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68b5a86bc1bc9c6abe7fbc5b", 
  requiresAuth: true // Ensure authentication is required for all operations
});
