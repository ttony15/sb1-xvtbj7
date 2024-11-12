import api from './api';

export interface SocialAccount {
  id: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  accountId: string;
  username: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt: Date;
  isActive: boolean;
}

class SocialAuthService {
  // Get OAuth URLs for different platforms
  async getAuthUrl(platform: string): Promise<string> {
    const response = await api.get(`/social/${platform}/auth`);
    return response.data.authUrl;
  }

  // Handle OAuth callback and account connection
  async handleCallback(platform: string, code: string): Promise<SocialAccount> {
    const response = await api.post(`/social/${platform}/callback`, { code });
    return response.data;
  }

  // Get connected accounts
  async getConnectedAccounts(): Promise<SocialAccount[]> {
    const response = await api.get('/social/accounts');
    return response.data;
  }

  // Disconnect account
  async disconnectAccount(accountId: string): Promise<void> {
    await api.delete(`/social/accounts/${accountId}`);
  }

  // Refresh access token
  async refreshToken(accountId: string): Promise<SocialAccount> {
    const response = await api.post(`/social/accounts/${accountId}/refresh`);
    return response.data;
  }
}

export default new SocialAuthService();