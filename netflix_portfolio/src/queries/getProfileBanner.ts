// queries/getProfileBanner.ts
import datoCMSClient from './datoCMSClient';
import { ProfileBanner } from '../types';

const GET_PROFILE_BANNER = `
 {
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

export async function getProfileBanner(): Promise<ProfileBanner> {
  const data = await datoCMSClient.request<{ profilebanner: ProfileBanner }>(GET_PROFILE_BANNER);
  console.log("🚀 ~ getProfileBanner ~ data:", data)
  return data.profilebanner;
}

// Note: Currently only backgroundimage, headline, and resumeLink exist in DatoCMS
// You still need to create: linkedinLink and profileSummary fields
// Also, resumeLink should be a File type, not String
