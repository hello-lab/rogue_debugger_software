# Quick Setup Guide

For detailed instructions, see [ONBOARDING.md](ONBOARDING.md).

## 1. Install Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- Git ([download](https://git-scm.com/downloads))

## 2. Clone and Setup
```bash
git clone https://github.com/hello-lab/rogue_debugger_software.git
cd rogue_debugger_software
npm install
```

## 3. Create `.env` File
Create a file named `.env` in the project root with:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="your_private_key_here"
GOOGLE_SHEET_ID=your_sheet_id
```

## 4. Run Server
```bash
node index.js
```

Server runs on `http://localhost:3001`

## 5. Port Forwarding (Optional)
If others need to access your server:

### Quick Option: Use ngrok
```bash
# Install from https://ngrok.com/download
ngrok http 3001
```

### Router Option:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access router (usually `192.168.1.1`)
3. Forward external port 3001 to your local IP:3001

## Common Issues

**"Missing SUPABASE_URL"** → Check `.env` file exists and is configured

**"Port already in use"** → Change port in `index.js` or kill process using port 3001

**"Email not authorized"** → Contact organizer to add your email to allowlist

For more help, see [ONBOARDING.md](ONBOARDING.md#troubleshooting)
