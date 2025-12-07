// getDatoCmsToken.ts

export const getDatoCmsToken = (): string => {
  const hostname = window.location.hostname;
  let token = '';

  switch (hostname) {
    case 'ror.sumanthsamala.com':
    case 'sumanthsamala.com':
    case 'ror.localhost':
    case 'localhost':
      token = process.env.REACT_APP_DATOCMS_ROR_TOKEN ?? '';
      break;

    case 'java.sumanthsamala.com':
    case 'java.localhost':
      token = process.env.REACT_APP_DATOCMS_JAVA_TOKEN ?? '';
      break;

    case 'frontend.sumanthsamala.com':
    case 'frontend.localhost':
      token = process.env.REACT_APP_DATOCMS_FRONTEND_TOKEN ?? '';
      break;

    case 'node.sumanthsamala.com':
    case 'node.localhost':
      token = process.env.REACT_APP_DATOCMS_NODE_TOKEN ?? '';
      break;

    default:
      throw new Error(`No DatoCMS token configured for hostname: ${hostname}`);
  }

  if (!token) {
    let envVarName = 'REACT_APP_DATOCMS_ROR_TOKEN';
    if (hostname.includes('java')) envVarName = 'REACT_APP_DATOCMS_JAVA_TOKEN';
    else if (hostname.includes('frontend')) envVarName = 'REACT_APP_DATOCMS_FRONTEND_TOKEN';
    else if (hostname.includes('node')) envVarName = 'REACT_APP_DATOCMS_NODE_TOKEN';
    
    console.error('❌ DatoCMS API Token Missing!');
    console.error(`   Hostname: ${hostname}`);
    console.error(`   Expected env variable: ${envVarName}`);
    console.error('   📖 See GET_API_TOKEN.md for instructions on how to get your token');
    throw new Error(
      `DatoCMS API token is missing! Add ${envVarName} to your .env file. ` +
      `See GET_API_TOKEN.md for instructions.`
    );
  }

  return token;
};
