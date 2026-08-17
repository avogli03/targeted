export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "targeted-admin-secret")
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "targeted-api-token-salt")
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "targeted-transfer-token-salt")
    }
  }
});
