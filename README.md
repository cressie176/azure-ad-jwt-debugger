# Azure AD JWT Debugger

A minimal REST service for validating MSAL JWT implementations. This service authenticates Azure AD tokens and returns detailed token information to help developers debug their client applications.

## Quick Start

Run directly from GitHub using npx:

```bash
npx github:cressie176/azure-ad-jwt-debugger
```

Or clone and run locally:

```bash
git clone https://github.com/cressie176/azure-ad-jwt-debugger.git
cd azure-ad-jwt-debugger
npm install

# Create .env.local file with your Azure AD configuration
touch .env.local
echo "AZURE_PORTAL_TENANT_ID=your-tenant-id" >> .env.local
echo "AZURE_PORTAL_CLIENT_ID=your-client-id" >> .env.local
echo "HTTP_SERVER_PORT=3000" >> .env.local

npm start
```

## Configuration

Create a `.env.local` file with your Azure AD configuration:

```bash
AZURE_PORTAL_TENANT_ID=your-tenant-id
AZURE_PORTAL_CLIENT_ID=your-client-id
HTTP_SERVER_PORT=3000
```

### Getting Azure AD Credentials

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory > App registrations
3. Create a new registration or use an existing one
4. Copy the Application (client) ID and Directory (tenant) ID
5. Add these values to your `.env.local` file

## API Endpoint

### POST /api/debug/token

Validates a JWT token and returns the decoded payload.

**Authentication**: Required (Bearer token in Authorization header)

**Request**:
```bash
curl -X POST http://localhost:3000/api/debug/token \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

**Response** (200 OK):
```json
{
  "authenticated": true,
  "token": {
    "oid": "user-object-id",
    "name": "User Name",
    "preferred_username": "user@example.com",
    "aud": "client-id",
    "iss": "https://login.microsoftonline.com/tenant-id/v2.0",
    "exp": 1234567890,
    "iat": 1234567890,
    "roles": ["role1", "role2"],
    "groups": ["group-id-1", "group-id-2"]
  }
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized",
  "details": "jwt expired"
}
```

## Development

```bash
npm run dev      # Start with hot reload
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run linter
npm run format   # Format code
```

## Tech Stack

- **Framework**: Hono (lightweight web framework)
- **Authentication**: jsonwebtoken + jwks-rsa
- **TypeScript**: Strict mode enabled
- **Code Quality**: Biome for linting and formatting
- **Testing**: Node.js test runner

## License

MIT
