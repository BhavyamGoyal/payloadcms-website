# Environment Configuration

This project uses **Zod** for environment variable validation and type safety. All environment variables are validated at startup to ensure your application runs with the correct configuration.

## 🔧 Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update the values in `.env.local`** with your actual configuration

## 📝 Environment Variables

### Required Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URI` | MongoDB connection string | `mongodb://localhost:27017/payload-marketing` | ✅ |
| `PAYLOAD_SECRET` | Payload CMS secret key (min 32 chars) | Auto-generated | ✅ |

### Optional Variables

#### **Development**
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `NEXT_PUBLIC_SERVER_URL` | Public server URL | `http://localhost:3000` |

#### **Security**
| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | JWT signing secret (min 32 chars) | Auto-generated |
| `CRON_SECRET` | Secret for scheduled job access | - |
| `CORS_ORIGIN` | CORS allowed origins | `*` |

#### **AWS S3 Storage**
| Variable | Description | Default |
|----------|-------------|---------|
| `S3_BUCKET` | S3 bucket name | - |
| `S3_ACCESS_KEY_ID` | AWS access key | - |
| `S3_SECRET_ACCESS_KEY` | AWS secret key | - |
| `S3_REGION` | AWS region | `us-east-1` |
| `S3_ENDPOINT` | Custom S3 endpoint (for S3-compatible services) | - |

#### **Email**
| Variable | Description | Default |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server host | - |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username | - |
| `SMTP_PASS` | SMTP password | - |
| `FROM_EMAIL` | Default sender email | - |
| `FROM_NAME` | Default sender name | - |

#### **Analytics**
| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_ANALYTICS_ID` | Google Analytics tracking ID | - |

#### **Feature Flags**
| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_LIVE_PREVIEW` | Enable live preview functionality | `true` |
| `ENABLE_DRAFT_MODE` | Enable draft mode | `true` |

## 💻 Usage in Code

### Importing Configuration
```typescript
import { config, isDev, isProd } from '../config/env'

// Use validated environment variables
const dbUrl = config.DATABASE_URI
const isProduction = isProd
```

### Type Safety
The configuration is fully typed using Zod inference:
```typescript
import type { Config } from '../config/env'

const useConfig = (): Config => {
  return config // Fully typed!
}
```

### Runtime Validation
Environment variables are validated at application startup. If any required variables are missing or invalid, the application will throw detailed error messages:

```bash
ZodError: [
  {
    "code": "too_small",
    "minimum": 32,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "PAYLOAD_SECRET must be at least 32 characters",
    "path": ["PAYLOAD_SECRET"]
  }
]
```

## 🚀 Production Setup

### 1. Generate Secure Secrets
```bash
# Generate a secure payload secret
openssl rand -base64 32

# Generate a secure JWT secret  
openssl rand -base64 32
```

### 2. Database
Set up your MongoDB instance and update `DATABASE_URI`:
```env
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/payload-marketing
```

### 3. AWS S3 (Optional)
If using S3 for media storage:
```env
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=us-east-1
```

### 4. Email (Optional)
For transactional emails:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Your App Name
```

## 🔍 Validation Features

- **Type Safety**: All environment variables are properly typed
- **Runtime Validation**: Invalid configurations fail fast with clear error messages
- **Default Values**: Sensible defaults for optional variables
- **Transformations**: Automatic type conversion (string to number, boolean parsing)
- **Validation Rules**: Minimum lengths for secrets, URL validation, email validation

## 🛠️ Development Tips

1. **Never commit `.env.local`** - it's already in `.gitignore`
2. **Use `.env.example`** as a template for new team members
3. **Generate new secrets** for each environment (dev, staging, prod)
4. **Check validation errors** on startup - they provide helpful guidance

## 📚 Further Reading

- [Zod Documentation](https://zod.dev/)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Payload CMS Configuration](https://payloadcms.com/docs/configuration/overview)