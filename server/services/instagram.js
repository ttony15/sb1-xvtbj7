import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class InstagramService {
  constructor() {
    this.baseUrl = 'https://graph.instagram.com/v12.0';
    this.clientId = process.env.INSTAGRAM_CLIENT_ID;
    this.clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
    this.redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
  }

  async getAuthUrl() {
    return `https://api.instagram.com/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=user_profile,user_media&response_type=code`;
  }

  async exchangeCodeForToken(code) {
    try {
      const response = await axios.post('https://api.instagram.com/oauth/access_token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
        code
      });

      return response.data;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  async getUserProfile(accessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/me`, {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: accessToken
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async getMediaInsights(mediaId, accessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/${mediaId}/insights`, {
        params: {
          metric: 'engagement,impressions,reach,saved',
          access_token: accessToken
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching media insights:', error);
      throw error;
    }
  }

  async refreshToken(refreshToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/refresh_access_token`, {
        params: {
          grant_type: 'ig_refresh_token',
          access_token: refreshToken
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  async connectAccount(userId, code) {
    try {
      // Exchange code for access token
      const tokenData = await this.exchangeCodeForToken(code);
      
      // Get user profile
      const profile = await this.getUserProfile(tokenData.access_token);

      // Create or update social account
      const socialAccount = await prisma.socialAccount.upsert({
        where: {
          platform_accountId: {
            platform: 'instagram',
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
          platform: 'instagram',
          accountId: profile.id,
          username: profile.username,
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          tokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
          userId
        }
      });

      return socialAccount;
    } catch (error) {
      console.error('Error connecting Instagram account:', error);
      throw error;
    }
  }

  async syncMediaLibrary(socialAccountId) {
    try {
      const account = await prisma.socialAccount.findUnique({
        where: { id: socialAccountId }
      });

      if (!account) {
        throw new Error('Social account not found');
      }

      const response = await axios.get(`${this.baseUrl}/me/media`, {
        params: {
          fields: 'id,caption,media_type,media_url,thumbnail_url,permalink',
          access_token: account.accessToken
        }
      });

      const media = response.data.data;

      // Process each media item
      for (const item of media) {
        await prisma.mediaItem.upsert({
          where: {
            id: item.id
          },
          update: {
            type: item.media_type.toLowerCase(),
            url: item.media_url,
            thumbnailUrl: item.thumbnail_url,
            title: item.caption,
          },
          create: {
            id: item.id,
            type: item.media_type.toLowerCase(),
            url: item.media_url,
            thumbnailUrl: item.thumbnail_url,
            title: item.caption,
            socialAccountId: account.id
          }
        });
      }

      return media;
    } catch (error) {
      console.error('Error syncing media library:', error);
      throw error;
    }
  }
}

export default new InstagramService();