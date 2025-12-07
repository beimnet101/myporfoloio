/**
 * DatoCMS Models Setup Script
 * 
 * This script creates all required content models in DatoCMS using the Management API.
 * 
 * Requirements:
 * 1. You need a Full-access API token (not read-only)
 * 2. Get it from: DatoCMS Dashboard > Settings > API tokens > Create new token (Full-access)
 * 3. Set it as: DATOCMS_MANAGEMENT_TOKEN in your .env file
 * 
 * Run: npm run setup-datocms
 * Or: node scripts/setup-datocms-models.js
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

// Get the management token from environment variable
const MANAGEMENT_TOKEN = process.env.DATOCMS_MANAGEMENT_TOKEN;

if (!MANAGEMENT_TOKEN) {
  console.error('❌ Error: DATOCMS_MANAGEMENT_TOKEN environment variable is not set!');
  console.error('   Get a Full-access token from: https://dashboard.datocms.com/');
  console.error('   Add it to your .env file as: DATOCMS_MANAGEMENT_TOKEN=your_token_here');
  process.exit(1);
}

const MANAGEMENT_API_URL = 'https://site-api.datocms.com';

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

// Create a model
async function createModel(modelData) {
  try {
    const response = await makeRequest('POST', '/item-types', {
      data: {
        type: 'item_type',
        attributes: modelData.attributes,
      },
    });
    console.log(`✅ Created model: ${modelData.attributes.api_key}`);
    return response.data;
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('taken')) {
      console.log(`⚠️  Model already exists: ${modelData.attributes.api_key}`);
      // Try to get existing model
      try {
        const allModels = await makeRequest('GET', '/item-types');
        const existing = allModels.data.find(m => m.attributes.api_key === modelData.attributes.api_key);
        if (existing) return existing;
      } catch (e) {
        // Ignore
      }
    }
    throw error;
  }
}

// Create a field in a model
async function createField(itemTypeId, fieldData) {
  try {
    const response = await makeRequest('POST', `/item-types/${itemTypeId}/fields`, {
      data: {
        type: 'field',
        attributes: fieldData.attributes,
      },
    });
    console.log(`   ✅ Created field: ${fieldData.attributes.api_key}`);
    return response.data;
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('taken')) {
      console.log(`   ⚠️  Field already exists: ${fieldData.attributes.api_key}`);
      return null;
    }
    throw error;
  }
}

// Model definitions
const models = [
  {
    name: 'ProfileBanner',
    apiKey: 'profilebanner',
    singleton: true,
    fields: [
      { apiKey: 'backgroundImage', label: 'Background Image', fieldType: 'file', validators: { required: {} } },
      { apiKey: 'headline', label: 'Headline', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'resumeLink', label: 'Resume Link', fieldType: 'file', validators: { required: {} } },
      { apiKey: 'linkedinLink', label: 'LinkedIn Link', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'profileSummary', label: 'Profile Summary', fieldType: 'text', validators: { required: {} } },
    ],
  },
  {
    name: 'WorkPermit',
    apiKey: 'work_permit',
    singleton: true,
    fields: [
      { apiKey: 'visaStatus', label: 'Visa Status', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'expiryDate', label: 'Expiry Date', fieldType: 'date', validators: { required: {} } },
      { apiKey: 'summary', label: 'Summary', fieldType: 'text', validators: { required: {} } },
      { apiKey: 'additionalInfo', label: 'Additional Info', fieldType: 'text', validators: {} },
    ],
  },
  {
    name: 'Timeline',
    apiKey: 'timeline',
    singleton: false,
    fields: [
      { apiKey: 'name', label: 'Name', fieldType: 'string', validators: { required: {} } },
      { 
        apiKey: 'timelineType', 
        label: 'Timeline Type', 
        fieldType: 'string', 
        validators: { 
          required: {},
          enum: {
            values: ['work', 'education']
          }
        } 
      },
      { apiKey: 'title', label: 'Title', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'techStack', label: 'Tech Stack', fieldType: 'string', validators: {} },
      { apiKey: 'summaryPoints', label: 'Summary Points', fieldType: 'text', validators: { required: {} } },
      { apiKey: 'dateRange', label: 'Date Range', fieldType: 'string', validators: { required: {} } },
    ],
  },
  {
    name: 'Project',
    apiKey: 'project',
    singleton: false,
    fields: [
      { apiKey: 'title', label: 'Title', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'description', label: 'Description', fieldType: 'text', validators: { required: {} } },
      { apiKey: 'techUsed', label: 'Tech Used', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'image', label: 'Image', fieldType: 'file', validators: { required: {} } },
    ],
  },
  {
    name: 'Certification',
    apiKey: 'certification',
    singleton: false,
    fields: [
      { apiKey: 'title', label: 'Title', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'issuer', label: 'Issuer', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'issuedDate', label: 'Issued Date', fieldType: 'date', validators: { required: {} } },
      { apiKey: 'link', label: 'Link', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'iconName', label: 'Icon Name', fieldType: 'string', validators: {} },
    ],
  },
  {
    name: 'ContactMe',
    apiKey: 'contact_me',
    singleton: true,
    fields: [
      { apiKey: 'profilePicture', label: 'Profile Picture', fieldType: 'file', validators: { required: {} } },
      { apiKey: 'name', label: 'Name', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'title', label: 'Title', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'summary', label: 'Summary', fieldType: 'text', validators: { required: {} } },
      { apiKey: 'companyUniversity', label: 'Company/University', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'linkedinLink', label: 'LinkedIn Link', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'email', label: 'Email', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'phoneNumber', label: 'Phone Number', fieldType: 'string', validators: {} },
    ],
  },
  {
    name: 'Skill',
    apiKey: 'skill',
    singleton: false,
    fields: [
      { apiKey: 'name', label: 'Name', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'category', label: 'Category', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'description', label: 'Description', fieldType: 'text', validators: {} },
      { apiKey: 'icon', label: 'Icon', fieldType: 'string', validators: {} },
    ],
  },
  {
    name: 'Book',
    apiKey: 'book',
    singleton: false,
    fields: [
      { apiKey: 'title', label: 'Title', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'author', label: 'Author', fieldType: 'string', validators: { required: {} } },
      { apiKey: 'description', label: 'Description', fieldType: 'text', validators: { required: {} } },
      { apiKey: 'image', label: 'Image', fieldType: 'file', validators: { required: {} } },
    ],
  },
];

// Main setup function
async function setupModels() {
  console.log('🚀 Starting DatoCMS models setup...\n');

  for (const modelDef of models) {
    try {
      console.log(`\n📦 Creating model: ${modelDef.name} (${modelDef.apiKey})`);
      
      // Create the model
      const model = await createModel({
        attributes: {
          name: modelDef.name,
          api_key: modelDef.apiKey,
          singleton: modelDef.singleton,
          sortable: !modelDef.singleton,
        },
      });

      const itemTypeId = model.id;

      // Create fields
      for (const fieldDef of modelDef.fields) {
        await createField(itemTypeId, {
          attributes: {
            label: fieldDef.label,
            api_key: fieldDef.apiKey,
            field_type: fieldDef.fieldType,
            validators: fieldDef.validators,
            localized: false,
            hint: null,
            position: modelDef.fields.indexOf(fieldDef),
          },
        });
      }

      console.log(`✅ Completed: ${modelDef.name}\n`);
    } catch (error) {
      console.error(`❌ Error creating ${modelDef.name}:`, error.message);
      console.error('   Continuing with next model...\n');
    }
  }

  console.log('\n🎉 Setup complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Go to https://dashboard.datocms.com/');
  console.log('   2. Add content to your models');
  console.log('   3. Create a Read-only API token for your .env file');
}

// Run the setup
setupModels().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

