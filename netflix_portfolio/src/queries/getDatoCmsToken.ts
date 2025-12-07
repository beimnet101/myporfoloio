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
      // Use the localhost ROR token as default
      token = process.env.REACT_APP_DATOCMS_ROR_TOKEN ?? '';
      console.warn(`⚠️ Hostname "${hostname}" not recognized. Using default localhost token.`);
      break;
  }

  if (!token) {
    console.error('❌ DatoCMS API Token Missing!');
    console.error(`   Hostname: ${hostname}`);
    console.error('   Expected a valid env variable for this hostname.');
    console.error('   📖 See GET_API_TOKEN.md for instructions on how to get your token');
    throw new Error(`DatoCMS API token is missing! Add the correct env variable to your .env file.`);
  }

  return token;
};

