# Rogue Debugger Software - Participant Onboarding Guide

Welcome! This guide will walk you through everything you need to set up and run the Rogue Debugger authentication server.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Clone the Repository](#step-1-clone-the-repository)
3. [Step 2: Install Dependencies](#step-2-install-dependencies)
4. [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
5. [Step 4: Set Up Port Forwarding](#step-4-set-up-port-forwarding)
6. [Step 5: Run the Server](#step-5-run-the-server)
7. [Testing Your Setup](#testing-your-setup)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/downloads)
- A **code editor** (VS Code recommended)
- Access credentials (provided by your organizer):
  - Supabase URL and Service Role Key
  - Google Service Account credentials
  - Google Sheet ID

---

## Step 1: Clone the Repository

Open your terminal (Command Prompt, PowerShell, or Terminal) and run:

```bash
git clone https://github.com/hello-lab/rogue_debugger_software.git
cd rogue_debugger_software
```

---

## Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install:
- Express (web server)
- Supabase client
- Google Sheets integration
- CORS support
- And other dependencies

---

## Step 3: Configure Environment Variables

### 3.1 Create the `.env` file

In the project root directory, copy the example file and edit it:

```bash
# On macOS/Linux:
cp .env.example .env

# On Windows:
copy .env.example .env
```

Or create a new file named `.env` manually.

### 3.2 Add Required Variables

Open the `.env` file in your code editor and add the following (replace values with credentials provided by your organizer):

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Google Sheets Configuration
GOOGLE_CLIENT_EMAIL=your_google_service_account_email_here
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here
```

**Important Notes:**
- Keep the quotes around `GOOGLE_PRIVATE_KEY`
- The `\n` characters in the private key are important - don't remove them
- Never commit this file to Git (it's already in `.gitignore`)
- Keep these credentials secure and don't share them publicly

---

## Step 4: Set Up Port Forwarding

The server runs on **port 3001** by default. If you're behind a router and need external access (or need to access the server from another device on your network), follow the instructions for your operating system:

### Why Port Forwarding?

Port forwarding allows external devices to connect to your server by routing incoming traffic from your router's public IP to your computer's local port. This is necessary if:
- You're running the frontend on a different machine
- Other team members need to access your server
- You need to test from mobile devices

### Option A: Router-Based Port Forwarding (Most Common)

This method works for accessing the server from outside your local network.

#### Step 4A.1: Find Your Local IP Address

**On Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your active network adapter (e.g., `192.168.1.100`)

**On macOS:**
```bash
ifconfig | grep "inet "
```
or go to System Preferences → Network

**On Linux:**
```bash
hostname -I
```
or
```bash
ip addr show
```

#### Step 4A.2: Access Your Router Settings

1. Open a web browser
2. Enter your router's IP address (commonly `192.168.1.1` or `192.168.0.1`)
3. Log in with your router credentials (check the router label or manual)

#### Step 4A.3: Configure Port Forwarding

1. Find the **Port Forwarding** section (may be under Advanced Settings, NAT, or Virtual Server)
2. Create a new port forwarding rule:
   - **Service Name:** Rogue Debugger Server
   - **External Port:** 3001
   - **Internal Port:** 3001
   - **Internal IP Address:** Your computer's local IP (from Step 4A.1)
   - **Protocol:** TCP (or Both)
3. Save the rule
4. Restart your router if required

#### Step 4A.4: Find Your Public IP Address

Visit [https://whatismyipaddress.com/](https://whatismyipaddress.com/) to find your public IP address.

Others can now access your server at: `http://YOUR_PUBLIC_IP:3001`

### Option B: SSH Tunneling (Alternative for Testing)

If you can't configure router port forwarding, you can use SSH tunneling (requires SSH access to another server):

```bash
ssh -R 3001:localhost:3001 user@remote-server.com
```

### Option C: Using ngrok (Quick Testing Solution)

For quick testing without router configuration:

1. Install ngrok: [https://ngrok.com/download](https://ngrok.com/download)
2. Run ngrok:
   ```bash
   ngrok http 3001
   ```
3. Use the provided public URL (e.g., `https://abc123.ngrok.io`)

**Note:** The free version of ngrok URLs expire after 2 hours.

### Firewall Configuration

Make sure your firewall allows traffic on port 3001:

**On Windows:**
1. Open Windows Defender Firewall → Advanced Settings
2. Click "Inbound Rules" → "New Rule"
3. Select "Port" → Next
4. Enter port 3001 → Allow the connection
5. Apply to all profiles → Finish

**On macOS:**
```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/node
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblockapp /path/to/node
```

**On Linux (ufw):**
```bash
sudo ufw allow 3001/tcp
sudo ufw reload
```

---

## Step 5: Run the Server

### 5.1 Start the Server

In your project directory, run:

```bash
node index.js
```

### 5.2 Verify It's Running

You should see:

```
Auth server running on http://localhost:3001
```

The server is now running and ready to accept requests!

### 5.3 Keep the Server Running

- Keep this terminal window open
- Press `Ctrl+C` to stop the server
- To run in the background, consider using:
  - **PM2:** `npm install -g pm2 && pm2 start index.js`
  - **Screen/tmux:** For Linux/macOS users
  - **Windows Services:** For persistent Windows deployment

---

## Testing Your Setup

### Test 1: Check Server Availability

Open a browser or use curl:

```bash
# Local test
curl http://localhost:3001

# External test (if port forwarding is set up)
curl http://YOUR_PUBLIC_IP:3001
```

### Test 2: Test Login Endpoint

Use curl or a tool like Postman:

```bash
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpassword"}'
```

### Test 3: Frontend Integration

If you have the frontend running on `http://localhost:8080`, it should be able to communicate with this backend server.

---

## Troubleshooting

### Problem: "Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"

**Solution:** 
- Check that your `.env` file exists in the project root
- Verify all required environment variables are set
- Make sure there are no typos in variable names

### Problem: "EADDRINUSE: address already in use"

**Solution:**
Port 3001 is already in use by another application.

**On Windows:**
```cmd
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**On macOS/Linux:**
```bash
lsof -ti:3001 | xargs kill -9
```

Or change the port in `index.js`:
```javascript
app.listen(3001, () => { // Change 3001 to another port
```

### Problem: Can't Access Server from External Network

**Solutions:**
1. Verify port forwarding rule is active in router
2. Check your firewall settings
3. Confirm you're using your public IP address (not local IP)
4. Some ISPs block port forwarding - contact your ISP if needed
5. Try using ngrok as an alternative

### Problem: CORS Errors in Browser

**Solution:**
The server is configured for `http://localhost:8080`. If your frontend runs on a different port, update `index.js`:

```javascript
const corsOptions = {
  origin: "http://localhost:YOUR_FRONTEND_PORT",
  // ...
}
```

### Problem: "Email not authorized" Error

**Solution:**
- Your email must be in the Google Sheet allowlist
- Contact your organizer to add your email
- Verify the Google Sheets credentials in `.env` are correct

### Problem: Google Sheets Authentication Fails

**Solution:**
- Check that `GOOGLE_PRIVATE_KEY` is properly formatted with `\n` characters
- Ensure the service account has access to the Google Sheet
- Verify `GOOGLE_SHEET_ID` is correct

### Getting Help

If you encounter issues not covered here:

1. Check the terminal for error messages
2. Verify all steps were followed correctly
3. Contact your team leader or organizer
4. Check the project's GitHub Issues page

---

## Next Steps

Once your server is running:

1. ✅ Test the login and registration endpoints
2. ✅ Set up the frontend application
3. ✅ Coordinate with your team
4. ✅ Start developing!

Good luck! 🚀
