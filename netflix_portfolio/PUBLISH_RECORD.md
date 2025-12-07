# How to Publish Your ProfileBanner Record

## The Problem

Your ProfileBanner data exists but isn't showing because the record is in **draft mode** and not published.

## Solution: Publish the Record

### Steps:

1. **Go to DatoCMS Dashboard**: https://dashboard.datocms.com/
2. **Select your project**
3. **Go to Content** (left sidebar) - NOT Models
4. **Click on "ProfileBanner"** (it's a singleton, so there's only one record)
5. **Check the top right corner** - you should see a status badge:
   - 🟡 **Draft** = Not published (this is the problem!)
   - 🟢 **Published** = Live and visible
6. **If it says "Draft":**
   - Click the **"Publish"** button (usually in the top right)
   - Or click the dropdown menu next to "Save" and select **"Publish"**
7. **After publishing:**
   - Wait 5-10 seconds
   - Refresh your React app
   - The content should now appear!

## Alternative: Check if Record Exists

If you don't see a ProfileBanner record at all:

1. Go to **Content → ProfileBanner**
2. If it's empty, click **"Create new ProfileBanner"** or **"Add ProfileBanner"**
3. Fill in all the fields:
   - Background Image (upload an image)
   - Headline
   - Resume Link (upload PDF or enter URL)
   - LinkedIn Link (enter your LinkedIn URL)
   - Profile Summary (enter your summary text)
4. **Click "Publish"** (not just "Save")
5. Wait a few seconds and refresh your app

## Important Notes:

- **Save** = Saves as draft (not visible in GraphQL)
- **Publish** = Makes it live and visible (required for GraphQL queries)
- For singletons, you need to publish the record for it to show up in your app

## Verify It's Published:

After publishing, you should see:
- A green "Published" badge
- The publish date/time
- The content should appear in your React app within 10-30 seconds


