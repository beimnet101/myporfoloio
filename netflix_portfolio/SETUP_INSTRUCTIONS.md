# 🚀 Automated DatoCMS Setup Instructions

I've created an automated script to set up all your DatoCMS models! Follow these steps:

## Step 1: Get Your Management API Token

1. Go to **DatoCMS Dashboard**: https://dashboard.datocms.com/
2. Select your project (or create a new one)
3. Go to **Settings → API tokens**
4. Click **"Create new token"**
5. Select **"Full-access"** (not read-only - this is needed to create models)
6. Copy the token

## Step 2: Add Token to Environment

Add the management token to your `.env` file:

```bash
DATOCMS_MANAGEMENT_TOKEN=your_full_access_token_here
```

**Important:** This is different from the read-only tokens. You need a **Full-access** token to run the setup script.

## Step 3: Run the Setup Script

Run the automated setup script:

```bash
node scripts/setup-datocms-models.js
```

The script will:
- ✅ Create all 7 content models (ProfileBanner, WorkPermit, Timeline, Project, Certification, ContactMe, Skill)
- ✅ Create all fields with correct types
- ✅ Set up validations (required fields, enums, etc.)
- ✅ Handle errors gracefully (won't break if models already exist)

## Step 4: Get Read-Only Tokens for Your App

After models are created:

1. Go back to **Settings → API tokens** in DatoCMS
2. Create **Read-only** tokens (one for each subdomain if needed)
3. Add them to your `.env` file:
   ```
   REACT_APP_DATOCMS_ROR_TOKEN=your_read_only_token
   REACT_APP_DATOCMS_JAVA_TOKEN=your_read_only_token
   REACT_APP_DATOCMS_FRONTEND_TOKEN=your_read_only_token
   REACT_APP_DATOCMS_NODE_TOKEN=your_read_only_token
   ```

## Step 5: Add Content

1. Go to your DatoCMS dashboard
2. You'll see all the models created
3. Add your content to each model:
   - **ProfileBanner** - Add your hero section content
   - **WorkPermit** - Add visa/work permit info
   - **Timeline** - Add work experience and education entries
   - **Project** - Add your portfolio projects
   - **Certification** - Add your certifications
   - **ContactMe** - Add your contact information
   - **Skill** - Add your skills

## Troubleshooting

### "DATOCMS_MANAGEMENT_TOKEN not set"
- Make sure you added the token to your `.env` file
- Restart your terminal/command prompt after adding it

### "API Error 401"
- Your token might be invalid or expired
- Make sure you're using a **Full-access** token, not read-only

### "Model already exists"
- This is fine! The script will skip existing models
- You can run it multiple times safely

### Script fails partway through
- Check the error message
- You can run the script again - it will skip already-created models
- If a specific model fails, you can create it manually in the DatoCMS dashboard

## Manual Setup Alternative

If the script doesn't work, you can set up models manually using the guide in `DATOCMS_SETUP.md`.

## What Gets Created

The script creates these 7 models:

1. **ProfileBanner** (Singleton) - Hero banner with background, headline, resume
2. **WorkPermit** (Singleton) - Visa status and work permit info
3. **Timeline** (Collection) - Work experience and education
4. **Project** (Collection) - Portfolio projects
5. **Certification** (Collection) - Certifications
6. **ContactMe** (Singleton) - Contact information
7. **Skill** (Collection) - Skills by category

All fields are created with the correct types and validations to match your React app's queries!


