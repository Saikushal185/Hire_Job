# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** create a public GitHub issue
2. Email the maintainers directly
3. Include detailed steps to reproduce the vulnerability
4. Allow time for us to address the issue before public disclosure

## Security Best Practices

### Authentication
- All authentication is handled through Supabase
- Sessions are JWT-based with automatic refresh
- Passwords are hashed using bcrypt by Supabase

### Data Protection
- User data is encrypted at rest in Supabase
- HTTPS is enforced in production
- API keys are never exposed to the client

### Recommended Security Headers

When deploying, configure these security headers:

```
# Content Security Policy
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';

# Prevent clickjacking
X-Frame-Options: DENY

# Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# Enable XSS filter
X-XSS-Protection: 1; mode=block

# HTTPS only
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### For Vercel Deployment

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

## Dependencies

- Regularly update dependencies: `npm audit fix`
- Review security advisories on GitHub
- Use Dependabot for automated updates

## Environment Variables

- Never commit `.env` files
- Use `.env.example` as a template
- Rotate API keys periodically
