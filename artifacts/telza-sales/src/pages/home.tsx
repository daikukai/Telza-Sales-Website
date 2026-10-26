import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Zap, 
  Crosshair, 
  CheckCircle2, 
  X, 
  Linkedin, 
  Search, 
  PhoneCall, 
  Database, 
  Cpu, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  Bot, 
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  FileCheck,
  MapPin,
  Mail,
  Phone,
  Clock,
  Globe,
  Building2,
  Terminal,
  Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  company: z.string().min(1, "Please enter your company name"),
  email: z.string().email("Please enter a valid work email"),
  website: z.string().optional(),
  service: z.string().min(1, "Please select an area of focus"),
  message: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

function BookingModal({ open, onClose, defaultService }: { open: boolean; onClose: () => void; defaultService?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { 
      name: "", 
      company: "", 
      email: "", 
      website: "",
      service: defaultService || "Full AI Revenue Infrastructure", 
      message: "" 
    },
  });

  useEffect(() => {
    if (defaultService) {
      setValue("service", defaultService);
    }
  }, [defaultService, setValue]);

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 600));
    const subject = encodeURIComponent(`Inquiry from ${data.company}: ${data.service}`);
    const body = encodeURIComponent(
      `Hi Kai,\n\nI'd like to discuss our revenue infrastructure and AI systems.\n\n` +
      `Name: ${data.name}\n` +
      `Company: ${data.company}\n` +
      `Work Email: ${data.email}\n` +
      `Website: ${data.website || "N/A"}\n` +
      `Focus Area: ${data.service}\n` +
      `Notes: ${data.message || "None"}\n`
    );
    window.location.href = `mailto:kai@telzasales.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    reset();
  };

  const handleClose = () => {
    setSubmitted(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative bg-white border border-zinc-200/90 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-red-500 to-amber-500" />

            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200/80 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                    Systems Architecture
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">Build Your AI Growth Engine</h2>
                  <p className="text-zinc-500 text-sm mt-1">Book an architectural review or request your free AI search audit.</p>
                </div>
                <button
                  onClick={handleClose}
                  data-testid="button-close-modal"
                  className="text-zinc-400 hover:text-zinc-700 transition-colors p-1.5 rounded-lg hover:bg-zinc-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-8 text-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950">Request Prepared</h3>
                  <p className="text-zinc-600 text-sm max-w-xs leading-relaxed">
                    Your email client has opened with your diagnostic request. You can also directly pick a time on our calendar:
                  </p>
                  <Button
                    onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11 font-medium shadow-sm"
                  >
                    Open Instant Booking Calendar
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleClose}
                    className="text-zinc-500 hover:text-zinc-800"
                  >
                    Done
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="form-booking">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("name")}
                      data-testid="input-name"
                      placeholder="Alex Vance"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1" data-testid="error-name">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Company <span className="text-primary">*</span>
                      </label>
                      <input
                        {...register("company")}
                        data-testid="input-company"
                        placeholder="Nexus Software"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-xs mt-1" data-testid="error-company">{errors.company.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Website / Domain
                      </label>
                      <input
                        {...register("website")}
                        data-testid="input-website"
                        placeholder="nexus.com"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Work Email <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("email")}
                      data-testid="input-email"
                      type="email"
                      placeholder="alex@nexus.com"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1" data-testid="error-email">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Primary Focus Area <span className="text-primary">*</span>
                    </label>
                    <select
                      {...register("service")}
                      data-testid="select-service"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                    >
                      <option value="72-Hour AI Search & GEO/AEO Visibility Sprint">72-Hour AI Search & GEO/AEO Visibility Sprint</option>
                      <option value="Turnkey Outbound Engine (Clay + Waterfall Enrichment)">Turnkey Outbound Engine (Clay + Waterfall Enrichment)</option>
                      <option value="24/7 Voice AI Speed-to-Lead Receptionist">24/7 Voice AI Speed-to-Lead Receptionist</option>
                      <option value="Custom Internal RAG Knowledge & Ops Automations">Custom Internal RAG Knowledge & Ops Automations</option>
                      <option value="Complete Turnkey Revenue Infrastructure">Complete Turnkey Revenue Infrastructure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Current Bottleneck <span className="text-zinc-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      {...register("message")}
                      data-testid="input-message"
                      rows={2}
                      placeholder="e.g. Outbound emails are burning out, need 24/7 call qualification, or want to rank on Perplexity..."
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="button-submit-booking"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11 text-sm font-semibold shadow-md transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing..." : "Submit Diagnostic Request"}
                    {!isSubmitting && <ChevronRight className="ml-1.5 h-4 w-4" />}
                  </Button>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <span className="text-zinc-500 text-xs">Or prefer direct booking?</span>
                    <a
                      href="https://calendly.com/daikukaibindah/discovery_call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs font-semibold inline-flex items-center"
                    >
                      Pick a time on Calendly <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Full Revenue Infrastructure Package");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWithService = (service: string) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/15 antialiased">
      <BookingModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        defaultService={selectedService}
      />

      {/* Navbar with Requested Nav Items: Services, Solutions, About Us, Contact Us */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3"
            : "bg-white/70 backdrop-blur-xs border-zinc-200/50 py-4"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a 
              href="#" 
              className="flex items-center gap-2.5 group" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            >
              <img src="/logo.png" alt="Telza" className="h-9 md:h-10 object-contain" />
            </a>
            
            {/* Direct primary nav links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-700">
              <button onClick={() => scrollTo("services")} className="hover:text-primary transition-colors">Our Services</button>
              <button onClick={() => scrollTo("solutions")} className="hover:text-primary transition-colors">Solutions</button>
              <button onClick={() => scrollTo("about-us")} className="hover:text-primary transition-colors">About Us</button>
              <button onClick={() => openWithService("General Inquiry")} className="hover:text-primary transition-colors">Contact Us</button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              data-testid="button-audit-nav"
              variant="outline"
              className="hidden sm:inline-flex border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 rounded-full text-xs font-semibold px-4 h-9 shadow-xs"
              onClick={() => openWithService("72-Hour AI Search & GEO/AEO Visibility Sprint")}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" />
              Free GEO Audit
            </Button>
            <Button
              data-testid="button-contact-us-nav"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 h-9 text-xs font-semibold shadow-sm transition-all"
              onClick={() => openWithService("Complete Turnkey Revenue Infrastructure")}
            >
              Book Systems Call
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section — Full-Bleed Realistic Workspace Image with High-Contrast Text Overlay */}
      <section className="relative min-h-[94vh] flex items-center overflow-hidden py-32 md:py-44">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-realistic.jpg" 
            alt="Telza AI Revenue Operations Workspace" 
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle semi-opaque light frosted glass scrim with high-contrast text backing */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/92 to-white/75 backdrop-blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
        </div>

        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-red-200/90 shadow-sm mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-zinc-900 tracking-wider uppercase">Turnkey AI Infrastructure For Founder-Led B2B</span>
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] mb-6">
                Scale your pipeline without hiring sales reps or agencies. <br/>
                <span className="text-zinc-950 font-extrabold">Build a </span>
                <span className="font-serif italic font-normal text-primary">Turnkey Revenue Engine.</span>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-lg sm:text-xl text-zinc-700 font-normal mb-8 leading-relaxed max-w-2xl">
                We engineer done-for-you customer acquisition systems: 72-hour AI Search visibility (GEO), automated Clay outbound pipelines, and 24/7 Voice AI triage. Zero developer headaches, zero agency retainers—just qualified pipeline on your calendar.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
                <Button
                  size="lg"
                  data-testid="button-book-call-hero"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-9 h-14 text-base font-semibold shadow-lg shadow-red-500/15 transition-all hover:scale-[1.02]"
                  onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
                >
                  Book a Systems Diagnostic
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  data-testid="button-audit-hero"
                  className="border-zinc-300 bg-white/90 hover:bg-white text-zinc-900 rounded-full px-7 h-14 text-base font-semibold shadow-sm transition-all"
                  onClick={() => scrollTo("geo-audit")}
                >
                  <Search className="mr-2 h-4 w-4 text-primary" />
                  Check AI Search Visibility
                </Button>
              </motion.div>

              {/* Live Telemetry Floating Pills */}
              <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
                <div className="bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl px-3.5 py-2 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-zinc-800">72-Hour Turnkey Deployment</span>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl px-3.5 py-2 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-zinc-800">Zero In-House Devs Required</span>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl px-3.5 py-2 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-semibold text-zinc-800">100% Owned Infrastructure</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section (`#services`) — Crisp White Background */}
      <section id="services" className="py-24 bg-white relative">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Core Modular Engines</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">Enterprise pipeline power. Zero headcount.</h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-4">
              Turnkey systems engineered to connect to your domain, website, and CRM in days without adding engineers or sales payroll.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Clay Outbound Engine with Interactive UI Preview */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200/90 rounded-3xl p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Crosshair className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">01 // Acquisition</span>
                </div>
                
                <h4 className="text-2xl font-bold text-zinc-950 mb-1.5">Turnkey Outbound Engine</h4>
                <p className="text-xs font-semibold text-primary mb-4">Clay + 70-Source Waterfall Enrichment + Buying Triggers</p>
                
                {/* Embedded Realistic Mockup: Clay Waterfall Table */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 mb-6 font-mono text-xs shadow-inner">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 text-zinc-500 font-bold text-[10px] uppercase">
                    <span>Target Account</span>
                    <span>Buying Signal</span>
                    <span>Waterfall Status</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-zinc-200/70 shadow-2xs">
                      <span className="font-semibold text-zinc-900">Apex Robotics</span>
                      <span className="text-primary font-medium text-[10px] bg-red-50 px-1.5 py-0.5 rounded">Hiring VP Sales</span>
                      <span className="text-emerald-600 font-bold">✓ 99.4% Verified</span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-zinc-200/70 shadow-2xs">
                      <span className="font-semibold text-zinc-900">CloudSync AI</span>
                      <span className="text-amber-600 font-medium text-[10px] bg-amber-50 px-1.5 py-0.5 rounded">Tech Migration</span>
                      <span className="text-emerald-600 font-bold">✓ Enriched (Clay)</span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  Scale outbound like a 10-person sales team without hiring a single rep or learning complex automation tools. We set up secondary domains, configure bulletproof deliverability (SPF/DKIM/DMARC), build live intent scraping (hiring spikes, tech migration, funding), and write hyper-personalized sequences so qualified meetings appear directly on your calendar.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>100% Done-for-You: We handle domains, DNS records, Clay tables, and mailbox warming</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Signal-driven targeting: Only contact buyers actively hiring or adopting new software</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Direct CRM & calendar integration: Wake up to qualified calls without manual prospecting</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-xl"
                onClick={() => openWithService("Turnkey Outbound Engine (Clay + Waterfall Enrichment)")}
              >
                <span>Launch Turnkey Outbound</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Card 2: Voice AI Speed-to-Lead with Interactive Waveform Preview */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200/90 rounded-3xl p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">02 // Conversion</span>
                </div>
                
                <h4 className="text-2xl font-bold text-zinc-950 mb-1.5">24/7 Voice AI Speed-to-Lead</h4>
                <p className="text-xs font-semibold text-primary mb-4">Instant Inbound Qualification · 60-Second Form Triage</p>
                
                {/* Embedded Realistic Mockup: Voice AI Call Agent UI */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 mb-6 text-xs shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-zinc-900 text-[11px]">Active Inbound Call #481</span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500">Duration: 01:14</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-zinc-200/80 mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
                      <div className="w-1 h-5 bg-primary rounded-full animate-pulse delay-75" />
                      <div className="w-1 h-4 bg-primary rounded-full animate-pulse delay-150" />
                      <div className="w-1 h-6 bg-primary rounded-full animate-pulse delay-100" />
                      <span className="text-[11px] font-medium text-zinc-700 ml-1">"We can integrate with your Salesforce instance..."</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span>Qualification: BANT Confirmed</span>
                    <span className="text-primary font-bold">Demo Scheduled for 2PM</span>
                  </div>
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  You can't sit by the phone or monitor web forms 24/7 while running your company, and leads go cold in minutes. Our sub-second conversational Voice AI answers every inbound call and calls back web form submissions in under 60 seconds—answering product questions, vetting budgets, and scheduling qualified demos on your calendar.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Sub-second conversational latency that sounds indistinguishable from an in-house rep</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Instant web-form callback: Engages high-intent leads while they're still on your site</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Automatic calendar booking & CRM call logging—zero manual follow-up required</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-xl"
                onClick={() => openWithService("24/7 Voice AI Speed-to-Lead Receptionist")}
              >
                <span>Deploy 24/7 Voice AI</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Card 3: AI Search & GEO with Live Citation Mockup */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200/90 rounded-3xl p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Search className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">03 // Visibility</span>
                </div>
                
                <h4 className="text-2xl font-bold text-zinc-950 mb-1.5">72-Hour AI Search Sprint (GEO / AEO)</h4>
                <p className="text-xs font-semibold text-primary mb-4">Perplexity, ChatGPT & Claude Citation Optimization</p>
                
                {/* Embedded Realistic Mockup: Perplexity / AI Search Citation */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 mb-6 text-xs shadow-inner">
                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200/80 mb-2 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-zinc-500">Query: "Top B2B revenue infrastructure partners"</span>
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">Perplexity AI</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-zinc-200/80 text-[11px] text-zinc-800">
                    <p className="leading-snug mb-2">
                      "Based on recent technical audits, <strong>Telza</strong> provides the leading autonomous pipeline architecture..."
                    </p>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
                      <span className="bg-red-50 text-primary px-1.5 py-0.5 rounded font-bold">[1] Primary Source Citation</span>
                      <span>Entity Authority: 94/100</span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  When potential buyers ask ChatGPT, Perplexity, or Claude for recommendations in your niche, are you mentioned? We reverse-engineer your brand's presence in LLMs and deploy full schema markup, entity relationships, and citation networks directly into your website in 72 hours—without needing a software agency or in-house developers.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Turnkey 72-Hour Sprint: We audit, write the code, and inject the schema for you</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Works on any site: Compatible with Webflow, Framer, WordPress, Shopify, or custom stacks</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Direct AI citation seeding so ChatGPT and Perplexity actively recommend your business</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-xl"
                onClick={() => openWithService("72-Hour AI Search & GEO/AEO Visibility Sprint")}
              >
                <span>Request 72-Hour AI Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Card 4: Internal RAG with Live Knowledge Assistant Mockup */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200/90 rounded-3xl p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Bot className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">04 // Operations</span>
                </div>
                
                <h4 className="text-2xl font-bold text-zinc-950 mb-1.5">Autonomous Knowledge & Operations</h4>
                <p className="text-xs font-semibold text-primary mb-4">Reclaim 15+ Hours Every Week · Zero Manual Data Entry</p>
                
                {/* Embedded Realistic Mockup: RAG Assistant UI */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 mb-6 text-xs shadow-inner">
                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200/80 mb-2 font-mono text-[10px] text-zinc-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>User: "Summarize SOC2 policy & competitor battlecard"</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-zinc-200/80 text-[11px] text-zinc-800">
                    <div className="font-semibold text-primary mb-1">RAG Assistant Output (0.2s):</div>
                    <p className="leading-snug text-zinc-600 mb-2">
                      "Enterprise tier includes SOC2 Type II compliance report, 99.99% SLA, and automatic CRM data hygiene sync."
                    </p>
                    <div className="text-[10px] font-mono text-zinc-500">
                      Sources: Security_Specs_2026.pdf · Sales_Playbook_v4
                    </div>
                  </div>
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  Stop losing your weekends to repetitive prospect inquiries, RFP documents, and manual CRM updating. We turn your product documentation, past proposals, and Notion/Drive files into an instant intelligence assistant that drafts answers and automates tedious backend workflows.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Instant, accurate answers to prospect security, technical, and pricing inquiries</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Seamless integration with Notion, Google Drive, Slack, and your CRM</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Eliminates manual admin so you can spend your time building and closing deals</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-xl"
                onClick={() => openWithService("Custom Internal RAG Knowledge & Ops Automations")}
              >
                <span>Automate Your Operations</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions / The Shift Section (`#solutions`) — Subtle Soft Contrast Slate Tint */}
      <section id="solutions" className="py-24 bg-slate-50/80 border-y border-zinc-200/80 relative">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">The Paradigm Shift</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">The traditional sales model is broken.</h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-4">
              Generic email blasts, $8k/mo agency retainers, and total invisibility on AI search engines are draining B2B runways.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold text-sm">
                    ✕
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900">The Agency & Hiring Trap</h4>
                    <p className="text-xs text-zinc-500">Bloated retainers, manual friction & endless hiring headaches</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-zinc-600">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 font-bold">•</span>
                    <span><strong>$8,000/mo Agency Retainers:</strong> Locked into rigid multi-month contracts with agencies sending generic email blasts that burn your domain and deliver zero real pipeline.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 font-bold">•</span>
                    <span><strong>3–6 Months to Ramp SDRs:</strong> Spending tens of thousands hiring junior reps who require constant supervision, produce sluggish results, and churn in 90 days.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 font-bold">•</span>
                    <span><strong>Sluggish Inbound Response:</strong> Demo requests sit for hours or days while you're busy running the business, losing 80% of high-intent buyers to competitors.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 font-bold">•</span>
                    <span><strong>Invisible on AI Search:</strong> Buyers ask Perplexity & ChatGPT for the best solution in your field, and your business is never recommended or cited.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>Result: Wasted Capital</span>
                <span>Unpredictable Growth</span>
              </div>
            </div>

            {/* The Telza Autonomous Engine */}
            <div className="bg-white border-2 border-primary/30 rounded-3xl p-8 shadow-xl shadow-red-500/5 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 blur-3xl rounded-full pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-primary font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                      The Telza Autonomous Engine
                      <span className="px-2.5 py-0.5 text-[10px] bg-primary text-white font-bold rounded-full uppercase tracking-wider">Turnkey</span>
                    </h4>
                    <p className="text-xs text-zinc-500">Done-for-you systems, signal-triggered data & owned assets</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-zinc-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Turnkey 72-Hour Deployment:</strong> We handle the complete technical build, DNS records, schemas, and pipelines. Zero developers or code required from your team.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Signal-Driven Outbound:</strong> We track real-time buyer triggers (hiring surges, software migrations, funding) and enrich leads across 70+ waterfall data sources.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>24/7 Voice AI Speed-to-Lead:</strong> Sub-second conversational AI qualifies inbound inquiries and calls form submissions in &lt; 60s, dropping meetings directly onto your calendar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Guaranteed AI Search Footprint:</strong> Structured entity schemas so ChatGPT, Perplexity, and Claude cite your business as the recommended authority.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-primary font-mono font-semibold">
                <span>Outcome: Permanent Owned Asset</span>
                <span>Compounding Pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Wedge: GEO / AEO Audit Callout with Boardroom Image */}
      <section id="geo-audit" className="py-24 bg-white relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-gradient-to-br from-red-50/20 via-white to-zinc-50/50 border-2 border-primary/20 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl shadow-red-500/5 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-primary text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                72-Hour Rapid Implementation
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-5">
                Is your business invisible to ChatGPT & Perplexity?
              </h3>
              <p className="text-zinc-600 text-base leading-relaxed mb-6">
                Most websites were designed for legacy Google search, not modern LLM reasoning platforms. When enterprise decision-makers ask AI assistants for recommendations in your niche, will they find your business or your competitors? We audit your AI citation footprint and inject the necessary schema and entity relationships in 72 hours—without needing a software agency or in-house developers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-semibold text-zinc-800 mb-8">
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-zinc-200/70 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>72-Hour Turnkey Deployment</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-zinc-200/70 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Webflow, Framer, WP & Custom Stacks</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-zinc-200/70 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>AI Citation Share Diagnostic</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-zinc-200/70 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Zero Dev Headaches for You</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  size="lg"
                  data-testid="button-request-geo-audit"
                  className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 text-base font-semibold shadow-md transition-all hover:scale-105"
                  onClick={() => openWithService("72-Hour AI Search & GEO/AEO Visibility Sprint")}
                >
                  Request Free GEO Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <span className="text-zinc-500 text-xs font-medium">Free 5-page diagnostic in 48h. Turnkey deployment in 72h.</span>
              </div>
            </div>

            {/* Boardroom Presentation Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border border-zinc-200/90 shadow-xl bg-white group">
                <img 
                  src="/geo-realistic.jpg" 
                  alt="Generative SEO & Entity Citation Analysis Boardroom Presentation" 
                  className="w-full h-[360px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                  <div className="font-bold">Entity Authority & Citation Analysis</div>
                  <div className="text-white/80 text-[10px]">Real-time LLM indexing & knowledge graph verification</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section (`#about-us`) — Subtle Architectural Slate Tint */}
      <section id="about-us" className="py-24 bg-zinc-50/80 border-y border-zinc-200/80 relative">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-primary text-xs font-semibold mb-4">
                <Building2 className="w-3.5 h-3.5" />
                About Telza
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-6">
                Engineering-first revenue architecture for modern B2B.
              </h3>
              <p className="text-zinc-600 text-base leading-relaxed mb-5">
                Telza was founded on a simple observation: <strong>traditional B2B sales agencies are broken.</strong> They rely on manual data entry, low-wage cold-call farms, and untargeted email spam that damages your brand and burns runway.
              </p>
              <p className="text-zinc-600 text-base leading-relaxed mb-8">
                We approach pipeline generation as an <strong>engineering discipline</strong>. Founded by technical software and sales engineering professionals, we combine backend data pipelines, multi-source waterfall enrichment, sub-second conversational voice models, and Generative Engine Optimization (GEO) to build autonomous, high-converting revenue systems that you own.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200">
                <div>
                  <div className="text-2xl font-extrabold text-zinc-950 font-mono">100%</div>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5">Technical Infrastructure</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-zinc-950 font-mono">APAC/EMEA</div>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5">Global Reach</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-zinc-950 font-mono">Zero</div>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5">Spam / Blasts</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-950 mb-1">Code Over Manual Labor</h4>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Instead of hiring 4 junior reps who churn in 3 months, we build programmatic scraping pipelines and AI voice triage that run with sub-second latency 24/7/365.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-950 mb-1">Signal-Triggered Precision</h4>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    We never reach out to cold, static lists. We only trigger outbound sequences when verified buying signals flash green (hiring spikes, executive moves, tech stack changes).
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-950 mb-1">Global Distributed Delivery</h4>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Headquartered with distributed operations across APAC, North America, and EMEA, providing 24-hour speed-to-lead coverage and local compliance.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Deployment Architecture (`#architecture`) — Crisp White Background */}
      <section id="architecture" className="py-24 bg-white relative">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Deployment Protocol</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">How we deploy your engine.</h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-4">
              A rapid 3-phase engineering sprint designed to get live pipeline running with zero dev overhead on your end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 shadow-xs relative">
              <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-primary font-mono font-bold text-sm mb-6 shadow-2xs">
                01
              </div>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">72-Hour Audit & Visibility Sprint</h4>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Days 1–3 // Diagnostic & Schema</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We audit your AI search presence across LLMs, isolate high-intent buying signals, and deploy initial schema and GEO fixes to your website immediately.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 shadow-xs relative">
              <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-primary font-mono font-bold text-sm mb-6 shadow-2xs">
                02
              </div>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Turnkey Infrastructure Build</h4>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Days 4–14 // Build & Train</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We configure secondary domains, set up Clay waterfall enrichment, train your 24/7 Voice AI agent, and connect your calendar for automated bookings.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 shadow-xs relative">
              <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-primary font-mono font-bold text-sm mb-6 shadow-2xs">
                03
              </div>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Autonomous Scale & Optimization</h4>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Day 15+ // Compounding Pipeline</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Campaigns go live, inbound form leads are engaged in under 60 seconds, and qualified decision-maker calls appear automatically on your calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Telza Section — Soft Slate Tint */}
      <section id="why-telza" className="py-24 bg-slate-50/70 border-t border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">The Unfair Advantage</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 mb-4">Why work with Telza?</h3>
            <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
              We operate as technical revenue architects, delivering done-for-you systems without agency retainers or hiring friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-zinc-200/90 flex items-start gap-4 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-950 mb-1.5">Turnkey Execution, Zero Dev Work</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  We handle the technical setup end-to-end: mailboxes, DNS records, schemas, and AI prompts. You never write code or fiddle with complex automations.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200/90 flex items-start gap-4 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-950 mb-1.5">Speed-to-Lead Monopoly</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  The first business to respond wins 78% of the time. Our conversational Voice AI answers every inbound call and dials web leads in under 60 seconds.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200/90 flex items-start gap-4 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-950 mb-1.5">100% Owned Infrastructure</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  No platform lock-in. All Clay tables, verified data pipelines, secondary domains, and custom AI prompts belong entirely to your company.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200/90 flex items-start gap-4 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-950 mb-1.5">Fraction of Full-Time Headcount</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Get the output of a senior growth engineer, SDR team, and technical SEO specialist at a fraction of a single full-time hire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — High Impact Accent Section */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Ready to Upgrade?
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Build your autonomous growth engine.
            </motion.h2>
            <motion.p variants={fadeIn} className="text-base sm:text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop waiting on cold emails that bounce and manual dials that get ignored. Let's engineer a high-converting pipeline for your business.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                data-testid="button-book-call-cta"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-9 h-14 text-base font-semibold shadow-lg transition-all hover:scale-105 w-full sm:w-auto"
                onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
              >
                Book a Systems Diagnostic
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 bg-white/5 hover:bg-white/10 text-white rounded-full px-7 h-14 text-base font-medium w-full sm:w-auto"
                onClick={() => openWithService("72-Hour AI Search & GEO/AEO Visibility Sprint")}
              >
                Request Free GEO Audit
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dark Footer with Basic Info, Enlarged Logo, Location & Contact Details */}
      <footer className="bg-zinc-950 text-zinc-300 py-16 border-t border-zinc-900">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
            
            {/* Col 1: Brand & Bio (Larger Logo) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Telza" className="h-11 md:h-12 object-contain brightness-125" />
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                Telza builds autonomous AI revenue infrastructure for high-growth B2B software and specialized services. From signal-driven Clay outbound to 24/7 Voice AI and Generative Search (GEO).
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/company/telzasales/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-linkedin"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="Telza on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:kai@telzasales.com"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="Email Telza"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Global Operations & Location */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">Global Operations</h4>
              <div className="space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>APAC Regional Delivery & Global Remote Teams</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Globe className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Serving Clients across North America, APAC & EMEA</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Mon – Fri: 8:00 AM – 6:00 PM (Multi-Timezone Coverage)</span>
                </div>
              </div>
            </div>

            {/* Col 3: Direct Contact & Inquiries */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">Direct Communication</h4>
              <div className="space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="mailto:kai@telzasales.com" className="hover:text-white transition-colors">
                    kai@telzasales.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Direct Advisory & Telephony Lines</span>
                </div>
                <div className="pt-2">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full text-xs font-semibold px-4 h-8"
                    onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
                  >
                    Open Instant Booking Calendar
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div>
              © {new Date().getFullYear()} Telza Sales. All rights reserved. Autonomous Revenue Infrastructure.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
              <a href="mailto:kai@telzasales.com" className="hover:text-zinc-300 transition-colors">Support</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
