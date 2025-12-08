import { useState } from 'react';
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
  Globe,
  Mic,
  Paperclip,
  Search,
  X,
  Bell,
  Shield,
  AudioWaveform,
  Zap
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

  // Agents/Departments
  const agents = [
    { id: 'PRO', name: 'PRO', description: 'Professional Services & Operations' },
    { id: 'HR', name: 'HR', description: 'Human Resources & Employee Services' },
    { id: 'TRADE', name: 'Trade', description: 'Import & Export Expert' },
    { id: 'LICENSE', name: 'License', description: 'Business Licensing Specialist' },
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

  // Government Feed Updates
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
      gradient: 'from-blue-50 to-indigo-50 border-blue-200',
      highlight: '5 renewals due',
      onClick: () => setActiveFlow('people')
    },
    {
      id: 'trade-import',
      icon: Package,
      title: 'Trade & Imports',
      description: 'Handle shipments, customs clearance, and trade documentation',
      badge: 'ACTIVE',
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-200',
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50/20 to-white">
      {/* Company Logo - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/50 px-4 py-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Plus className="w-4 h-4 text-white rotate-45" />
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


      {/* Floating Icon Navigation */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-black rounded-full p-3">
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
                  <Icon className="w-5 h-5 text-white" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating RSS Feeds and Notifications */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-4">
        {/* RSS Feeds */}
        <div className="relative group">
          <button className="w-14 h-14 bg-white rounded-full border border-gray-200/20 flex items-center justify-center hover:bg-black transition-all shadow-sm">
            <Zap className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
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
            <div className="max-h-80 overflow-y-auto">
              {feedUpdates.map((update) => (
                <button
                  key={update.id}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 leading-relaxed mb-2">{update.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{update.abbr}</span>
                        <span className="text-xs text-gray-500">{update.time}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0 self-center" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Search Icon */}
        <div className="relative group">
          <button className="w-14 h-14 bg-white rounded-full border border-gray-200/20 flex items-center justify-center hover:bg-black transition-all shadow-sm">
            <Search className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
        </div>
        
        {/* Notifications */}
        <div className="relative group">
          <button className="w-14 h-14 bg-white rounded-full border border-gray-200/20 flex items-center justify-center hover:bg-black transition-all shadow-sm">
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white" />
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
          className="w-12 h-12 bg-white rounded-full border-2 border-white flex items-center justify-center hover:bg-black transition-all shadow-sm group"
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

      {/* Main Content - ChatGPT Style Center Stage */}
      <div className="pl-80 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-3xl mx-auto px-8">
          
          {/* Center Stage AI Interface */}
          <div className="text-left mb-12">
            <div className="opacity-0 animate-fadeInUp">
              <h1 className="text-4xl font-light text-gray-900 leading-tight mb-8">
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


          {/* Input Interface */}
          <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="relative bg-white rounded-2xl border border-gray-200">
              
              {/* Attached Documents inside chatbox */}
              {attachedDocuments.length > 0 && (
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
              <div className="p-4">
                <textarea
                  placeholder="Ask anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-10 bg-transparent text-gray-900 placeholder-gray-400 text-base leading-relaxed resize-none focus:outline-none overflow-y-auto"
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
              </div>

              {/* Bottom Controls Row */}
              <div className="px-4 pb-4 pt-2 border-t border-gray-100">
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
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-150 rounded-lg transition-colors">
                          <span className="text-sm font-medium text-gray-700">
                          <span className="text-xs font-normal text-gray-500 mr-1">Mode</span>
                          {selectedAgent}
                        </span>
                          <ChevronRight className="w-3 h-3 text-gray-500 rotate-90" />
                        </button>
                        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          <div className="p-2">
                            {agents.map((agent) => (
                              <button
                                key={agent.id}
                                onClick={() => setSelectedAgent(agent.id)}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="font-medium text-sm text-gray-900">
                                  <span className="text-xs font-normal text-gray-500 mr-1">Mode</span>
                                  {agent.name}
                                </div>
                                <div className="text-xs text-gray-500">{agent.description}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Vault Icon */}
                      <div className="group relative">
                        <button 
                          onClick={() => setShowVault(true)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-150 rounded-md flex items-center justify-center transition-colors"
                        >
                          <Shield className="w-4 h-4 text-black" stroke-width="2.5" />
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Vault
                        </div>
                      </div>
                      
                      {/* Attachment Icon */}
                      <div className="group relative">
                        <button 
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-150 rounded-md flex items-center justify-center transition-colors"
                        >
                          <Paperclip className="w-4 h-4 text-black" stroke-width="2.5" />
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Attach
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Right Side - Mic & Waveform */}
                  <div className="flex items-center gap-3">
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
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-150 rounded-full flex items-center justify-center transition-colors"
                      >
                        {isRecording ? (
                          <Circle className="w-4 h-4 text-red-500 fill-red-500" />
                        ) : (
                          <Mic className="w-4 h-4 text-black" stroke-width="2.5" />
                        )}
                      </button>
                    </div>

                    {/* AI Waveform */}
                    <div className="group relative">
                      <button 
                        onClick={() => setShowVideoChat(true)}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-150 rounded-full flex items-center justify-center transition-colors"
                      >
                        <AudioWaveform className="w-4 h-4 text-black" stroke-width="2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vault Modal */}
          {showVault && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl w-full max-w-4xl h-[600px] m-8 overflow-hidden relative">
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
                            selectedFolder === folder ? 'bg-blue-50 border border-blue-200' : 'hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500" />
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
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium shadow-lg transition-all"
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
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl w-96 h-96 overflow-hidden relative">
                <button 
                  onClick={() => setShowVideoChat(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <Plus className="w-4 h-4 rotate-45 text-white" />
                </button>
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <Globe className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white font-medium">AI Assistant</p>
                    <p className="text-white/80 text-sm">Ready to help with your business</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bento Grid Sidebar */}
          {showSidebar && (
            <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
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