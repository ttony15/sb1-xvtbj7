import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

class SocialAuthService {
  constructor() {
    this.config = {
      instagram: {
        clientId: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        redirectUri: process.env.INSTAGRAM_REDIRECT_URI,
        scope: 'basic public_content',
      },
      twitter: {
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        redirectUri: process.env.TWITTER_REDIRECT_URI,
        scope: 'tweet.read tweet.write users.read',
      },
      facebook: {
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        redirectUri: process.env.FACEBOOK_REDIRECT_URI,
        scope: 'pages_show_list,pages_read_engagement,pages_manage_posts',
      }
    };
  }

  getAuthUrl(platform) {
    const config = this.config[platform];
    if (!config) throw new Error('Unsupported platform');

    switch (platform) {
      case 'instagram':
        return `https://api.instagram.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope}&response_type=code`;
      
      case 'twitter':
        return `https://twitter.com/i/oauth2/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope}&response_type=code&state=state`;
      
      case 'facebook':
        return `https://www.facebook.com/v12.0/dialog/oauth?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope}`;
      
      default:
        throw new Error('Unsupported platform');
    }
  }

  async handleCallback(platform, code, userId) {
    const config = this.config[platform];
    if (!config) throw new Error('Unsupported platform');

    try {
      // Exchange code for access token
      const tokenData = await this.getAccessToken(platform, code);
      
      // Get user profile from platform
      const profile = await this.getUserProfile(platform, tokenData.access_token);

      // Save or update social account
      const account = await prisma.socialAccount.upsert({
        where: {
          platform_accountId: {
            platform,
            accountId: profile.id
          }
        },
        update: {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          tokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
          username: profile.username,
          isActive: true
        },
        create: {
          platform,
          accountId: profile.id,
          username: profile.username,
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          tokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
          userId
        }
      });

      return account;
    } catch (error) {
      console.error(`${platform} auth error:`, error);
      throw new Error(`Failed to authenticate with ${platform}`);
    }
  }

  async getAccessToken(platform, code) {
    const config = this.config[platform];
    let tokenUrl, data;

    switch (platform) {
      case 'instagram':
        tokenUrl = 'https://api.instagram.com/oauth/access_token';
        data = {
          client_id: config.clientId,
          client_secret: config.clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: config.redirectUri,
          code
        };
        break;

      case 'twitter':
        tokenUrl = 'https://api.twitter.com/2/oauth2/token';
        data = {
          code,
          grant_type: 'authorization_code',
          client_id: config.clientId,
          redirect_uri: config.redirectUri,
          code_verifier: 'challenge'
        };
        break;

      case 'facebook':
        tokenUrl = 'https://graph.facebook.com/v12.0/oauth/access_token';
        data = {
          client_id: config.clientId,
          client_secret: config.clientSecret,
          redirect_uri: config.redirectUri,
          code
        };
        break;

      default:
        throw new Error('Unsupported platform');
    }

    const response = await axios.post(tokenUrl, data);
    return response.data;
  }

  async getUserProfile(platform, accessToken) {
    let profileUrl, headers;

    switch (platform) {
      case 'instagram':
        profileUrl = 'https://graph.instagram.com/me';
        headers = { Authorization: `Bearer ${accessToken}` };
        break;

      case 'twitter':
        profileUrl = 'https://api.twitter.com/2/users/me';
        headers = { Authorization: `Bearer ${accessToken}` };
        break;

      case 'facebook':
        profileUrl = 'https://graph.facebook.com/me';
        headers = { Authorization: `Bearer ${accessToken}` };
        break;

      default:
        throw new Error('Unsupported platform');
    }

    const response = await axios.get(profileUrl, { headers });
    return response.data;
  }

  async refreshToken(accountId) {
    const account = await prisma.socialAccount.findUnique({
      where: { id: accountId }
    });

    if (!account || !account.refreshToken) {
      throw new Error('Invalid account or missing refresh token');
    }

    const config = this.config[account.platform];
    let tokenUrl, data;

    switch (account.platform) {
      case 'instagram':
        tokenUrl = 'https://graph.instagram.com/refresh_access_token';
        data = {
          grant_type: 'ig_refresh_token',
          access_token: account.refreshToken
        };
        break;

      case 'twitter':
        tokenUrl = 'https://api.twitter.com/2/oauth2/token';
        data = {
          grant_type: 'refresh_token',
          refresh_token: account.refreshToken,
          client_id: config.clientId
        };
        break;

      case 'facebook':
        tokenUrl = 'https://graph.facebook.com/v12.0/oauth/access_token';
        data = {
          grant_type: 'fb_exchange_token',
          client_id: config.clientId,
          client_secret: config.clientSecret,
          fb_exchange_token: account.accessToken
        };
        break;

      default:
        throw new Error('Unsupported platform');
    }

    const response = await axios.post(tokenUrl, data);
    const tokenData = response.data;

    // Update account with new tokens
    const updatedAccount = await prisma.socialAccount.update({
      where: { id: accountId },
      data: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        tokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000)
      }
    });

    return updatedAccount;
  }
}

export default new SocialAuthService();