/**
 * Check All WorkPermit Fields
 */

const https = require('https');

const READ_ONLY_TOKEN = process.env.REACT_APP_DATOCMS_ROR_TOKEN || "8d89eb1dcef96a7e05200708d58897";

const QUERY = `
  query {
    __type(name: "WorkPermitRecord") {
      fields {
        name
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

async function checkAllFields() {
  try {
    const response = await makeRequest(QUERY);
    const fields = response.data.__type.fields;
    
    console.log('📝 All WorkPermit Fields:\n');
    for (const field of fields) {
      if (!field.name.startsWith('_')) {
        console.log(`   - ${field.name}`);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkAllFields();


