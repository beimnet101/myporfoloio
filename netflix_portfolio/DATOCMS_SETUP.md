# DatoCMS Content Models Setup Guide

This guide shows you exactly what content models (APIs/Content Types) you need to create in DatoCMS for your Netflix portfolio.

## 📋 Content Models to Create

You need to create **7 content models** in DatoCMS:

---

## 1. **ProfileBanner** (Singleton Model)
**Type:** Singleton (only one instance exists)

**Fields:**
- `backgroundImage` - **Image** field (required)
- `headline` - **Text** field (single line, required)
- `resumeLink` - **File** field (required) - for PDF resume
- `linkedinLink` - **Text** field (single line, required) - URL
- `profileSummary` - **Text** field (multiple paragraphs, required)

**API ID:** `profilebanner` (must match exactly)

---

## 2. **WorkPermit** (Singleton Model)
**Type:** Singleton (only one instance exists)

**Fields:**
- `visaStatus` - **Text** field (single line, required)
- `expiryDate` - **Date** field (required)
- `summary` - **Text** field (multiple paragraphs, required)
- `additionalInfo` - **Text** field (multiple paragraphs, optional)

**API ID:** `workPermit` (must match exactly)

---

## 3. **Timeline** (Collection Model)
**Type:** Collection (multiple items)

**Fields:**
- `name` - **Text** field (single line, required) - Company/University name
- `timelineType` - **String** field (required) with options:
  - `work`
  - `education`
- `title` - **Text** field (single line, required) - Job title or degree
- `techStack` - **Text** field (single line, optional) - Technologies used
- `summaryPoints` - **Text** field (multiple paragraphs, required) - Array of bullet points (you can use newlines to separate)
- `dateRange` - **Text** field (single line, required) - e.g., "Jan 2020 - Dec 2022"

**API ID:** `timeline` (DatoCMS will pluralize to `allTimelines`)

---

## 4. **Project** (Collection Model)
**Type:** Collection (multiple items)

**Fields:**
- `title` - **Text** field (single line, required)
- `description` - **Text** field (multiple paragraphs, required)
- `techUsed` - **Text** field (single line, required) - Technologies separated by commas
- `image` - **Image** field (required)

**API ID:** `project` (DatoCMS will pluralize to `allProjects`)

**Ordering:** The query orders by `title_ASC`, so you can set default ordering in DatoCMS.

---

## 5. **Certification** (Collection Model)
**Type:** Collection (multiple items)

**Fields:**
- `title` - **Text** field (single line, required)
- `issuer` - **Text** field (single line, required) - Organization that issued it
- `issuedDate` - **Date** field (required)
- `link` - **Text** field (single line, required) - URL to certification
- `iconName` - **Text** field (single line, optional) - Icon identifier

**API ID:** `certification` (DatoCMS will pluralize to `allCertifications`)

---

## 6. **ContactMe** (Singleton Model)
**Type:** Singleton (only one instance exists)

**Fields:**
- `profilePicture` - **Image** field (required)
- `name` - **Text** field (single line, required)
- `title` - **Text** field (single line, required) - Job title
- `summary` - **Text** field (multiple paragraphs, required)
- `companyUniversity` - **Text** field (single line, required)
- `linkedinLink` - **Text** field (single line, required) - URL
- `email` - **Text** field (single line, required) - Email address
- `phoneNumber` - **Text** field (single line, optional) - Phone number

**API ID:** `contactMe` (must match exactly)

---

## 7. **Skill** (Collection Model)
**Type:** Collection (multiple items)

**Fields:**
- `name` - **Text** field (single line, required) - Skill name
- `category` - **Text** field (single line, required) - e.g., "Frontend", "Backend", "Database"
- `description` - **Text** field (multiple paragraphs, optional)
- `icon` - **Text** field (single line, optional) - Icon identifier or URL

**API ID:** `skill` (DatoCMS will pluralize to `allSkills`)

**Ordering:** The query orders by `category_ASC`, so you can set default ordering in DatoCMS.

---

## 🚀 Step-by-Step Setup in DatoCMS

1. **Go to DatoCMS Dashboard:** https://dashboard.datocms.com/
2. **Create or select your project**
3. **Go to Models** (left sidebar)
4. **For each model above:**
   - Click "Add new model"
   - Set the **API ID** exactly as specified
   - Choose **Singleton** or **Collection** type
   - Add all fields with correct types
   - Set required/optional as indicated
5. **Add content** to each model
6. **Get API Token:**
   - Go to **Settings → API tokens**
   - Create a **Read-only** token
   - Copy it to your `.env` file

---

## 📝 Important Notes

- **API IDs must match exactly** (case-sensitive)
- **Singleton models** have only one record (ProfileBanner, WorkPermit, ContactMe)
- **Collection models** can have multiple records (Timeline, Project, Certification, Skill)
- For **Text fields with multiple paragraphs**, use "Multiple paragraphs" option in DatoCMS
- For **summaryPoints** in Timeline, you can use a textarea and separate points with newlines, or use a JSON field if you prefer structured arrays

---

## 🔍 Testing Your Setup

After creating the models and adding content:

1. Make sure your `.env` file has the correct API token
2. Run `npm start`
3. Check the browser console for any GraphQL errors
4. The app should fetch and display your data from DatoCMS


