/**
 * Check Timeline Fields in GraphQL
 */

const https = require('https');

const READ_ONLY_TOKEN = process.env.REACT_APP_DATOCMS_ROR_TOKEN || "8d89eb1dcef96a7e05200708d58897";

const QUERY = `
  query {
    __type(name: "TimelineRecord") {
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
`;

function makeRequest(query) {
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
          resolve(JSON.parse(body));
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

async function checkFields() {
  try {
    const response = await makeRequest(QUERY);
    const type = response.data.__type;
    
    if (!type) {
      console.log('❌ TimelineRecord type not found');
      return;
    }
    
    console.log('📝 Timeline Fields:\n');
    for (const field of type.fields) {
      if (!field.name.startsWith('_')) {
        const typeName = field.type.name || field.type.ofType?.name || field.type.kind;
        console.log(`   ${field.name}: ${typeName}`);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkFields();


