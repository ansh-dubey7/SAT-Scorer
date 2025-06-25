import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
oauth2Client.scopes = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://mail.google.com/',
];

const getAccessToken = async () => {
  try {
    const { token } = await oauth2Client.getAccessToken();
    if (!token) {
      throw new Error('Failed to retrieve access token');
    }
    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export { oauth2Client, getAccessToken };