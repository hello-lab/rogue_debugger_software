# Rogue Debugger Software

Authentication server for the Rogue Debugger project.

## 🚀 Quick Start

**New participant?** We have two guides for you:

👉 **[QUICKSTART.md](QUICKSTART.md)** - Fast setup (5 minutes)  
👉 **[ONBOARDING.md](ONBOARDING.md)** - Complete guide with detailed explanations

The comprehensive onboarding guide covers:
- Prerequisites and installation
- Environment configuration
- Port forwarding setup (Windows, macOS, Linux)
- Running the server
- Testing and troubleshooting

## What This Does

This is an Express-based authentication server that:
- Provides login and registration endpoints
- Integrates with Supabase for user management
- Uses Google Sheets for email allowlisting
- Runs on port 3001 by default

## Quick Commands

```bash
# Install dependencies
npm install

# Run the server
node index.js
```

## Project Structure

```
.
├── index.js        # Main server file
├── supabase.js     # Supabase client configuration
├── allowlist.js    # Google Sheets allowlist checker
├── package.json    # Dependencies
└── .env            # Environment variables (you create this)
```

## Support

Need help? Check the [troubleshooting section](ONBOARDING.md#troubleshooting) in the onboarding guide.
