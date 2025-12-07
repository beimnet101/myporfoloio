import React, { useEffect, useState } from 'react';
import './ContactMe.css';
import profilePic from '../images/me.jpg';
import { FaEnvelope, FaPhoneAlt, FaCoffee, FaLinkedin } from 'react-icons/fa';
import { ContactMe as IContactMe } from '../types';
import { getContactMe } from '../queries/getContactMe';

const ContactMe: React.FC = () => {

  const [userData, setUserData] = useState<IContactMe>()

  useEffect(() => {
    async function fetchUserData() {
      const data = await getContactMe();
      setUserData(data);
    }

    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>;
const linkedInUsername = "beimnetworku";
  return (
    <div className="contact-container">
      <div className="linkedin-badge-custom">
        <img src={profilePic} alt="beimnet worku" className="badge-avatar" />
        <div className="badge-content">
          <h3 className="badge-name">{userData?.name}</h3>
          <p className="badge-title">{userData.title}</p>
          <p className="badge-description">
            {userData.summary}
          </p>
          <p className="badge-company">{"Addis Ababa"}</p>
          <a
             href={`https://www.linkedin.com/in/${linkedInUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="badge-link"
          >
            <FaLinkedin className="linkedin-icon" /> View Profile
          </a>
        </div>
      </div>
      <div className="contact-header">
        <p>I'm always up for a chat or a coffee! Feel free to reach out.</p>
      </div>
      <div className="contact-details">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <a href={`mailto:${"beimnetworku101@gmail.com"}`} className="contact-link">
            {"beimnetworku101@gmail.com"}
          </a>
        </div>
        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <a href={`tel:+251935838171`} className="contact-link">
            {251935838171}
          </a>
        </div>
        <div className="contact-fun">
          <p>Or catch up over a coffee ☕</p>
          <FaCoffee className="coffee-icon" />
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
