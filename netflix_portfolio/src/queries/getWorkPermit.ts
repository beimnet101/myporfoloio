// queries/getWorkPermit.ts
import datoCMSClient from './datoCMSClient';
import { WorkPermit } from '../types';

const GET_WORK_PERMIT = `
  query {
    workPermit {
      summary
      # visaStatus, expiryDate, and additionalInfo fields need to be created in DatoCMS
      # visaStatus
      # expiryDate
      # additionalInfo
    }
  }
`;

export async function getWorkPermit(): Promise<WorkPermit> {
  // DatoCMS converts snake_case API keys to camelCase in GraphQL
  const data = await datoCMSClient.request<{ workPermit: WorkPermit }>(GET_WORK_PERMIT);
  return data.workPermit;
}
