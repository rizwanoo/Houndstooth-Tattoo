import React, { useState, useEffect } from 'react';
import FiligreeDivider from './FiligreeDivider';
import { STUDIO_INFO, ARTISTS } from '../data/studioData';
import { MapPin, Clock, Shield, Upload, CheckCircle2, AlertCircle, Compass, Instagram, Facebook } from 'lucide-react';

interface BookingSectionProps {
  preselectedArtist?: string;
}

export default function BookingSection({ preselectedArtist }: BookingSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    placement: '',
    size: '',
    style: '',
    preferredDate: '',
    budget: '',
    artist: preselectedArtist || '',
    description: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (preselectedArtist) {
      setFormData((prev) => ({ ...prev, artist: preselectedArtist }));
    }
  }, [preselectedArtist]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newFiles = filesArray.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.description) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    // Simulate real submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
    }, 800);
  };

  return (
    <section id="booking" className="relative py-24 bg-[#080808] text-white overflow-hidden border-t border-neutral-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[700px] bg-[#00d2b2]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <FiligreeDivider
          title="START YOUR CUSTOM INQUIRY"
          subtitle="Consultation & Booking"
          className="mb-14"
        />

        {/* Dual-Card Split Layout strictly matching reference design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Card: Dark Info Card with Studio Credentials & Map */}
          <div className="lg:col-span-5 bg-neutral-950 border-2 border-neutral-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            {/* Top Filigree Crown */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
                <div className="h-[1px] w-12 bg-[#00d2b2]" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#00d2b2]" />
                <div className="h-[1px] w-12 bg-[#00d2b2]" />
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-center text-white">
                BOOK YOUR SESSION
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 text-center mt-3 leading-relaxed font-normal">
                Please fill out the form with as much detail as possible. This helps us understand your vision, estimate the session duration, and pair you with the best resident artist.
              </p>

              {/* Studio Key Facts Strip */}
              <div className="my-8 space-y-5 border-t border-b border-neutral-800/80 py-6">
                
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-none border border-[#00d2b2]/40 bg-[#00d2b2]/10 flex items-center justify-center text-[#00d2b2] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-heading uppercase tracking-widest text-neutral-400 block font-semibold">
                      Location & Address
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      {STUDIO_INFO.address}
                    </span>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-none border border-[#00d2b2]/40 bg-[#00d2b2]/10 flex items-center justify-center text-[#00d2b2] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-heading uppercase tracking-widest text-neutral-400 block font-semibold">
                      Studio Hours
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      Tue – Sat: 12:00 PM – 8:00 PM
                    </span>
                    <span className="text-xs text-neutral-400 block">
                      Appointments & Walk-ins welcome
                    </span>
                  </div>
                </div>

                {/* Veteran Owned Badge */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-none border border-[#00d2b2]/40 bg-[#00d2b2]/10 flex items-center justify-center text-[#00d2b2] shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-heading uppercase tracking-widest text-neutral-400 block font-semibold">
                      Shop Credentials
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      Veteran-Owned Custom Studio
                    </span>
                    <span className="text-xs text-neutral-400 block">
                      Hospital-grade autoclave sterilization
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Stylized Interactive Map Frame (matching the map inside the card in the reference screenshot) */}
            <div className="mt-auto">
              <div className="relative border border-neutral-800 overflow-hidden bg-neutral-900 group">
                <iframe
                  title="Houndstooth Tattoo Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.2801962304917!2d-115.26322872343943!3d36.11585860558117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c73104680879%3A0xe54146a297746401!2s4045%20S%20Buffalo%20Dr%2C%20Las%20Vegas%2C%20NV%2089147!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                  width="100%"
                  height="160"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
                
                {/* Map quick action button */}
                <a
                  href={STUDIO_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-neutral-950/90 hover:bg-[#00d2b2] hover:text-neutral-950 text-white text-[11px] font-heading uppercase tracking-wider px-2.5 py-1 border border-neutral-700 transition-colors flex items-center gap-1 shadow-md"
                >
                  <Compass className="w-3 h-3" />
                  <span>Open in Maps</span>
                </a>
              </div>

              {/* Official Social Links in Left Card */}
              <div className="flex items-center justify-between pt-4 text-xs text-neutral-400">
                <span className="font-heading uppercase tracking-wider text-[11px]">Follow Official:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={STUDIO_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00d2b2] transition-colors flex items-center gap-1"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                  <span>·</span>
                  <a
                    href={STUDIO_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00d2b2] transition-colors flex items-center gap-1"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Card: Crisp White Form Card matching reference */}
          <div className="lg:col-span-7 bg-white text-neutral-900 p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
            {submitStatus === 'success' ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-heading text-2xl font-bold uppercase tracking-wider text-neutral-900">
                  Inquiry Successfully Received
                </h4>
                <p className="text-neutral-600 max-w-md text-sm leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. We have received your custom tattoo inquiry. Our resident artist will review your concept, size, and reference photos and contact you at <strong>{formData.email}</strong> within 24–48 hours to confirm consultation details and appointment availability.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        placement: '',
                        size: '',
                        style: '',
                        preferredDate: '',
                        budget: '',
                        artist: '',
                        description: '',
                      });
                      setUploadedFiles([]);
                    }}
                    className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-heading uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Please provide your Full Name, Email Address, and Tattoo Description to submit.</span>
                  </div>
                )}

                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Row 2: Phone / WhatsApp & Placement on Body */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                      Placement on Body
                    </label>
                    <select
                      name="placement"
                      value={formData.placement}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all"
                    >
                      <option value="">Select placement</option>
                      <option value="Forearm / Wrist">Forearm / Wrist</option>
                      <option value="Upper Arm / Bicep">Upper Arm / Bicep</option>
                      <option value="Full Sleeve">Full Sleeve</option>
                      <option value="Chest / Sternum">Chest / Sternum</option>
                      <option value="Upper / Full Back">Upper / Full Back</option>
                      <option value="Ribs / Stomach">Ribs / Stomach</option>
                      <option value="Thigh / Leg / Calf">Thigh / Leg / Calf</option>
                      <option value="Hand / Fingers">Hand / Fingers</option>
                      <option value="Neck / Behind Ear">Neck / Behind Ear</option>
                      <option value="Piercing (Ear / Nose / Body)">Piercing (Ear / Nose / Body)</option>
                      <option value="Other Placement">Other Placement</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Approximate Size & Style Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                      Approximate Size
                    </label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all"
                    >
                      <option value="">Select size</option>
                      <option value="Small (< 3 inches)">Small (&lt; 3 inches)</option>
                      <option value="Medium (3 - 6 inches)">Medium (3 – 6 inches)</option>
                      <option value="Large (6 - 10 inches)">Large (6 – 10 inches)</option>
                      <option value="Half Sleeve">Half Sleeve</option>
                      <option value="Full Sleeve / Large Backpiece">Full Sleeve / Large Backpiece</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                      Style Preference
                    </label>
                    <select
                      name="style"
                      value={formData.style}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all"
                    >
                      <option value="">Select style</option>
                      <option value="Black & Grey Realism">Black & Grey Realism</option>
                      <option value="Sacred Geometry & Dotwork">Sacred Geometry & Dotwork</option>
                      <option value="Illustrative & Dark Art">Illustrative & Dark Art</option>
                      <option value="Fine Line & Botanical">Fine Line & Botanical</option>
                      <option value="Custom Script & Lettering">Custom Script & Lettering</option>
                      <option value="Traditional & Neo-Trad">Traditional & Neo-Trad</option>
                      <option value="Professional Piercing">Professional Piercing</option>
                      <option value="Cover-Up / Touch-Up">Cover-Up / Touch-Up</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Preferred Date & Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all"
                    >
                      <option value="">Select budget range</option>
                      <option value="$100 - $250">$100 – $250 (Shop Min $100)</option>
                      <option value="$250 - $500">$250 – $500</option>
                      <option value="$500 - $1,000">$500 – $1,000</option>
                      <option value="$1,000+ / Full Day">$1,000+ / Full Day Session</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Preferred Artist Dropdown */}
                <div>
                  <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                    Select Artist
                  </label>
                  <select
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all"
                  >
                    <option value="">Any Available Resident Artist</option>
                    {ARTISTS.map((artist) => (
                      <option key={artist.id} value={artist.handle}>
                        {artist.name} ({artist.handle}) — {artist.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 6: Tattoo Idea / Description */}
                <div>
                  <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                    Tattoo Idea / Description *
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    required
                    placeholder="Describe your tattoo idea in detail (theme, elements, meaning, reference links, etc.)..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#00a88f] focus:bg-white transition-all placeholder:text-neutral-400"
                  />
                </div>

                {/* Row 7: Upload Reference Images */}
                <div>
                  <label className="block text-xs font-heading uppercase tracking-wider font-bold text-neutral-800 mb-1">
                    Upload Reference Images
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 p-4 text-center hover:border-[#00a88f] transition-colors relative cursor-pointer bg-neutral-50">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                      <Upload className="w-5 h-5 text-neutral-500" />
                      <span className="text-xs font-medium text-neutral-700">
                        Drop reference images here, or browse files
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        PNG, JPG, WEBP up to 10MB
                      </span>
                    </div>
                  </div>

                  {/* Uploaded File Previews */}
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="relative w-14 h-14 border border-neutral-300 overflow-hidden bg-neutral-100 group"
                        >
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="absolute top-0 right-0 bg-red-600 text-white w-4 h-4 text-[10px] flex items-center justify-center cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button (Matching reference teal button "Request Appointment") */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#00a88f] hover:bg-[#008c77] disabled:opacity-70 text-white font-heading font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting Inquiry...' : 'Request Appointment'}
                  </button>
                  <p className="text-[11px] text-neutral-500 text-center mt-2 font-normal">
                    * Submitting this form sends an inquiry. No payment is charged now. Your artist will confirm pricing & deposit during consultation.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
