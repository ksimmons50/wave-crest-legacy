'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import { BREEZY_PROFESSIONAL_TOKEN, LOGO_HOLDING } from '../../professionalConstants';
import Image from 'next/image';

interface Creditor {
  name: string;
  monthlyPayment: string;
  balance: string;
}

export default function CreditQuestionnaire() {
  const [formData, setFormData] = useState({
    // Borrower Information
    borrowerName: '',
    homePhone: '',
    cellPhone: '',
    workPhone: '',
    fax: '',
    email: '',
    workEmail: '',

    // Current Address
    currentAddress: '',
    currentCity: '',
    currentState: '',
    currentZip: '',
    currentCounty: '',

    // Co-Borrower
    coBorrowerEmployer: '',

    // Previous Address
    previousAddress: '',
    previousCity: '',
    previousState: '',
    previousZip: '',
    previousCounty: '',

    // Additional Personal Details
    dateOfBirth: '',
    relationshipStatus: '',

    // Property Being Purchased
    propertyAddress: '',
    propertyStreetAddress: '',
    downPayment: '',
    loanAmountRequested: '',
    earnestRate: '',
    typeOfLoan: '',

    // Loan Payment & Funds
    sourceOfDownPayment: '',
    sourceOfFunds: '',
    primaryResidence: '',
    currentUsage: '',

    // Household Budget - Number of People
    numberOfPeople: '',

    // Monthly Income
    primaryIncome: '',
    secondaryIncome: '',
    alimony: '',
    childSupport: '',

    // Monthly Expenses
    rent: '',
    groceries: '',
    phoneTv: '',
    electricity: '',
    insurance: '',
    gas: '',
    water: '',
    daycare: '',
    sewer: '',
    cableInternet: '',
    cellPhoneExpense: '',
    misc: '',

    // Credit expenses
    foodExpense: '',
    creditCards: '',
    schoolLoans: '',
    carPayment: '',
    visa: '',

    // Personal History
    criminalConviction: '',
    currentlySeek: '',
    petitionForDivorce: '',
    reasonForBuying: '',

    // Current Bank Information
    bankName: '',
    directPayment: '',
    emailName: '',
    currentAnnualHousehold: '',
    loanOfficer: '',
    estimatedMonthlyPayment: '',

    // Signature
    applicantSignature: '',
    signatureDate: '',
  });

  const [creditors, setCreditors] = useState<Creditor[]>([
    { name: '', monthlyPayment: '', balance: '' }
  ]);

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

  const handleCreditorChange = (index: number, field: keyof Creditor, value: string) => {
    const newCreditors = [...creditors];
    if (newCreditors[index]) {
      newCreditors[index][field] = value;
      setCreditors(newCreditors);
    }
  };

  const addCreditor = () => {
    setCreditors([...creditors, { name: '', monthlyPayment: '', balance: '' }]);
  };

  const removeCreditor = (index: number) => {
    if (creditors.length > 1) {
      setCreditors(creditors.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      // Calculate totals
      const totalMonthlyIncome =
        (parseFloat(formData.primaryIncome) || 0) +
        (parseFloat(formData.secondaryIncome) || 0) +
        (parseFloat(formData.alimony) || 0) +
        (parseFloat(formData.childSupport) || 0);

      const totalMonthlyExpenses =
        (parseFloat(formData.rent) || 0) +
        (parseFloat(formData.groceries) || 0) +
        (parseFloat(formData.phoneTv) || 0) +
        (parseFloat(formData.electricity) || 0) +
        (parseFloat(formData.insurance) || 0) +
        (parseFloat(formData.gas) || 0) +
        (parseFloat(formData.water) || 0) +
        (parseFloat(formData.daycare) || 0) +
        (parseFloat(formData.sewer) || 0) +
        (parseFloat(formData.cableInternet) || 0) +
        (parseFloat(formData.cellPhoneExpense) || 0) +
        (parseFloat(formData.misc) || 0) +
        (parseFloat(formData.foodExpense) || 0) +
        (parseFloat(formData.creditCards) || 0) +
        (parseFloat(formData.schoolLoans) || 0) +
        (parseFloat(formData.carPayment) || 0) +
        (parseFloat(formData.visa) || 0);

      const totalCreditorPayments = creditors.reduce((sum, c) => sum + (parseFloat(c.monthlyPayment) || 0), 0);
      const totalCreditorBalances = creditors.reduce((sum, c) => sum + (parseFloat(c.balance) || 0), 0);

      // Format creditors list
      const creditorsText = creditors
        .filter(c => c.name)
        .map(c => `${c.name}: $${c.monthlyPayment || '0'}/mo, Balance: $${c.balance || '0'}`)
        .join('\n');

      // Create comprehensive comments field
      const comments = `
CREDIT QUESTIONNAIRE SUBMISSION

=== CONTACT INFORMATION ===
Borrower Name: ${formData.borrowerName}
Home Phone: ${formData.homePhone}
Cell Phone: ${formData.cellPhone}
Work Phone: ${formData.workPhone}
Fax: ${formData.fax}
Email: ${formData.email}
Work Email: ${formData.workEmail}

=== CURRENT ADDRESS ===
${formData.currentAddress}
${formData.currentCity}, ${formData.currentState} ${formData.currentZip}
County: ${formData.currentCounty}

Co-Borrower's Employer: ${formData.coBorrowerEmployer}

=== PREVIOUS ADDRESS ===
${formData.previousAddress}
${formData.previousCity}, ${formData.previousState} ${formData.previousZip}
County: ${formData.previousCounty}

=== PERSONAL DETAILS ===
Date of Birth: ${formData.dateOfBirth}
Relationship Status: ${formData.relationshipStatus}

=== PROPERTY BEING PURCHASED ===
Property Address: ${formData.propertyAddress}
Street Address: ${formData.propertyStreetAddress}
Down Payment: $${formData.downPayment}
Loan Amount Requested: $${formData.loanAmountRequested}
Earnest Rate: ${formData.earnestRate}
Type of Loan: ${formData.typeOfLoan}

=== LOAN PAYMENT & FUNDS ===
Source of Down Payment: ${formData.sourceOfDownPayment}
Source of Funds: ${formData.sourceOfFunds}
Primary Residence: ${formData.primaryResidence}
Current Usage: ${formData.currentUsage}

=== HOUSEHOLD BUDGET ===
Number of People in Home: ${formData.numberOfPeople}

Monthly Income:
- Primary Income: $${formData.primaryIncome}
- Secondary Income: $${formData.secondaryIncome}
- Alimony: $${formData.alimony}
- Child Support: $${formData.childSupport}
TOTAL MONTHLY INCOME: $${totalMonthlyIncome.toFixed(2)}

Monthly Expenses:
- Rent: $${formData.rent}
- Groceries: $${formData.groceries}
- Phone/TV: $${formData.phoneTv}
- Electricity: $${formData.electricity}
- Insurance: $${formData.insurance}
- Gas: $${formData.gas}
- Water: $${formData.water}
- Daycare: $${formData.daycare}
- Sewer: $${formData.sewer}
- Cable/Internet: $${formData.cableInternet}
- Cell Phone: $${formData.cellPhoneExpense}
- Miscellaneous: $${formData.misc}
- Food: $${formData.foodExpense}
- Credit Cards: $${formData.creditCards}
- School Loans: $${formData.schoolLoans}
- Car Payment: $${formData.carPayment}
- Visa: $${formData.visa}
TOTAL MONTHLY EXPENSES: $${totalMonthlyExpenses.toFixed(2)}

=== CREDITOR'S LIST ===
${creditorsText}
Total Monthly Payments: $${totalCreditorPayments.toFixed(2)}
Total Balances: $${totalCreditorBalances.toFixed(2)}

=== PERSONAL HISTORY ===
Criminal Conviction: ${formData.criminalConviction}
Currently Seek: ${formData.currentlySeek}
Petition for Divorce: ${formData.petitionForDivorce}
Reason for Buying: ${formData.reasonForBuying}

=== CURRENT BANK INFORMATION ===
Bank Name: ${formData.bankName}
Direct Payment: ${formData.directPayment}
Email Name: ${formData.emailName}
Current Annual Household: ${formData.currentAnnualHousehold}
Loan Officer: ${formData.loanOfficer}
Estimated Monthly Payment: $${formData.estimatedMonthlyPayment}

=== SIGNATURE ===
Applicant Signature: ${formData.applicantSignature}
Date: ${formData.signatureDate}
`;

      const nameParts = formData.borrowerName.split(' ');
      const phoneDigits = formData.cellPhone.replace(/\D/g, '');

      const submitData = {
        first_name: nameParts[0] || '',
        last_name: nameParts.slice(1).join(' ') || '',
        email: formData.email || 'info@wavecrestlegacy.com',
        phone: phoneDigits,
        address: formData.currentAddress || '',
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
        borrowerName: '', homePhone: '', cellPhone: '', workPhone: '', fax: '', email: '', workEmail: '',
        currentAddress: '', currentCity: '', currentState: '', currentZip: '', currentCounty: '',
        coBorrowerEmployer: '', previousAddress: '', previousCity: '', previousState: '', previousZip: '',
        previousCounty: '', dateOfBirth: '', relationshipStatus: '', propertyAddress: '',
        propertyStreetAddress: '', downPayment: '', loanAmountRequested: '', earnestRate: '',
        typeOfLoan: '', sourceOfDownPayment: '', sourceOfFunds: '', primaryResidence: '',
        currentUsage: '', numberOfPeople: '', primaryIncome: '', secondaryIncome: '', alimony: '',
        childSupport: '', rent: '', groceries: '', phoneTv: '', electricity: '', insurance: '',
        gas: '', water: '', daycare: '', sewer: '', cableInternet: '', cellPhoneExpense: '', misc: '',
        foodExpense: '', creditCards: '', schoolLoans: '', carPayment: '', visa: '',
        criminalConviction: '', currentlySeek: '', petitionForDivorce: '', reasonForBuying: '', bankName: '', directPayment: '',
        emailName: '', currentAnnualHousehold: '', loanOfficer: '', estimatedMonthlyPayment: '',
        applicantSignature: '', signatureDate: '',
      });
      setCreditors([{ name: '', monthlyPayment: '', balance: '' }]);

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

  const InputField = ({ label, name, type = 'text', required = false, placeholder = '' }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
  }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required={required}
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-8">
      {/* Header with Logo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b-2 border-gray-200 gap-6">
        <div className="flex-1">
          <Image
            src={LOGO_HOLDING}
            alt="Wave Crest Legacy Holding, LLC"
            width={250}
            height={80}
            className="h-16 w-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Credit Questionnaire</h2>
          <p className="text-sm text-gray-500">info@wavecrestlegacy.com</p>
          <p className="text-sm text-gray-500">(817) 646-3927</p>
          <p className="text-sm text-gray-500">www.wavecrestlegacy.com</p>
        </div>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <p className="text-green-800 font-medium">Thank you! Your credit questionnaire has been submitted successfully.</p>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Borrower's Name" name="borrowerName" required />
            <InputField label="Home Phone" name="homePhone" type="tel" />
            <InputField label="Cell Phone" name="cellPhone" type="tel" required />
            <InputField label="Work Phone" name="workPhone" type="tel" />
            <InputField label="Fax" name="fax" type="tel" />
            <InputField label="Email" name="email" type="email" required />
            <InputField label="Work Email" name="workEmail" type="email" />
          </div>
        </section>

        {/* Current Address */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Current Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <InputField label="Address" name="currentAddress" required />
            </div>
            <InputField label="City" name="currentCity" required />
            <InputField label="State" name="currentState" required />
            <InputField label="Zip" name="currentZip" required />
            <InputField label="County" name="currentCounty" />
            <InputField label="Co-Borrower's Employer" name="coBorrowerEmployer" />
          </div>
        </section>

        {/* Previous Address */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Previous Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <InputField label="Address" name="previousAddress" />
            </div>
            <InputField label="City" name="previousCity" />
            <InputField label="State" name="previousState" />
            <InputField label="Zip" name="previousZip" />
            <InputField label="County" name="previousCounty" />
          </div>
        </section>

        {/* Additional Personal Details */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Additional Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Date of Birth" name="dateOfBirth" type="date" />
            <div>
              <label htmlFor="relationshipStatus" className="block text-sm font-medium text-gray-700 mb-1">
                Relationship Status
              </label>
              <select
                id="relationshipStatus"
                name="relationshipStatus"
                value={formData.relationshipStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="significant_other">Significant Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* Property Being Purchased */}
        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">Property Being Purchased</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <InputField label="Property Address" name="propertyAddress" />
            </div>
            <div className="md:col-span-2">
              <InputField label="Street Address" name="propertyStreetAddress" />
            </div>
            <InputField label="Loan Amount Requested ($)" name="loanAmountRequested" type="number" placeholder="0" />
            <InputField label="Earnest Rate" name="earnestRate" />
            <InputField label="Type of Loan" name="typeOfLoan" placeholder="e.g., Conventional, FHA, etc." />
          </div>
        </section>

        {/* Down Payment Information */}
        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">Down Payment Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-2">Recommended: 25% Down Payment</p>
                <p className="text-xs text-blue-700">Lower down payments available with adjusted rates</p>
              </div>
              <InputField label="Down Payment Amount ($)" name="downPayment" type="number" placeholder="0" />
              <InputField label="Source of Down Payment" name="sourceOfDownPayment" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Interest Rates by Down Payment</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-100 rounded">
                  <span className="font-medium text-gray-900">25% Down Payment</span>
                  <span className="font-bold text-green-700">8.5% Interest</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="font-medium text-gray-900">20% Down Payment</span>
                  <span className="font-bold text-gray-700">8.9% Interest</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="font-medium text-gray-900">15% Down Payment</span>
                  <span className="font-bold text-gray-700">9.5% Interest</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-100 rounded">
                  <span className="font-medium text-gray-900">10% Down Payment</span>
                  <span className="font-bold text-orange-700">10% Interest</span>
                </div>
                <p className="text-xs text-gray-600 mt-3 italic">*10% is the minimum down payment required</p>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Payment & Funds */}
        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">Loan Payment & Funds Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Source of Funds" name="sourceOfFunds" />
            <div>
              <label htmlFor="primaryResidence" className="block text-sm font-medium text-gray-700 mb-1">
                Will you occupy as Primary Residence?
              </label>
              <select
                id="primaryResidence"
                name="primaryResidence"
                value={formData.primaryResidence}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <InputField label="If no, what is current usage?" name="currentUsage" placeholder="e.g., 2nd home, investment" />
          </div>
        </section>

        {/* Household Budget */}
        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">Household Budget Worksheet</h3>
          <div className="mb-4">
            <InputField label="Number of People in the Home" name="numberOfPeople" type="number" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Monthly Income</h4>
              <div className="space-y-3">
                <InputField label="Primary Income ($)" name="primaryIncome" type="number" placeholder="0" />
                <InputField label="Secondary Income ($)" name="secondaryIncome" type="number" placeholder="0" />
                <InputField label="Alimony ($)" name="alimony" type="number" placeholder="0" />
                <InputField label="Child Support ($)" name="childSupport" type="number" placeholder="0" />
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Monthly Expenses</h4>
              <div className="space-y-3">
                <InputField label="Rent ($)" name="rent" type="number" placeholder="0" />
                <InputField label="Groceries ($)" name="groceries" type="number" placeholder="0" />
                <InputField label="Phone/TV ($)" name="phoneTv" type="number" placeholder="0" />
                <InputField label="Electricity ($)" name="electricity" type="number" placeholder="0" />
                <InputField label="Insurance ($)" name="insurance" type="number" placeholder="0" />
                <InputField label="Gas ($)" name="gas" type="number" placeholder="0" />
                <InputField label="Water ($)" name="water" type="number" placeholder="0" />
                <InputField label="Daycare ($)" name="daycare" type="number" placeholder="0" />
                <InputField label="Sewer ($)" name="sewer" type="number" placeholder="0" />
                <InputField label="Cable/Internet ($)" name="cableInternet" type="number" placeholder="0" />
                <InputField label="Cell Phone ($)" name="cellPhoneExpense" type="number" placeholder="0" />
                <InputField label="Miscellaneous ($)" name="misc" type="number" placeholder="0" />
                <InputField label="Food ($)" name="foodExpense" type="number" placeholder="0" />
                <InputField label="Credit Cards ($)" name="creditCards" type="number" placeholder="0" />
                <InputField label="School Loans ($)" name="schoolLoans" type="number" placeholder="0" />
                <InputField label="Car Payment ($)" name="carPayment" type="number" placeholder="0" />
                <InputField label="Visa ($)" name="visa" type="number" placeholder="0" />
              </div>
            </div>
          </div>
        </section>

        {/* Creditor's List */}
        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">Creditor's List</h3>
          <div className="space-y-4">
            {creditors.map((creditor, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 bg-gray-50 rounded-lg">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Creditor's Name
                  </label>
                  <input
                    type="text"
                    value={creditor.name}
                    onChange={(e) => handleCreditorChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Payment ($)
                  </label>
                  <input
                    type="number"
                    value={creditor.monthlyPayment}
                    onChange={(e) => handleCreditorChange(index, 'monthlyPayment', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Balance ($)
                  </label>
                  <input
                    type="number"
                    value={creditor.balance}
                    onChange={(e) => handleCreditorChange(index, 'balance', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  {creditors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCreditor(index)}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addCreditor}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Creditor
            </button>
          </div>
        </section>

        {/* Personal History */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Personal History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Criminal Conviction?" name="criminalConviction" />
            <InputField label="Currently Seek" name="currentlySeek" />
            <InputField label="Petition for Divorce?" name="petitionForDivorce" />
            <div className="md:col-span-2">
              <label htmlFor="reasonForBuying" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Buying
              </label>
              <textarea
                id="reasonForBuying"
                name="reasonForBuying"
                value={formData.reasonForBuying}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Current Bank Information */}
        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">Current Bank Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Bank Name" name="bankName" />
            <InputField label="Direct Payment" name="directPayment" />
            <InputField label="Email Name" name="emailName" />
            <InputField label="Current Annual Household" name="currentAnnualHousehold" />
            <InputField label="Loan Officer" name="loanOfficer" />
            <InputField label="Estimated Monthly Payment ($)" name="estimatedMonthlyPayment" type="number" placeholder="0" />
          </div>
        </section>

        {/* Signature */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Applicant Certification</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-700 mb-2">I certify that the information provided in this application is true and complete. I authorize verification of this information.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Applicant Signature (Type Full Name)" name="applicantSignature" required />
            <InputField label="Date" name="signatureDate" type="date" required />
          </div>
        </section>

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
          ) : 'Submit Credit Questionnaire'}
        </button>
      </form>
    </div>
  );
}
