import { useState, useEffect } from 'react';
import { Building, Stethoscope, Activity, CheckCircle, Wallet, Check, FileText, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface PermitsCanvasProps {
  variant: 'mobile' | 'desktop' | 'split-screen';
  currency: 'LBP' | 'USD';
  onApply?: () => void;
  onConfirmDocuments?: () => void;
}

const PermitsCanvas = ({ variant, currency, onApply, onConfirmDocuments }: PermitsCanvasProps) => {
  const [applicationStep, setApplicationStep] = useState<'documents' | 'review' | 'applying' | 'complete'>('documents');
  const [selectedPermits, setSelectedPermits] = useState<number[]>([1, 2, 3]); // All selected by default
  const [isLoading, setIsLoading] = useState(true);
  const [showDocuments, setShowDocuments] = useState(false);
  const [documentsConfirmed, setDocumentsConfirmed] = useState(false);

  // Smooth loading effect like scenario 1
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const permits = [
    {
      id: 1,
      title: 'Municipal Use & Occupancy',
      subtitle: 'Clinic Unit',
      ministry: 'Municipality of Beirut',
      description: 'Allows your unit to operate as a medical facility with proper zoning approval.',
      cost: currency === 'LBP' ? '1,790,000' : '20',
      costLabel: currency === 'LBP' ? 'LBP' : 'USD',
      icon: Building
    },
    {
      id: 2,
      title: 'MoPH Clinical Readiness',
      subtitle: 'Health Standards',
      ministry: 'Ministry of Public Health',
      description: 'Confirms compliance with infection control and sterilization requirements.',
      cost: currency === 'LBP' ? '1,790,000' : '20',
      costLabel: currency === 'LBP' ? 'LBP' : 'USD',
      icon: Stethoscope
    },
    {
      id: 3,
      title: 'Radiation Safety',
      subtitle: 'X-ray Equipment',
      ministry: 'Lebanese Atomic Energy',
      description: 'Required registration for clinics using X-ray diagnostic equipment.',
      cost: currency === 'LBP' ? '1,790,000' : '20',
      costLabel: currency === 'LBP' ? 'LBP' : 'USD',
      icon: Activity
    }
  ];

  const calculateTotal = () => {
    const selected = permits.filter(p => selectedPermits.includes(p.id));
    const sum = selected.reduce((acc, p) => acc + parseFloat(p.cost.replace(',', '')), 0);
    if (currency === 'LBP') {
      return `${sum.toLocaleString()} LBP`;
    }
    return `$${sum.toFixed(2)} USD`;
  };

  const togglePermit = (id: number) => {
    setSelectedPermits(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleBulkApply = () => {
    setApplicationStep('applying');
    setTimeout(() => {
      setApplicationStep('complete');
      if (onApply) onApply();
    }, 3000);
  };

  const textSize = variant === 'mobile' ? 'text-sm' : 'text-base';
  const headerSize = variant === 'mobile' ? 'text-lg' : 'text-xl';

  if (applicationStep === 'applying') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="space-y-3">
            {['Municipality', 'MoPH', 'Radiation Compliance'].map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center gap-2 transition-all duration-500`}
                style={{ animationDelay: `${idx * 500}ms` }}
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-fadeIn">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className={`${textSize} text-gray-700`}>
                  {idx === 0 && 'Applying to Municipality...'}
                  {idx === 1 && 'Submitting to MoPH...'}
                  {idx === 2 && 'Registering Radiation Compliance...'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (applicationStep === 'complete') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h3 className={`${headerSize} font-semibold text-gray-900`}>All Set!</h3>
            <p className={`${textSize} text-gray-600 mt-2`}>
              Your applications have been submitted successfully.
              <br />
              I'll notify you as soon as each authority responds.
            </p>
          </div>
          <p className={`${textSize} text-gray-500`}>
            You currently have <span className="font-medium text-gray-900">0 pending actions</span>
          </p>
        </div>
      </div>
    );
  }

  // Documents that will be submitted
  const documents = [
    { name: 'Company Formation.pdf', size: '2.3 MB' },
    { name: 'Business Plan.pdf', size: '1.8 MB' },
    { name: 'Property Lease.pdf', size: '450 KB' },
    { name: 'Floor Plans.pdf', size: '3.2 MB' },
    { name: 'Equipment List.xlsx', size: '120 KB' }
  ];

  if (isLoading) {
    return (
      <div className="relative min-h-[500px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500">Loading permits...</p>
        </div>
      </div>
    );
  }

  // Document Verification Step
  if (applicationStep === 'documents') {
    return (
      <div className="relative min-h-[500px] animate-fadeInUp">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className={`${headerSize} font-semibold text-gray-900 mb-2`}>
              Document Verification
            </h2>
            <p className={`${textSize} text-gray-600`}>
              Please review the documents from your vault before you proceed with permit applications.
            </p>
          </div>

          {/* Documents List */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      // Open file browser
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.pdf,.xlsx,.doc,.docx';
                      input.click();
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors group"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={documentsConfirmed}
                onChange={(e) => setDocumentsConfirmed(e.target.checked)}
                className="mt-0.5 w-5 h-5 text-gray-900 border-gray-300 rounded-full focus:ring-gray-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                I confirm these documents are correct and ready for submission
              </span>
            </label>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (onConfirmDocuments) {
                  onConfirmDocuments();
                }
              }}
              disabled={!documentsConfirmed}
              className={`w-48 py-3 px-6 rounded-full text-sm font-medium transition-all ${
                documentsConfirmed 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm & Apply
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Permits Review Step
  if (applicationStep === 'review') {
    return (
      <div className="relative min-h-[500px] animate-fadeInUp">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className={`${headerSize} font-semibold text-gray-900 mb-2`}>
            Pending Operational Permits
          </h2>
          <div className="flex items-center justify-between">
            <p className={`${textSize} text-gray-600`}>
              Select the permits you want to apply for. All documents are ready for submission.
            </p>
            <button
              onClick={() => setSelectedPermits(selectedPermits.length === permits.length ? [] : permits.map(p => p.id))}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              {selectedPermits.length === permits.length ? 'Deselect all' : 'Select all'}
            </button>
          </div>
        </div>

        {/* Permits Grid */}
        <div className={`grid ${variant === 'mobile' ? 'grid-cols-1 gap-4' : variant === 'split-screen' ? 'grid-cols-3 gap-4' : 'grid-cols-2 gap-6'} mb-20`}>
          {permits.map((permit) => {
            const Icon = permit.icon;
            const isSelected = selectedPermits.includes(permit.id);
            
            return (
              <button
              key={permit.id}
              onClick={() => togglePermit(permit.id)}
              className={`relative text-left p-6 rounded-2xl border transition-all ${
                isSelected 
                  ? 'border-gray-200 bg-white shadow-sm' 
                  : 'border-gray-200 bg-gray-50 hover:bg-white hover:shadow-sm'
              }`}
            >
              {/* Selection Circle */}
              <div className="absolute top-4 right-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'border-gray-900 bg-gray-900' 
                    : 'border-gray-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
              
              {/* Icon */}
              <div className="mb-4">
                <Icon className="w-8 h-8 text-gray-600" />
              </div>
              
              {/* Title and Ministry */}
              <h3 className="font-semibold text-gray-900 mb-1">
                {permit.title}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {permit.ministry}
              </p>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">
                {permit.description}
              </p>
              
              {/* Price */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light text-gray-900">{permit.cost}</span>
                  <span className="text-sm text-gray-500">{permit.costLabel}</span>
                </div>
              </div>
              </button>
            );
          })}
        </div>

        {/* Document Review Section */}
        {selectedPermits.length > 0 && (
          <div className="mt-8 mb-6">
            <button
              onClick={() => setShowDocuments(!showDocuments)}
              className="w-full flex items-center justify-between text-left group"
            >
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Documents to be submitted</span>
              <span className="text-xs text-gray-400">({documents.length} files)</span>
            </div>
            {showDocuments ? (
              <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            )}
          </button>
          
          {showDocuments && (
            <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 animate-fadeIn">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 py-1">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 flex-1">{doc.name}</span>
                  <span className="text-xs text-gray-400">{doc.size}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

        {/* Apply Button */}
        {selectedPermits.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleBulkApply}
              className="w-60 py-3 px-6 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Apply
              </span>
              <span className="font-semibold">{calculateTotal()}</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Should not reach here
  return null;
};

export default PermitsCanvas;