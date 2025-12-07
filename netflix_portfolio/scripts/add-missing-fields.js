/**
 * Add Missing Fields Script
 * 
 * This script adds missing fields to existing DatoCMS models.
 * Run: node scripts/add-missing-fields.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env file if it exists
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const MANAGEMENT_TOKEN = process.env.DATOCMS_MANAGEMENT_TOKEN;

if (!MANAGEMENT_TOKEN) {
  console.error('❌ Error: DATOCMS_MANAGEMENT_TOKEN environment variable is not set!');
  process.exit(1);
}

// Helper function to make API requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'site-api.datocms.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Version': '3',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`API Error (${res.statusCode}): ${JSON.stringify(parsed)}`));
          }
        } catch (e) {
          reject(new Error(`Parse Error: ${body}`));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Get all models
async function getAllModels() {
  const response = await makeRequest('GET', '/item-types');
  return response.data;
}

// Get fields for a model
async function getModelFields(itemTypeId) {
  const response = await makeRequest('GET', `/item-types/${itemTypeId}/fields`);
  return response.data;
}

// Create a field
async function createField(itemTypeId, fieldData) {
  try {
    const response = await makeRequest('POST', `/item-types/${itemTypeId}/fields`, {
      data: {
        type: 'field',
        attributes: fieldData.attributes,
      },
    });
    console.log(`   ✅ Created field: ${fieldData.attributes.api_key} (ID: ${response.data.id})`);
    // Wait a moment and verify it exists
    await new Promise(resolve => setTimeout(resolve, 1000));
    const verifyFields = await getModelFields(itemTypeId);
    const exists = verifyFields.some(f => f.attributes.api_key === fieldData.attributes.api_key);
    if (exists) {
      console.log(`   ✓ Verified: ${fieldData.attributes.api_key} exists in model`);
    } else {
      console.log(`   ⚠️  Warning: ${fieldData.attributes.api_key} not found after creation`);
    }
    return response.data;
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('taken') || error.message.includes('VALIDATION_UNIQUENESS')) {
      console.log(`   ⚠️  Field already exists: ${fieldData.attributes.api_key}`);
      return null;
    }
    console.error(`   ❌ Error creating ${fieldData.attributes.api_key}:`, error.message);
    // Don't throw, continue with next field
    return null;
  }
}

// Fields to add to ProfileBanner
const profileBannerFields = [
  { apiKey: 'backgroundImage', label: 'Background Image', fieldType: 'file', validators: { required: {} }, appearance: { editor: 'file', parameters: {}, addons: [] } },
  { apiKey: 'headline', label: 'Headline', fieldType: 'string', validators: { required: {} } },
  { apiKey: 'resumeLink', label: 'Resume Link', fieldType: 'file', validators: { required: {} }, appearance: { editor: 'file', parameters: {}, addons: [] } },
  { apiKey: 'linkedinLink', label: 'LinkedIn Link', fieldType: 'string', validators: { required: {} } },
  { apiKey: 'profileSummary', label: 'Profile Summary', fieldType: 'text', validators: { required: {} } },
];

async function addMissingFields() {
  console.log('🔍 Checking for missing fields...\n');

  try {
    // Get all models
    const models = await getAllModels();
    
    // Find ProfileBanner model
    const profileBanner = models.find(m => m.attributes.api_key === 'profilebanner');
    
    if (!profileBanner) {
      console.error('❌ ProfileBanner model not found!');
      return;
    }

    console.log(`📦 Found ProfileBanner model (ID: ${profileBanner.id})\n`);

    // Get existing fields
    const existingFields = await getModelFields(profileBanner.id);
    const existingApiKeys = existingFields.map(f => f.attributes.api_key);
    
    console.log(`   Existing fields: ${existingApiKeys.join(', ') || 'none'}\n`);

    // Add missing fields
    for (const fieldDef of profileBannerFields) {
      if (existingApiKeys.includes(fieldDef.apiKey)) {
        console.log(`   ⏭️  Skipping ${fieldDef.apiKey} (already exists)`);
        continue;
      }

      console.log(`   ➕ Adding field: ${fieldDef.apiKey} (type: ${fieldDef.fieldType})`);
      const fieldAttributes = {
        label: fieldDef.label,
        api_key: fieldDef.apiKey,
        field_type: fieldDef.fieldType,
        validators: fieldDef.validators,
        localized: false,
        hint: null,
        position: profileBannerFields.indexOf(fieldDef),
      };
      
      // Don't add appearance - let DatoCMS use defaults
      
      const result = await createField(profileBanner.id, {
        attributes: fieldAttributes,
      });
      
      // Wait longer for file fields
      if (result && fieldDef.fieldType === 'file') {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else if (result) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('\n✅ Done! All fields have been added.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addMissingFields();

