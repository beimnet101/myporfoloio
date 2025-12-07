/**
 * Check Fields Script
 * 
 * This script checks what fields exist in your DatoCMS models.
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

async function checkFields() {
  try {
    // Get all models
    const modelsResponse = await makeRequest('GET', '/item-types');
    const models = modelsResponse.data;
    
    console.log('📋 All Models:\n');
    for (const model of models) {
      console.log(`  - ${model.attributes.name} (API Key: ${model.attributes.api_key}, ID: ${model.id})`);
    }
    
    // Find ProfileBanner
    const profileBanner = models.find(m => m.attributes.api_key === 'profilebanner');
    
    if (!profileBanner) {
      console.log('\n❌ ProfileBanner model not found!');
      return;
    }
    
    console.log(`\n📦 ProfileBanner Model:`);
    console.log(`   ID: ${profileBanner.id}`);
    console.log(`   Name: ${profileBanner.attributes.name}`);
    console.log(`   API Key: ${profileBanner.attributes.api_key}`);
    console.log(`   Singleton: ${profileBanner.attributes.singleton}`);
    
    // Get fields
    const fieldsResponse = await makeRequest('GET', `/item-types/${profileBanner.id}/fields`);
    const fields = fieldsResponse.data;
    
    console.log(`\n📝 Fields (${fields.length} total):`);
    if (fields.length === 0) {
      console.log('   ⚠️  No fields found!');
    } else {
      for (const field of fields) {
        console.log(`   - ${field.attributes.label} (API Key: ${field.attributes.api_key}, Type: ${field.attributes.field_type})`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkFields();


