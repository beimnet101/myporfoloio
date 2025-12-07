import React, { useEffect, useState } from 'react';
import './WorkPermit.css';
import { getWorkPermit } from '../queries/getWorkPermit';
import { WorkPermit as IWorkPermit } from '../types';
const WorkPermit: React.FC = () => {

  const [workPermitData, setWorkPermitData] = useState<IWorkPermit | null>(null);
  useEffect(() => {
    async function fetchWorkPermitData() {
      const data = await getWorkPermit();
      setWorkPermitData(data);
    }
    fetchWorkPermitData();
  }, []);

  if (!workPermitData) return <div>Loading...</div>;

  return (
    <div className="work-permit-container">
      <div className="work-permit-card">
        <h2 className="work-permit-headline">🎓 Work Permit</h2>
        <p className="work-permit-summary">
          {workPermitData.summary || 'Work permit information coming soon...'}
          {workPermitData.visaStatus && (
            <> I'm currently on a <strong>{workPermitData.visaStatus}</strong> 🛂</>
          )}
          {workPermitData.expiryDate && (
            <> My visa is valid until <strong>{new Date(workPermitData.expiryDate).toLocaleDateString()}</strong> 📅</>
          )}
        </p>
        {workPermitData.additionalInfo && (
          <p className="additional-info">{workPermitData.additionalInfo}</p>
        )}
      </div>
    </div>
  );
};

export default WorkPermit;
