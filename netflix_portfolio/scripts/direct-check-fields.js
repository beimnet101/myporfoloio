/**
 * Direct Check Fields - Get fields directly by model ID
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

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

const MANAGEMENT_TOKEN = process.env.DATOCMS_MANAGEMENT_TOKEN || "825822e7245eaf10f01d1b4ca02276";

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
  const modelId = 'P0Hun--ESmCP4tirpJGOng'; // ProfileBanner ID
  
  try {
    console.log('🔍 Getting fields directly for ProfileBanner...\n');
    
    // Get fields with full details
    const response = await makeRequest('GET', `/item-types/${modelId}/fields?page[limit]=100`);
    
    console.log(`📝 Found ${response.data.length} fields:\n`);
    
    if (response.data.length === 0) {
      console.log('   ⚠️  No fields found!');
    } else {
      for (const field of response.data) {
        console.log(`   - ${field.attributes.label}`);
        console.log(`     API Key: ${field.attributes.api_key}`);
        console.log(`     Type: ${field.attributes.field_type}`);
        console.log(`     ID: ${field.id}`);
        console.log('');
      }
    }
    
    // Also check the model itself
    const modelResponse = await makeRequest('GET', `/item-types/${modelId}`);
    console.log(`\n📦 Model Info:`);
    console.log(`   Name: ${modelResponse.data.attributes.name}`);
    console.log(`   API Key: ${modelResponse.data.attributes.api_key}`);
    console.log(`   Singleton: ${modelResponse.data.attributes.singleton}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkFields();


