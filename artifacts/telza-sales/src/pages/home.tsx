import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  CheckCircle2, 
  X, 
  Menu,
  Linkedin, 
  ArrowUpRight, 
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  MessageSquare,
  Calendar,
  Users,
  Target,
  PhoneCall,
  Laptop,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const diagnosticSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid business email"),
  website: z.string().min(3, "Please enter your company website"),
  service: z.string().min(1, "Please select the service you are interested in"),
  problem: z.string().min(5, "Please tell us what you'd like to improve in your customer acquisition"),
});

type DiagnosticForm = z.infer<typeof diagnosticSchema>;

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<DiagnosticForm | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DiagnosticForm>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: {
      name: "",
      email: "",
      website: "",
      service: "Complete Turnkey Customer Acquisition Engine",
      problem: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buildCalendlyPrefillUrl = (data: DiagnosticForm) => {
    const baseUrl = "https://calendly.com/daikukaibindah/discovery_call";
    const prepNotes = `Website: ${data.website}\nService: ${data.service}\nGoal / Bottleneck: ${data.problem}`;

    const params = new URLSearchParams({
      name: data.name,
      email: data.email,
      notes: prepNotes,
      a1: prepNotes,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const onSubmitDiagnostic = async (data: DiagnosticForm) => {
    setSubmittedData(data);

    try {
      // 1. Dispatch instant email via Resend serverless function
      fetch("/.netlify/functions/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {});

      // 2. Also register with Netlify Forms in the background
      const formData = new URLSearchParams();
      formData.append("form-name", "diagnostic-inquiry");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("website", data.website);
      formData.append("service", data.service);
      formData.append("problem", data.problem);

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
    } catch {
      // Continue to confirmation view
    }

    setSubmitted(true);
  };

  const getCalendlyPrefillUrl = () => {
    if (!submittedData) return "https://calendly.com/daikukaibindah/discovery_call";
    return buildCalendlyPrefillUrl(submittedData);
  };

  const openServiceModal = (serviceName: string) => {
    setValue("service", serviceName);
    scrollTo("diagnostic");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-rose-600/15 antialiased">
      
      {/* Sticky Header Navigation */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-zinc-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] py-3"
            : "bg-white/90 backdrop-blur-sm border-zinc-200/60 py-4"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <img src="/logo.png" alt="Telza Sales" className="h-8 sm:h-9 md:h-10 object-contain" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-zinc-600">
            <button onClick={() => scrollTo("services")} className="hover:text-zinc-950 transition-colors">How We Help</button>
            <button onClick={() => scrollTo("how-it-works")} className="hover:text-zinc-950 transition-colors">How It Works</button>
            <button onClick={() => scrollTo("about")} className="hover:text-zinc-950 transition-colors">About Us</button>
            <button onClick={() => scrollTo("team")} className="hover:text-zinc-950 transition-colors">Our Team</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-zinc-950 transition-colors">Contact</button>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href="tel:+639956720645"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300/80 py-2 px-3 sm:px-3.5 rounded-xl transition-all shadow-2xs"
              title="Call Telza Sales directly"
            >
              <Phone className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs font-medium">+63 995 672 0645</span>
            </a>

            <Button
              onClick={() => scrollTo("diagnostic")}
              data-testid="button-header-diagnostic"
              className="hidden sm:inline-flex bg-zinc-900 hover:bg-zinc-800 text-white border-0 rounded-xl px-4 md:px-5 h-9 md:h-10 text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
            >
              Get Free Growth Audit
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-zinc-200 px-6 py-5 shadow-xl"
            >
              <div className="flex flex-col gap-4 text-sm font-semibold text-zinc-700">
                <button onClick={() => scrollTo("services")} className="text-left py-1 hover:text-rose-600">How We Help</button>
                <button onClick={() => scrollTo("how-it-works")} className="text-left py-1 hover:text-rose-600">How It Works</button>
                <button onClick={() => scrollTo("about")} className="text-left py-1 hover:text-rose-600">About Us</button>
                <button onClick={() => scrollTo("team")} className="text-left py-1 hover:text-rose-600">Our Team</button>
                <button onClick={() => scrollTo("diagnostic")} className="text-left py-1 hover:text-rose-600">Free Growth Audit</button>
                <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
                  <Button
                    onClick={() => scrollTo("diagnostic")}
                    className="w-full bg-zinc-900 text-white rounded-xl h-11 text-xs font-semibold"
                  >
                    Get Free Growth Audit
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section — Clean, Modern, Catchy & Relatable */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white border-b border-zinc-200/80">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.08)_0%,rgba(59,130,246,0.04)_45%,transparent_70%)] blur-3xl pointer-events-none -z-0" />

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Clear Value Proposition */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>Turn Leads Into Paying Customers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.1]">
                Turn more opportunities <br />
                <span className="bg-gradient-to-r from-zinc-950 via-rose-600 to-red-600 bg-clip-text text-transparent">
                  into customers.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
                We set up the outreach, 24/7 AI calling, and high-converting websites that help businesses and service companies capture new clients and book more sales calls—without hiring extra staff.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  onClick={() => scrollTo("diagnostic")}
                  data-testid="button-hero-primary-diagnostic"
                  className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl px-7 h-12 text-sm font-semibold shadow-md shadow-zinc-950/10 transition-all hover:scale-[1.02]"
                >
                  Get free growth audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => scrollTo("services")}
                  className="bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-800 rounded-xl px-7 h-12 text-sm font-semibold transition-all hover:border-zinc-400"
                >
                  See how we help
                  <ChevronRight className="ml-1.5 h-4 w-4 text-zinc-400" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-200/80 text-xs text-zinc-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Done for you — no extra payroll</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>24/7 phone answer in under 60s</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>You own 100% of your system</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>For service businesses & companies</span>
                </div>
              </div>

            </div>

            {/* Right Column: High Quality Lightweight Stock Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/90 bg-white relative">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                    alt="Business team collaborating on customer growth" 
                    className="w-full h-80 sm:h-96 object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Metric Badge 1 */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Average Speed-to-Lead</p>
                      <p className="text-xl font-extrabold text-zinc-950">Under 48 Seconds</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Floating Metric Badge 2 */}
                <div className="hidden sm:flex absolute -top-4 -right-4 px-4 py-2.5 rounded-2xl bg-zinc-950 text-white shadow-xl items-center gap-2.5 border border-zinc-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold">Live Calendar Bookings</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Services Section — Clear, Relatable Business Language + Stock Photos */}
      <section id="services" className="py-24 bg-[#fafafa] border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-16 max-w-2xl">
            <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2.5">What We Build For You</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Four simple ways we help your business grow.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-3">
              Clear, proven systems designed to bring in new clients, speed up customer replies, and keep your calendar full.
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Service 01: Targeted Client Outreach */}
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-9 shadow-xs hover:border-zinc-300 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Copy */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5" />
                    <span>01 // Direct Outreach</span>
                  </div>
                  
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    Targeted client outreach that fills your calendar
                  </h4>
                  
                  <p className="text-sm font-semibold text-rose-600">
                    Find the right decision-makers. Send personalized messages. Get booked meetings.
                  </p>
                  
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    Stop waiting around for word-of-mouth or guessing who to contact. We identify the exact businesses and decision-makers who need your services, send thoughtful personal outreach on your behalf, and put qualified sales appointments directly onto your calendar.
                  </p>

                  <div className="space-y-2.5 pt-1 text-sm text-zinc-700">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Verified decision-maker contact details (no spam lists)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Personalized, human-sounding messages that get real replies</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Appointments scheduled directly into your team's calendar</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={() => openServiceModal("Targeted Client Outreach & Lead Generation")}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold px-5 h-10"
                    >
                      Learn more about outreach
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Right: Clean Stock Photo */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-md border border-zinc-200 relative aspect-[4/3] bg-zinc-100">
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                      alt="Business team discussing client outreach strategy" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-zinc-200/80 text-xs">
                      <p className="font-bold text-zinc-900">Steady Pipeline</p>
                      <p className="text-zinc-500 text-[11px]">Qualified appointments delivered each week.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Service 02: 24/7 Voice AI */}
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-9 shadow-xs hover:border-zinc-300 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Copy */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>02 // Instant Phone Response</span>
                  </div>
                  
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    24/7 Voice AI receptionist & instant caller
                  </h4>
                  
                  <p className="text-sm font-semibold text-rose-600">
                    Never miss an incoming call. Follow up with website inquiries in under 60 seconds.
                  </p>
                  
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    When a customer calls or fills out a form on your site, our conversational Voice AI answers immediately—day or night. It speaks with natural human pacing, answers questions about your business, qualifies what they need, and books an appointment before they call a competitor.
                  </p>

                  <div className="space-y-2.5 pt-1 text-sm text-zinc-700">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Answers your business phone 24 hours a day, 7 days a week</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Calls back web leads in under 60 seconds while interest is highest</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Sounds natural, handles questions, and books directly into your calendar</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={() => openServiceModal("24/7 Voice AI Speed-to-Lead")}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold px-5 h-10"
                    >
                      See Voice AI in action
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Right: Clean Stock Photo */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-md border border-zinc-200 relative aspect-[4/3] bg-zinc-100">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                      alt="Professional customer service phone conversation" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-zinc-950 text-white p-3 rounded-xl border border-zinc-800 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-emerald-400">● 24/7 Response Active</span>
                        <span className="text-[11px] text-zinc-400">&lt;60s Callback</span>
                      </div>
                      <p className="text-zinc-300 text-[11px] mt-1">"Hey David! Saw your inquiry for Apex. Let's get that scheduled."</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Service 03: High-Converting Websites & Search Visibility */}
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-9 shadow-xs hover:border-zinc-300 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Copy */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
                    <Laptop className="w-3.5 h-3.5" />
                    <span>03 // Modern Website & Visibility</span>
                  </div>
                  
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    Websites built to convert + top visibility on Google & AI search
                  </h4>
                  
                  <p className="text-sm font-semibold text-rose-600">
                    Turn everyday visitors into paying inquiries. Get recommended when people search.
                  </p>
                  
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    We craft clean, modern, mobile-friendly websites designed specifically to make visitors pick up the phone or book a consultation. In addition, we optimize your site structure so when potential clients ask Google, ChatGPT, Perplexity, or Apple for recommendations, your business is cited as the top local or industry expert.
                  </p>

                  {/* Pulsing AI Readiness Button */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <motion.a
                      href="https://check.telzasales.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-ai-readiness-check"
                      animate={{
                        scale: [1, 1.025, 1],
                        boxShadow: [
                          "0 4px 14px 0 rgba(245, 158, 11, 0.35)",
                          "0 6px 22px 0 rgba(239, 68, 68, 0.45)",
                          "0 4px 14px 0 rgba(245, 158, 11, 0.35)"
                        ]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeInOut"
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md border border-amber-300/40 hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-100"></span>
                      </span>
                      <Sparkles className="h-4 w-4 text-amber-200 flex-shrink-0" />
                      <span>Free AI Search Readiness Check</span>
                      <ArrowUpRight className="h-4 w-4 text-white/90" />
                    </motion.a>

                    <Button
                      variant="ghost"
                      onClick={() => openServiceModal("Website, AEO & GEO AI Search Visibility")}
                      className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 rounded-xl px-4 h-10"
                    >
                      Request website audit
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Right: Clean Stock Photo */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-md border border-zinc-200 relative aspect-[4/3] bg-zinc-100">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                      alt="Modern website analytics and digital conversion dashboard" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-zinc-200/80 text-xs">
                      <p className="font-bold text-zinc-900">High-Converting Web Presence</p>
                      <p className="text-zinc-500 text-[11px]">Recommended in AI assistants & search engines.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Service 04: Smart Automations */}
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-9 shadow-xs hover:border-zinc-300 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Copy */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5" />
                    <span>04 // Seamless Workflows</span>
                  </div>
                  
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    Smart automations that save your team hours every week
                  </h4>
                  
                  <p className="text-sm font-semibold text-rose-600">
                    Your forms, phone calls, calendar, and CRM working together on autopilot.
                  </p>
                  
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    Say goodbye to copy-pasting lead details or losing track of customer messages. We wire your website forms, AI phone calls, calendar, customer database, and team alerts so everything syncs instantly. Zero manual data entry, zero lost opportunities.
                  </p>

                  <div className="space-y-2.5 pt-1 text-sm text-zinc-700">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Instant notifications to your team via SMS, WhatsApp, or Slack</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Automatic contact syncing into your CRM or Google Sheets</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Zero manual admin work so you can focus on serving your clients</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={() => openServiceModal("Custom Automations & Internal Workflows")}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold px-5 h-10"
                    >
                      Automate your workflows
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Right: Clean Stock Photo */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden shadow-md border border-zinc-200 relative aspect-[4/3] bg-zinc-100">
                    <img 
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" 
                      alt="Business professional working smoothly with automated systems" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-zinc-200/80 text-xs">
                      <p className="font-bold text-zinc-900">Zero Manual Admin</p>
                      <p className="text-zinc-500 text-[11px]">Leads automatically synced and assigned.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section — 3 Clear Steps */}
      <section id="how-it-works" className="py-24 bg-white border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-14 max-w-2xl">
            <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2.5">Our Simple Process</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              How we get your customer engine running.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
              A transparent, done-for-you rollout where our team handles the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Discover */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-7 relative space-y-3">
              <span className="text-xs font-bold text-zinc-700 bg-zinc-200/80 px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block mb-1">
                Step 01
              </span>
              <h4 className="text-xl font-bold text-zinc-950">Free Growth Audit</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We review your current website, inquiry forms, and customer outreach to pinpoint where potential clients are falling through the cracks.
              </p>
            </div>

            {/* Step 2: Build */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-7 relative space-y-3">
              <span className="text-xs font-bold text-zinc-700 bg-zinc-200/80 px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block mb-1">
                Step 02
              </span>
              <h4 className="text-xl font-bold text-zinc-950">We Build & Connect Everything</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We set up your custom outreach lists, train your 24/7 Voice AI receptionist, polish your website, and link your calendar and tools together.
              </p>
            </div>

            {/* Step 3: Launch */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-7 relative space-y-3">
              <span className="text-xs font-bold text-zinc-700 bg-zinc-200/80 px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block mb-1">
                Step 03
              </span>
              <h4 className="text-xl font-bold text-zinc-950">New Clients On Your Calendar</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Your campaigns go live. Incoming calls and web inquiries are answered in under 60 seconds, and qualified meetings flow directly to your schedule.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-[#fafafa] border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-zinc-200/90 shadow-md bg-white relative max-w-md mx-auto">
                <img 
                  src="/founder.jpg" 
                  alt="Daikukai Bindah - Founder of Telza Sales" 
                  className="w-full h-auto object-cover object-center max-h-[480px]"
                />
                <div className="p-4 bg-white border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-zinc-950">Daikukai Bindah</h5>
                    <p className="text-xs text-rose-600 font-medium">Founder & Systems Specialist</p>
                  </div>
                  <a
                    href="https://www.linkedin.com/company/telzasales/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-rose-600 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 text-zinc-800 text-xs font-bold uppercase tracking-wider mb-2">
                About Telza Sales
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                Built to help businesses capture more clients.
              </h3>

              <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Telza Sales was founded by Daikukai Bindah</strong> to solve the single most frustrating challenge in business: finding steady, qualified clients without burning cash on unvetted agencies or hiring expensive internal sales reps.
                </p>
                
                <p>
                  <strong>Real solutions, zero guesswork.</strong> We don't believe in vanity metrics or generic spam. Instead, we set up real, working business systems: direct outreach to your dream clients, 24/7 Voice AI agents that answer customer questions instantly, and clean websites built to turn visitors into booked consultations.
                </p>

                <p>
                  <strong>You deal with the people who build it.</strong> You work directly with the experienced team configuring your systems, ensuring everything is tailored to your exact services and goals from day one.
                </p>

                <p className="text-zinc-500 text-xs font-mono pt-1">
                  Operating from Cayco Street, Sampaloc, Metro Manila • Proudly serving businesses across North America, APAC, and EMEA.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => scrollTo("diagnostic")}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-6 h-11 text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
                >
                  Get your free growth audit
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-24 bg-white border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2.5">Our Team</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              The people setting up your engine.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
              Dedicated specialists managing your client outreach, AI receptionists, and system integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Team Member 1: Marco Reyes */}
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-200 relative">
                <img 
                  src="/team-marco.jpg" 
                  alt="Marco Reyes - Lead Outreach & Client Targeting Specialist" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white border-t border-zinc-200/80">
                <h4 className="text-lg font-bold text-zinc-950">Marco Reyes</h4>
                <p className="text-xs font-semibold text-rose-600 mb-2">Lead Outreach & Client Targeting Specialist</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Identifies verified decision-makers and crafts personal, tailored messages that fill your sales calendar with qualified buyers.
                </p>
              </div>
            </div>

            {/* Team Member 2: Clarissa Santos */}
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-200 relative">
                <img 
                  src="/team-clarissa.jpg" 
                  alt="Clarissa Santos - Voice AI & Client Experience Specialist" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white border-t border-zinc-200/80">
                <h4 className="text-lg font-bold text-zinc-950">Clarissa Santos</h4>
                <p className="text-xs font-semibold text-rose-600 mb-2">Voice AI & Client Experience Specialist</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Designs natural conversational voice agents that answer incoming phone inquiries instantly and lock in appointment bookings.
                </p>
              </div>
            </div>

            {/* Team Member 3: Angelo Del Rosario */}
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-200 relative">
                <img 
                  src="/team-angelo.jpg" 
                  alt="Angelo Del Rosario - Automations & Workflow Specialist" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white border-t border-zinc-200/80">
                <h4 className="text-lg font-bold text-zinc-950">Angelo Del Rosario</h4>
                <p className="text-xs font-semibold text-rose-600 mb-2">Automations & Workflow Specialist</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Wires your web forms, phone systems, CRM, and team chat together so your business runs smoothly with zero manual admin.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Free Growth Audit / Lead Capture Section */}
      <section id="diagnostic" className="py-24 bg-[#fafafa] border-b border-zinc-200/80 scroll-mt-20">
        <div className="container max-w-5xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contextual Value Proposition */}
            <div className="lg:col-span-5 space-y-5 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-bold uppercase tracking-wider">
                Free Growth Audit
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                Request your free customer growth audit.
              </h2>
              
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Tell us about your business, the services you provide, and where you'd like to get more clients. We will review your current setup and send you a straightforward action plan within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900">Website & Lead Audit</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">We check how easily prospective clients find you and where inquiries drop off.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900">Response Speed Review</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">We evaluate how quickly inquiries are answered and where sales opportunities are missed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900">Tailored Action Plan</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">You receive a simple, step-by-step roadmap showing how to bring in more booked clients.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 text-xs text-zinc-500 font-mono">
                Direct inquiry: <a href="mailto:kai@telzasales.com" className="text-rose-600 font-semibold underline">kai@telzasales.com</a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-zinc-200 rounded-3xl p-7 sm:p-9 shadow-lg shadow-zinc-950/5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-zinc-900 via-rose-600 to-red-600" />

                {submitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950">Inquiry Received!</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
                      Thank you. We have received your details. If you'd like to talk right away, you can pick a convenient 15-minute time on our calendar:
                    </p>
                    <div className="pt-3 max-w-xs mx-auto">
                      <Button
                        onClick={() => window.open(getCalendlyPrefillUrl(), "_blank")}
                        className="w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl h-12 text-xs font-semibold shadow-sm transition-all"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Open Live Calendar
                        <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors block mx-auto pt-3"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmitDiagnostic)}
                    className="space-y-4"
                    data-testid="form-hero-diagnostic"
                    name="diagnostic-inquiry"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    <input type="hidden" name="form-name" value="diagnostic-inquiry" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-rose-600">*</span>
                        </label>
                        <input
                          {...register("name")}
                          data-testid="input-hero-name"
                          placeholder="Alex Vance"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                          Business Email <span className="text-rose-600">*</span>
                        </label>
                        <input
                          {...register("email")}
                          data-testid="input-hero-email"
                          type="email"
                          placeholder="alex@company.com"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                          Company Website <span className="text-rose-600">*</span>
                        </label>
                        <input
                          {...register("website")}
                          data-testid="input-hero-website"
                          placeholder="company.com"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all"
                        />
                        {errors.website && (
                          <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                          Primary Goal <span className="text-rose-600">*</span>
                        </label>
                        <select
                          {...register("service")}
                          data-testid="select-hero-service"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all"
                        >
                          <option value="Targeted Client Outreach & Lead Generation">01 // Get More Clients (Targeted Outreach)</option>
                          <option value="24/7 Voice AI Speed-to-Lead">02 // 24/7 Phone Answering & Quick Follow-up</option>
                          <option value="Website, AEO & GEO AI Search Visibility">03 // Modern Website & Google / AI Search</option>
                          <option value="Custom Automations & Internal Workflows">04 // Smart Automations (Connect My Tools)</option>
                          <option value="Complete Turnkey Customer Acquisition Engine">Complete Turnkey Customer Engine</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        What would you like to improve most? <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        {...register("problem")}
                        data-testid="input-hero-problem"
                        rows={3}
                        placeholder="e.g. We need more booked client meetings, we are missing phone calls from new leads, or our website isn't bringing in enough inquiries..."
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all resize-none"
                      />
                      {errors.problem && (
                        <p className="text-red-500 text-xs mt-1">{errors.problem.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      data-testid="button-submit-hero-diagnostic"
                      disabled={isSubmitting}
                      className="w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl h-11 text-sm font-semibold shadow-xs transition-all hover:scale-[1.01] disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting..." : "Get my free growth audit"}
                      {!isSubmitting && <ChevronRight className="ml-1.5 h-4 w-4" />}
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section id="contact" className="py-20 bg-white border-b border-zinc-200/80">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mb-3 tracking-tight">
            Ready to get more clients?
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Email <a href="mailto:kai@telzasales.com" className="text-rose-600 font-semibold hover:underline">kai@telzasales.com</a> or speak directly with our team today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => scrollTo("diagnostic")}
              data-testid="button-prefooter-diagnostic"
              className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl px-7 h-12 text-sm font-semibold shadow-xs transition-all hover:scale-105"
            >
              Get free growth audit
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <a
              href="tel:+639956720645"
              className="inline-flex items-center justify-center gap-2 text-zinc-800 hover:text-zinc-950 font-semibold text-sm bg-zinc-100 border border-zinc-300 rounded-xl px-6 h-12 hover:bg-zinc-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-rose-600" />
              Call +63 995 672 0645
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-zinc-700 py-16 border-t border-zinc-200">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-200/80">
            
            {/* Col 1: Brand & Summary */}
            <div className="lg:col-span-5 space-y-4">
              <img src="/logo.png" alt="Telza Sales" className="h-9 object-contain" />
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                Telza Sales builds customer acquisition engines for growing businesses and service companies. Targeted outreach, 24/7 Voice AI phone answering, high-converting websites, and smart automations.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.linkedin.com/company/telzasales/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:border-zinc-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:kai@telzasales.com"
                  className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:border-zinc-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Operating Headquarters */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-950">Operating Headquarters</h4>
              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Cayco Street, Sampaloc, Metro Manila, Philippines</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Globe className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Serving businesses and service companies across North America, APAC & EMEA</span>
                </div>
              </div>
            </div>

            {/* Col 3: Direct Phone & Rapid Contact */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-950">Direct Contacts</h4>
              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-rose-600 flex-shrink-0" />
                  <a href="tel:+639956720645" className="hover:text-zinc-950 font-semibold transition-colors">
                    +63 995 672 0645
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-rose-600 flex-shrink-0" />
                  <a href="mailto:kai@telzasales.com" className="hover:text-zinc-950 font-semibold transition-colors">
                    kai@telzasales.com
                  </a>
                </div>
                <div className="pt-2">
                  <Button
                    size="sm"
                    onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold px-4 h-8 transition-all"
                  >
                    Direct Calendar Booking
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div>
              © {new Date().getFullYear()} Telza Sales. All rights reserved. Founded by Daikukai Bindah.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-zinc-800 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-800 transition-colors">Terms of Service</a>
              <a href="mailto:kai@telzasales.com" className="hover:text-zinc-800 transition-colors">Support</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
