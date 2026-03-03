import React from 'react';
import { PROFESSIONAL_NAME, PROFESSIONAL_EMAIL, PROFESSIONAL_PHONE, PROFESSIONAL_ADDRESS } from '../../professionalConstants';
import { formatPhoneNumber } from '../utils/phoneUtils';

export default function TermsOfService() {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the services provided by {PROFESSIONAL_NAME}, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services</h2>
              <p className="text-gray-700 mb-4">
                {PROFESSIONAL_NAME} provides professional services as described on our website. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide accurate and complete information when requested</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not interfere with or disrupt our services</li>
                <li>Respect the intellectual property rights of {PROFESSIONAL_NAME}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment and Billing</h2>
              <p className="text-gray-700 mb-4">
                Payment terms will be agreed upon before services are rendered. All fees are due as specified in your service agreement. Late payments may be subject to additional charges.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                {PROFESSIONAL_NAME} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">{PROFESSIONAL_NAME}</p>
                <p className="text-gray-700">{PROFESSIONAL_ADDRESS}</p>
                <p className="text-gray-700">Phone: {formatPhoneNumber(PROFESSIONAL_PHONE)}</p>
                <p className="text-gray-700">Email: {PROFESSIONAL_EMAIL}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

