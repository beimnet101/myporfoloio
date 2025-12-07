# WorkPermit Missing Fields

## Current Status

Only `summary` field exists in WorkPermit model. The following fields need to be created:

## Missing Fields:

1. **visaStatus**
   - Type: Single-line string
   - API Key: `visaStatus` (or might be `visastatus` - check after creating)
   - Required: Yes

2. **expiryDate**
   - Type: Date
   - API Key: `expiryDate` (or might be `expirydate` - check after creating)
   - Required: Yes

3. **additionalInfo**
   - Type: Multiple-paragraph text
   - API Key: `additionalInfo` (or might be `additionalinfo` - check after creating)
   - Required: No (optional)

## How to Create:

1. Go to DatoCMS Dashboard: https://dashboard.datocms.com/
2. Go to **Models** → **WorkPermit**
3. Click **"Add new field"** for each field above
4. Set the field types and API keys as specified
5. **Save** each field

## After Creating Fields:

1. Wait 10-30 seconds for GraphQL schema to update
2. Check the actual field names (they might be lowercase):
   ```bash
   node scripts/check-all-workpermit-fields.js
   ```
3. Update the query in `src/queries/getWorkPermit.ts` to uncomment the fields
4. Update field names if they're lowercase (e.g., `visaStatus` → `visastatus`)
5. Refresh your React app

## Current Query:

The query currently only requests `summary`. Once you create the other fields, uncomment them in the query file.


