import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const projects: Project[] = [
    // Web Development Projects
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web-development',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      description: 'A full-featured e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Socket.io'],
      features: ['Real-time inventory', 'Payment processing', 'Admin dashboard', 'Order tracking', 'Customer reviews'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      category: 'web-development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'A comprehensive SaaS dashboard with advanced data visualization, user management, and subscription handling built with Next.js and TypeScript.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Chart.js'],
      features: ['Data visualization', 'User management', 'Subscription billing', 'API integration', 'Real-time updates'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Learning Management System',
      category: 'web-development',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      description: 'An interactive learning platform with video streaming, progress tracking, and collaborative features for educational institutions.',
      technologies: ['React', 'Express.js', 'MySQL', 'AWS S3', 'WebRTC'],
      features: ['Video streaming', 'Progress tracking', 'Interactive quizzes', 'Discussion forums', 'Certificate generation'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Real Estate Portal',
      category: 'web-development',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      description: 'A modern real estate platform with advanced search filters, virtual tours, and integrated CRM for property management.',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps API', 'Cloudinary'],
      features: ['Advanced search', 'Virtual tours', 'CRM integration', 'Property comparison', 'Mortgage calculator'],
      liveUrl: '#',
      githubUrl: '#'
    },

    // Mobile App Development Projects
    {
      id: 5,
      title: 'Fitness Tracking App',
      category: 'mobile-development',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      description: 'A comprehensive fitness app with workout tracking, nutrition planning, and social features built with React Native.',
      technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit', 'Google Fit'],
      features: ['Workout tracking', 'Nutrition planning', 'Social features', 'Progress analytics', 'Wearable integration'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Food Delivery App',
      category: 'mobile-development',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
      description: 'A full-stack food delivery application with real-time tracking, payment integration, and restaurant management system.',
      technologies: ['Flutter', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe'],
      features: ['Real-time tracking', 'Payment integration', 'Restaurant dashboard', 'Order management', 'Push notifications'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 7,
      title: 'Banking Mobile App',
      category: 'mobile-development',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      description: 'A secure banking application with biometric authentication, transaction history, and financial planning tools.',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Biometric Auth'],
      features: ['Biometric login', 'Transaction history', 'Bill payments', 'Financial planning', 'Security alerts'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 8,
      title: 'Social Media App',
      category: 'mobile-development',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
      description: 'A feature-rich social media platform with photo sharing, stories, messaging, and live streaming capabilities.',
      technologies: ['React Native', 'Firebase', 'WebRTC', 'Cloudinary', 'Push Notifications'],
      features: ['Photo sharing', 'Stories', 'Live streaming', 'Direct messaging', 'Social feeds'],
      liveUrl: '#',
      githubUrl: '#'
    },

    // Digital Marketing Projects
    {
      id: 9,
      title: 'E-commerce SEO Campaign',
      category: 'digital-marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description: 'Comprehensive SEO strategy that increased organic traffic by 300% and improved conversion rates for a major e-commerce client.',
      technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Google Search Console', 'Schema Markup'],
      features: ['Keyword research', 'Technical SEO', 'Content optimization', 'Link building', 'Performance tracking'],
      liveUrl: '#'
    },
    {
      id: 10,
      title: 'Social Media Marketing',
      category: 'digital-marketing',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      description: 'Multi-platform social media campaign that generated 500K+ engagements and increased brand awareness by 250%.',
      technologies: ['Facebook Ads Manager', 'Instagram API', 'Hootsuite', 'Canva', 'Google Analytics'],
      features: ['Content strategy', 'Paid advertising', 'Community management', 'Influencer partnerships', 'Analytics reporting'],
      liveUrl: '#'
    },
    {
      id: 11,
      title: 'PPC Campaign Management',
      category: 'digital-marketing',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'Google Ads and Facebook Ads campaigns that achieved 400% ROAS and reduced cost-per-acquisition by 60%.',
      technologies: ['Google Ads', 'Facebook Ads', 'Google Tag Manager', 'Conversion Tracking', 'A/B Testing'],
      features: ['Campaign optimization', 'Audience targeting', 'Conversion tracking', 'Budget management', 'Performance analysis'],
      liveUrl: '#'
    },
    {
      id: 12,
      title: 'Content Marketing Strategy',
      category: 'digital-marketing',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      description: 'Content marketing strategy that increased website traffic by 400% and generated 200+ qualified leads monthly.',
      technologies: ['WordPress', 'Mailchimp', 'BuzzSumo', 'Canva', 'Google Analytics'],
      features: ['Content planning', 'Blog management', 'Email marketing', 'Lead generation', 'Performance tracking'],
      liveUrl: '#'
    },

    // Branding Projects
    {
      id: 13,
      title: 'Tech Startup Branding',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
      description: 'Complete brand identity design for a fintech startup, including logo, color palette, typography, and brand guidelines.',
      technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Adobe InDesign', 'Sketch'],
      features: ['Logo design', 'Brand guidelines', 'Color palette', 'Typography system', 'Marketing materials'],
      liveUrl: '#'
    },
    {
      id: 14,
      title: 'Restaurant Brand Identity',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      description: 'Brand redesign for a restaurant chain that increased customer recognition by 80% and improved sales by 45%.',
      technologies: ['Adobe Creative Suite', 'Figma', 'Canva', 'Print Design', 'Packaging Design'],
      features: ['Brand strategy', 'Visual identity', 'Menu design', 'Packaging design', 'Marketing collateral'],
      liveUrl: '#'
    },
    {
      id: 15,
      title: 'Fashion Brand Campaign',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      description: 'Comprehensive branding campaign for a fashion retailer including brand positioning, visual identity, and marketing strategy.',
      technologies: ['Adobe Creative Suite', 'Figma', 'Photography', 'Video Production', 'Social Media'],
      features: ['Brand positioning', 'Visual campaign', 'Photography direction', 'Social media assets', 'Brand guidelines'],
      liveUrl: '#'
    },
    {
      id: 16,
      title: 'Corporate Rebranding',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      description: 'Complete corporate rebranding project that modernized company image and improved market positioning.',
      technologies: ['Adobe Creative Suite', 'Figma', 'Brand Strategy', 'Market Research', 'Design Systems'],
      features: ['Brand audit', 'Logo redesign', 'Brand guidelines', 'Website redesign', 'Marketing materials'],
      liveUrl: '#'
    },
    // Additional projects for "View More" functionality
    {
      id: 17,
      title: 'Healthcare Management System',
      category: 'web-development',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      description: 'Comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine features.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'HIPAA Compliance'],
      features: ['Patient management', 'Appointment scheduling', 'Telemedicine', 'Medical records', 'Billing system'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 18,
      title: 'Cryptocurrency Trading App',
      category: 'mobile-development',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop',
      description: 'Advanced cryptocurrency trading application with real-time market data, portfolio tracking, and secure wallet integration.',
      technologies: ['React Native', 'WebSocket', 'Redux', 'Biometric Auth', 'Blockchain APIs'],
      features: ['Real-time trading', 'Portfolio tracking', 'Market analysis', 'Secure wallet', 'Price alerts'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 19,
      title: 'Influencer Marketing Platform',
      category: 'digital-marketing',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      description: 'Platform connecting brands with influencers, featuring campaign management, analytics, and automated payments.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Social Media APIs'],
      features: ['Influencer matching', 'Campaign management', 'Performance analytics', 'Automated payments', 'Content approval'],
      liveUrl: '#'
    },
    {
      id: 20,
      title: 'Luxury Hotel Brand Identity',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
      description: 'Premium brand identity for a luxury hotel chain, including visual identity, marketing materials, and digital presence.',
      technologies: ['Adobe Creative Suite', 'Figma', 'Photography', 'Print Design', 'Digital Marketing'],
      features: ['Luxury branding', 'Visual identity', 'Marketing collateral', 'Digital presence', 'Brand guidelines'],
      liveUrl: '#'
    },
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: 'bi-grid' },
    { id: 'web-development', name: 'Web Development', icon: 'bi-code-slash' },
    { id: 'mobile-development', name: 'Mobile Apps', icon: 'bi-phone' },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: 'bi-graph-up-arrow' },
    { id: 'branding', name: 'Branding', icon: 'bi-palette' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Show only first 8 projects initially, or all if showAll is true
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 8);
  const hasMoreProjects = filteredProjects.length > 8;

  const getNextProject = () => {
    if (!selectedProject) return;
    
    const categoryProjects = projects.filter(p => p.category === selectedProject.category);
    const currentIndex = categoryProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % categoryProjects.length;
    
    setSelectedProject(categoryProjects[nextIndex]);
  };

  const hasNextProject = () => {
    if (!selectedProject) return false;
    
    const categoryProjects = projects.filter(p => p.category === selectedProject.category);
    return categoryProjects.length > 1;
  };

  return (
    <section id="portfolio" className="py-20 bg-dark-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-lime-500/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-lime-400/10 rounded-full blur-xl animate-bounce-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4 animate-fade-in">
            My <span className="text-lime-400">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A showcase of my best work across web development, mobile apps, 
            digital marketing, and branding projects.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveFilter(category.id);
                setShowAll(false); // Reset to show limited items when filter changes
              }}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                activeFilter === category.id
                  ? 'bg-lime-500 text-dark-900 shadow-lg shadow-lime-500/25'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-lime-400'
              }`}
            >
              <i className={`${category.icon} mr-2`}></i>
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-lime-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-lime-500/10 animate-slide-up"
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <i className="bi bi-eye text-3xl text-lime-400 animate-pulse"></i>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-lime-500/20 text-lime-400 text-xs rounded-full backdrop-blur-sm">
                    {project.category === 'web-development' ? 'web' :
                     project.category === 'mobile-development' ? 'Mob' :
                     project.category === 'digital-marketing' ? 'dig' : 'brd'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-dark-700 text-xs text-gray-300 rounded transition-colors group-hover:bg-lime-500/20 group-hover:text-lime-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-lime-500/20 text-xs text-lime-400 rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {hasMoreProjects && !showAll && (
          <div className="text-center mt-12 animate-fade-in">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-600 text-dark-900 font-semibold rounded-lg hover:from-lime-400 hover:to-lime-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-lime-500/25"
            >
              <i className="bi bi-plus-circle mr-2"></i>
              View More Projects
              <span className="ml-2 px-2 py-1 bg-dark-900/20 rounded-full text-xs">
                +{filteredProjects.length - 8}
              </span>
            </button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && hasMoreProjects && (
          <div className="text-center mt-12 animate-fade-in">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center px-8 py-4 border-2 border-lime-400 text-lime-400 font-semibold rounded-lg hover:bg-lime-400 hover:text-dark-900 transform hover:scale-105 transition-all duration-200"
            >
              <i className="bi bi-dash-circle mr-2"></i>
              Show Less
            </button>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={getNextProject}
            hasNext={hasNextProject()}
            allProjects={projects}
          />
        )}
      </div>
    </section>
  );
};

export default Portfolio;
