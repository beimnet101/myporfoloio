# Manual Field Setup for ProfileBanner

Since the automated script is having issues, please create these fields manually in DatoCMS:

## Steps:

1. **Go to DatoCMS Dashboard**: https://dashboard.datocms.com/
2. **Select your project**
3. **Go to Models** (left sidebar)
4. **Click on "ProfileBanner" model**
5. **Click "Add new field"** for each field below:

### Fields to Add:

#### 1. Background Image
- **Label**: `Background Image`
- **API Key**: `backgroundImage` (auto-generated, but verify)
- **Field Type**: **File** (or **Image**)
- **Required**: ✅ Yes
- **Save**

#### 2. Resume Link  
- **Label**: `Resume Link`
- **API Key**: `resumeLink` (auto-generated, but verify)
- **Field Type**: **File**
- **Required**: ✅ Yes
- **Save**

#### 3. LinkedIn Link
- **Label**: `LinkedIn Link`
- **API Key**: `linkedinLink` (auto-generated, but verify)
- **Field Type**: **Single-line string**
- **Required**: ✅ Yes
- **Save**

#### 4. Profile Summary
- **Label**: `Profile Summary`
- **API Key**: `profileSummary` (auto-generated, but verify)
- **Field Type**: **Multiple-paragraph text**
- **Required**: ✅ Yes
- **Save**

## After Creating Fields:

1. **Wait 10-30 seconds** for the GraphQL schema to update
2. **Refresh your React app**
3. The errors should be gone!

## Verify Fields Exist:

You can verify by:
1. Going to the ProfileBanner model in DatoCMS
2. You should see all 5 fields:
   - Background Image
   - Headline (already exists)
   - Resume Link
   - LinkedIn Link
   - Profile Summary

## Important Notes:

- Make sure the **API Key** matches exactly (case-sensitive):
  - `backgroundImage` (camelCase)
  - `resumeLink` (camelCase)
  - `linkedinLink` (camelCase)
  - `profileSummary` (camelCase)

- DatoCMS will auto-generate API keys from labels, but you can edit them to match exactly.

