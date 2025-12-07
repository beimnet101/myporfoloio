import React, { useEffect, useState } from 'react';
import './ProfileBanner.css';
import PlayButton from '../components/PlayButton';
import MoreInfoButton from '../components/MoreInfoButton';
import { getProfileBanner } from '../queries/getProfileBanner';
import { ProfileBanner as ProfileBannerType } from '../types';

const ProfileBanner: React.FC = () => {


  const [bannerData, setBannerData] = useState<ProfileBannerType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfileBanner();
        console.log('📦 ProfileBanner data received:', data);
        console.log('📝 Profile Summary:', data.profilesummary);
        setBannerData(data);
      } catch (error) {
        console.error('❌ Error fetching ProfileBanner:', error);
      }
    }
    fetchData();
  }, []);

  if (!bannerData) return <div>Loading...</div>;

const handlePlayClick = () => {
  let resumeUrl: string | undefined;

  if (bannerData.resumeLink) {
    if (typeof bannerData.resumeLink === 'string') {
      const trimmed = bannerData.resumeLink.trim();
      // only use it if non-empty
      if (trimmed !== '') {
        resumeUrl = trimmed.startsWith('http')
          ? trimmed
          : `https://${trimmed}`;
      }
    } else if (bannerData.resumeLink.url) {
      const trimmedUrl = bannerData.resumeLink.url.trim();
      if (trimmedUrl !== '') {
        resumeUrl = trimmedUrl;
      }
    }
  }

  // fallback URL if nothing valid
  if (!resumeUrl) {
    resumeUrl = 'https://salmon-inge-16.tiiny.site';
  }

  // Open safely
  window.open(resumeUrl, '_blank');
};

  const handleLinkedinClick = () => { 
    const linkedinUrl = 'https://www.linkedin.com/in/beimnetworku'|| '#';
    window.open(linkedinUrl, '_blank');
  }

  return (
    <div className="profile-banner">
      <div className="banner-content">
        <h1 className="banner-headline" id='headline'>{bannerData.headline}</h1>
        <p className="banner-description">
          {bannerData.profilesummary || 'Profile summary coming soon...'}
        </p>

        <div className="banner-buttons">
          <PlayButton onClick={handlePlayClick} label="Resume" />
          <MoreInfoButton onClick={handleLinkedinClick} label="Linkedin" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
