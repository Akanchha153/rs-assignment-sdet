import dotenv from 'dotenv';
dotenv.config();

const config = {
    baseUrl: process.env.BASE_URL || 'https://app.rudderstack.com/login',
    validEmail: process.env.VALID_EMAIL || 'jopiwi5443@hosintoy.com',
    validPassword: process.env.VALID_PASSWORD || `PWpMV3Z'FpquN_4`,
    timeout: parseInt(process.env.DEFAULT_TIMEOUT) || 5000
};

export default config;
