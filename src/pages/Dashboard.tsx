import { useState, useEffect, useRef } from 'react';
import DentalClinicReport from '../components/DentalClinicReport';
import { 
  Users,
  Package,
  FileCheck,
  Receipt,
  FileText,
  Building2,
  Plus,
  Circle,
  ChevronRight,
  Mic,
  MicOff,
  Paperclip,
  Search,
  X,
  Bell,
  Shield,
  AudioWaveform,
  Zap,
  Menu,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ArrowUp,
  Download,
  Expand,
  MapPin,
  DollarSign,
  Home,
  Maximize
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [activeFlow, setActiveFlow] = useState('landing');
  const [selectedAgent, setSelectedAgent] = useState('PRO');
  const [isRecording, setIsRecording] = useState(false);
  const [showVault, setShowVault] = useState(false);
  const [showVideoChat, setShowVideoChat] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedDocuments, setSelectedDocuments] = useState<{name: string; type: string; size: string; lastModified: string}[]>([]);
  const [attachedDocuments, setAttachedDocuments] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('Business Setup');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isSplitScreen, setIsSplitScreen] = useState(false);
  
  // Scenario management
  const [currentScenario, setCurrentScenario] = useState(1); // 1 = Pre-Investment, 3-4 = Logged in scenarios
  const [, setIsLoggedIn] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'assistant' | 'user' | 'canvas' | 'thinking'; content: any}>>([
    {role: 'assistant', content: "Welcome.\nLet's explore what you can build today."}
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [businesses, setBusinesses] = useState<Array<{id: string; name: string; timestamp: Date}>>([]);
  const [, setSelectedBusinessId] = useState<string | null>(null);
  const [showBusinessSidebar, setShowBusinessSidebar] = useState(false);
  const defaultMessage = "I want to open a private dental clinic in Hamra";
  const [inputValue, setInputValue] = useState('');
  
  // Check if canvas is showing on mobile
  const hasCanvasMessage = chatMessages.some(msg => msg.role === 'canvas');
  const isCanvasFullscreen = isMobile && hasCanvasMessage && chatMessages.length > 1;
  
  // Suggestion cards based on agent type - Pre-Investment questions
  const suggestionCardsByAgent: Record<string, string[]> = {
    'PRO': [
      "Which business sectors are growing fastest in Beirut right now?",
      "Show areas in Beirut with high customer flow and lower rental pressure.",
      "What are the quickest sectors to launch in Lebanon today?"
    ],
    'HR': [
      "What roles are most commonly needed for small businesses in Beirut?",
      "Show typical salary ranges across different sectors.",
      "How much should I budget monthly for employees in Beirut?"
    ],
    'TRADE': [
      "Which sectors in Lebanon depend heavily on imports?",
      "What products are easiest to bring into the country today?",
      "How does the FX rate impact operational expenses?"
    ],
    'LICENSE': [
      "Which activities require licenses in Lebanon?",
      "Show business categories with the simplest approval processes.",
      "Where in Beirut is commercial activity easiest to authorize?"
    ],
    'TAX': [
      "What taxes do small businesses in Lebanon typically pay?",
      "How much should entrepreneurs usually set aside for taxes?",
      "Which sectors commonly register for VAT?"
    ]
  };

  const suggestionCards = suggestionCardsByAgent[selectedAgent] || suggestionCardsByAgent['PRO'];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Show sidebar on desktop by default, hide on mobile
      if (!mobile) {
        setShowBusinessSidebar(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  // Set default message for Scenario 1
  useEffect(() => {
    if (currentScenario === 1 && chatMessages.length === 1) {
      setInputValue(defaultMessage);
    }
  }, [currentScenario]);

  // Agents/Departments
  const agents = [
    { id: 'PRO', name: 'PRO', description: 'Professional Services & Operations' },
    { id: 'HR', name: 'Human resources', description: 'Human Resources & Employee Services' },
    { id: 'TRADE', name: 'Trade', description: 'Import & Export Expert' },
    { id: 'LICENSE', name: 'Licensing', description: 'Business Licensing Specialist' },
    { id: 'TAX', name: 'Tax', description: 'Financial Compliance Expert' }
  ];

  // Mock Government Documents
  const documents: Record<string, {name: string; type: string; size: string; lastModified: string}[]> = {
    'Business Setup': [
      { name: 'Commercial Registry', type: 'PDF', size: '2.1 MB', lastModified: '2024-03-15' },
      { name: 'Business Registration Certificate', type: 'PDF', size: '1.8 MB', lastModified: '2024-01-20' },
      { name: 'Articles of Incorporation', type: 'PDF', size: '3.2 MB', lastModified: '2024-01-15' }
    ],
    'Employee Visas': [
      { name: 'Sarah Ahmed - Work Permit', type: 'PDF', size: '1.2 MB', lastModified: '2024-02-10' },
      { name: 'John Smith - Visa Copy', type: 'PDF', size: '900 KB', lastModified: '2024-01-25' },
      { name: 'Maria Garcia - Lebanese ID', type: 'PDF', size: '1.1 MB', lastModified: '2024-02-05' },
      { name: 'Ahmed Hassan - Labor Permit', type: 'PDF', size: '1.3 MB', lastModified: '2024-01-30' }
    ],
    'Tax & Compliance': [
      { name: 'TVA Registration Certificate', type: 'PDF', size: '1.5 MB', lastModified: '2024-01-10' },
      { name: 'Tax Registration', type: 'PDF', size: '2.0 MB', lastModified: '2024-01-08' },
      { name: 'Audit Report 2023', type: 'PDF', size: '4.7 MB', lastModified: '2024-02-01' }
    ],
    'Import Documents': [
      { name: 'Import License', type: 'PDF', size: '1.8 MB', lastModified: '2024-02-20' },
      { name: 'Customs Declaration - Electronics', type: 'PDF', size: '2.3 MB', lastModified: '2024-03-01' },
      { name: 'Certificate of Origin', type: 'PDF', size: '1.1 MB', lastModified: '2024-02-28' }
    ]
  };

  // Notifications
  const notifications = [
    { id: 1, title: 'Application #VR-2024-1127 visa renewal due for Ahmed Hassan', time: '2 hrs ago', type: 'urgent' },
    { id: 2, title: 'Shipment #SH-445821 cleared customs - electronics import', time: '4 hrs ago', type: 'success' },
    { id: 3, title: 'License #TL-2024-9987 renewal reminder - 30 days remaining', time: 'Today', type: 'warning' },
    { id: 4, title: 'TVA Filing #TVA-Q4-2024 available for submission', time: 'Yesterday', type: 'info' },
    { id: 5, title: 'Visa #EV-2024-3341 approved for Maria Garcia - Tech Specialist', time: 'Yesterday', type: 'success' }
  ];

  // Government Feed Updates - commented out as not used
  /*
  const feedUpdates = [
    { 
      id: 1, 
      entity: 'Beirut Digital District', 
      abbr: 'ADGM',
      title: 'New FinTech regulations allowing 100% foreign ownership for qualifying startups', 
      time: '1 hr ago',
      type: 'policy' 
    },
    { 
      id: 2, 
      entity: 'Department of Economic Development', 
      abbr: 'DED',
      title: 'Digital business registration platform launched - setup time reduced to 24 hours', 
      time: '3 hrs ago',
      type: 'service' 
    },
    { 
      id: 3, 
      entity: 'IDAL - Investment Development Authority', 
      abbr: 'ADIO',
      title: 'USD 400M fund introduced for international tech startups investing in Lebanon', 
      time: '6 hrs ago',
      type: 'funding' 
    },
    { 
      id: 4, 
      entity: 'Ministry of Economy', 
      abbr: 'MOE',
      title: 'New trade agreements signed with 5 European countries - reduced import tariffs', 
      time: 'Today',
      type: 'trade' 
    }
  ];
  */

  const handleDocumentSelect = (doc: {name: string; type: string; size: string; lastModified: string}, folder: string) => {
    const docWithFolder = { ...doc, folder };
    if (selectedDocuments.find(d => d.name === doc.name)) {
      setSelectedDocuments(selectedDocuments.filter(d => d.name !== doc.name));
    } else {
      setSelectedDocuments([...selectedDocuments, docWithFolder]);
    }
  };

  const handleAddDocuments = () => {
    setAttachedDocuments([...attachedDocuments, ...selectedDocuments]);
    setSelectedDocuments([]);
    setShowVault(false);
  };

  // Main action cards for the landing screen
  const actionCards = [
    {
      id: 'visas-people',
      icon: Users,
      title: 'People & Visas',
      description: 'Manage employee visas, work permits, and immigration services',
      badge: 'URGENT',
      badgeColor: 'bg-orange-500/10 text-orange-700 border-orange-200',
      gradient: 'from-gray-50 to-gray-100 border-gray-200',
      highlight: '5 renewals due',
      onClick: () => setActiveFlow('people')
    },
    {
      id: 'trade-import',
      icon: Package,
      title: 'Trade & Imports',
      description: 'Handle shipments, customs clearance, and trade documentation',
      badge: 'ACTIVE',
      badgeColor: 'bg-gray-500/10 text-gray-700 border-gray-200',
      gradient: 'from-emerald-50 to-green-50 border-emerald-200',
      highlight: '2 shipments in transit',
      onClick: () => setActiveFlow('trade')
    },
    {
      id: 'licensing',
      icon: FileCheck,
      title: 'Business Licensing',
      description: 'Renew licenses, expand operations, and handle regulatory compliance',
      badge: 'UPCOMING',
      badgeColor: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
      gradient: 'from-purple-50 to-violet-50 border-purple-200',
      highlight: 'Trade license renewal in 45 days',
      onClick: () => setActiveFlow('licensing')
    },
    {
      id: 'finance-tax',
      icon: Receipt,
      title: 'Finance & Tax',
      description: 'TVA filings, financial compliance, and government fee payments',
      badge: 'CURRENT',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
      gradient: 'from-gray-50 to-slate-50 border-gray-200',
      highlight: 'All current • 94% compliance',
      onClick: () => setActiveFlow('finance')
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-50/30 via-blue-50/20 to-white">
      {/* Mobile Header - Hide when canvas is fullscreen */}
      {isMobile && !isCanvasFullscreen && (
        <>
          {/* Fade gradient overlay */}
          <div className="fixed top-0 left-0 right-0 z-40 h-32 bg-gradient-to-b from-white via-white/95 to-transparent pointer-events-none"></div>
          
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50">
          <div className="flex items-center justify-between p-4">
            {/* Logo and Menu - Always visible */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowBusinessSidebar(!showBusinessSidebar)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                {showBusinessSidebar ? (
                  <ChevronLeft className="w-5 h-5 text-gray-900" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-900" />
                )}
              </button>
              <img 
                src="/logo.svg" 
                alt="Invest in Lebanon" 
                className="h-10 w-auto"
              />
              {currentScenario !== 1 && (
                <div className="relative group">
                  <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <span>All Locations</span>
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Right Icons */}
            <div className="flex items-center gap-2">
              {(currentScenario === 1) ? (
                // Scenarios 1 & 2: Only show Login button
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-medium"
                >
                  Login
                </button>
              ) : (
                <>
                  {/* Search */}
                  <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  {/* Notifications */}
                  <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  </button>
                  
                  {/* Profile */}
                  <button className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </button>
                  
                  {/* Burger Menu */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center ml-1"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5 text-gray-900" />
                    ) : (
                      <Menu className="w-5 h-5 text-gray-900" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        </>
      )}

      {/* Mobile Menu Overlay - Hidden in Scenario 1 and when canvas is fullscreen */}
      {isMobile && isMobileMenuOpen && currentScenario !== 1 && !isCanvasFullscreen && (
        <div className="fixed inset-0 bg-white/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-xl z-50" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 pt-20">
              <div className="space-y-4">
                {actionCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      onClick={() => {
                        card.onClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gray-900" />
                      </div>
                      <p className="font-medium text-gray-900 text-base">{card.title}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header for Scenarios 1 and 2 */}
      {!isMobile && !isSplitScreen && (currentScenario === 1) && (
        <>
          {/* Fade gradient overlay for desktop */}
          <div className="fixed top-0 left-0 right-0 z-40 h-32 bg-gradient-to-b from-white via-white/90 to-transparent pointer-events-none"></div>
          
          <div className={`fixed top-6 ${showBusinessSidebar ? 'left-72' : 'left-6'} right-6 z-50 flex items-center justify-between`}>
          {/* Invest In Lebanon Branding - Left aligned */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
              Invest In Lebanon
            </h1>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* What's New Icon */}
            <div className="relative group">
              <button className="w-14 h-14 bg-white rounded-full border border-gray-200/20 flex items-center justify-center hover:bg-white transition-all shadow-sm">
                <Zap className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">What's New</h3>
                    <button className="text-xs text-gray-400 hover:text-gray-600 font-medium flex items-center gap-1">
                      View all
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto p-4">
                  <p className="text-sm text-gray-500">Updates coming soon...</p>
                </div>
              </div>
            </div>
            
            {/* Login Button */}
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="px-6 py-2 bg-gray-100 text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
        </>
      )}

      {/* Desktop Company Dropdown - Top Left for logged in scenarios 3-6 */}
      {!isMobile && currentScenario >= 3 && (
        <div className="fixed top-6 left-72 z-50">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/50 px-4 py-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-gray-900 rotate-45" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Right Health Clinic</p>
          </div>
          <div className="pl-3 border-l border-gray-200">
            <div className="relative group">
              <button className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors">
                <span>All Locations</span>
                <ChevronRight className="w-3 h-3 rotate-90" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <div className="p-2">
                  <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Al Raha Branch</p>
                        <p className="text-xs text-gray-500">Building 12, Al Raha Beach</p>
                        <p className="text-xs text-gray-400">DEWA: 1234567890</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Khalifa City Clinic</p>
                        <p className="text-xs text-gray-500">Tower 5, Khalifa City</p>
                        <p className="text-xs text-gray-400">DEWA: 0987654321</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Desktop Floating Icon Navigation - Hidden */}
      {!isMobile && currentScenario === 999 && (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-full p-3">
          <div className="space-y-3">
            {actionCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={card.onClick}
                  className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all group"
                  title={card.title}
                >
                  <Icon className="w-5 h-5 text-gray-900" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* Floating RSS Feeds and Notifications - Desktop Only - Only for logged in scenarios */}
      {!isMobile && currentScenario >= 3 && (
      <div className="fixed top-6 right-6 z-40 flex items-center gap-4">
        {/* RSS Feeds */}
        <div className="relative group">
          <button className="w-14 h-14 bg-white rounded-full border border-gray-200/20 flex items-center justify-center hover:bg-white transition-all shadow-sm">
            <Zap className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          </button>
          
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">What's New</h3>
                <button className="text-xs text-gray-400 hover:text-gray-600 font-medium flex items-center gap-1">
                  View all
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto p-4">
              <p className="text-sm text-gray-500">Updates coming soon...</p>
            </div>
          </div>
        </div>
        
        {/* Search Icon */}
        <div className="relative group">
          <button className="w-14 h-14 bg-white rounded-full border border-gray-200/20 flex items-center justify-center hover:bg-white transition-all shadow-sm">
            <Search className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
          </button>
        </div>
        
        {/* Notifications */}
        <div className="relative group">
          <button className="w-14 h-14 bg-white rounded-full border border-gray-200/20 flex items-center justify-center hover:bg-white transition-all shadow-sm">
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
          </button>
          
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <button className="text-xs text-gray-400 hover:text-gray-600 font-medium flex items-center gap-1">
                  View all
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 leading-relaxed mb-2">{notification.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">DED</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0 self-center" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Ahmed Al-Rashid</p>
            <p className="text-xs text-gray-500">Managing Director</p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Dot Grid Menu - Far Right */}
        <button 
          onClick={() => setShowSidebar(true)}
          className="w-12 h-12 bg-white rounded-full border-2 border-white flex items-center justify-center hover:bg-white transition-all shadow-sm group"
        >
          <div className="grid grid-cols-3 gap-1">
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></div>
          </div>
        </button>
      </div>
      )}

      {/* Mobile Overlay for Sidebar - Hide when canvas is fullscreen */}
      {isMobile && showBusinessSidebar && !isCanvasFullscreen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setShowBusinessSidebar(false)}
        />
      )}

      {/* ChatGPT-style Sidebar - Hide when canvas is fullscreen on mobile */}
      {showBusinessSidebar && !isSplitScreen && !isCanvasFullscreen && (
        <div className={`fixed left-0 top-0 ${isMobile ? 'w-72' : 'w-64'} h-full bg-gray-100 text-gray-900 z-40 flex flex-col ${
          isMobile ? 'shadow-2xl transform transition-transform' : ''
        }`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between w-full">
              {currentScenario !== 1 && (
                <img 
                  src="/logo.svg" 
                  alt="Invest in Lebanon" 
                  className="h-8 w-auto"
                />
              )}
              {currentScenario === 1 && <div />}
              <button 
                onClick={() => {
                  // Navigate to first scenario
                  setChatMessages([{role: 'assistant', content: "Welcome.\nLet's explore what you can build today."}]);
                  setBusinesses([]);
                  setSelectedBusinessId(null);
                  setCurrentScenario(1);
                }}
                className="w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Scenario Chats */}
          <div className="p-2 border-b border-gray-200">
            <div className="space-y-1">
              {/* Scenario 1: Tech Startup */}
              <button
                onClick={() => {
                  setCurrentScenario(1);
                  setChatMessages([{role: 'assistant', content: "Welcome.\nLet's explore what you can build today."}]);
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentScenario === 1 
                    ? 'bg-white border border-gray-300' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900 truncate flex-1">Scenario 1</span>
                  <span className="text-xs text-gray-400 ml-2">2:30 PM</span>
                </div>
              </button>
              
              {/* Scenario 2: Renewable Energy - Coming Soon */}
              <div
                className="w-full text-left p-3 rounded-lg bg-gray-50 opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 truncate flex-1">Scenario 2</span>
                  <span className="text-xs text-gray-400 ml-2">Coming soon!</span>
                </div>
              </div>
              
              {/* Scenario 3: Tourism & Hotels - Coming Soon */}
              <div
                className="w-full text-left p-3 rounded-lg bg-gray-50 opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 truncate flex-1">Scenario 3</span>
                  <span className="text-xs text-gray-400 ml-2">Coming soon!</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Empty space for additional content */}
          <div className="flex-1"></div>
          
          <div className="p-3 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <div className="mb-1">Powered by Government of Lebanon</div>
              <div className="flex items-center justify-center gap-3">
                <button className="hover:text-gray-700 transition-colors">Terms</button>
                <span className="text-gray-600">•</span>
                <button className="hover:text-gray-700 transition-colors">Privacy</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - ChatGPT Style Center Stage or Split Screen */}
      <div className={`${(currentScenario === 1) ? (!isMobile && showBusinessSidebar && !isSplitScreen ? 'pl-64' : '') + (isSplitScreen && !isMobile ? ' flex bg-white overflow-hidden' : ' flex flex-col bg-white overflow-hidden') : (!isMobile ? 'pl-80 flex items-center justify-center' : 'flex items-center justify-center')} h-screen`}>
        <div className={`${(currentScenario === 1) ? (isSplitScreen ? 'w-2/5' : 'flex-1') + ' flex flex-col overflow-hidden' : ''} ${!isSplitScreen ? 'w-full max-w-3xl mx-auto' : ''} ${isMobile ? 'px-4' : 'px-8'}`}>
          
          {(currentScenario === 1) ? (
            // Scenarios 1 & 2: Pre-Investment Chat Interface
            <>
              {/* Header for split screen */}
              {isSplitScreen && !isMobile && (
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <img 
                    src="/logo.svg" 
                    alt="Invest in Lebanon" 
                    className="h-8 w-auto"
                  />
                </div>
              )}
              
              {/* Chat Messages - ChatGPT Style */}
              <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col">
                <div className="flex-1 flex flex-col justify-end">
                  <div className={`w-full max-w-3xl mx-auto ${isMobile ? 'px-4' : 'px-8'}`}>
                    <div className="space-y-6 pt-20 pb-10">
                {chatMessages.filter((_, index) => index > 0).map((message, index) => (
                  <div key={index} className="group">
                    {message.role === 'user' ? (
                      <div className="flex justify-end">
                        <div className="bg-gray-100 rounded-2xl px-4 py-2.5 max-w-[85%]">
                          <p className={`${isMobile ? 'text-base' : 'text-base'} text-gray-900`}>
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ) : message.role === 'thinking' ? (
                      // Thinking animation
                      <div className="py-2">
                        <p className="text-base animate-shimmer">
                          {message.content}
                        </p>
                      </div>
                    ) : message.role === 'canvas' ? (
                      // Canvas Container - fullscreen on mobile
                      isCanvasFullscreen ? (
                        // Mobile fullscreen canvas
                        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
                          <div className="min-h-screen">
                            {/* Mobile Canvas Header */}
                            <div className="sticky top-0 z-10 flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
                              <div className="text-sm font-medium text-gray-700">Private Dental Clinic in Hamra District</div>
                              <button 
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                                onClick={() => {
                                  // Remove canvas message to exit fullscreen
                                  setChatMessages(prev => prev.filter(msg => msg.role !== 'canvas'));
                                }}
                              >
                                <X className="w-5 h-5 text-gray-600" />
                              </button>
                            </div>
                            <div className="p-4 overflow-y-auto">
                              <DentalClinicReport variant="mobile" />
                            </div>
                          </div>
                        </div>
                      ) : isSplitScreen ? (
                        // Show as button in split-screen
                        <div className="flex justify-start">
                          <button className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                            <div className="flex items-center gap-2">
                              <FileText className="w-5 h-5 text-gray-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Healthcare Investment Analysis</p>
                                <p className="text-xs text-gray-500">Private Dental Clinic - Hamra District</p>
                              </div>
                            </div>
                          </button>
                        </div>
                      ) : (
                      // Show full canvas when not in split-screen
                      <div className="relative">
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                          {/* Canvas Header */}
                          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
                            <div className="text-sm font-medium text-gray-700">Private Dental Clinic in Hamra District</div>
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                                <Download className="w-4 h-4 text-gray-600" />
                              </button>
                              <button 
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                                onClick={() => setIsSplitScreen(true)}
                              >
                                <Expand className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </div>
                          <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
                            <DentalClinicReport variant="desktop" />
                          </div>
                        </div>
                        
                        {/* Like/Dislike buttons below canvas */}
                        <div className="flex items-center gap-1 mt-2">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <ThumbsUp className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <ThumbsDown className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                          </button>
                        </div>
                      </div>
                      )
                    ) : (
                      <div>
                        <p className={`${isMobile ? 'text-5xl' : 'text-4xl'} font-light text-gray-900`} style={{lineHeight: isMobile ? '1.1em' : '1.2em'}}>
                          {message.content.split('\n').map((line: string, i: number) => (
                            <span key={i}>
                              {line}
                              {i < message.content.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                        
                        {/* Thumbs up/down for assistant messages - not on first message */}
                        {index > 0 && (
                          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-gray-100 rounded">
                              <ThumbsUp className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded">
                              <ThumbsDown className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Original content for other scenarios
            <div className="text-left mb-12">
            <div className="opacity-0 animate-fadeInUp">
              <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-light text-gray-900 leading-tight mb-8`}>
                Good morning,<br />
                Ahmed
              </h1>
            </div>
            
            {/* Morning Updates */}
            <div className="opacity-0 animate-fadeInUp max-w-2xl" style={{ animationDelay: '0.2s' }}>
              <p className="text-gray-600 mb-6 text-lg font-light">Here are a couple of updates for you:</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-gray-400 font-light">1.</span>
                  <div className="text-gray-600 leading-relaxed">
                    <p>The visa quota at Al Raha is almost full — we're at 92 percent. <button className="ml-2 px-2 py-1 text-xs font-semibold text-purple-600 hover:text-purple-800 bg-gray-100 hover:bg-gray-150 rounded-md transition-all">Extend quota →</button></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-gray-400 font-light">2.</span>
                  <div className="text-gray-600 leading-relaxed">
                    <p>A new digital-health incentive launched today, and our remote-care service looks eligible. <button className="ml-2 px-2 py-1 text-xs font-semibold text-purple-600 hover:text-purple-800 bg-gray-100 hover:bg-gray-150 rounded-md transition-all">Check eligibility →</button></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-gray-400 font-light">3.</span>
                  <div className="text-gray-600 leading-relaxed">
                    <p>The radiology unit at Khalifa City is nearing its certification renewal window. <button className="ml-2 px-2 py-1 text-xs font-semibold text-purple-600 hover:text-purple-800 bg-gray-100 hover:bg-gray-150 rounded-md transition-all">Apply for renewal →</button></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Bottom Section - Welcome, Suggestions, Input */}
          <div className={`opacity-0 animate-fadeInUp ${(currentScenario === 1) ? `pb-4` : (isMobile ? 'fixed bottom-0 left-0 right-0 bg-white' : '')}`} style={{ animationDelay: '0.1s' }}>
            <div className="max-w-3xl mx-auto px-4">
              {/* Welcome Message */}
              {chatMessages.length === 1 && (
                <div className="mb-10 text-center">
                  <p className={`${isMobile ? 'text-5xl' : 'text-4xl'} font-light text-gray-900`} style={{lineHeight: '1.2em'}}>
                    {chatMessages[0].content.split('\n').map((line: string, i: number) => (
                      <span key={i}>
                        {line}
                        {i < chatMessages[0].content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              
              {/* Suggestion Cards */}
              {(currentScenario === 1) && chatMessages.length === 1 && (
                <div className="mb-10">
                  <div className="flex items-center gap-2">
                    {/* Left Arrow - Desktop only */}
                    {!isMobile && (
                      <button 
                        className="w-8 h-8 bg-transparent hover:bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
                        onClick={() => {
                          const container = document.getElementById('suggestions-container');
                          if (container) container.scrollLeft -= 300;
                        }}
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                    
                    {/* Cards Container */}
                    <div 
                      id="suggestions-container"
                      className="flex gap-2 overflow-x-auto scrollbar-none scroll-smooth flex-1"
                    >
                      {suggestionCards.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={(e) => e.preventDefault()}
                          className="flex-shrink-0 border border-gray-300 rounded-2xl p-4 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                          style={{ width: isMobile ? '60%' : '30%', minHeight: '80px' }}
                        >
                          <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
                        </button>
                      ))}
                    </div>
                    
                    {/* Right Arrow - Desktop only */}
                    {!isMobile && (
                      <button 
                        className="w-8 h-8 bg-transparent hover:bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
                        onClick={() => {
                          const container = document.getElementById('suggestions-container');
                          if (container) container.scrollLeft += 300;
                        }}
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {/* Input Field */}
              <div className="relative bg-gray-50 rounded-2xl border border-gray-300">
              
              {/* Attached Documents inside chatbox - Hidden in Scenario 1 */}
              {attachedDocuments.length > 0 && currentScenario !== 1 && (
                <div className="p-4 border-b border-gray-100">
                  <div className="flex gap-2 overflow-x-auto scrollbar-none">
                    {attachedDocuments.map((doc, index) => (
                      <div key={index} className="flex-shrink-0 bg-gray-50 rounded-lg border border-gray-200 p-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-red-500" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-900 truncate">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                          <button 
                            onClick={() => setAttachedDocuments(attachedDocuments.filter((_, i) => i !== index))}
                            className="w-4 h-4 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <X className="w-2 h-2 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Input Row */}
              <div className="p-4 relative">
                <div className="relative overflow-hidden" style={{ maxHeight: '60px' }}>
                  <textarea
                    placeholder="Message..."
                    value={currentScenario === 1 ? inputValue : query}
                    onChange={(e) => {
                      if (currentScenario === 1) {
                        setInputValue(e.target.value);
                      } else {
                        setQuery(e.target.value);
                      }
                      // Auto-create business on first message in Scenario 1
                      if (currentScenario === 1 && businesses.length === 0 && e.target.value.length > 0) {
                        const newBusiness = {
                          id: Date.now().toString(),
                          name: 'Chat summary',
                          timestamp: new Date()
                        };
                        setBusinesses([newBusiness]);
                        setSelectedBusinessId(newBusiness.id);
                      }
                    }}
                    className="w-full h-10 bg-transparent text-gray-900 placeholder-gray-500 text-base leading-relaxed resize-none focus:outline-none overflow-y-auto"
                    style={{
                      maxHeight: '60px',
                      minHeight: '40px'
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 60) + 'px';
                    }}
                  />
                  {/* Fade overlay for scrolling text */}
                  <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Bottom Controls Row */}
              <div className="px-4 pb-4 pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  
                  {/* Left Side - Recording State or Normal State */}
                  {isRecording ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-600 font-medium">Recording {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      {/* PRO Dropdown */}
                      <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-gray-50 border border-gray-300 rounded-lg transition-all backdrop-blur-sm">
                          <span className="text-sm font-medium text-gray-700">
                          <span className="text-xs font-normal text-gray-400 mr-1">Agent</span>
                          {agents.find(a => a.id === selectedAgent)?.name || 'PRO'}
                        </span>
                          <ChevronRight className="w-3 h-3 text-gray-400 rotate-90" />
                        </button>
                        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          <div className="p-2">
                            {agents.map((agent) => (
                              <button
                                key={agent.id}
                                onClick={() => setSelectedAgent(agent.id)}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="font-medium text-sm text-gray-700">
                                  <span className="text-xs font-normal text-gray-400 mr-1">Agent</span>
                                  {agent.name}
                                </div>
                                <div className="text-xs text-gray-400">{agent.description}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Vault Icon - Hidden in Scenarios 1 and 2 */}
                      {currentScenario > 1 && (
                        <div className="group relative">
                          <button 
                            onClick={() => setShowVault(true)}
                            className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'} bg-transparent hover:bg-gray-50 border border-gray-300 rounded-md flex items-center justify-center transition-all backdrop-blur-sm`}
                          >
                            <Shield className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-gray-600`} stroke-width="2.5" />
                          </button>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-100 text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Vault
                          </div>
                        </div>
                      )}
                      
                      {/* Attachment Icon */}
                      <div className="group relative">
                        <button 
                          className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'} bg-transparent hover:bg-white/[0.02] border border-white/10 rounded-md flex items-center justify-center transition-all backdrop-blur-sm`}
                        >
                          <Paperclip className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-gray-600`} stroke-width="2.5" />
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-100 text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Attach
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Right Side - Send or Mic & Waveform */}
                  <div className="flex items-center gap-3">
                    {(currentScenario === 1 ? inputValue.trim() : query.trim()) ? (
                      /* Send Button - appears when typing */
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle Scenario 1 response
                          if (currentScenario === 1 && inputValue.trim()) {
                            const userInput = inputValue;
                            setInputValue('');
                            
                            // Add user message and thinking state
                            setChatMessages([
                              ...chatMessages,
                              {role: 'user', content: userInput},
                              {role: 'thinking', content: 'Analyzing location potential...'}
                            ]);
                            
                            // Scroll to bottom immediately
                            setTimeout(() => {
                              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                            
                            // After 2 seconds, replace thinking with canvas
                            setTimeout(() => {
                              setChatMessages(prev => {
                                // Remove the thinking message and any existing canvas
                                const messagesWithoutThinkingOrCanvas = prev.filter(
                                  msg => msg.role !== 'thinking' && msg.role !== 'canvas'
                                );
                                return [
                                  ...messagesWithoutThinkingOrCanvas,
                                  {role: 'canvas', content: { location: userInput }}
                                ];
                              });
                              // Auto-open split view on desktop when canvas is generated
                              if (!isMobile) {
                                setIsSplitScreen(true);
                              }
                            }, 2000);
                          }
                        }}
                        className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all`}
                      >
                        <ArrowUp className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-white`} stroke-width="2" />
                      </button>
                    ) : (
                      <>
                        {/* Microphone */}
                        <div className="group relative">
                          <button 
                            onClick={() => {
                              setIsRecording(!isRecording);
                              if (!isRecording) {
                                setRecordingTime(0);
                                // Start timer
                              }
                            }}
                            className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} bg-transparent hover:bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center transition-all backdrop-blur-sm`}
                          >
                            {isRecording ? (
                              <Circle className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-red-500 fill-red-500`} />
                            ) : (
                              <Mic className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-gray-600`} stroke-width="2.5" />
                            )}
                          </button>
                        </div>

                        {/* AI Waveform */}
                        <div className="group relative">
                          <button 
                            onClick={() => setShowVideoChat(true)}
                            className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} bg-transparent hover:bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center transition-all backdrop-blur-sm`}
                          >
                            <AudioWaveform className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-gray-600`} stroke-width="2.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Vault Modal */}
          {showVault && (
            <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
              <div className={`bg-white rounded-2xl w-full ${isMobile ? 'h-full' : 'max-w-4xl h-[600px] m-8'} overflow-hidden relative`}>
                {/* Floating Close Button */}
                <button 
                  onClick={() => setShowVault(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex h-full">
                  {/* Sidebar */}
                  <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900">Document Vault</h3>
                    </div>
                    {/* Search Bar */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {Object.keys(documents).map((folder) => (
                        <button
                          key={folder}
                          onClick={() => setSelectedFolder(folder)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedFolder === folder ? 'bg-gray-100 border border-gray-600' : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{folder}</span>
                          </div>
                          <span className="text-xs text-gray-500 ml-6">{documents[folder].length} documents</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col">
                    <div className="p-6 border-b border-gray-100">
                      <h4 className="font-medium text-gray-900">{selectedFolder}</h4>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto">
                      <div className="space-y-3">
                        {documents[selectedFolder].map((doc, index: number) => (
                          <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="document-selection"
                              checked={selectedDocuments.some(d => d.name === doc.name)}
                              onChange={() => handleDocumentSelect(doc, selectedFolder)}
                              className="w-4 h-4 text-gray-400 bg-gray-700 border-gray-600 focus:ring-gray-500"
                            />
                            <FileText className="w-8 h-8 text-red-500" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.size} • Modified {doc.lastModified}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Add Button */}
                {selectedDocuments.length > 0 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <button 
                      onClick={handleAddDocuments}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-900 rounded-full text-sm font-medium shadow-lg transition-all"
                    >
                      Add ({selectedDocuments.length})
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Video Chat Modal */}
          {showVideoChat && (
            <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl w-[320px] h-[400px] overflow-hidden relative shadow-2xl">
                {/* Main Content */}
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 mx-auto ${!isVideoMuted ? 'animate-pulse-border' : ''}`}>
                      <AudioWaveform className="w-10 h-10 text-gray-900" />
                    </div>
                    <p className="text-gray-900 font-medium text-base">{agents.find(a => a.id === selectedAgent)?.name || 'PRO'}</p>
                    <p className="text-gray-500 text-sm mt-1">Ready to assist</p>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                      {/* Mute Button */}
                      <button 
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className={`w-10 h-10 ${isVideoMuted ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-100 hover:bg-gray-200'} rounded-full flex items-center justify-center transition-colors`}
                      >
                        {isVideoMuted ? (
                          <MicOff className="w-4 h-4 text-red-600" />
                        ) : (
                          <Mic className="w-4 h-4 text-gray-700" />
                        )}
                      </button>
                      
                      {/* Close Button */}
                      <button 
                        onClick={() => setShowVideoChat(false)}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bento Grid Sidebar - Only for scenarios 1-2 */}
          {showSidebar && currentScenario <= 2 && (
            <div className="fixed inset-0 bg-white/50 flex justify-end z-50">
              <div className="w-1/3 bg-gray-50 h-full overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">SNAPSHOT</h2>
                    <button 
                      onClick={() => setShowSidebar(false)}
                      className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-sm"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  
                  {/* Dynamic Bento Grid */}
                  <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {/* Finance */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Revenue</h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-4xl font-light text-gray-900 mb-1">2.8M <span className="text-xs text-gray-500">AED</span></p>
                      <p className="text-xs text-gray-500">year to date</p>
                    </div>

                    {/* TVA Payment */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">TVA Payment</h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-4xl font-light text-gray-900 mb-1">42K <span className="text-xs text-gray-500">AED</span></p>
                      <p className="text-xs text-gray-500">Due 5 Jan 2026</p>
                    </div>

                    {/* Visa Quota - With Donut Chart */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Visa Quota</h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-center mb-3">
                        <div className="relative">
                          <svg className="w-16 h-16" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#f1f5f9"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#fb7185"
                              strokeWidth="2"
                              strokeDasharray="92, 100"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-light text-gray-900">46/50</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Workforce */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Workforce</h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-4xl font-light text-gray-900 mb-1">47</p>
                      <p className="text-xs text-gray-500 mb-2">employees</p>
                      <p className="text-xs text-orange-600">5 visas expiring soon</p>
                    </div>

                    {/* Health Score */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Health Score</h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-4xl font-light text-gray-900 mb-1">94<span className="text-sm text-gray-500">%</span></p>
                      <p className="text-xs text-gray-500">compliance</p>
                    </div>

                    {/* Active Licenses */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Licenses</h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-4xl font-light text-gray-900 mb-1">3</p>
                      <p className="text-xs text-gray-500">all valid</p>
                    </div>

                    {/* Imports */}
                    <div className="col-span-3 bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Import Activity</h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-4xl font-light text-gray-900">127</p>
                          <p className="text-xs text-gray-500">imports this year</p>
                        </div>
                        <div>
                          <p className="text-4xl font-light text-orange-600">1</p>
                          <p className="text-xs text-gray-500">pending inspection</p>
                        </div>
                        <button className="ml-auto px-3 py-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 bg-gray-100 hover:bg-gray-150 rounded-md transition-all">Track shipments →</button>
                      </div>
                    </div>

                    {/* Certificates */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Certificates</h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-4xl font-light text-orange-600 mb-1">2</p>
                      <p className="text-xs text-gray-500">expiring soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Panel - Canvas (Split Screen) */}
        {isSplitScreen && !isMobile && currentScenario === 1 && (() => {
          const canvasMessage = chatMessages.find(msg => msg.role === 'canvas');
          if (!canvasMessage) return null;
          
          return (
            <div className="w-3/5 bg-gray-50 overflow-y-auto border-l border-gray-200">
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {/* Canvas Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
                      <div className="text-sm font-medium text-gray-700">Private Dental Clinic in Hamra District</div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                        <button 
                          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                          onClick={() => setIsSplitScreen(false)}
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
                      <DentalClinicReport variant="split-screen" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
      
      {/* Other flows would go here */}
      {activeFlow !== 'landing' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {activeFlow.charAt(0).toUpperCase() + activeFlow.slice(1)} Flow
            </h2>
            <p className="text-gray-600 mb-6">This flow is under construction</p>
            <Button onClick={() => setActiveFlow('landing')} variant="outline">
              ← Back to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;