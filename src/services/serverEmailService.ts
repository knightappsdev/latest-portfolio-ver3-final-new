// Server-side email service for production use on ofemo.uk
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterData {
  email: string;
  source: string;
  timestamp: string;
}

export interface LeadCaptureData {
  email: string;
  page: string;
  referrer: string;
  timestamp: string;
}

// Send contact form email via server
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; error?: any }> => {
  try {
    const response = await fetch('https://ofemo.uk/contact-handler.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true };
    } else {
      throw new Error(result.message || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error };
  }
};

// Send newsletter subscription via server
export const sendNewsletterEmail = async (data: NewsletterData): Promise<{ success: boolean; error?: any }> => {
  try {
    const response = await fetch('https://ofemo.uk/newsletter-handler.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true };
    } else {
      throw new Error(result.message || 'Failed to subscribe');
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error };
  }
};

// Send lead capture notification via server
export const sendLeadCaptureEmail = async (data: LeadCaptureData): Promise<{ success: boolean; error?: any }> => {
  try {
    const response = await fetch('https://ofemo.uk/lead-capture-handler.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true };
    } else {
      throw new Error(result.message || 'Failed to capture lead');
    }
  } catch (error) {
    console.error('Error capturing lead:', error);
    return { success: false, error };
  }
};

// Fallback to EmailJS if server-side fails
export const sendEmailWithFallback = async (formData: ContactFormData): Promise<{ success: boolean; error?: any }> => {
  // Try server-side first
  const serverResult = await sendContactEmail(formData);
  
  if (serverResult.success) {
    return serverResult;
  }

  // Fallback to EmailJS
  try {
    const { sendContactEmail: emailJSContact } = await import('./emailService');
    return await emailJSContact(formData);
  } catch (error) {
    console.error('Both server-side and EmailJS failed:', error);
    return { success: false, error };
  }
};

// Newsletter with fallback
export const sendNewsletterWithFallback = async (data: NewsletterData): Promise<{ success: boolean; error?: any }> => {
  // Try server-side first
  const serverResult = await sendNewsletterEmail(data);
  
  if (serverResult.success) {
    return serverResult;
  }

  // Fallback to EmailJS
  try {
    const { sendNewsletterEmail: emailJSNewsletter } = await import('./emailService');
    return await emailJSNewsletter(data);
  } catch (error) {
    console.error('Both server-side and EmailJS newsletter failed:', error);
    return { success: false, error };
  }
};
