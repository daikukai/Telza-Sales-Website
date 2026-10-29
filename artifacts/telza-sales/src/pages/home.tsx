import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  CheckCircle2, 
  X, 
  Linkedin, 
  ArrowUpRight, 
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Crosshair,
  PhoneCall,
  Search,
  Bot,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Building2,
  Terminal,
  Compass,
  Layers,
  Cpu
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
      staggerChildren: 0.1
    }
  }
};

const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid work email"),
  website: z.string().min(3, "Please enter your company website"),
  service: z.string().min(1, "Please select what you need"),
  problem: z.string().min(5, "Please share the main problem you want solved"),
});

type QuoteForm = z.infer<typeof quoteSchema>;

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      website: "",
      service: "Full Turnkey Revenue Infrastructure",
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSubmitQuote = async (data: QuoteForm) => {
    await new Promise((r) => setTimeout(r, 600));
    const subject = encodeURIComponent(`New Quote Request from ${data.name} (${data.website})`);
    const body = encodeURIComponent(
      `Hi Daikukai,\n\nI submitted a request on telzasales.com:\n\n` +
      `Name: ${data.name}\n` +
      `Work Email: ${data.email}\n` +
      `Website: ${data.website}\n` +
      `Service Needed: ${data.service}\n` +
      `Main Problem: ${data.problem}\n\n` +
      `Looking forward to speaking.`
    );
    window.location.href = `mailto:kai@telzasales.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    reset();
  };

  const openServiceModal = (serviceName: string) => {
    setValue("service", serviceName);
    scrollTo("hero-quote-form");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-600/15 antialiased">
      
      {/* Top Header Navigation */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-zinc-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] py-3"
            : "bg-white/85 backdrop-blur-xs border-zinc-200/60 py-4"
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

          {/* Center Navigation Links (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <button onClick={() => scrollTo("services")} className="hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollTo("how-it-works")} className="hover:text-primary transition-colors">How it works</button>
            <button onClick={() => scrollTo("about-us")} className="hover:text-primary transition-colors">About us</button>
            <button onClick={() => scrollTo("team")} className="hover:text-primary transition-colors">Our team</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact us</button>
          </nav>

          {/* Right Header: Clickable Phone Button (Visible on mobile & desktop) + Quote Button (Hidden on mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href="tel:+639956720645"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-blue-50 hover:bg-blue-100 border border-blue-200/90 py-2 px-3 sm:px-3.5 rounded-xl transition-all shadow-2xs hover:scale-[1.02]"
              title="Call Telza Sales directly"
            >
              <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="font-mono font-medium">+63 995 672 0645</span>
            </a>

            <Button
              onClick={() => scrollTo("hero-quote-form")}
              data-testid="button-header-quote"
              className="hidden sm:inline-flex bg-gradient-to-r from-blue-600 via-rose-600 to-red-700 hover:opacity-95 text-white border-0 rounded-xl px-5 h-9 md:h-10 text-xs md:text-sm font-semibold shadow-xs transition-all hover:scale-[1.02]"
            >
              Get a free quote
            </Button>
          </div>

        </div>
      </header>

      {/* Hero Section — 2-Column Split: Value Prop + Direct Quote Form */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
        {/* Prominent, vibrant ambient gradient glow inspired by the logo's crimson/ruby curves */}
        <div className="absolute top-4 -left-24 w-[650px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.20)_0%,rgba(185,28,28,0.12)_35%,rgba(244,63,94,0.06)_60%,transparent_75%)] blur-2xl pointer-events-none -z-0" />
        <div className="absolute top-40 left-1/4 w-[480px] h-[480px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12)_0%,rgba(147,51,234,0.05)_45%,transparent_70%)] blur-2xl pointer-events-none -z-0" />

        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Heading, Subhead, Bullets */}
            <motion.div 
              className="lg:col-span-7 pt-2 lg:pt-6 relative"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Visible rich gradient aura behind left hero text */}
              <div className="absolute -top-12 -left-8 w-96 h-96 bg-gradient-to-br from-red-600/[0.18] via-rose-500/[0.12] to-blue-600/[0.08] rounded-full blur-3xl pointer-events-none -z-10" />

              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/15 via-rose-500/10 to-blue-500/15 border border-red-300 text-zinc-950 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-500 animate-pulse shadow-sm shadow-red-500/50" />
                <span>Turnkey Revenue Infrastructure</span>
              </motion.div>

              <motion.h1 
                variants={fadeIn}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] mb-6"
              >
                Build a turnkey <br />
                <span className="bg-gradient-to-r from-red-600 via-rose-600 to-primary bg-clip-text text-transparent font-serif italic font-normal">revenue engine.</span>
              </motion.h1>

              <motion.p 
                variants={fadeIn}
                className="text-lg sm:text-xl text-zinc-600 font-normal mb-8 leading-relaxed max-w-xl"
              >
                Outbound. Voice AI. A site that converts. Automations that tie it together. We build it, run it, and you own it.
              </motion.p>

              {/* 3 Value Pillars */}
              <motion.div variants={fadeIn} className="space-y-3.5 mb-8">
                <div className="flex items-center gap-3 text-sm font-medium text-zinc-800">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-primary flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Done for you. No extra heads on your payroll.</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-zinc-800">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-primary flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>You own everything we build.</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-zinc-800">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-primary flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Signal-driven pipeline delivered straight to your calendar.</span>
                </div>
              </motion.div>

              {/* Floating badges for quick reassurance */}
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 pt-2 text-xs text-zinc-500 font-mono">
                <span className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">70+ Waterfall Sources</span>
                <span className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">&lt;60s Voice AI Speed</span>
                <span className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">ChatGPT & Perplexity AEO</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Embedded "Get a free quote" Card Form */}
            <motion.div 
              id="hero-quote-form"
              className="lg:col-span-5 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-8 shadow-xl shadow-zinc-950/5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-indigo-500" />

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">Get a free quote</h2>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                    Tell us what is broken and we will diagnose your exact revenue pipeline.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 text-primary flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-950">Quote Request Prepared</h3>
                    <p className="text-xs text-zinc-600 max-w-xs mx-auto leading-relaxed">
                      Your default email app has opened with your inquiry. You can also pick a direct 15-minute diagnostic time on Daikukai's calendar:
                    </p>
                    <Button
                      onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
                      className="w-full bg-gradient-to-r from-blue-600 via-rose-600 to-red-700 hover:opacity-95 text-white border-0 rounded-xl h-11 text-xs font-semibold shadow-xs transition-all hover:scale-[1.01]"
                    >
                      Open Instant Booking Calendar
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors block mx-auto pt-2"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmitQuote)} className="space-y-4" data-testid="form-hero-quote">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        {...register("name")}
                        data-testid="input-hero-name"
                        placeholder="Alex Vance"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Work Email <span className="text-primary">*</span>
                      </label>
                      <input
                        {...register("email")}
                        data-testid="input-hero-email"
                        type="email"
                        placeholder="alex@company.com"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Company Website <span className="text-primary">*</span>
                      </label>
                      <input
                        {...register("website")}
                        data-testid="input-hero-website"
                        placeholder="company.com"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                      {errors.website && (
                        <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        What do you need? <span className="text-primary">*</span>
                      </label>
                      <select
                        {...register("service")}
                        data-testid="select-hero-service"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      >
                        <option value="Outbound Lead Generation (Clay + Waterfall)">01 // Outbound Lead Generation</option>
                        <option value="24/7 Voice AI Speed-to-Lead">02 // 24/7 Voice AI Speed-to-Lead</option>
                        <option value="Website, AEO & GEO AI Search Visibility">03 // Website & AI Search (AEO/GEO)</option>
                        <option value="Custom Automations & Internal RAG Knowledge">04 // Custom Automations & RAG</option>
                        <option value="Full Turnkey Revenue Infrastructure">Full Turnkey Revenue Engine</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        What is the main problem you want solved? <span className="text-primary">*</span>
                      </label>
                      <textarea
                        {...register("problem")}
                        data-testid="input-hero-problem"
                        rows={2}
                        placeholder="e.g. Inbound leads are going cold, outbound emails bounce, or competitors outrank us on ChatGPT..."
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                      />
                      {errors.problem && (
                        <p className="text-red-500 text-xs mt-1">{errors.problem.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      data-testid="button-submit-hero-quote"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 via-rose-600 to-red-700 hover:opacity-95 text-white border-0 rounded-xl h-11 text-sm font-semibold shadow-md shadow-rose-500/15 transition-all hover:scale-[1.01] disabled:opacity-60"
                    >
                      {isSubmitting ? "Processing..." : "Send my request"}
                      {!isSubmitting && <ChevronRight className="ml-1.5 h-4 w-4" />}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Section ("Four things. All built for you.") */}
      <section id="services" className="py-24 bg-zinc-50/70 border-t border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-16 max-w-2xl">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Services</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Four things. All built for you.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-3">
              Engineered systems that plug directly into your business with zero new full-time hires.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Service 01: Outbound Lead Generation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <span className="text-xs font-mono font-bold text-primary bg-blue-50 border border-blue-200/80 rounded-lg px-2.5 py-1 flex-shrink-0 mt-0.5">
                    01
                  </span>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-zinc-950 mb-1.5">
                      Outbound lead generation
                    </h4>
                    <p className="text-sm font-semibold text-primary mb-3">
                      Verified buyers. Personal outreach. Meetings on your calendar.
                    </p>
                    <p className="text-zinc-600 text-sm leading-relaxed max-w-3xl">
                      Signal-driven, human-led outbound engineered specifically for founder-led B2B software. We find real decision-makers, not static email lists. We track live buying triggers (hiring surges, software migrations, funding rounds) and enrich leads across 70+ waterfall data sources with zero spam risk and 98%+ deliverability.
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => openServiceModal("Outbound Lead Generation (Clay + Waterfall)")}
                  className="self-start md:self-center text-xs font-semibold text-zinc-700 hover:text-primary hover:bg-blue-50/50 rounded-xl flex-shrink-0"
                >
                  Request quote
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>

            {/* Service 02: 24/7 Voice AI */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <span className="text-xs font-mono font-bold text-primary bg-blue-50 border border-blue-200/80 rounded-lg px-2.5 py-1 flex-shrink-0 mt-0.5">
                    02
                  </span>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-zinc-950 mb-1.5">
                      24/7 Voice AI
                    </h4>
                    <p className="text-sm font-semibold text-primary mb-3">
                      Every inbound call answered. Every web inquiry followed up fast.
                    </p>
                    <p className="text-zinc-600 text-sm leading-relaxed max-w-3xl">
                      Sub-second conversational Voice AI that sounds natural, handles interruptions, and answers product inquiries with human pacing. Triggers an instant outbound phone call the second a web form is submitted (&lt; 60 seconds speed-to-lead), qualifies BANT criteria, and schedules meetings straight into your calendar.
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => openServiceModal("24/7 Voice AI Speed-to-Lead")}
                  className="self-start md:self-center text-xs font-semibold text-zinc-700 hover:text-primary hover:bg-blue-50/50 rounded-xl flex-shrink-0"
                >
                  Request quote
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>

            {/* Service 03: Website, AEO & GEO Search */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <span className="text-xs font-mono font-bold text-primary bg-blue-50 border border-blue-200/80 rounded-lg px-2.5 py-1 flex-shrink-0 mt-0.5">
                    03
                  </span>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-zinc-950 mb-1.5">
                      Website and AI search
                    </h4>
                    <p className="text-sm font-semibold text-primary mb-3">
                      A site built to convert and structured so AI search recommends it.
                    </p>
                    <p className="text-zinc-600 text-sm leading-relaxed max-w-3xl">
                      We craft high-converting, responsive landing pages designed specifically to capture and convert modern B2B buyers, coupled with Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). We engineer rich schema markup, entity relationships, and citation networks so ChatGPT, Perplexity, Claude, and Google AI Overviews cite your software as the category benchmark.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 flex-shrink-0">
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
                    className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md border border-amber-300/40 hover:brightness-110 transition-all cursor-pointer whitespace-nowrap group"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-100"></span>
                    </span>
                    <Sparkles className="h-4 w-4 text-amber-200 flex-shrink-0" />
                    <span>Free AI Search Readiness</span>
                    <ArrowUpRight className="h-4 w-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                  </motion.a>

                  <Button
                    variant="ghost"
                    onClick={() => openServiceModal("Website, AEO & GEO AI Search Visibility")}
                    className="self-start md:self-end text-xs font-semibold text-zinc-600 hover:text-primary hover:bg-blue-50/50 rounded-xl px-2 h-7"
                  >
                    Request quote
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Service 04: Custom Automations & RAG Knowledge Bank */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <span className="text-xs font-mono font-bold text-primary bg-blue-50 border border-blue-200/80 rounded-lg px-2.5 py-1 flex-shrink-0 mt-0.5">
                    04
                  </span>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-zinc-950 mb-1.5">
                      Custom automations
                    </h4>
                    <p className="text-sm font-semibold text-primary mb-3">
                      Your CRM, scheduler, and tools wired together. Zero admin. Clean pipeline tracking.
                    </p>
                    <p className="text-zinc-600 text-sm leading-relaxed max-w-3xl">
                      Custom backend automations that bridge your sales tools, web forms, calendar, and CRM. Plus a secure internal Retrieval-Augmented Generation (RAG) assistant knowledge bank that turns your product documentation, past proposals, and sales playbooks into an instant intelligence engine, eliminating repetitive administrative questions.
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => openServiceModal("Custom Automations & Internal RAG Knowledge")}
                  className="self-start md:self-center text-xs font-semibold text-zinc-700 hover:text-primary hover:bg-blue-50/50 rounded-xl flex-shrink-0"
                >
                  Request quote
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* How It Works Section (Audit -> Build -> Launch, Days Removed) */}
      <section id="how-it-works" className="relative py-28 bg-gradient-to-b from-rose-50/70 via-red-50/40 to-slate-100/70 border-t border-red-200/60 overflow-hidden">
        {/* Prominent, vibrant ambient atmospheric gradient glow inspired by the logo */}
        <div className="absolute -top-10 right-10 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18)_0%,rgba(185,28,28,0.10)_40%,transparent_70%)] blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 left-5 w-[500px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12)_0%,rgba(225,29,72,0.08)_40%,transparent_70%)] blur-2xl pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="mb-16 max-w-2xl">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">How it works</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              How we build your engine.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-3">
              A transparent, 3-phase engineering sprint with zero code or setup headaches for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Audit */}
            <div className="bg-white/95 backdrop-blur-md border-2 border-red-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-red-500/50 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />
              <span className="text-xs font-mono font-bold text-red-700 bg-red-100 border border-red-200 px-3 py-1 rounded-lg uppercase tracking-wider inline-block mb-3.5 shadow-2xs">
                Phase 01 // Diagnostic
              </span>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Audit</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We dissect your historical customer wins, map buyer intent signals, audit your website conversion funnel, and isolate the exact AI search visibility gaps.
              </p>
            </div>

            {/* Step 2: Build */}
            <div className="bg-white/95 backdrop-blur-md border-2 border-blue-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-500 via-primary to-indigo-500" />
              <span className="text-xs font-mono font-bold text-primary bg-blue-100 border border-blue-200 px-3 py-1 rounded-lg uppercase tracking-wider inline-block mb-3.5 shadow-2xs">
                Phase 02 // Engineering
              </span>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Build</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We set up secondary domains, build your Clay waterfall enrichment workflows, train and test your 24/7 Voice AI agent, and deploy conversion landing pages.
              </p>
            </div>

            {/* Step 3: Launch */}
            <div className="bg-white/95 backdrop-blur-md border-2 border-indigo-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-purple-600" />
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg uppercase tracking-wider inline-block mb-3.5 shadow-2xs">
                Phase 03 // Production
              </span>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Launch</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Signals go live. Inbound web inquiries are dialed in under 60 seconds, campaigns trigger automatically, and qualified calls appear directly on your calendar.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section ("Built by an engineer who sells.") */}
      <section id="about-us" className="py-24 bg-zinc-50/70 border-t border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-zinc-200/90 shadow-lg bg-white relative max-w-md mx-auto">
                <img 
                  src="/founder.jpg" 
                  alt="Daikukai Bindah - Founder of Telza Sales" 
                  className="w-full h-auto object-cover object-center max-h-[500px]"
                />
                <div className="p-4 bg-white border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-zinc-950">Daikukai Bindah</h5>
                    <p className="text-xs text-primary font-medium">Founder & Systems Architect</p>
                  </div>
                  <a
                    href="https://www.linkedin.com/company/telzasales/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-primary transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Founder Narrative & Technical Architecture Ethos */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                About us
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-5">
                Built by an engineer who sells.
              </h3>

              <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Telza Sales is founded by Daikukai Bindah.</strong> With a strong background in backend engineering and 10 years of outbound systems architecture, Kai approaches customer acquisition as an engineering discipline rather than a guessing game.
                </p>
                
                {/* Paragraph 2: Shifting into technical setups, custom automations, conversion landing pages, tying to turnkey revenue */}
                <p>
                  <strong>Engineering the revenue architecture.</strong> We don't just write copy or blast static lists. We engineer the underlying technical setups: custom webhook automations, conversion-engineered landing pages built to capture and qualify demand, and rich schema injection for AI answer engines. Every piece of code, automated trigger, and conversational Voice AI flow is designed to tie directly into your CRM—turning fragmented sales tools into a single, predictable turnkey revenue engine.
                </p>

                <p>
                  <strong>We find decision-makers, not email lists.</strong> Most outbound agencies optimize for volume. That doesn't work for founder-led software companies—generic campaigns to scraped lists result in spam folders, burned domains, and wasted budget. Decision-makers ignore untargeted outreach. At Telza, we build signal-driven, human-led outbound where you deal directly with the engineer who builds and deploys your systems, from first diagnostic to live scale.
                </p>

                <p className="text-zinc-500 text-xs font-mono pt-1">
                  We work with founder-led B2B tech teams across APAC, North America, and EMEA.
                </p>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => scrollTo("hero-quote-form")}
                  className="bg-gradient-to-r from-blue-600 via-rose-600 to-red-700 hover:opacity-95 text-white border-0 rounded-xl px-6 h-11 text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
                >
                  Work directly with Kai
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Team Section ("The people behind the build.") */}
      <section id="team" className="py-24 bg-white border-t border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our team</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              The people behind the build.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-3">
              Specialized technical talent managing your data pipelines, conversational AI, and backend automations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Team Member 1: Marco Reyes */}
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-200 relative">
                <img 
                  src="/team-marco.jpg" 
                  alt="Marco Reyes - Lead Outbound & Waterfall Data Engineer" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white border-t border-zinc-200/80">
                <h4 className="text-lg font-bold text-zinc-950">Marco Reyes</h4>
                <p className="text-xs font-semibold text-primary mb-2">Lead Outbound & Waterfall Data Engineer</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Architects Clay tables, buying trigger scrapers, and multi-source waterfall data enrichment for verified decision-maker targeting.
                </p>
              </div>
            </div>

            {/* Team Member 2: Clarissa Santos */}
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-200 relative">
                <img 
                  src="/team-clarissa.jpg" 
                  alt="Clarissa Santos - Voice AI & Conversational Flow Specialist" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white border-t border-zinc-200/80">
                <h4 className="text-lg font-bold text-zinc-950">Clarissa Santos</h4>
                <p className="text-xs font-semibold text-primary mb-2">Voice AI & Conversational Flow Specialist</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Designs sub-second voice latency flows, conversational objection handling, and real-time inbound call qualification pipelines.
                </p>
              </div>
            </div>

            {/* Team Member 3: Angelo Del Rosario (Distinct portrait) */}
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-200 relative">
                <img 
                  src="/team-angelo.jpg" 
                  alt="Angelo Del Rosario - Backend Automations & RAG Systems Architect" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white border-t border-zinc-200/80">
                <h4 className="text-lg font-bold text-zinc-950">Angelo Del Rosario</h4>
                <p className="text-xs font-semibold text-primary mb-2">Backend Automations & RAG Architect</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Builds internal RAG knowledge assistants, webhook orchestrations, and seamless bidirectional CRM synchronization.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pre-Footer / Contact Us Banner ("Tell us what is broken.") */}
      <section id="contact" className="py-20 bg-zinc-50 border-t border-zinc-200/80">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Contact us
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 mb-4 tracking-tight">
            Tell us what is broken.
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Email <a href="mailto:kai@telzasales.com" className="text-primary font-semibold hover:underline">kai@telzasales.com</a> or send the form at the top of the page.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => scrollTo("hero-quote-form")}
              data-testid="button-prefooter-quote"
              className="bg-gradient-to-r from-blue-600 via-rose-600 to-red-700 hover:opacity-95 text-white border-0 rounded-xl px-7 h-12 text-sm font-semibold shadow-md shadow-rose-500/15 transition-all hover:scale-105"
            >
              Get a free quote
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <a
              href="tel:+639956720645"
              className="inline-flex items-center justify-center gap-2 text-zinc-700 hover:text-primary font-semibold text-sm bg-white border border-zinc-200/90 rounded-xl px-6 h-12 hover:bg-zinc-50 transition-colors shadow-2xs"
            >
              <Phone className="w-4 h-4 text-primary" />
              Call +63 995 672 0645
            </a>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Footer with Cayco Street, Sampaloc, Metro Manila */}
      <footer className="bg-white text-zinc-700 py-16 border-t border-zinc-200">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-200/80">
            
            {/* Col 1: Brand & Summary */}
            <div className="lg:col-span-5 space-y-4">
              <img src="/logo.png" alt="Telza Sales" className="h-9 object-contain" />
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                Telza Sales builds autonomous revenue engines for founder-led B2B software companies. Signal-driven outbound, 24/7 Voice AI, conversion-engineered sites, and automated backend infrastructure.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.linkedin.com/company/telzasales/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-blue-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:kai@telzasales.com"
                  className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-blue-200 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Headquarters & Office Location (Cayco Street, Sampaloc, Metro Manila) */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-950">Operating Headquarters</h4>
              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Cayco Street, Sampaloc, Metro Manila, Philippines</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Globe className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Serving founder-led B2B clients across North America, APAC & EMEA</span>
                </div>
              </div>
            </div>

            {/* Col 3: Direct Phone & Rapid Contact */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-950">Direct Contacts</h4>
              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="tel:+639956720645" className="hover:text-primary font-semibold transition-colors">
                    +63 995 672 0645
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="mailto:kai@telzasales.com" className="hover:text-primary font-semibold transition-colors">
                    kai@telzasales.com
                  </a>
                </div>
                <div className="pt-2">
                  <Button
                    size="sm"
                    onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
                    className="bg-gradient-to-r from-blue-600 via-rose-600 to-red-700 hover:opacity-95 text-white border-0 rounded-xl text-xs font-semibold px-4 h-8 shadow-xs transition-all hover:scale-[1.02]"
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
