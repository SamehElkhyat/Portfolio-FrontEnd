import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, Phone, MapPin, Send, CheckCircle, Github, 
  Linkedin, Twitter, Calendar, MessageCircle, Globe,
  Zap, Star, Award, AlertCircle, User, Building, DollarSign
} from 'lucide-react';
import MapComponent from './MapComponent';

const ContactForm = ({ inView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (['name', 'email', 'message'].includes(key)) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // Mark all required fields as touched to show errors
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          budget: '',
          message: ''
        });
        setErrors({});
        setTouched({});
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ icon: Icon, label, name, type = "text", required = false, placeholder, ...props }) => (
    <div>
      <label className="block text-gray-300 text-sm font-medium mb-2">
        <span className="flex items-center gap-2">
          <Icon className="w-4 h-4" aria-hidden="true" />
          {label}
          {required && <span className="text-red-400" aria-label="required">*</span>}
        </span>
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          aria-invalid={errors[name] ? 'true' : 'false'}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
            errors[name] 
              ? 'border-red-500 focus:border-red-400' 
              : 'border-slate-700 focus:border-blue-500'
          }`}
          {...props}
        />
        {errors[name] && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
        )}
      </div>
      {errors[name] && (
        <motion.p
          id={`${name}-error`}
          className="mt-2 text-sm text-red-400 flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
        >
          <AlertCircle className="w-4 h-4" />
          {errors[name]}
        </motion.p>
      )}
    </div>
  );

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
      noValidate
    >
      <h3 className="text-2xl font-bold text-white mb-6">Let's Start a Project</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputField
          icon={User}
          label="Full Name"
          name="name"
          placeholder="John Doe"
          required
        />
        
        <InputField
          icon={Mail}
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputField
          icon={Building}
          label="Company"
          name="company"
          placeholder="Your company (optional)"
        />
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            <span className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" aria-hidden="true" />
              Project Budget
            </span>
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-colors"
            aria-label="Select project budget range"
          >
            <option value="">Select budget range</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k+">$50,000+</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">
          <span className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Project Details
            <span className="text-red-400" aria-label="required">*</span>
          </span>
        </label>
        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            rows={5}
            placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
              errors.message 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-slate-700 focus:border-blue-500'
            }`}
          />
          {errors.message && (
            <div className="absolute right-3 top-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
          )}
        </div>
        {errors.message && (
          <motion.p
            id="message-error"
            className="mt-2 text-sm text-red-400 flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </motion.p>
        )}
      </div>

      {/* Character count for message */}
      <div className="mb-6 text-right">
        <span className={`text-sm ${formData.message.length < 10 ? 'text-gray-500' : 'text-gray-400'}`}>
          {formData.message.length} characters
          {formData.message.length < 10 && ' (minimum 10)'}
        </span>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
          isSubmitted 
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
            : isSubmitting
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg focus:ring-blue-500'
        }`}
        whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
        aria-describedby="submit-status"
      >
        <div className="flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending Message...</span>
            </>
          ) : isSubmitted ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Message Sent Successfully!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </div>
      </motion.button>

      {/* Form Status */}
      <div id="submit-status" className="sr-only" aria-live="polite">
        {isSubmitting && "Submitting your message..."}
        {isSubmitted && "Your message has been sent successfully!"}
      </div>

      {/* Privacy Notice */}
      <p className="mt-4 text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy. 
        We'll only use your information to respond to your inquiry.
      </p>
    </motion.form>
  );
};

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "sameh@example.com",
      subtitle: "Best for project inquiries",
      href: "mailto:sameh@example.com",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      subtitle: "Mon-Fri 9AM-6PM EST",
      href: "tel:+15551234567",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      title: "Schedule Call",
      value: "Book a Meeting",
      subtitle: "30-min consultation",
      href: "#",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:text-gray-300" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-cyan-400" },
    { icon: Globe, href: "https://portfolio.com", label: "Website", color: "hover:text-green-400" }
  ];

  const stats = [
    { value: "24h", label: "Response Time", icon: MessageCircle },
    { value: "98%", label: "Client Satisfaction", icon: Star },
    { value: "50+", label: "Projects Delivered", icon: Award },
    { value: "100%", label: "Success Rate", icon: Zap }
  ];

  return (
    <section className="min-h-screen bg-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16 px-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 sm:mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
            Ready to bring your vision to life? Let's discuss your project and create 
            something extraordinary that drives real business results.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-14 md:mb-16 px-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-5 md:p-6 hover:border-blue-500/50 transition-all duration-300"
            >
              <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-blue-400" aria-hidden="true" />
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-14 md:mb-16 px-4"
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              className="block bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-5 md:p-6 hover:border-blue-500/50 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Contact via ${method.title}: ${method.value}`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 rounded-lg bg-gradient-to-r ${method.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">{method.title}</h3>
              <p className="text-blue-400 font-medium mb-1 text-sm sm:text-base break-all">{method.value}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{method.subtitle}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Content - Updated Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16 px-4">
          {/* Contact Info - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="xl:col-span-1 order-2 xl:order-1"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Ready to Start?</h3>
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              I'm passionate about turning ideas into reality. Whether you need a complete 
              digital transformation, a cutting-edge web application, or strategic technical 
              consultation, I'm here to help you succeed.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-white font-medium">Based in</div>
                  <div className="text-gray-400">Cairo, Egypt (Remote Worldwide)</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-white font-medium">Availability</div>
                  <div className="text-gray-400">Currently accepting new projects</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-gray-400">Connect with me:</span>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit my ${social.label} profile`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            {/* Map Component */}
            <MapComponent />
          </motion.div>

          {/* Contact Form - Takes 2 columns */}
          <div className="xl:col-span-2 order-1 xl:order-2">
            <ContactForm inView={inView} />
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 sm:p-8 md:p-12 backdrop-blur-sm mx-4"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Let's Build the Future Together</h3>
          <p className="text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Every great project starts with a conversation. I'm excited to learn about your vision 
            and explore how we can make it a reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Free Consultation
            </motion.button>
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Case Studies
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 