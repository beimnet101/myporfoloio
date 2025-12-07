import React from 'react';
import './Blogs.css';
import { FaMedium, FaDev } from 'react-icons/fa';

const blogs = [
  {
    title: "How and Why Netflix Built a Real-Time Distributed Graph: Part 1 — Ingesting and Processing Data Streams at Internet Scale",
    platform: "Medium",
    icon: <FaMedium />,
    link: "https://netflixtechblog.com/how-and-why-netflix-built-a-real-time-distributed-graph-part-1-ingesting-and-processing-data-80113e124acc",
    description: " Adrian Taruc and James Dalton.",
  },
  {
    title: "Docker Fundas - My Version",
    platform: "Medium",
    icon: <FaMedium />,
    link: "https://medium.com/@chintusamala96/docker-fundas-my-version-7b9262bd90d4",
    description: "An introductory guide to Docker fundamentals from my perspective.",
  },
  {
    title: "Grape Gem in Ruby on Rails: Handling User Model and API Endpoint",
    platform: "Dev.to",
    icon: <FaDev />,
    link: "https://dev.to/samalasumanth0262/grape-gem-in-ruby-on-rails-handling-user-model-and-api-endpoint-g6d",
    description: "A guide to using the Grape gem for API development in Ruby on Rails.",
  },
];

const Blogs: React.FC = () => {
  return (
    <div className="blogs-container">
      <h2 className="blogs-title">✍️  Blog I found interseting</h2>

      <div className="blogs-grid">
        {blogs.map((blog, index) => (
          <a href={blog.link} key={index} target="_blank" rel="noopener noreferrer" className="blog-card" style={{ '--delay': `${index * 0.2}s` } as React.CSSProperties}>
            <div className="blog-icon animated-icon">{blog.icon}</div>
            <div className="blog-info animated-text">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
              <span className="blog-platform">{blog.platform}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
