import React, { useState, useEffect } from 'react';
import { sendFreeWebsiteOfferEmail } from '../services/emailService';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  socialMediaProfile: string;
  shortDescription: string;
  professionalSummary: string;
}

const FreeWebsiteOffer: React.FC = () => {
  const [showOffer, setShowOffer] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    socialMediaProfile: '',
    shortDescription: '',
    professionalSummary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    let mouseLeaveTimer: number;
    let hasShownOffer = localStorage.getItem('freeWebsiteOfferShown');

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownOffer && !showOffer) {
        mouseLeaveTimer = window.setTimeout(() => {
          setShowOffer(true);
          localStorage.setItem('freeWebsiteOfferShown', 'true');
        }, 500);
      }
    };

    const handleMouseEnter = () => {
      if (mouseLeaveTimer) {
        window.clearTimeout(mouseLeaveTimer);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (mouseLeaveTimer) {
        window.clearTimeout(mouseLeaveTimer);
      }
    };
  }, [showOffer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendFreeWebsiteOfferEmail(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        // Also send to WhatsApp
        const whatsappMessage = `New Free Website Request:
        
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Social Media: ${formData.socialMediaProfile}

Description: ${formData.shortDescription}

Professional Summary: ${formData.professionalSummary}`;
        
        const whatsappUrl = `https://wa.me/447756183484?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        window.setTimeout(() => {
          setShowOffer(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting free website offer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowOffer(false);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.phone;
      case 2:
        return formData.address && formData.socialMediaProfile;
      case 3:
        return formData.shortDescription && formData.professionalSummary;
      default:
        return false;
    }
  };

  if (!showOffer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-lime-400/30 shadow-2xl shadow-lime-500/20 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-600 transition-colors"
        >
          <i className="bi bi-x-lg text-xl"></i>
        </button>

        {!isSubmitted ? (
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <i className="bi bi-gift text-3xl text-dark-900"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                🎉 <span className="text-lime-400">FREE</span> Website Offer!
              </h2>
              <p className="text-gray-300 text-lg">
                Get a professional one-page website built for you at absolutely no cost!
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Step {currentStep} of 3</span>
                <span className="text-sm text-lime-400">{Math.round((currentStep / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-lime-400 to-lime-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <i className="bi bi-person-circle mr-2 text-lime-400"></i>
                    Basic Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                      placeholder="+44 123 456 7890"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Contact & Social */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <i className="bi bi-geo-alt mr-2 text-lime-400"></i>
                    Contact & Social Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                      placeholder="Your full address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Social Media Profile Link *
                    </label>
                    <input
                      type="url"
                      name="socialMediaProfile"
                      value={formData.socialMediaProfile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      LinkedIn, Twitter, Instagram, or any professional profile
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Professional Details */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <i className="bi bi-briefcase mr-2 text-lime-400"></i>
                    Professional Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Short Description About You *
                    </label>
                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                      placeholder="Tell us about yourself in 2-3 sentences..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Professional Summary *
                    </label>
                    <textarea
                      name="professionalSummary"
                      value={formData.professionalSummary}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                      placeholder="Describe your professional background, skills, and experience..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-colors"
                  >
                    <i className="bi bi-arrow-left mr-2"></i>
                    Previous
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="ml-auto px-6 py-3 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <i className="bi bi-arrow-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !isStepValid()}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-dark-900 font-semibold rounded-lg hover:from-lime-400 hover:to-lime-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-lime-500/25"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="bi bi-arrow-clockwise animate-spin mr-2"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send mr-2"></i>
                        Claim My Free Website
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-dark-700">
              <h4 className="text-lg font-semibold text-white mb-4">What You'll Get:</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Professional one-page website',
                  'Mobile-responsive design',
                  'Contact form integration',
                  'Social media links',
                  'Professional hosting setup',
                  'Basic SEO optimization'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <i className="bi bi-check-circle text-lime-400 mr-2"></i>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="bi bi-check-circle text-4xl text-green-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              🎉 Request Submitted Successfully!
            </h3>
            <p className="text-gray-300 mb-6">
              Thank you for your interest! I'll review your information and get back to you within 24 hours 
              with next steps for your free website.
            </p>
            <div className="bg-lime-500/10 border border-lime-500/30 rounded-lg p-4">
              <p className="text-lime-400 text-sm">
                <i className="bi bi-info-circle mr-2"></i>
                A copy of your request has been sent to WhatsApp for faster processing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeWebsiteOffer;
