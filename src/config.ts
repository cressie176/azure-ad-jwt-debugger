import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.local' });

export const config = {
  tenantId: process.env.AZURE_PORTAL_TENANT_ID!,
  clientId: process.env.AZURE_PORTAL_CLIENT_ID!,
  port: Number(process.env.HTTP_SERVER_PORT) || 3000,
};

if (!config.tenantId || !config.clientId) {
  throw new Error(
    'Missing required environment variables: AZURE_PORTAL_TENANT_ID and AZURE_PORTAL_CLIENT_ID',
  );
}
