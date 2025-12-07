// queries/getCertifications.ts
import datoCMSClient from './datoCMSClient';
import { Certification } from '../types';

const GET_CERTIFICATIONS = `
  query {
    allCertifications {
      title
      issuer
      issueddate
      link
      iconname
    }
  }
`;

export async function getCertifications(): Promise<Certification[]> {
  const data = await datoCMSClient.request<{ allCertifications: Certification[] }>(GET_CERTIFICATIONS);
  return data.allCertifications;
}
