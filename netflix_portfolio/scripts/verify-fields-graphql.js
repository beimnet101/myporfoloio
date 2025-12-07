/**
 * Verify Fields in GraphQL Schema
 * 
 * This script checks what fields are actually available in the GraphQL schema.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env file
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

const READ_ONLY_TOKEN = process.env.REACT_APP_DATOCMS_ROR_TOKEN;

if (!READ_ONLY_TOKEN) {
  console.error('❌ Error: REACT_APP_DATOCMS_ROR_TOKEN not set!');
  process.exit(1);
}

// Query GraphQL schema introspection
const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __type(name: "ProfilebannerRecord") {
      name
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;

function makeGraphQLRequest(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graphql.datocms.com',
      path: '/',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${READ_ONLY_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
          resolve(parsed);
        } catch (e) {
          reject(new Error(`Parse Error: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify({ query }));
    req.end();
  });
}

async function checkGraphQLSchema() {
  try {
    console.log('🔍 Checking GraphQL schema for ProfilebannerRecord...\n');
    
    const response = await makeGraphQLRequest(INTROSPECTION_QUERY);
    
    if (response.errors) {
      console.error('❌ GraphQL Errors:', JSON.stringify(response.errors, null, 2));
      return;
    }
    
    const type = response.data.__type;
    
    if (!type) {
      console.log('❌ ProfilebannerRecord type not found in schema');
      console.log('   This might mean the model doesn\'t exist or has no content yet.');
      return;
    }
    
    console.log(`📦 Type: ${type.name}\n`);
    console.log(`📝 Available Fields (${type.fields.length}):`);
    
    if (type.fields.length === 0) {
      console.log('   ⚠️  No fields found in GraphQL schema!');
      console.log('   This might mean:');
      console.log('   1. Fields were just created and schema needs to update');
      console.log('   2. The singleton record needs to be created first');
    } else {
      for (const field of type.fields) {
        const typeName = field.type.name || field.type.kind;
        console.log(`   - ${field.name} (${typeName})`);
      }
    }
    
    console.log('\n💡 Note: If fields are missing, try:');
    console.log('   1. Wait a few seconds for schema to update');
    console.log('   2. Create at least one record in the ProfileBanner model in DatoCMS');
    console.log('   3. Refresh your React app');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkGraphQLSchema();


