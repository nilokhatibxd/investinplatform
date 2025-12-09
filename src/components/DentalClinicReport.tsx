import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  DollarSign, 
  Building2, 
  Shield, 
  ChevronRight, 
  Maximize, 
  Home 
} from 'lucide-react';

interface DentalClinicReportProps {
  variant?: 'desktop' | 'mobile' | 'split-screen';
  currency?: 'LBP' | 'USD';
}

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

const DentalClinicReport: React.FC<DentalClinicReportProps> = ({ variant = 'desktop', currency = 'LBP' }) => {
  // Determine styling based on variant
  const isMobile = variant === 'mobile';
  const isSplitScreen = variant === 'split-screen';
  
  const containerClass = isMobile ? 'max-w-none' : 'max-w-3xl mx-auto';
  const headerTextSize = isMobile ? 'text-lg' : 'text-2xl';
  const sectionSpacing = isMobile ? 'mb-6' : 'mb-8';
  const cardPadding = isMobile ? 'p-4' : variant === 'split-screen' ? 'p-5' : 'p-6';
  const ctaPadding = isMobile ? 'p-4' : variant === 'split-screen' ? 'p-5' : 'p-6';
  const statTextSize = isMobile ? 'text-lg' : 'text-2xl';
  const mapHeight = isMobile ? 'h-48' : isSplitScreen ? 'h-48' : 'h-64';
  
  // Animation hooks for each section
  const summaryAnim = useScrollAnimation();
  const mapAnim = useScrollAnimation();
  const populationAnim = useScrollAnimation();
  const healthAnim = useScrollAnimation();
  const propertyAnim = useScrollAnimation();
  const investmentAnim = useScrollAnimation();
  const tradeNamesAnim = useScrollAnimation();
  const timelineAnim = useScrollAnimation();
  const governmentAnim = useScrollAnimation();

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className={sectionSpacing}>
        <p className="text-xs text-gray-400 mb-3">{new Date().toLocaleDateString()}</p>
        <h1 className={`${headerTextSize} font-light text-gray-900`}>
          Private Dental Clinic in Hamra District
        </h1>
      </div>

      {/* Summary */}
      <div ref={summaryAnim.ref} className={`${sectionSpacing} scroll-fade-in ${summaryAnim.isVisible ? 'visible' : ''}`}>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Summary</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-800 leading-relaxed`}>
            Hamra is a university district with 12,000 students and residential families totaling 32,000 residents. Government data shows only 30 operational dental clinics serving the area, resulting in a 45% service gap. With 17,600 NSSF-insured residents and average wait times of 3 weeks, the district represents an underserved market for dental services.
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-2">Source: NSSF Claims Database, Municipality Census 2024</p>
      </div>

      {/* Location Map */}
      <div ref={mapAnim.ref} className={`${sectionSpacing} scroll-fade-in ${mapAnim.isVisible ? 'visible' : ''}`}>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Location & Competition</h2>
        <div className={`bg-gray-100 rounded-lg ${mapHeight} relative flex items-center justify-center border border-gray-200`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-gray-400`} />
          </div>
          <div className={`absolute top-4 left-4 bg-white rounded-lg ${isMobile ? 'p-2' : 'p-3'} shadow-sm`}>
            <p className="text-xs font-medium text-gray-900 mb-2">Hamra District</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-xs text-gray-600">Your location</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-xs text-gray-600">30 existing clinics</p>
              </div>
            </div>
          </div>
          <div className={`absolute bottom-4 right-4 bg-white rounded-lg ${isMobile ? 'p-1.5' : 'p-2'} shadow-sm`}>
            <p className="text-xs text-gray-500">1km radius • 30 competitors</p>
          </div>
        </div>
      </div>

      {/* Local Population Data */}
      <div ref={populationAnim.ref} className={`${sectionSpacing} scroll-fade-in ${populationAnim.isVisible ? 'visible' : ''}`}>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Local Population Data</h2>
        <div className={`grid grid-cols-2 gap-${isMobile ? '2' : '3'}`}>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding}`}>
            <p className={`${statTextSize} font-light text-gray-900`}>7,200</p>
            <p className="text-xs text-gray-600 font-medium">Families</p>
            <p className="text-xs text-gray-400 mt-1">Avg 4.4 members{isMobile ? '' : '/family'}</p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding}`}>
            <p className={`${statTextSize} font-light text-gray-900`}>5,760</p>
            <p className="text-xs text-gray-600 font-medium">Children (0-14)</p>
            <p className="text-xs text-gray-400 mt-1">18% of population</p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding}`}>
            <p className={`${statTextSize} font-light text-gray-900`}>12,000</p>
            <p className="text-xs text-gray-600 font-medium">University students</p>
            <p className="text-xs text-gray-400 mt-1">AUB + LAU</p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding}`}>
            <p className={`${statTextSize} font-light text-gray-900`}>3,840</p>
            <p className="text-xs text-gray-600 font-medium">Elderly (65+)</p>
            <p className="text-xs text-gray-400 mt-1">12% of population</p>
          </div>
        </div>
      </div>

      {/* Property CTA */}
      <div ref={propertyAnim.ref} className={`bg-indigo-50 border border-indigo-200 rounded-lg ${ctaPadding} ${sectionSpacing} scroll-fade-in ${propertyAnim.isVisible ? 'visible' : ''}`}>
        <div className={`flex items-start justify-between gap-${isMobile ? '2' : '3'}`}>
          <div className={`flex items-start gap-${isMobile ? '2' : '3'} flex-1`}>
            <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0`}>
              <MapPin className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-indigo-600`} />
            </div>
            <div>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-900 mb-1`}>View Available Properties</p>
              <p className="text-xs text-gray-600">
                {isMobile ? '6 pre-qualified spaces in Hamra.' : '6 pre-qualified commercial spaces meet healthcare facility requirements in Hamra.'}
              </p>
            </div>
          </div>
          <button className={`text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-white px-${isMobile ? '2' : '3'} py-1 rounded border border-indigo-200 hover:bg-indigo-50 transition-colors flex-shrink-0`}>
            View All →
          </button>
        </div>
      </div>

      {/* Population Health Profile */}
      <div ref={healthAnim.ref} className={`${sectionSpacing} scroll-fade-in ${healthAnim.isVisible ? 'visible' : ''}`}>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Population Health Profile</h2>
        <div className={`grid grid-cols-2 gap-${isMobile ? '2' : '3'}`}>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding} hover:shadow-sm transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`${statTextSize} font-light text-gray-900`}>85%</p>
              {!isMobile && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Children</span>}
            </div>
            <p className="text-xs text-gray-600">{isMobile ? 'Children caries' : 'Caries prevalence (5-15 years)'}</p>
            <p className="text-xs text-red-600 mt-1">↑ 7%</p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding} hover:shadow-sm transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`${statTextSize} font-light text-gray-900`}>92%</p>
              {!isMobile && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Adults</span>}
            </div>
            <p className="text-xs text-gray-600">{isMobile ? 'Adult periodontal' : 'Periodontal disease (35+)'}</p>
            <p className="text-xs text-orange-600 mt-1">↑ 12%</p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding} hover:shadow-sm transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`${statTextSize} font-light text-gray-900`}>2</p>
              {!isMobile && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Pediatric</span>}
            </div>
            <p className="text-xs text-gray-600">{isMobile ? 'Pediatric specialists' : 'Specialists for 5,760 children'}</p>
            <p className="text-xs text-purple-600 mt-1">↓ 85%</p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding} hover:shadow-sm transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`${statTextSize} font-light text-gray-900`}>0</p>
              {!isMobile && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Geriatric</span>}
            </div>
            <p className="text-xs text-gray-600">{isMobile ? 'Geriatric specialists' : 'Specialists for 3,840 elderly'}</p>
            <p className="text-xs text-gray-500 mt-1">—</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">{isMobile ? 'Source: MoPH Surveillance Unit, Q3 2024' : 'Source: MoPH Epidemiological Surveillance Unit, Q3 2024'}</p>
      </div>

      <div className="border-t border-gray-200 mb-8"></div>

      {/* Investment Analysis */}
      <div ref={investmentAnim.ref} className={`${sectionSpacing} scroll-fade-in ${investmentAnim.isVisible ? 'visible' : ''}`}>
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Investment Analysis</h2>
        
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-900 mb-3`}>
          {isMobile ? 'Based on 12 recent clinic openings:' : 'Based on 12 recent clinic openings in similar districts:'}
        </p>
        <div className={`grid grid-cols-3 gap-${isMobile ? '2' : '3'} mb-4`}>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding} text-center hover:shadow-sm transition-shadow`}>
            <DollarSign className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-gray-400 mx-auto mb-${isMobile ? '1' : '2'}`} />
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-light`}>
              {currency === 'LBP' ? 'L£8.9-13.4B' : '$100-150K'}
            </p>
            <p className="text-xs text-gray-600">{isMobile ? 'Capital' : 'Initial capital'}</p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding} text-center hover:shadow-sm transition-shadow`}>
            <Maximize className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-gray-400 mx-auto mb-${isMobile ? '1' : '2'}`} />
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-light`}>80-120m²</p>
            <p className="text-xs text-gray-600">{isMobile ? 'Space' : 'Space required'}</p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-lg ${cardPadding} text-center hover:shadow-sm transition-shadow`}>
            <Home className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-gray-400 mx-auto mb-${isMobile ? '1' : '2'}`} />
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-light`}>
              {currency === 'LBP' 
                ? (isMobile ? 'L£72-161M' : 'L£72-161M')
                : (isMobile ? '$800-1.8K' : '$800-1,800')}
            </p>
            <p className="text-xs text-gray-600">{isMobile ? 'Rent' : 'Monthly rent'}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400">Source: Commercial Registry, Real Estate Database</p>

        <div className="mb-4"></div>

        {/* Loan Program CTA */}
        <div className={`bg-green-50 border border-green-200 rounded-lg ${ctaPadding}`}>
          <div className={`flex items-start justify-between gap-${isMobile ? '2' : '3'}`}>
            <div className={`flex items-start gap-${isMobile ? '2' : '3'} flex-1`}>
              <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-green-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                <Building2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-green-600`} />
              </div>
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-900 mb-1`}>Access Subsidized Healthcare Loan</p>
                <p className="text-xs text-gray-600">
                  {isMobile ? '3.5% interest rate through Central Bank circular 578.' : '3.5% interest rate through Central Bank circular 578 for healthcare facilities.'}
                </p>
              </div>
            </div>
            <button className={`text-xs font-medium text-green-600 hover:text-green-700 bg-white px-${isMobile ? '2' : '3'} py-1 rounded border border-green-200 hover:bg-green-50 transition-colors flex-shrink-0`}>
              View All Incentives →
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-8"></div>

      {/* Trade Name Suggestions */}
      <div ref={tradeNamesAnim.ref} className={`${sectionSpacing} scroll-fade-in ${tradeNamesAnim.isVisible ? 'visible' : ''}`}>
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Available Trade Names
        </h2>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 mb-3`}>
          <button className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-300 transition-all group">
            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">Hamra Dental Excellence</p>
            <p className="text-xs text-gray-500">Available • No conflicts</p>
          </button>
          <button className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-300 transition-all group">
            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">Cedar Smile Clinic</p>
            <p className="text-xs text-gray-500">Available • No conflicts</p>
          </button>
          <button className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-300 transition-all group">
            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">Beirut Modern Dental</p>
            <p className="text-xs text-gray-500">Available • No conflicts</p>
          </button>
          <button className="text-left bg-white border-2 border-dashed border-gray-300 rounded-lg p-3 hover:bg-gray-50 hover:border-gray-400 transition-all">
            <p className="text-sm font-medium text-gray-600">Choose Your Own Name</p>
            <p className="text-xs text-gray-400">Verification in 4 hours</p>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-8"></div>

      {/* Realistic Licensing Process */}
      <div ref={timelineAnim.ref} className={`${sectionSpacing} scroll-fade-in ${timelineAnim.isVisible ? 'visible' : ''}`}>
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          {isMobile ? 'Licensing Timeline' : 'Dental Clinic Licensing Process'}
        </h2>
        
        {isMobile ? (
          // Mobile compact version
          <div className="space-y-2">
            <div className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
              <span className="text-xs font-medium">MoPH License</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">3-5 days</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
              <span className="text-xs font-medium">Commercial Registration</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">2 days</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
              <span className="text-xs font-medium">Equipment Import Permits</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">7 days</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
              <span className="text-xs font-medium">Municipal License</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">1 day</span>
            </div>
          </div>
        ) : (
          // Desktop detailed version
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lease Agreement & Location Approval</p>
                    <p className="text-xs text-gray-600 mt-1">Signed lease + Municipality zoning approval</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">2-3 days</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">MoPH Healthcare License</p>
                    <p className="text-xs text-gray-600 mt-1">Clinical practice permit + Syndicate registration</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">3-5 days</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Commercial Registration</p>
                    <p className="text-xs text-gray-600 mt-1">Business Registry + Tax ID + NSSF</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">2 days</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Equipment & Import Permits</p>
                    <p className="text-xs text-gray-600 mt-1">Medical device licenses + Customs clearance</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">7-10 days</span>
              </div>
            </div>
          </div>
        )}
        
        <p className="text-xs text-gray-400 mt-3">
          {isMobile ? 'Total: 15-20 business days' : 'Total timeline: 15-20 business days (expedited through Investment Authority)'}
        </p>
        
        {/* Pre-Submit Application */}
        <div className={`bg-purple-50 border border-purple-200 rounded-lg ${ctaPadding} mt-4`}>
          <div className={`flex items-start justify-between gap-${isMobile ? '2' : '3'}`}>
            <div className={`flex items-start gap-${isMobile ? '2' : '3'} flex-1`}>
              <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                <Shield className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-purple-600`} />
              </div>
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-900 mb-1`}>Pre-Submit Your Application</p>
                <p className="text-xs text-gray-600">
                  {isMobile ? 'Reserve business name and start verification now.' : 'Reserve business name and start document verification now.'}
                </p>
              </div>
            </div>
            <button className={`text-xs font-medium text-purple-600 hover:text-purple-700 bg-white px-${isMobile ? '2' : '3'} py-1 rounded border border-purple-200 hover:bg-purple-50 transition-colors flex-shrink-0`}>
              Start Application →
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-8"></div>

      {/* Additional Services */}
      <div className={sectionSpacing}>
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">You May Also Be Interested In</h2>
        
        <div className={`${isMobile ? 'space-y-2' : 'grid grid-cols-2 gap-3'}`}>
          <button className="w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-3 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-900 mb-1">NSSF Provider Network</p>
                <p className="text-xs text-gray-600">Join preferred provider list</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </button>
          <button className="w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-3 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-900 mb-1">Equipment Import License</p>
                <p className="text-xs text-gray-600">Duty exemption available</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </button>
          {!isMobile && (
            <>
              <button className="w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-3 transition-colors group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-900 mb-1">Staff Recruitment Portal</p>
                    <p className="text-xs text-gray-600">Access qualified workers</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </button>
              <button className="w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-3 transition-colors group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-900 mb-1">Healthcare Insurance</p>
                    <p className="text-xs text-gray-600">Professional liability coverage</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div ref={governmentAnim.ref} className={`space-y-2 mb-8 scroll-fade-in ${governmentAnim.isVisible ? 'visible' : ''}`}>
        <button className="w-full bg-gray-900 text-white py-3 rounded-full text-sm font-medium">
          Start Your Clinic in Hamra
        </button>
        <button className="w-full bg-white text-gray-900 py-3 rounded-full border-2 border-gray-900 text-sm font-medium">
          Explore More Locations
        </button>
      </div>
    </div>
  );
};

export default DentalClinicReport;