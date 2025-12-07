// queries/getContactMe.ts
import datoCMSClient from './datoCMSClient';
import { ContactMe } from '../types';

const GET_CONTACT_ME = `
  query {
    contactMe {
      profilepicture {
        url
      }
      name
      title
      summary
    }
  }
`;

export async function getContactMe(): Promise<ContactMe> {
  const data = await datoCMSClient.request<{ contactMe: ContactMe }>(GET_CONTACT_ME);
  return data.contactMe;
}
