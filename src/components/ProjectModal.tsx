import React, { useEffect, useState } from 'react';

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

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onNext?: () => void;
  hasNext?: boolean;
  allProjects?: Project[];
}

const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose, 
  onNext, 
  hasNext = false,
  allProjects = []
}) => {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    // Hide scroll hint after 3 seconds
    const timer = window.setTimeout(() => {
      setShowScrollHint(false);
    }, 3000);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      window.clearTimeout(timer);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web-development':
        return 'bi-code-slash';
      case 'mobile-development':
        return 'bi-phone';
      case 'digital-marketing':
        return 'bi-graph-up-arrow';
      case 'branding':
        return 'bi-palette';
      default:
        return 'bi-folder';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'web-development':
        return 'Web Development';
      case 'mobile-development':
        return 'Mobile Development';
      case 'digital-marketing':
        return 'Digital Marketing';
      case 'branding':
        return 'Branding';
      default:
        return 'Project';
    }
  };

  const getCategoryPrefix = (category: string) => {
    switch (category) {
      case 'web-development':
        return 'web';
      case 'mobile-development':
        return 'Mob';
      case 'digital-marketing':
        return 'dig';
      case 'branding':
        return 'brd';
      default:
        return 'proj';
    }
  };

  const handleStartSimilar = () => {
    const phoneNumber = '+447756183484';
    const message = `Hello! I'm interested in starting a similar project like "${project.title}" (${getCategoryName(project.category)}). Can we discuss the details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEnlargeImage = () => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm';
    overlay.onclick = () => document.body.removeChild(overlay);
    
    const img = document.createElement('img');
    img.src = project.image;
    img.className = 'w-full h-full object-cover rounded-lg max-w-4xl max-h-4xl';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
    closeBtn.className = 'absolute top-4 right-4 w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-dark-900 transition-colors text-xl';
    closeBtn.onclick = () => document.body.removeChild(overlay);
    
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
  };

  const shouldShowEnlargeButton = () => {
    return ['digital-marketing', 'branding', 'web-development'].includes(project.category);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-dark-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-dark-700 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-dark-900 transition-colors"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Scroll Hint for Large Screens */}
        {showScrollHint && (
          <div className="hidden lg:block absolute top-1/2 right-8 z-10 animate-bounce">
            <div className="bg-lime-500/20 backdrop-blur-sm rounded-lg p-3 border border-lime-400/30">
              <div className="flex items-center text-lime-400 text-sm">
                <i className="bi bi-arrow-down mr-2"></i>
                <span>Scroll for details</span>
              </div>
            </div>
          </div>
        )}

        {/* Header Image */}
        <div className="relative h-64 sm:h-80 lg:h-96">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover rounded-t-2xl"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-center space-x-3">
            <span className="px-3 py-1 bg-lime-500/20 text-lime-400 text-sm rounded-full flex items-center backdrop-blur-sm border border-lime-400/30">
              <i className={`${getCategoryIcon(project.category)} mr-1`}></i>
              {getCategoryPrefix(project.category)}
            </span>
            <span className="px-3 py-1 bg-dark-900/60 text-white text-sm rounded-full backdrop-blur-sm">
              {getCategoryName(project.category)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {project.title}
          </h2>
          
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <i className="bi bi-gear mr-2 text-lime-400"></i>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg border border-dark-600 hover:border-lime-400/50 hover:text-lime-400 transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <i className="bi bi-check-circle mr-2 text-lime-400"></i>
              Key Features
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-dark-700/50 rounded-lg border border-dark-600"
                >
                  <i className="bi bi-arrow-right text-lime-400 mr-3"></i>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Start Similar Button */}
            <button
              onClick={handleStartSimilar}
              className="flex items-center justify-center px-6 py-3 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-lime-500/25"
            >
              <i className="bi bi-whatsapp mr-2"></i>
              Start Similar Project
            </button>

            {/* Enlarge Image Button */}
            {shouldShowEnlargeButton() && (
              <button
                onClick={handleEnlargeImage}
                className="flex items-center justify-center px-6 py-3 border-2 border-lime-400 text-lime-400 font-semibold rounded-lg hover:bg-lime-400 hover:text-dark-900 transition-all duration-200 transform hover:scale-105"
              >
                <i className="bi bi-zoom-in mr-2"></i>
                View Full Image
              </button>
            )}

            {/* Next Button */}
            {hasNext && onNext && (
              <button
                onClick={onNext}
                className="flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-all duration-200 transform hover:scale-105"
              >
                <i className="bi bi-arrow-right mr-2"></i>
                Next Project
              </button>
            )}
          </div>

          {/* Project Links */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-6 pt-6 border-t border-dark-700">
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 hover:text-lime-400 transition-colors"
                  >
                    <i className="bi bi-globe mr-2"></i>
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 hover:text-lime-400 transition-colors"
                  >
                    <i className="bi bi-github mr-2"></i>
                    Source Code
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
