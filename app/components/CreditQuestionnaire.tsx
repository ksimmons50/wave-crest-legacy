'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { BREEZY_PROFESSIONAL_TOKEN, LOGO_HOLDING } from '../../professionalConstants';
import Image from 'next/image';

export default function CreditQuestionnaire() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredArea: '',
    monthlyBudget: '',
    ownerFinancing: '',
    moveTimeline: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      // Create comments field
      const comments = `
HOME INTEREST FORM SUBMISSION

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Preferred Area: ${formData.preferredArea}
Monthly Budget: $${formData.monthlyBudget}
Interested in Owner Financing: ${formData.ownerFinancing}
When Looking to Move: ${formData.moveTimeline}

${formData.additionalInfo ? `Additional Information:\n${formData.additionalInfo}` : ''}
`;

      const nameParts = formData.name.split(' ');
      const phoneDigits = formData.phone.replace(/\D/g, '');

      const submitData = {
        first_name: nameParts[0] || '',
        last_name: nameParts.slice(1).join(' ') || '',
        email: formData.email || 'info@wavecrestlegacy.com',
        phone: phoneDigits,
        address: formData.preferredArea || '',
        comments: comments,
        professional_token: BREEZY_PROFESSIONAL_TOKEN
      };

      const response = await fetch(`${'https://app.socratic.systems'}/breezy/breezy_sites/public/create_lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Network error. Please check your connection and try again.');
      }

      const result = await response.json();

      if (result === false || (result && result.error)) {
        throw new Error(result.error || 'Unable to submit form. Please try again.');
      }

      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredArea: '',
        monthlyBudget: '',
        ownerFinancing: '',
        moveTimeline: '',
        additionalInfo: '',
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-8">
      {/* Header with Logo */}
      <div className="flex flex-col items-start mb-8 pb-6 border-b-2 border-gray-200">
        <Image
          src={LOGO_HOLDING}
          alt="Wave Crest Legacy Holding, LLC"
          width={250}
          height={80}
          className="h-16 w-auto mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Home Interest Form</h2>
        <p className="text-gray-600 mb-4">Tell us a bit about what you're looking for, and we'll be in touch.</p>
        <div className="space-y-1 text-sm text-gray-500">
          <p>info@wavecrestlegacy.com</p>
          <p>(817) 646-3927</p>
        </div>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <p className="text-green-800 font-medium">Thank you! We've received your information and will be in touch soon.</p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <div className="flex items-start">
            <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
            <p className="text-red-800 text-sm">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Preferred Area */}
        <div>
          <label htmlFor="preferredArea" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Area <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="preferredArea"
            name="preferredArea"
            value={formData.preferredArea}
            onChange={handleInputChange}
            placeholder="e.g., North Houston, Cypress, Katy"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Monthly Budget */}
        <div>
          <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Budget <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-500">$</span>
            <input
              type="number"
              id="monthlyBudget"
              name="monthlyBudget"
              value={formData.monthlyBudget}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Owner Financing Interest */}
        <div>
          <label htmlFor="ownerFinancing" className="block text-sm font-medium text-gray-700 mb-1">
            Are you interested in owner financing? <span className="text-red-500">*</span>
          </label>
          <select
            id="ownerFinancing"
            name="ownerFinancing"
            value={formData.ownerFinancing}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>

        {/* Move Timeline */}
        <div>
          <label htmlFor="moveTimeline" className="block text-sm font-medium text-gray-700 mb-1">
            When are you looking to move? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="moveTimeline"
            name="moveTimeline"
            value={formData.moveTimeline}
            onChange={handleInputChange}
            placeholder="e.g., Within 3 months, 6-12 months, Just exploring"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Additional Info */}
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
            Tell us a little about your situation <span className="text-gray-500">(Optional)</span>
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={4}
            placeholder="Share any details that might help us serve you better..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            If you qualify and want to move forward, we will send you the full application.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-2xl"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" />
              Submitting...
            </span>
          ) : 'Submit Interest Form'}
        </button>
      </form>
    </div>
  );
}
