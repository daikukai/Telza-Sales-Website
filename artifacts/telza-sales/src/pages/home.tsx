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
  ArrowRight
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
            className="relative bg-white border border-zinc-200 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-red-500 to-amber-500" />

            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                    Direct Diagnostic
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
                      <option value="AI Search & GEO/AEO Audit">AI Search & GEO/AEO Audit (Visibility Diagnostic)</option>
                      <option value="Clay + AI Deep Enrichment Outbound Engine">Clay + AI Deep Enrichment Outbound Engine</option>
                      <option value="24/7 Voice AI Receptionist & Speed-to-Lead">24/7 Voice AI Receptionist & Speed-to-Lead</option>
                      <option value="Custom Internal RAG Knowledge & Automations">Custom Internal RAG Knowledge & Automations</option>
                      <option value="Full Revenue Infrastructure Package">Full Revenue Infrastructure Package</option>
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
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/20">
      <BookingModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        defaultService={selectedService}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-zinc-200/80 shadow-xs py-3.5"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a 
              href="#" 
              className="flex items-center gap-2 group" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            >
              <img src="/logo.png" alt="Telza" className="h-8 md:h-9 object-contain" />
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
              <button onClick={() => scrollTo("solutions")} className="hover:text-zinc-950 transition-colors">Solutions</button>
              <button onClick={() => scrollTo("the-shift")} className="hover:text-zinc-950 transition-colors">The Shift</button>
              <button onClick={() => scrollTo("geo-audit")} className="hover:text-zinc-950 transition-colors flex items-center gap-1.5">
                AI Search Audit
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-50 text-primary border border-red-200 font-bold">NEW</span>
              </button>
              <button onClick={() => scrollTo("architecture")} className="hover:text-zinc-950 transition-colors">Architecture</button>
              <button onClick={() => scrollTo("why-telza")} className="hover:text-zinc-950 transition-colors">Why Telza</button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              data-testid="button-audit-nav"
              variant="outline"
              className="hidden sm:inline-flex border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 rounded-full text-xs font-semibold px-4 h-9 shadow-xs"
              onClick={() => openWithService("AI Search & GEO/AEO Audit")}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" />
              Free GEO Audit
            </Button>
            <Button
              data-testid="button-contact-us-nav"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 h-9 text-xs font-semibold shadow-sm transition-all"
              onClick={() => openWithService("Full Revenue Infrastructure Package")}
            >
              Book Systems Call
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-red-50/40 via-white to-white flex items-center">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200/80 shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-semibold text-zinc-800 tracking-wide">Autonomous Revenue Infrastructure for B2B</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-950 leading-[1.08] mb-6">
              Stop burning cash on manual sales. <br/>
              <span className="text-primary italic">
                Build an Autonomous Revenue Engine.
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl text-zinc-600 mb-8 max-w-2xl leading-relaxed">
              From Clay deep-enrichment outbound and 24/7 Voice AI triage to Generative Search (GEO) visibility — we architect the high-margin systems that capture, qualify, and convert pipeline without ballooning headcount.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-12">
              <Button
                size="lg"
                data-testid="button-book-call-hero"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-13 text-sm sm:text-base font-semibold shadow-md transition-all hover:scale-[1.02]"
                onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
              >
                Book a Systems Diagnostic
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                data-testid="button-audit-hero"
                className="border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 rounded-full px-6 h-13 text-sm sm:text-base font-medium shadow-xs transition-all"
                onClick={() => scrollTo("geo-audit")}
              >
                <Search className="mr-2 h-4 w-4 text-primary" />
                Check AI Search Visibility
              </Button>
            </motion.div>

            {/* Metrics ticker */}
            <motion.div variants={fadeIn} className="pt-6 border-t border-zinc-200 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">Zero</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">SDR Headcount Needed</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">&lt; 60s</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">Speed-to-Lead Triage</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">70+</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">Waterfall Data Signals</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">100%</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">Owned Infrastructure</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Shift (Old Way vs Telza Way) */}
      <section id="the-shift" className="py-24 bg-zinc-50/70 border-y border-zinc-200 relative">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">The Paradigm Shift</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950">The old sales playbook is obsolete.</h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-4">
              Spamming mass templates, waiting hours to call inbound leads, and remaining invisible to AI search is burning your runway.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold text-sm">
                  ✕
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-900">The Traditional Model</h4>
                  <p className="text-xs text-zinc-500">Bloated payroll, manual friction & low conversion</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-zinc-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-0.5 font-bold">•</span>
                  <span><strong>Spammy Volume:</strong> Buying scraped lists, blasting generic emails, and destroying your domain reputation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-0.5 font-bold">•</span>
                  <span><strong>Dead Inbound:</strong> High-intent web submissions sit for hours before an SDR dials, losing 80% of momentum.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-0.5 font-bold">•</span>
                  <span><strong>Invisible to AI Search:</strong> Buyers ask Perplexity and ChatGPT for category leaders, and your company is never cited.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-0.5 font-bold">•</span>
                  <span><strong>Scattered Knowledge:</strong> Reps waste 60% of their workday looking for battlecards, case studies, and pricing specs.</span>
                </li>
              </ul>
            </div>

            {/* The Telza Autonomous Engine */}
            <div className="bg-white border-2 border-primary/30 rounded-2xl p-8 shadow-lg shadow-red-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-2xl rounded-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-primary font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                    The Telza Autonomous Engine
                    <span className="px-2 py-0.5 text-[10px] bg-primary text-white font-semibold rounded-full uppercase">Modern</span>
                  </h4>
                  <p className="text-xs text-zinc-500">Precision data, sub-second execution & owned systems</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-zinc-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Signal-Driven Clay Outbound:</strong> Real-time intent triggers (hiring, tech-stack change, funding) + 70-source waterfall verification.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>24/7 Voice AI Speed-to-Lead:</strong> Human-sounding conversational agent calls inbound leads within 60s, qualifies, and books.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>AEO & GEO Authority:</strong> Engineered entity schemas so ChatGPT, Perplexity, and Claude actively recommend your product.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Unified RAG & Automations:</strong> Centralized internal AI portal instant-answers technical queries and syncs data to CRM seamlessly.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="py-24 bg-white relative">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Core Solutions Architecture</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950">Engineered for predictable revenue.</h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-4">
              Four modular systems designed to integrate with your existing CRM and tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solution 1: Clay Outbound */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200 rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Crosshair className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">01 // Acquisition</span>
                </div>
                
                <h4 className="text-2xl font-bold text-zinc-950 mb-2">Signal-Driven Outbound Engine</h4>
                <p className="text-xs font-semibold text-primary mb-4">Clay + Deep Waterfall Enrichment + Buying Triggers</p>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  We don't send emails to static lists. We build live scraping pipelines that identify accounts experiencing trigger events (executive changes, hiring surges, tool adoption) and personalize every touchpoint using verified, waterfall-enriched data.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>70+ source waterfall enrichment (Prospeo, Datagma, Findymail)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Live intent scraping: job postings, tech stacks, and company news</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Domain health & inbox infrastructure with 98%+ primary inboxing</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-xl"
                onClick={() => openWithService("Clay + AI Deep Enrichment Outbound Engine")}
              >
                <span>Deploy Outbound Engine</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Solution 2: Voice AI */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200 rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">02 // Conversion</span>
                </div>
                
                <h4 className="text-2xl font-bold text-zinc-950 mb-2">24/7 Voice AI Speed-to-Lead</h4>
                <p className="text-xs font-semibold text-primary mb-4">Conversational Inbound & Instant Form Triage</p>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  Leads go cold within 5 minutes. Our sub-second conversational voice agents answer every inbound call 24/7 or trigger an instant outbound call the second a web form is submitted, handling objections and dropping qualified demos on your calendar.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Sub-second voice latency with human pacing and natural interruption</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Automated BANT qualification (Budget, Authority, Need, Timeline)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Real-time calendar booking and instant CRM summary logging</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-xl"
                onClick={() => openWithService("24/7 Voice AI Receptionist & Speed-to-Lead")}
              >
                <span>Deploy Voice AI Agent</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Solution 3: AI Search & GEO */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200 rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Search className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">03 // Visibility</span>
                </div>
                
                <h4 className="text-2xl font-bold text-zinc-950 mb-2">AI Search & Visibility (GEO / AEO)</h4>
                <p className="text-xs font-semibold text-primary mb-4">Generative Engine Optimization & Citation Share</p>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  Modern B2B buyers ask Perplexity, ChatGPT, and Claude for vendor shortlists. If the LLMs don't recognize your entity and structured authority, your competitors get the deal. We optimize your digital presence for generative answer engines.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Brand entity mapping for ChatGPT, Claude, Perplexity & Google AI Overviews</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Schema engineering & high-authority citation seeding</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Comprehensive AI search audit comparing you against direct rivals</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-xl"
                onClick={() => openWithService("AI Search & GEO/AEO Audit")}
              >
                <span>Request AI Search Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Solution 4: Custom RAG & Automations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200 rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Bot className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">04 // Operations</span>
                </div>
                
                <h4 className="text-2xl font-bold text-zinc-950 mb-2">Internal RAG Knowledge & Automations</h4>
                <p className="text-xs font-semibold text-primary mb-4">Enterprise Knowledge Base & Cross-Tool Sync</p>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  Stop answering the same technical questions over and over. We build secure, custom Retrieval-Augmented Generation (RAG) portals that turn your product documentation, past proposals, and sales playbooks into an instant intelligence assistant.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Secure vector database linked to your Notion, Drive, Slack, or Docs</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Instant RFP and sales objection responses for account executives</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Custom backend automations eliminating manual data re-entry</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-xl"
                onClick={() => openWithService("Custom Internal RAG Knowledge & Automations")}
              >
                <span>Build Knowledge System</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Wedge: GEO / AEO Audit Callout */}
      <section id="geo-audit" className="py-20 bg-gradient-to-b from-white via-red-50/30 to-white border-y border-zinc-200 relative overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-white border-2 border-primary/20 rounded-3xl p-8 sm:p-12 shadow-xl shadow-red-500/5 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-primary text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Diagnostic Wedge
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight mb-4">
                Is your brand invisible to AI search?
              </h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6">
                When prospects ask Perplexity or ChatGPT: <em>"What is the best solution for [your industry]?"</em>, are you mentioned, or is your competition winning the deal?
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>AI Citation Share Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Entity Knowledge Graph Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Competitor Recommendation Gap</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Actionable Remediation Blueprint</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex-shrink-0 flex flex-col gap-3">
              <Button
                size="lg"
                data-testid="button-request-geo-audit"
                className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 text-base font-semibold shadow-md transition-all hover:scale-105"
                onClick={() => openWithService("AI Search & GEO/AEO Audit")}
              >
                Request Free GEO Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-zinc-500 text-[11px] text-center">Comprehensive 5-page report delivered in 48 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Architecture (Process) */}
      <section id="architecture" className="py-24 bg-zinc-50/60 border-b border-zinc-200 relative">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Deployment Protocol</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950">How we build your engine.</h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-4">
              A structured 3-phase engineering sprint designed to get live pipeline running in under 21 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-primary font-mono font-bold text-sm mb-6">
                01
              </div>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Audit & Data Architecture</h4>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Week 1 // Diagnostic</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We dissect your historical customer wins, map buying signals, conduct your GEO audit, and isolate the exact data triggers that indicate high purchase intent.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-primary font-mono font-bold text-sm mb-6">
                02
              </div>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Engine Build & AI Training</h4>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Weeks 2–3 // Build</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We build the Clay waterfall enrichment workflows, train and benchmark your Voice AI speed-to-lead agents, and deploy your secure internal RAG knowledge assistant.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-primary font-mono font-bold text-sm mb-6">
                03
              </div>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Autonomous Scale</h4>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Continuous // Optimize</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We launch campaigns, monitor deliverability, continuously tune prompt parameters, and ensure your calendar stays packed with qualified decision-maker conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Telza Section */}
      <section id="why-telza" className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">The Unfair Advantage</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950 mb-4">Why work with Telza?</h3>
            <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
              We operate as technical revenue architects, not another run-of-the-mill agency selling manual labor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-950 mb-1.5">Engineering Over Headcount</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Instead of hiring 4 junior reps who take 3 months to ramp and burn your leads, we deploy intelligent automated systems that run 24/7 without churn.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-950 mb-1.5">Speed-to-Lead Monopoly</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  The first company to engage an interested buyer wins 78% of the time. Our Voice AI engages your web inquiries within 60 seconds.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-950 mb-1.5">Owned Infrastructure</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  You own the Clay tables, custom prompts, scraping workflows, and RAG architectures. We build permanent revenue assets for your enterprise.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-primary flex-shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-950 mb-1.5">Zero Domain Burn Risk</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  We configure secondary isolated domain ecosystems with automated SPF/DKIM/DMARC authentication, protecting your primary company brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
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
                onClick={() => openWithService("AI Search & GEO/AEO Audit")}
              >
                Request Free GEO Audit
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-200">
        <div className="container max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <img src="/logo.png" alt="Telza" className="h-7 object-contain" />
            <p className="text-zinc-500 text-xs">Autonomous Revenue Infrastructure for High-Growth B2B.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-zinc-600">
            <button onClick={() => scrollTo("solutions")} className="hover:text-zinc-950 transition-colors">Solutions</button>
            <button onClick={() => scrollTo("the-shift")} className="hover:text-zinc-950 transition-colors">The Shift</button>
            <button onClick={() => scrollTo("geo-audit")} className="hover:text-zinc-950 transition-colors">AI Search Audit</button>
            <button onClick={() => scrollTo("architecture")} className="hover:text-zinc-950 transition-colors">Architecture</button>
            <button onClick={() => scrollTo("why-telza")} className="hover:text-zinc-950 transition-colors">Why Telza</button>
            <a 
              href="mailto:kai@telzasales.com" 
              className="hover:text-primary transition-colors font-medium"
            >
              kai@telzasales.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/telzasales/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-linkedin"
              className="text-zinc-500 hover:text-[#0A66C2] transition-colors"
              aria-label="Telza on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <span className="text-zinc-400 text-xs">© {new Date().getFullYear()} Telza. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
