/**
 * Test ProfileBanner Query
 */

const https = require('https');

const READ_ONLY_TOKEN = process.env.REACT_APP_DATOCMS_ROR_TOKEN || "8d89eb1dcef96a7e05200708d58897";

const QUERY = `
  query {
    profilebanner {
      backgroundimage {
        url
      }
      headline
      resumeLink
      linkedinlink
      profilesummary
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

async function testQuery() {
  try {
    console.log('🔍 Testing ProfileBanner query...\n');
    
    const response = await makeRequest(QUERY);
    
    if (response.errors) {
      console.error('❌ GraphQL Errors:');
      console.error(JSON.stringify(response.errors, null, 2));
      return;
    }
    
    const data = response.data.profilebanner;
    
    if (!data) {
      console.log('❌ No profilebanner data returned!');
      console.log('   This means the singleton record doesn\'t exist or isn\'t published.');
      console.log('\n💡 Solution:');
      console.log('   1. Go to DatoCMS dashboard');
      console.log('   2. Go to ProfileBanner model');
      console.log('   3. Create/save a record (singletons need at least one record)');
      console.log('   4. Make sure it\'s published (not in draft)');
      return;
    }
    
    console.log('✅ ProfileBanner data found:\n');
    console.log('   headline:', data.headline || '(empty)');
    console.log('   profilesummary:', data.profilesummary || '(empty)');
    console.log('   linkedinlink:', data.linkedinlink || '(empty)');
    console.log('   resumeLink:', data.resumeLink || '(empty)');
    console.log('   backgroundimage:', data.backgroundimage?.url || '(empty)');
    
    if (!data.profilesummary) {
      console.log('\n⚠️  profilesummary is empty!');
      console.log('   Make sure you:');
      console.log('   1. Added content to the Profile Summary field in DatoCMS');
      console.log('   2. Saved the record');
      console.log('   3. Published the record (not in draft mode)');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testQuery();


