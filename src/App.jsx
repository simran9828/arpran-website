import React, { useState, useMemo } from 'react';
import { 
  Phone, Mail, Search, Download, MessageSquare, 
  X, Send, ArrowUpRight, ShieldCheck, Box, Globe2, 
  ChevronRight, Sparkles, Layers, CheckCircle2, ChevronDown
} from 'lucide-react';
import { 
  COMPANY_INFO, 
  GRANITE_PRODUCTS, 
  GRANITE_ROUGH_BLOCKS, 
  MARBLE_PRODUCTS, 
  STONE_FINISHES 
} from './data/stoneData';

/**
 * EXACT ARPRAN LOGO COMPONENT
 * 1. Directly loads your uploaded logo from `/logo.png`
 * 2. If image is not yet placed in public/, it falls back to the exact 
 *    8-petaled blue swirl vector emblem matching the uploaded logo.
 */
export const ArpranLogo = ({ className = "h-10", light = true }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img 
          src="/logo.png" 
          alt="ARPRAN" 
          onError={() => setImgError(true)} 
          className="h-9 md:h-10 w-auto object-contain"
        />
        <span className={`text-xl md:text-2xl tracking-[0.24em] font-sans font-normal leading-none ${light ? 'text-white' : 'text-slate-900'}`}>
          ARPRAN
        </span>
      </div>
    );
  }

  // Exact 8-Petal Swirl Vector fallback matching uploaded emblem
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="h-9 w-9 flex-shrink-0" fill="none">
        <defs>
          <linearGradient id="arpranGradFallback" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B5CB4" />
            <stop offset="60%" stopColor="#033F85" />
            <stop offset="100%" stopColor="#012456" />
          </linearGradient>
        </defs>
        <g transform="translate(50, 50)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <path
              key={index}
              d="M 0,-5 C 9,-11 26,-16 34,-5 C 38,1 32,13 18,11 C 9,9 4,2 0,-5 Z"
              fill="url(#arpranGradFallback)"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="3" fill="#ffffff" />
        </g>
      </svg>
      <span className={`text-xl md:text-2xl tracking-[0.24em] font-sans font-normal leading-none ${light ? 'text-white' : 'text-slate-900'}`}>
        ARPRAN
      </span>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('granite');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  // Floating Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Welcome to Arpran Industries. Inquiring about Indian Granite or Marble exports?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Modals
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Search filtering
  const filteredGranites = useMemo(() => {
    return GRANITE_PRODUCTS.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredMarbles = useMemo(() => {
    return MARBLE_PRODUCTS.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.note.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      let reply = "Thank you for contacting Arpran Industries. For export catalogs and quotation, connect with our Jaipur office at +91-94140 68933 or info@arpranindustries.com.";
      const lower = userText.toLowerCase();
      if (lower.includes('granite') || lower.includes('block')) {
        reply = "We supply over 48 granite varieties and gangsaw rough blocks including Viscon White, Tan Brown, Absolute Black, and Black Galaxy directly from India.";
      } else if (lower.includes('marble') || lower.includes('makrana')) {
        reply = "Our Marble series features Makrana White, Spider Green, Indian Statuario, and Rainforest varieties with Polish, Flammed, and Honed finishes.";
      } else if (lower.includes('australia')) {
        reply = "Our Australian distribution facility is located at Factory 31/7 Dunstans Ct, Thomastown VIC 3074 (+61-456006677).";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div id="home" className="min-h-screen bg-[#0d0e12] text-slate-100 font-sans selection:bg-[#C5A059] selection:text-black">

      {/* HEADER / NAVIGATION (ONLY: Home, Products, Download, Contact Us, Search) */}
      <header className="sticky top-0 z-40 bg-[#0d0e12]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <ArpranLogo light={true} />
          </a>

          {/* Nav: Home, Products (Granite / Marble), Download, Contact Us */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#home" className="hover:text-[#C5A059] transition-colors">
              Home
            </a>

            {/* Products with Granite & Marble dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <a 
                href="#products" 
                className="hover:text-[#C5A059] transition-colors inline-flex items-center gap-1.5 py-2"
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>

              {isProductsDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-[#151722] border border-white/10 rounded-lg shadow-2xl py-2 z-50">
                  <a 
                    href="#granite" 
                    onClick={() => { setActiveTab('granite'); setIsProductsDropdownOpen(false); }}
                    className="block px-4 py-2.5 text-xs uppercase tracking-wider text-slate-200 hover:bg-[#C5A059] hover:text-black font-semibold transition-colors"
                  >
                    Granite Series
                  </a>
                  <a 
                    href="#marble" 
                    onClick={() => { setActiveTab('marble'); setIsProductsDropdownOpen(false); }}
                    className="block px-4 py-2.5 text-xs uppercase tracking-wider text-slate-200 hover:bg-[#C5A059] hover:text-black font-semibold transition-colors"
                  >
                    Marble Series
                  </a>
                </div>
              )}
            </div>

            {/* Download brochure */}
            <a 
              href="/brochure.pdf" 
              download="ARPRAN_Natural_Stone_Brochure.pdf"
              className="inline-flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Download</span>
            </a>

            {/* Contact Us */}
            <a href="#contact" className="hover:text-[#C5A059] transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Search trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#C5A059] transition-colors border border-white/5"
              aria-label="Search stones"
              title="Search Granite or Marble"
            >
              <Search className="w-4 h-4" />
            </button>

            <a 
              href="#contact" 
              className="md:hidden px-3 py-1.5 bg-[#C5A059] text-black text-xs font-semibold rounded uppercase"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Search Input Bar */}
        {isSearchOpen && (
          <div className="border-t border-white/10 bg-[#12141c] px-4 py-3">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#C5A059]" />
              <input
                type="text"
                autoFocus
                placeholder="Type stone name (e.g. Viscon White, Spider Green, Black Galaxy)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-xs uppercase tracking-wider text-slate-400 hover:text-white border border-white/10 px-2 py-1 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 z-10" />
          <div 
            className="w-full h-full bg-cover bg-center filter grayscale opacity-25 scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop')` }}
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center py-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-[#C5A059] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Over A Decade of Industry Expertise
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight">
            {COMPANY_INFO.tagline}
          </h1>
          
          <p className="mt-4 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#C5A059] font-medium">
            {COMPANY_INFO.subtagline}
          </p>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            "{COMPANY_INFO.motto}"
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a 
              href="#products" 
              className="px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#C5A059] transition-all duration-300 rounded shadow-lg"
            >
              View Products
            </a>
            <a 
              href="/brochure.pdf"
              download="ARPRAN_Natural_Stone_Brochure.pdf" 
              className="px-8 py-3.5 border border-white/30 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 rounded backdrop-blur-sm inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#C5A059]" /> Download Brochure
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 text-left">
            <div>
              <div className="text-2xl font-serif text-white font-bold">10+ Years</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Industry Expertise</div>
            </div>
            <div>
              <div className="text-2xl font-serif text-[#C5A059] font-bold">60+ Varieties</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Granite & Marble</div>
            </div>
            <div>
              <div className="text-2xl font-serif text-white font-bold">Jaipur, India</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Origin & Manufacturing</div>
            </div>
            <div>
              <div className="text-2xl font-serif text-[#C5A059] font-bold">Worldwide</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Global Logistics</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US (Exact Brochure Text) */}
      <section id="about" className="py-24 bg-[#111317] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                About Arpran Industries
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-snug">
                Nature shapes every stone. <br />
                <span className="italic font-normal text-slate-400">We perfect every detail.</span>
              </h2>
              <div className="w-16 h-[2px] bg-[#C5A059]" />
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {COMPANY_INFO.about}
              </p>
              
              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">Dependable manufacturing & rigorous quality check.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">Available Finishes: Polish, Flammed & Honed.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">Registered offices across India, Australia, and UAE.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#161820] border border-white/5 rounded-lg">
                <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-4" />
                <h3 className="text-lg font-serif font-semibold text-white mb-2">Quality Check</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rigorous surface calibration, crack detection, and gloss perfection before container packing.
                </p>
              </div>

              <div className="p-6 bg-[#161820] border border-white/5 rounded-lg">
                <Box className="w-8 h-8 text-[#C5A059] mb-4" />
                <h3 className="text-lg font-serif font-semibold text-white mb-2">Fumigated Packaging</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sea-worthy treated wooden crates and robust iron A-frames preventing transit fracture across global ports.
                </p>
              </div>

              <div className="p-6 bg-[#161820] border border-white/5 rounded-lg">
                <Globe2 className="w-8 h-8 text-[#C5A059] mb-4" />
                <h3 className="text-lg font-serif font-semibold text-white mb-2">Delivered Worldwide</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  International freight channels reaching importers, architects, and commercial developers worldwide.
                </p>
              </div>

              <div className="p-6 bg-[#161820] border border-white/5 rounded-lg">
                <Layers className="w-8 h-8 text-[#C5A059] mb-4" />
                <h3 className="text-lg font-serif font-semibold text-white mb-2">Rough Quarry Blocks</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct gangsaw size blocks in Viscon White, Tan Brown, Absolute Black & Black Galaxy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (Granite & Marble) */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            Catalog Selection
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2">
            Granite & Marble Products
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Pure Indian natural stones carefully selected from premier quarries.
          </p>

          {/* Category Toggle Tabs */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('granite')}
              className={`px-7 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'granite' 
                  ? 'bg-[#C5A059] text-black shadow-lg' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Granite Series ({filteredGranites.length})
            </button>
            <button
              onClick={() => setActiveTab('marble')}
              className={`px-7 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'marble' 
                  ? 'bg-[#C5A059] text-black shadow-lg' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Marble Series ({filteredMarbles.length})
            </button>
            <button
              onClick={() => setActiveTab('blocks')}
              className={`px-7 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'blocks' 
                  ? 'bg-[#C5A059] text-black shadow-lg' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Rough Blocks ({GRANITE_ROUGH_BLOCKS.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Granite */}
        {activeTab === 'granite' && (
          <div id="granite" className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-slate-400">
                Granite Series — The Signature of Natural Luxury
              </span>
              <span className="text-xs text-[#C5A059]">Finishes: Polish • Flammed • Honed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredGranites.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedProduct(item)}
                  className="group bg-[#15171e] border border-white/5 hover:border-[#C5A059]/40 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square bg-[#20232d] rounded flex items-center justify-center p-3 relative overflow-hidden mb-3 border border-white/5">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full border border-white/20 mx-auto flex items-center justify-center text-xs text-[#C5A059] group-hover:scale-110 transition-transform">
                        ◆
                      </div>
                      <span className="text-[10px] uppercase text-slate-500 tracking-widest block mt-2">Granite Slab</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 justify-center">
                      <span className="text-[10px] text-[#C5A059] font-medium flex items-center gap-1">
                        Inquire <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-white group-hover:text-[#C5A059] transition-colors truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.color}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Marble */}
        {activeTab === 'marble' && (
          <div id="marble" className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-slate-400">
                Marble Series — Inspired by Texture of Nature
              </span>
              <span className="text-xs text-[#C5A059]">Finishes: Polish • Flammed • Honed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMarbles.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedProduct(item)}
                  className="group bg-[#15171e] border border-white/5 hover:border-[#C5A059]/40 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-[#20232d] rounded flex items-center justify-center p-3 relative overflow-hidden mb-3 border border-white/5">
                    <div className="text-center">
                      <span className="text-[10px] uppercase text-slate-500 tracking-widest block">Indian Marble</span>
                      <span className="text-xs text-white/70 font-serif italic mt-1 block">Arpran Quality</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 justify-center">
                      <span className="text-[10px] text-[#C5A059] font-medium flex items-center gap-1">
                        Inquire <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-white group-hover:text-[#C5A059] transition-colors truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Rough Blocks */}
        {activeTab === 'blocks' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-slate-400">
                Granite Rough Blocks — Quarry Selection
              </span>
              <span className="text-xs text-[#C5A059]">Direct Gangsaw Blocks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {GRANITE_ROUGH_BLOCKS.map((name, idx) => (
                <div key={idx} className="bg-[#15171e] border border-white/10 p-6 rounded-lg">
                  <div className="aspect-video bg-[#20232d] rounded flex items-center justify-center mb-4 border border-white/5">
                    <span className="text-xs uppercase tracking-widest text-[#C5A059] font-mono">Rough Block #{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">{name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Export quality gangsaw size rough block with uniform structural density.</p>
                  <a 
                    href={`https://wa.me/${COMPANY_INFO.offices.india.whatsappNumber}?text=Inquiry%20for%20Rough%20Block:%20${encodeURIComponent(name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:underline font-medium mt-4"
                  >
                    Request Dimensions & FOB <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FINISHES */}
      <section className="py-16 bg-[#111317] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            Finishes Available
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Polish • Flammed • Honed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto text-xs text-slate-400">
            <div className="p-4 bg-[#161820] rounded border border-white/5">
              <span className="text-white font-semibold uppercase block mb-1">Polish Finish</span>
              Mirror-like high gloss reflecting natural stone brilliance and color depth.
            </div>
            <div className="p-4 bg-[#161820] rounded border border-white/5">
              <span className="text-white font-semibold uppercase block mb-1">Flammed Finish</span>
              Thermal heat-treated rough surface crafted for anti-slip external architecture.
            </div>
            <div className="p-4 bg-[#161820] rounded border border-white/5">
              <span className="text-white font-semibold uppercase block mb-1">Honed Finish</span>
              Smooth, non-reflective matte finish suitable for calm contemporary interiors.
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Contact Us
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connect with our registered offices in Jaipur, India or Thomastown, Australia for material supplies, container FOB quotes, and commercial architectural inquiries.
            </p>

            <div className="space-y-4 pt-2">
              {/* India Office */}
              <div className="p-5 bg-[#14161d] border border-white/10 rounded-lg">
                <div className="text-xs uppercase tracking-wider text-[#C5A059] font-bold mb-1">
                  {COMPANY_INFO.offices.india.title}
                </div>
                <p className="text-xs text-slate-200">{COMPANY_INFO.offices.india.address}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-white">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <a href={`tel:${COMPANY_INFO.offices.india.phone}`} className="hover:underline">
                    {COMPANY_INFO.offices.india.phone}
                  </a>
                </div>
              </div>

              {/* Australia Office */}
              <div className="p-5 bg-[#14161d] border border-white/10 rounded-lg">
                <div className="text-xs uppercase tracking-wider text-[#C5A059] font-bold mb-1">
                  {COMPANY_INFO.offices.australia.title}
                </div>
                <p className="text-xs text-slate-200">{COMPANY_INFO.offices.australia.address}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-white">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <a href={`tel:${COMPANY_INFO.offices.australia.phone}`} className="hover:underline">
                    {COMPANY_INFO.offices.australia.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 bg-[#14161d] border border-white/10 rounded-lg flex items-center justify-between text-xs">
                <span className="text-slate-400">Official Inquiries:</span>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-[#C5A059] font-medium">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick RFQ Form */}
          <div className="lg:col-span-7 bg-[#14161d] border border-white/10 p-8 rounded-xl">
            <h3 className="text-xl font-serif font-bold text-white mb-2">Request Stone Quotation</h3>
            <p className="text-xs text-slate-400 mb-6">Contact our sales division directly for gangsaw slabs or blocks.</p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you. Your quotation request has been received by Arpran Industries.");
              }} 
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Your Name</label>
                  <input required type="text" className="w-full bg-[#1b1e28] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Email</label>
                  <input required type="email" className="w-full bg-[#1b1e28] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">WhatsApp / Phone</label>
                  <input required type="tel" className="w-full bg-[#1b1e28] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Stone Required</label>
                  <input type="text" placeholder="e.g. Viscon White, Makrana White..." className="w-full bg-[#1b1e28] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]" />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Message / Requirements</label>
                <textarea rows={4} placeholder="Quantity, thickness (20mm, 30mm), finish or port of delivery..." className="w-full bg-[#1b1e28] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-black font-semibold text-xs uppercase tracking-widest py-3.5 rounded transition-all shadow-md"
              >
                Submit Inquiry
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#08090b] border-t border-white/10 pt-16 pb-12 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
            
            <div className="space-y-4">
              <ArpranLogo light={true} />
              <p className="text-xs text-slate-500 leading-relaxed">
                Transforming India's finest natural stones into architectural materials trusted worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Granite & Marble</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#granite" onClick={() => setActiveTab('granite')} className="hover:text-[#C5A059]">Granite Series</a></li>
                <li><a href="#marble" onClick={() => setActiveTab('marble')} className="hover:text-[#C5A059]">Marble Series</a></li>
                <li><a href="#granite" onClick={() => setActiveTab('blocks')} className="hover:text-[#C5A059]">Rough Blocks</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-[#C5A059]">Home</a></li>
                <li><a href="#products" className="hover:text-[#C5A059]">Products</a></li>
                <li><a href="#contact" className="hover:text-[#C5A059]">Contact Us</a></li>
                <li>
                  {/* Events Option in footer */}
                  <button 
                    onClick={() => setIsEventsModalOpen(true)} 
                    className="hover:text-[#C5A059] flex items-center gap-1.5"
                  >
                    <span>Events</span>
                    <span className="text-[9px] bg-[#C5A059]/20 text-[#C5A059] px-1.5 py-0.5 rounded">Upcoming</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Brochure</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Download the complete natural stone catalog directly.
              </p>
              <a
                href="/brochure.pdf"
                download="ARPRAN_Natural_Stone_Brochure.pdf"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-[#C5A059] text-xs text-white px-3 py-2 rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A059]" /> Download
              </a>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.
            </div>
            <div>
              <span>{COMPANY_INFO.website}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#161822] border border-white/10 rounded-xl max-w-lg w-full p-6 relative">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs text-[#C5A059] uppercase tracking-widest font-mono mb-1">
              {selectedProduct.series}
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">{selectedProduct.name}</h3>
            <p className="text-xs text-slate-400 mt-1">{selectedProduct.color || selectedProduct.note}</p>
            
            <div className="my-6 p-4 bg-black/40 rounded border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Finishes:</span>
                <span className="text-white font-medium">Polish, Flammed, Honed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Packaging:</span>
                <span className="text-white font-medium">Fumigated Sea-Worthy Crates</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.offices.india.whatsappNumber}?text=Inquiry%20for%20Stone:%20${encodeURIComponent(selectedProduct.name)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#25D366] text-black font-semibold text-xs uppercase tracking-wider py-3 rounded text-center"
              >
                Inquire on WhatsApp
              </a>
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="px-5 border border-white/20 hover:bg-white/5 text-xs text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EVENTS MODAL (FOOTER HOOK) */}
      {isEventsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#161822] border border-white/10 rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setIsEventsModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs text-[#C5A059] uppercase tracking-widest font-bold mb-2">
              ARPRAN Events
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-3">Upcoming Stone Expos</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Schedule updates for upcoming national and international stone trade fairs will be posted here.
            </p>
            <div className="p-3 bg-white/5 rounded border border-white/5 text-xs text-slate-400 mb-6">
              Status: Trade fair calendar updating.
            </div>
            <button 
              onClick={() => setIsEventsModalOpen(false)}
              className="w-full bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider py-2.5 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON (Exact number from brochure: +91-94140 68933) */}
      <a
        href={`https://wa.me/${COMPANY_INFO.offices.india.whatsappNumber}?text=Hello%20Arpran%20Industries,%20I%20am%20interested%20in%20natural%20stone%20export.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-black p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="WhatsApp Arpran"
      >
        <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          WhatsApp Us
        </span>
      </a>

      {/* FLOATING CHATBOT ASSISTANT */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-[#0A4E9B] hover:bg-[#083b77] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105"
            aria-label="Stone Assistant"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs font-semibold pr-1 hidden sm:inline">Ask ARPRAN</span>
          </button>
        )}

        {isChatOpen && (
          <div className="bg-[#151722] border border-white/10 rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden">
            <div className="bg-[#0A4E9B] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">ARPRAN Stone Consultant</h4>
                  <span className="text-[10px] text-white/80">Jaipur HQ Assistant</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#C5A059] text-black font-medium' 
                        : 'bg-[#1e212d] text-slate-200 border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-[#11131c] border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about granite, marble or sizes..."
                className="flex-1 bg-[#1a1c26] border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                className="p-2 bg-[#0A4E9B] hover:bg-[#083b77] text-white rounded-full transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}

