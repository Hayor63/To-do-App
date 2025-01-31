export default {
  port: process.env.PORT,
  dbURI:
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_URL
      : process.env.NODE_ENV === "test"
      ? process.env.TEST
      : process.env.DB,
  accessTokenPrivateKey: process.env.ACCESSTOKEN,
  refreshTokenPrivateKey: process.env.REFRESHTOKEN,
  BREVO_MAIL_KEY: process.env.BREVO_MAIL_KEY,
  HOST: process.env.HOST,
  BREVO_PORT: process.env.BREVO_PORT,
  USER_MAIL_LOGIN: process.env.USER_MAIL_LOGIN,
  BASE_URL: process.env.BASE_URL, // ✅ Ensure this line exists
};