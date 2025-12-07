# Timeline Missing Fields

## Current Status

Only these fields exist in Timeline model:
- ✅ `name` (String)
- ✅ `title` (String)
- ✅ `position` (Int)

## Missing Fields:

1. **timelineType**
   - Type: String (with enum values: 'work', 'education')
   - API Key: `timelineType` (or might be `timelinetype` - check after creating)
   - Required: Yes
   - Values: 'work' or 'education'

2. **techStack**
   - Type: Single-line string
   - API Key: `techStack` (or might be `techstack` - check after creating)
   - Required: No (optional)

3. **summaryPoints**
   - Type: Multiple-paragraph text (or JSON field if you want array)
   - API Key: `summaryPoints` (or might be `summarypoints` - check after creating)
   - Required: No (optional)
   - Note: Currently stored as text, you can separate points with newlines

4. **dateRange**
   - Type: Single-line string
   - API Key: `dateRange` (or might be `daterange` - check after creating)
   - Required: Yes
   - Example: "Jan 2020 - Dec 2022"

## How to Create:

1. Go to DatoCMS Dashboard: https://dashboard.datocms.com/
2. Go to **Models** → **Timeline**
3. Click **"Add new field"** for each field above
4. For `timelineType`:
   - Set type to **String**
   - Add validators → Enum
   - Add values: `work` and `education`
5. **Save** each field

## After Creating Fields:

1. Wait 10-30 seconds for GraphQL schema to update
2. Check the actual field names (they might be lowercase):
   ```bash
   node scripts/check-timeline-fields.js
   ```
3. Update the query in `src/queries/getTimeline.ts` to uncomment the fields
4. Update field names if they're lowercase (e.g., `timelineType` → `timelinetype`)
5. Refresh your React app

## Current Query:

The query currently only requests `name`, `title`, and `position`. Once you create the other fields, uncomment them in the query file.


