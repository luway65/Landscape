import { useState, useRef } from 'react';
import {
  Wrench,
  Leaf,
  Home as HomeIcon,
  ShieldCheck,
  Clock,
  ThumbsUp,
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Tv,
  Camera
} from 'lucide-react';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="flex items-center gap-2">
                <div className="bg-emerald-600 p-2 rounded-lg">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold leading-tight text-slate-900">Elevate</h1>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Home &amp; Yard</p>
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigateTo('home')} className={`font-medium ${currentPage === 'home' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}>Home</button>
              <div className="relative group">
                <button className="font-medium text-slate-600 hover:text-emerald-600 flex items-center gap-1">
                  Services <ChevronRight className="h-4 w-4 rotate-90" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl py-2 hidden group-hover:block border border-slate-100">
                  <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => navigateTo('services')}>Modern Handyman</div>
                  <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => navigateTo('services')}>Smart Home Install</div>
                  <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => navigateTo('services')}>Low-Maintenance Landscaping</div>
                  <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => navigateTo('services')}>Custom Edible Gardens</div>
                </div>
              </div>
              <button onClick={() => navigateTo('portfolio')} className={`font-medium ${currentPage === 'portfolio' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}>Our Work</button>
              <button onClick={() => navigateTo('about')} className={`font-medium ${currentPage === 'about' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}>About Us</button>
              <button onClick={() => navigateTo('contact')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                Free Estimate
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-2 shadow-lg">
            <button onClick={() => navigateTo('home')} className="block w-full text-left py-3 font-medium text-slate-700 border-b border-slate-50">Home</button>
            <button onClick={() => navigateTo('services')} className="block w-full text-left py-3 font-medium text-slate-700 border-b border-slate-50">All Services</button>
            <button onClick={() => navigateTo('portfolio')} className="block w-full text-left py-3 font-medium text-slate-700 border-b border-slate-50">Our Work</button>
            <button onClick={() => navigateTo('about')} className="block w-full text-left py-3 font-medium text-slate-700 border-b border-slate-50">About Us</button>
            <button onClick={() => navigateTo('contact')} className="block w-full mt-4 bg-emerald-600 text-white text-center py-3 rounded-xl font-semibold">Get a Free Estimate</button>
          </div>
        )}
      </nav>

      {/* Page Routing */}
      <main>
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'services' && <ServicesPage navigateTo={navigateTo} />}
        {currentPage === 'portfolio' && <PortfolioPage navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
        {currentPage === 'contact' && <ContactPage navigateTo={navigateTo} />}
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Elevate</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">Precision Home Maintenance &amp; Modern Landscape Design. Fully licensed and insured.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('services')} className="hover:text-emerald-400">Modern Handyman</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-emerald-400">Smart Home</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-emerald-400">Landscaping</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-emerald-400">Custom Gardens</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('about')} className="hover:text-emerald-400">About Us</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-emerald-400">Our Work</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-emerald-400">Contact</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Austin, TX</li>
              <li>Round Rock, TX</li>
              <li>Cedar Park, TX</li>
              <li>Georgetown, TX</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Sticky Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-3 md:p-4 z-50 flex justify-between items-center shadow-2xl">
        <div className="hidden md:flex items-center gap-6 text-white ml-4">
          <div className="flex items-center gap-2"><Phone className="h-5 w-5 text-emerald-500" /> <span className="font-medium">(555) 123-4567</span></div>
          <div className="flex items-center gap-2"><Mail className="h-5 w-5 text-emerald-500" /> <span className="font-medium">hello@elevatehome.com</span></div>
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end items-center px-4 md:px-0 gap-4">
          <div className="md:hidden flex flex-col text-white">
            <span className="text-xs text-slate-400">Call us today</span>
            <span className="font-bold text-emerald-400">(555) 123-4567</span>
          </div>
          <button onClick={() => navigateTo('contact')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-emerald-500 flex items-center gap-2 w-full md:w-auto justify-center">
            <Calendar className="h-5 w-5" /> Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

// --- HOME PAGE ---
function HomePage({ navigateTo }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 flex opacity-40">
          <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}></div>
          <div className="w-1/2 bg-cover bg-center border-l-4 border-emerald-600" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40 flex flex-col items-center text-center">
          <span className="bg-emerald-500/20 text-emerald-300 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-emerald-500/30 backdrop-blur-sm">
            Top Rated in Austin, TX
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl drop-shadow-lg">
            Precision Home Maintenance &amp; <br className="hidden md:block" />
            <span className="text-emerald-400">Modern Landscape Design.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl drop-shadow-md">
            From smart home upgrades to low-maintenance xeriscaping, we provide reliable, high-quality solutions for your property. One contractor. Zero hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigateTo('contact')} className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/50 flex items-center justify-center gap-2">
              Get a Free Estimate <ChevronRight className="h-5 w-5" />
            </button>
            <button onClick={() => navigateTo('portfolio')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Transparent Pricing</h3>
              <p className="text-slate-600">Flat-rate quotes with no hidden fees. You know exactly what you&apos;re paying before we start.</p>
            </div>
            <div className="p-6 pt-10 md:pt-6">
              <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Reliable Communication</h3>
              <p className="text-slate-600">We respond to all inquiries within 24 hours, show up on time, and keep you updated.</p>
            </div>
            <div className="p-6 pt-10 md:pt-6">
              <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <ThumbsUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Quality Craftsmanship</h3>
              <p className="text-slate-600">We don&apos;t cut corners. From wiring to stonework, we build it to last and look pristine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything Your Property Needs</h2>
            <p className="text-lg text-slate-600">Specialized services designed for the modern homeowner.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Wrench className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Modern Handyman</h3>
              <p className="text-slate-600 mb-6">Professional TV mounting, precision drywall repair, fixture replacement, and general property maintenance done right.</p>
              <button onClick={() => navigateTo('services')} className="text-emerald-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <HomeIcon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Smart Home Installation</h3>
              <p className="text-slate-600 mb-6">Stop fighting with wiring. We seamlessly install and integrate Ring cameras, smart locks, thermostats, and mesh Wi-Fi.</p>
              <button onClick={() => navigateTo('services')} className="text-emerald-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Leaf className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Low-Maintenance Landscaping</h3>
              <p className="text-slate-600 mb-6">Drought-resistant xeriscaping, clean stone walkways, native plant installation, and fresh premium mulch.</p>
              <button onClick={() => navigateTo('services')} className="text-emerald-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Leaf className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Custom Edible Gardens</h3>
              <p className="text-slate-600 mb-6">Beautiful, functional cedar raised beds, automated drip irrigation, and customized herb/vegetable foodscaping.</p>
              <button onClick={() => navigateTo('services')} className="text-emerald-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">See the Transformation.</h2>
              <p className="text-xl text-slate-400 mb-8">Drag the slider to see how we turn tangled messes into sleek setups, and overgrown yards into modern oases.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-emerald-500" /> Clean Wire Management</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-emerald-500" /> Professional Mounting</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-emerald-500" /> Complete Clean-up</li>
              </ul>
              <button onClick={() => navigateTo('portfolio')} className="bg-white text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-colors">
                View Full Portfolio
              </button>
            </div>
            <div className="lg:w-1/2 w-full">
              <BeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- BEFORE/AFTER SLIDER ---
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    let clientX = event.clientX;

    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
    }

    const x = Math.max(0, Math.min(clientX - containerRect.left, containerRect.width));
    const percentage = (x / containerRect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e) => {
    handleMove(e);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    handleMove(e);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchEnd = () => {
    window.removeEventListener('touchmove', handleMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl border-4 border-slate-800"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Before Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")' }}
      >
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded font-semibold text-sm">Before</div>
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 bg-cover bg-center border-r-[3px] border-white"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded font-semibold text-sm shadow-lg">After</div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-slate-800 border-2 border-emerald-500">
          <ChevronRight className="h-5 w-5 rotate-180 -mr-1" />
          <ChevronRight className="h-5 w-5 -ml-1" />
        </div>
      </div>
    </div>
  );
}

// --- SERVICES PAGE ---
function ServicesPage({ navigateTo }) {
  return (
    <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Our Services</h1>
      <p className="text-xl text-slate-600 mb-12 max-w-3xl">Detailed, transparent, and built for modern living. Select a service below.</p>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold mb-6">
            <Tv className="h-4 w-4" /> Smart Home &amp; Security
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Stop fighting with wiring. We install it right.</h2>
          <p className="text-slate-600 mb-6 text-lg">We seamlessly install and integrate your Ring cameras, smart locks, and thermostats. No dangling wires, no Wi-Fi dead zones, just a house that works for you.</p>

          <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Flat-Rate Pricing Expectation:</h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex justify-between"><span>Smart Doorbell Install</span> <span>$149</span></li>
              <li className="flex justify-between"><span>TV Mounting (Wire Concealment)</span> <span>$199</span></li>
              <li className="flex justify-between"><span>Smart Thermostat Wiring</span> <span>$129</span></li>
            </ul>
          </div>

          <button onClick={() => navigateTo('contact')} className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 w-full text-center">
            Book This Service
          </button>
        </div>
        <div className="md:w-1/2 bg-slate-100 rounded-2xl flex items-center justify-center p-8 text-center border-2 border-dashed border-slate-300">
          <div>
            <Camera className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">CMS Image/Video Space</p>
            <p className="text-sm text-slate-400">Pulled dynamically from Prisma DB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PORTFOLIO PAGE ---
function PortfolioPage() {
  return (
    <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Our Work</h1>
      <p className="text-xl text-slate-600 mb-12">Filter by category to see our recent transformations.</p>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium whitespace-nowrap">All Projects</button>
        <button className="bg-white text-slate-600 border border-slate-200 px-6 py-2 rounded-full font-medium whitespace-nowrap hover:bg-slate-50">Landscaping</button>
        <button className="bg-white text-slate-600 border border-slate-200 px-6 py-2 rounded-full font-medium whitespace-nowrap hover:bg-slate-50">Smart Home</button>
        <button className="bg-white text-slate-600 border border-slate-200 px-6 py-2 rounded-full font-medium whitespace-nowrap hover:bg-slate-50">Handyman</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer">
            <div className="h-64 bg-slate-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-500 group-hover:scale-105 transition-transform duration-500">
                <Camera className="h-8 w-8" />
              </div>
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded text-xs font-bold text-slate-800 uppercase tracking-wider">
                {item % 2 === 0 ? 'Landscaping' : 'Handyman'}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Project Title {item}</h3>
              <p className="text-slate-600 text-sm">Brief description of the transformation pulled from the custom Prisma backend.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ABOUT PAGE ---
function AboutPage() {
  return (
    <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Modern Solutions for Modern Homes.</h1>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            We started Elevate because we saw a massive gap in the market. Finding a reliable contractor who understands both modern technology (like smart home integrations) and sustainable landscaping was nearly impossible.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Our philosophy is simple: Focus on functionality and low-maintenance living. Your home should be a place to relax, not an endless to-do list.
          </p>
          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-xl">
            <p className="text-emerald-900 font-medium italic">&quot;We treat your property exactly how we treat our own—with precision, care, and an eye for the details.&quot;</p>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="bg-slate-200 w-full h-[500px] rounded-3xl flex flex-col items-center justify-center text-slate-500 border border-slate-300 shadow-xl">
            <Camera className="h-12 w-12 mb-4" />
            <p className="font-medium">Professional Owner Photo Here</p>
            <p className="text-sm">(No stock photos—authenticity converts)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- CONTACT PAGE ---
function ContactPage({ navigateTo }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-32 max-w-3xl mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Request Received!</h1>
        <p className="text-xl text-slate-600 mb-8">Thank you. Your inquiry has been routed directly to our CRM. We will contact you within 24 hours.</p>
        <button onClick={() => navigateTo('home')} className="text-emerald-600 font-bold hover:underline">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-12 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Get a Free Estimate</h1>
      <p className="text-xl text-slate-600 mb-10">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
            <input type="text" required placeholder="John" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
            <input type="text" required placeholder="Smith" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
          <input type="email" required placeholder="john@example.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
          <input type="tel" placeholder="(555) 000-0000" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Service Needed</label>
          <select required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
            <option value="">Select a service...</option>
            <option>Modern Handyman</option>
            <option>Smart Home Installation</option>
            <option>Low-Maintenance Landscaping</option>
            <option>Custom Edible Gardens</option>
            <option>Multiple / Not Sure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Project Description</label>
          <textarea required rows={5} placeholder="Tell us about your project..." className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 text-white py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Calendar className="h-5 w-5" /> Send My Request
            </>
          )}
        </button>
      </form>
    </div>
  );
}
