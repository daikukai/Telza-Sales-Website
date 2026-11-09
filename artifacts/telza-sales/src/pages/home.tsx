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
  Terminal,
  Layers,
  Cpu,
  Activity,
  Check,
  MessageSquare,
  Clock,
  Database,
  Code2,
  Workflow,
  Sliders,
  Send,
  Calendar
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
      staggerChildren: 0.08
    }
  }
};

const diagnosticSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid work email"),
  website: z.string().min(3, "Please enter your company website"),
  service: z.string().min(1, "Please select your primary focus area"),
  problem: z.string().min(5, "Please share the main bottleneck in your revenue pipeline"),
});

type DiagnosticForm = z.infer<typeof diagnosticSchema>;

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeArchTab, setActiveArchTab] = useState<number>(0);
  const [activeVoiceSnippet, setActiveVoiceSnippet] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<DiagnosticForm | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DiagnosticForm>({
    resolver: zodResolver(diagnosticSchema),
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
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buildCalendlyPrefillUrl = (data: DiagnosticForm) => {
    const baseUrl = "https://calendly.com/daikukaibindah/discovery_call";
    const prepNotes = `Company Website: ${data.website}\nPrimary Focus: ${data.service}\nMain Bottleneck: ${data.problem}`;

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

  const architectureNodes = [
    {
      id: "outbound",
      title: "01. Signal Ingestion & Outbound",
      subtitle: "Clay + 70-Source Waterfall Enrichment",
      tag: "Outbound Engine",
      description: "Continuously tracks hiring surges, executive shifts, and tech stack migrations. Waterfall cascades enrich verified work emails and direct dials with 98%+ deliverability.",
      badge: "Waterfall Cascade",
      metrics: "98.4% Deliverability • Zero Spam Risk",
      code: `// Signal Trigger: Series A Funding + VP Eng Hire
const targetLead = await waterfallEnrich({
  domain: "acme-corp.io",
  title: ["VP Engineering", "Head of Product"],
  sources: ["prospeo", "hunter", "dropcontact", "datagma"],
  smtpValidation: true
});
// Lead qualified: alex@acme-corp.io (Verified)`
    },
    {
      id: "voice",
      title: "02. Conversational Voice AI",
      subtitle: "<60s Inbound & Form Response",
      tag: "Speed-to-Lead",
      description: "Sub-second speech latency voice agent dials prospects seconds after web form submission. Conducts human-like BANT qualification and directly books meetings.",
      badge: "<480ms Latency",
      metrics: "Sub-60s Response • Real-Time BANT",
      code: `// Webhook triggered upon form submission
onFormSubmission(async (lead) => {
  await dispatchVoiceAgent({
    recipientPhone: lead.phone,
    speechLatencyMs: 480,
    knowledgeContext: "Telza Architecture Spec",
    targetGoal: "Book Discovery on Founder Calendar"
  });
});`
    },
    {
      id: "search",
      title: "03. Website & Generative Search (GEO)",
      subtitle: "Conversion Architecture & AI Citations",
      tag: "AEO / GEO Engine",
      description: "High-converting landing pages built for modern buyers, with rich Schema.org entity graphs engineered so ChatGPT, Perplexity, and Claude cite you as the category leader.",
      badge: "LLM Citation Network",
      metrics: "#1 Perplexity Citation • Sub-800ms FCP",
      code: `// Entity Graph Schema for LLM Indexers
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Acme Platform",
  "applicationCategory": "B2B Infrastructure",
  "citationSource": "Perplexity, ChatGPT, Claude"
}
</script>`
    },
    {
      id: "automations",
      title: "04. Unified Automations & RAG Mesh",
      subtitle: "Bidirectional CRM Sync & Internal Knowledge",
      tag: "Revenue Mesh",
      description: "Custom backend webhooks connect HubSpot/Salesforce, calendar scheduling, and Slack. Plus an internal RAG assistant answering sales and technical specs instantly.",
      badge: "Custom Webhook Mesh",
      metrics: "100% CRM Parity • Zero Manual SDR Admin",
      code: `// Unified Webhook Pipeline
router.post('/pipeline/sync', async (event) => {
  await syncHubSpotDeal({ dealId: event.id, stage: "Qualified" });
  await dispatchSlackNotification({ channel: "#sales-wins", text: "New meeting booked" });
  await updateRAGContext({ leadHistory: event.transcript });
});`
    }
  ];

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
            <button onClick={() => scrollTo("infrastructure")} className="hover:text-zinc-950 transition-colors">Infrastructure</button>
            <button onClick={() => scrollTo("services")} className="hover:text-zinc-950 transition-colors">Services</button>
            <button onClick={() => scrollTo("architecture")} className="hover:text-zinc-950 transition-colors">Architecture</button>
            <button onClick={() => scrollTo("how-it-works")} className="hover:text-zinc-950 transition-colors">How it works</button>
            <button onClick={() => scrollTo("about")} className="hover:text-zinc-950 transition-colors">About & Team</button>
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
              Request diagnostic
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
                <button onClick={() => scrollTo("infrastructure")} className="text-left py-1 hover:text-rose-600">Revenue Infrastructure</button>
                <button onClick={() => scrollTo("services")} className="text-left py-1 hover:text-rose-600">The 4 Pillars</button>
                <button onClick={() => scrollTo("architecture")} className="text-left py-1 hover:text-rose-600">Campaign Architecture</button>
                <button onClick={() => scrollTo("how-it-works")} className="text-left py-1 hover:text-rose-600">How It Works</button>
                <button onClick={() => scrollTo("about")} className="text-left py-1 hover:text-rose-600">About Daikukai & Team</button>
                <button onClick={() => scrollTo("diagnostic")} className="text-left py-1 hover:text-rose-600">Pipeline Diagnostic</button>
                <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
                  <Button
                    onClick={() => scrollTo("diagnostic")}
                    className="w-full bg-zinc-900 text-white rounded-xl h-11 text-xs font-semibold"
                  >
                    Request pipeline diagnostic
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section — Premium Linear/Vercel Aesthetic */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-white border-b border-zinc-200/80">
        {/* Subtle grid and ambient lighting */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.08)_0%,rgba(59,130,246,0.04)_45%,transparent_70%)] blur-3xl pointer-events-none -z-0" />

        <div className="container max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Top Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/90 text-zinc-900 text-[11px] font-bold uppercase tracking-wider mb-6 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span>Turnkey B2B Revenue Infrastructure</span>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] mb-6 max-w-4xl mx-auto"
          >
            Turn more opportunities <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-zinc-900 via-rose-600 to-red-600 bg-clip-text text-transparent">
              into customers.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-600 font-normal mb-9 leading-relaxed max-w-2xl mx-auto"
          >
            We build the outbound, Voice AI and conversion infrastructure that helps B2B companies capture demand and turn it into qualified sales conversations.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12"
          >
            <Button
              onClick={() => scrollTo("diagnostic")}
              data-testid="button-hero-primary-diagnostic"
              className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl px-7 h-12 text-sm font-semibold shadow-md shadow-zinc-950/10 transition-all hover:scale-[1.02]"
            >
              Request pipeline diagnostic
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollTo("infrastructure")}
              data-testid="button-hero-explore-infrastructure"
              className="w-full sm:w-auto bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-800 rounded-xl px-7 h-12 text-sm font-semibold transition-all hover:border-zinc-400"
            >
              Explore infrastructure
              <ChevronRight className="ml-1.5 h-4 w-4 text-zinc-400" />
            </Button>
          </motion.div>

          {/* Reassurance Trust Signals Strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-200/70 max-w-3xl mx-auto text-left"
          >
            <div className="flex items-center gap-2 py-1">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-zinc-700">Built by B2B engineers</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-zinc-700">70+ waterfall data sources</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-zinc-700">&lt;60s Voice speed-to-lead</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-zinc-700">Zero junior SDR payroll</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Interactive Revenue Infrastructure Blueprint */}
      <section id="infrastructure" className="py-24 bg-[#fafafa] border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 text-zinc-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Workflow className="w-3.5 h-3.5 text-rose-600" />
              <span>Full-Stack Revenue Architecture</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
              One connected revenue system.
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
              Instead of isolated tools and fragmented handoffs, we deploy four interconnected systems designed to turn cold accounts and inbound traffic into predictable revenue.
            </p>
          </div>

          {/* Interactive 4-Node Blueprint */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 4 Selectable System Steps */}
            <div className="lg:col-span-5 space-y-3">
              {architectureNodes.map((node, index) => {
                const isActive = activeArchTab === index;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveArchTab(index)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                      isActive
                        ? "bg-white border-zinc-950 shadow-md ring-1 ring-zinc-950/5"
                        : "bg-white/60 hover:bg-white border-zinc-200/80 text-zinc-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isActive ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700"
                      }`}>
                        {node.tag}
                      </span>
                      <span className="text-[11px] font-medium text-zinc-400">Step 0{index + 1}</span>
                    </div>
                    <h3 className={`text-base font-bold transition-colors ${isActive ? "text-zinc-950" : "text-zinc-800"}`}>
                      {node.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                      {node.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: High-Tech Blueprint Visualizer (Vercel/Linear Style) */}
            <div className="lg:col-span-7">
              <div className="bg-zinc-950 text-zinc-100 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-800" />
                    <span className="w-3 h-3 rounded-full bg-zinc-800" />
                    <span className="w-3 h-3 rounded-full bg-zinc-800" />
                    <span className="text-xs font-mono text-zinc-400 ml-2">architecture-manifest.json</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Engine
                  </div>
                </div>

                {/* Active Node Details */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold mb-1">
                      {architectureNodes[activeArchTab].tag}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {architectureNodes[activeArchTab].subtitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                      {architectureNodes[activeArchTab].description}
                    </p>
                  </div>

                  {/* Architecture Metrics Strip */}
                  <div className="py-2.5 px-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center justify-between">
                    <span>Performance Target:</span>
                    <span className="text-emerald-400 font-semibold">{architectureNodes[activeArchTab].metrics}</span>
                  </div>

                  {/* Code Mock */}
                  <div className="bg-black/60 rounded-xl p-4 font-mono text-xs text-zinc-300 border border-zinc-800/80 overflow-x-auto">
                    <pre className="text-[12px] leading-relaxed text-zinc-300">
                      <code>{architectureNodes[activeArchTab].code}</code>
                    </pre>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>Target Deployment: 14 Business Days</span>
                    <button
                      onClick={() => openServiceModal(architectureNodes[activeArchTab].title)}
                      className="text-white hover:text-rose-400 font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      Audit this component <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Services Section ("Four things. All built for you.") */}
      <section id="services" className="py-24 bg-white border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-16 max-w-2xl">
            <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2.5">The Four Pillars</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Four things. All built for you.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-3">
              Engineered systems that plug directly into your business with zero junior SDR payroll.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Service 01: Outbound Lead Generation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="bg-zinc-50/70 border border-zinc-200/90 rounded-3xl p-6 sm:p-9 hover:border-zinc-400 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-200/80 text-zinc-800 text-[11px] font-mono font-bold uppercase">
                    01 // Signal-Driven Outbound
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    Outbound lead generation
                  </h4>
                  <p className="text-sm font-semibold text-rose-600">
                    Verified buyers. Personal outreach. Meetings on your calendar.
                  </p>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Signal-driven, human-led outbound engineered specifically for founder-led B2B software. We find real decision-makers, not static email lists. We track live buying triggers (hiring surges, software migrations, funding rounds) and enrich leads across 70+ waterfall data sources with zero spam risk and 98%+ deliverability.
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={() => openServiceModal("Outbound Lead Generation (Clay + Waterfall)")}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold px-5 h-10"
                    >
                      Request outbound diagnostic
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-2 border-b border-zinc-100">
                    <span>CLAY_WATERFALL_INGEST</span>
                    <span className="text-emerald-600 font-bold">STATUS: OK</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-zinc-800">
                      <span>Targeting Intent:</span>
                      <span className="text-rose-600 font-bold">$10M+ Raised & Hiring</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-800">
                      <span>Waterfall Providers:</span>
                      <span className="text-zinc-500">70+ Cascading APIs</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-800">
                      <span>Deliverability Guard:</span>
                      <span className="text-zinc-500">Automated DNS & SPF/DKIM</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-800">
                      <span>Verified Accuracy:</span>
                      <span className="text-emerald-600 font-bold">98.4% Catch-All Check</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 02: 24/7 Voice AI */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="bg-zinc-50/70 border border-zinc-200/90 rounded-3xl p-6 sm:p-9 hover:border-zinc-400 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-200/80 text-zinc-800 text-[11px] font-mono font-bold uppercase">
                    02 // Speed-to-Lead Voice
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    24/7 Voice AI
                  </h4>
                  <p className="text-sm font-semibold text-rose-600">
                    Every inbound call answered. Every web inquiry followed up fast.
                  </p>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Sub-second conversational Voice AI that sounds natural, handles interruptions, and answers product inquiries with human pacing. Triggers an instant outbound phone call the second a web form is submitted (&lt;60 seconds speed-to-lead), qualifies BANT criteria, and schedules meetings straight into your calendar.
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={() => openServiceModal("24/7 Voice AI Speed-to-Lead")}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold px-5 h-10"
                    >
                      Request Voice AI demo
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Voice AI Interactive Dialogue Simulator */}
                <div className="lg:col-span-5 bg-zinc-950 text-white border border-zinc-800 rounded-2xl p-5 shadow-xs font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-2 border-b border-zinc-800">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      VOICE_AGENT_ACTIVE
                    </span>
                    <span className="text-emerald-400 font-bold">480ms LATENCY</span>
                  </div>
                  <div className="space-y-2.5 text-[12px]">
                    <div className="bg-zinc-900/90 rounded-lg p-2.5 border border-zinc-800">
                      <span className="text-rose-400 font-bold block text-[10px] uppercase">Voice AI Assistant:</span>
                      "Hey David, saw you just requested our diagnostic for Apex Systems. Would Thursday at 2 PM work to review your architecture?"
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg p-2.5 border border-zinc-800/60">
                      <span className="text-blue-400 font-bold block text-[10px] uppercase">Prospect:</span>
                      "Yes, Thursday 2 PM works. Can we discuss your HubSpot CRM sync as well?"
                    </div>
                    <div className="bg-zinc-900/90 rounded-lg p-2.5 border border-zinc-800">
                      <span className="text-rose-400 font-bold block text-[10px] uppercase">Voice AI Assistant:</span>
                      "Absolutely. I've logged that note and locked in Thursday 2 PM on the calendar."
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 03: Website, AEO & GEO Search */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="bg-zinc-50/70 border border-zinc-200/90 rounded-3xl p-6 sm:p-9 hover:border-zinc-400 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-200/80 text-zinc-800 text-[11px] font-mono font-bold uppercase">
                    03 // Generative Search & Conversion
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    Website and AI search
                  </h4>
                  <p className="text-sm font-semibold text-rose-600">
                    A site built to convert and structured so AI search recommends it.
                  </p>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    We craft high-converting, responsive landing pages designed specifically to capture and convert modern B2B buyers, coupled with Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). We engineer rich schema markup, entity relationships, and citation networks so ChatGPT, Perplexity, Claude, and Google AI Overviews cite your software as the category benchmark.
                  </p>
                  
                  {/* Eye-catching AI Search Button */}
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
                      <span>Free AI Search Readiness</span>
                      <ArrowUpRight className="h-4 w-4 text-white/90" />
                    </motion.a>

                    <Button
                      variant="ghost"
                      onClick={() => openServiceModal("Website, AEO & GEO AI Search Visibility")}
                      className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 rounded-xl px-4 h-10"
                    >
                      Request site diagnostic
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs font-sans text-xs space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 text-zinc-400 font-mono text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>PERPLEXITY & CHATGPT QUERY MOCK</span>
                  </div>
                  <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                    <p className="text-zinc-500 text-[11px] font-mono mb-1">PROMPT:</p>
                    <p className="font-semibold text-zinc-800">"What is the top recommended outbound revenue infrastructure for B2B tech founders in 2026?"</p>
                  </div>
                  <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl text-zinc-700 leading-relaxed text-[11px]">
                    <span className="font-bold text-amber-900 block mb-0.5">Top Verified Citation:</span>
                    "Telza Sales provides full turnkey revenue infrastructure combining signal-based waterfall enrichment, conversational Voice AI, and custom CRM automations..."
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 04: Custom Automations & RAG Knowledge Bank */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="bg-zinc-50/70 border border-zinc-200/90 rounded-3xl p-6 sm:p-9 hover:border-zinc-400 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-200/80 text-zinc-800 text-[11px] font-mono font-bold uppercase">
                    04 // Unified Automation Mesh
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                    Custom automations
                  </h4>
                  <p className="text-sm font-semibold text-rose-600">
                    Your CRM, scheduler, and tools wired together. Zero admin. Clean pipeline tracking.
                  </p>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Custom backend automations that bridge your sales tools, web forms, calendar, and CRM. Plus a secure internal Retrieval-Augmented Generation (RAG) assistant knowledge bank that turns your product documentation, past proposals, and sales playbooks into an instant intelligence engine, eliminating repetitive administrative questions.
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={() => openServiceModal("Custom Automations & Internal RAG Knowledge")}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold px-5 h-10"
                    >
                      Request automations diagnostic
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-zinc-900 text-white border border-zinc-800 rounded-2xl p-5 shadow-xs font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-2 border-b border-zinc-800">
                    <span>EVENT_BUS_SYNCHRONIZER</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <span className="text-rose-400">⚡</span>
                      <span>Form submit &rarr; Lead parsed & validated</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <span className="text-rose-400">⚡</span>
                      <span>HubSpot CRM: Deal auto-created & assigned</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <span className="text-rose-400">⚡</span>
                      <span>Voice AI: Webhook dispatched (&lt;60s dial)</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <span className="text-rose-400">⚡</span>
                      <span>Slack: Instant notification sent to founders</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Campaign Architecture Demonstration & Technical Credibility */}
      <section id="architecture" className="py-24 bg-[#fafafa] border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-14 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 text-zinc-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
              <span>Deliverability & Safeguards</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
              Campaign architecture & safeguards.
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
              We never blast unverified email lists or burn corporate domains. Here is how our architecture protects your brand reputation while filling your calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mb-2">
                <Globe className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950">Isolated Secondary Domains</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                We purchase and configure dedicated secondary domains (SPF, DKIM, DMARC, BIMI) with automated warm-up protocols, safeguarding your primary domain from deliverability issues.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mb-2">
                <Database className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950">Waterfall Catch-All Scrubbing</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Every prospect email cascades through 70+ validation APIs with real-time SMTP handshake checks, eliminating bounce risks and keeping delivery rates above 98%.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mb-2">
                <Clock className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950">Sub-60s Inbound Trigger</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                When a qualified prospect submits your landing page, our Voice AI initiates a conversational phone call within 60 seconds—securing meetings while intent is highest.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* How It Works Section (3-Phase Sprint) */}
      <section id="how-it-works" className="py-24 bg-white border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-14 max-w-2xl">
            <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2.5">Process</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              How we build your engine.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
              A transparent, 3-phase engineering sprint with zero setup headaches for your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Audit */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-7 relative">
              <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-200/80 px-2.5 py-1 rounded uppercase tracking-wider inline-block mb-3">
                Phase 01 // Diagnostic
              </span>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Audit</h4>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                We dissect your historical customer wins, map buyer intent signals, audit your website conversion funnel, and isolate your exact AI search visibility gaps.
              </p>
            </div>

            {/* Step 2: Build */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-7 relative">
              <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-200/80 px-2.5 py-1 rounded uppercase tracking-wider inline-block mb-3">
                Phase 02 // Engineering
              </span>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Build</h4>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                We set up secondary domains, build your Clay waterfall enrichment workflows, train and test your 24/7 Voice AI agent, and deploy conversion landing pages.
              </p>
            </div>

            {/* Step 3: Launch */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-7 relative">
              <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-200/80 px-2.5 py-1 rounded uppercase tracking-wider inline-block mb-3">
                Phase 03 // Production
              </span>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Launch</h4>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                Signals go live. Inbound web inquiries are dialed in under 60 seconds, campaigns trigger automatically, and qualified calls appear directly on your calendar.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section ("Built by an engineer who sells.") */}
      <section id="about" className="py-24 bg-[#fafafa] border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-zinc-200/90 shadow-md bg-white relative max-w-md mx-auto">
                <img 
                  src="/founder.jpg" 
                  alt="Daikukai Bindah - Founder of Telza Sales" 
                  className="w-full h-auto object-cover object-center max-h-[500px]"
                />
                <div className="p-4 bg-white border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-zinc-950">Daikukai Bindah</h5>
                    <p className="text-xs text-rose-600 font-medium">Founder & Systems Architect</p>
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

            {/* Right: Founder Narrative & Technical Architecture Ethos */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 text-zinc-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                About Telza Sales
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                Built by an engineer who sells.
              </h3>

              <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Telza Sales is founded by Daikukai Bindah.</strong> With a strong background in backend engineering and 10 years of outbound systems architecture, our approach treats customer acquisition as an engineering discipline rather than a guessing game.
                </p>
                
                <p>
                  <strong>Engineering the revenue architecture.</strong> We don't just write copy or blast static lists. We engineer the underlying technical setups: custom webhook automations, conversion-engineered landing pages built to capture and qualify demand, and rich schema injection for AI answer engines. Every piece of code, automated trigger, and conversational Voice AI flow is designed to tie directly into your CRM—turning fragmented sales tools into a single, predictable turnkey revenue engine.
                </p>

                <p>
                  <strong>We find decision-makers, not email lists.</strong> Most outbound agencies optimize for volume. That doesn't work for founder-led software companies—generic campaigns to scraped lists result in spam folders, burned domains, and wasted budget. Decision-makers ignore untargeted outreach. At Telza, we build signal-driven, human-led outbound where you deal directly with the engineers who build and deploy your systems, from first diagnostic to live scale.
                </p>

                <p className="text-zinc-500 text-xs font-mono pt-1">
                  Operating from Cayco Street, Sampaloc, Metro Manila • Serving clients across North America, APAC, and EMEA.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => scrollTo("diagnostic")}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-6 h-11 text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
                >
                  Start your pipeline diagnostic
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Team Section ("The people behind the build.") */}
      <section id="team" className="py-24 bg-white border-b border-zinc-200/80">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2.5">Our Team</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              The people behind the build.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
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
                <p className="text-xs font-semibold text-rose-600 mb-2">Lead Outbound & Waterfall Data Engineer</p>
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
                <p className="text-xs font-semibold text-rose-600 mb-2">Voice AI & Conversational Flow Specialist</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Designs sub-second voice latency flows, conversational objection handling, and real-time inbound call qualification pipelines.
                </p>
              </div>
            </div>

            {/* Team Member 3: Angelo Del Rosario */}
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
                <p className="text-xs font-semibold text-rose-600 mb-2">Backend Automations & RAG Architect</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Builds internal RAG knowledge assistants, webhook orchestrations, and seamless bidirectional CRM synchronization.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Streamlined Lead Capture & Diagnostic Section */}
      <section id="diagnostic" className="py-24 bg-[#fafafa] border-b border-zinc-200/80 scroll-mt-20">
        <div className="container max-w-5xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contextual Value Proposition */}
            <div className="lg:col-span-5 space-y-5 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
                Technical Pipeline Diagnostic
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                Request your free pipeline diagnostic.
              </h2>
              
              <p className="text-sm text-zinc-600 leading-relaxed">
                Tell us about your current sales motion, tech stack, and where deals are stalling. We will audit your architecture and outline the exact fixes.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900">Revenue Funnel Audit</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">We analyze your inbound conversion friction, cold bounce risks, and response latency.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900">Tech Stack & Data Verification</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">We check how your CRM, secondary domains, and waterfall providers are currently wired.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900">Custom Architecture Roadmap</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">You receive a written action plan detailing exact implementation within 24 hours.</p>
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
                    <h3 className="text-xl font-bold text-zinc-950">Diagnostic Request Received</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
                      Thank you. We have received your inquiry. For immediate priority, pick a 15-minute diagnostic time on our live calendar:
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
                          Work Email <span className="text-rose-600">*</span>
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
                          Primary Focus Area <span className="text-rose-600">*</span>
                        </label>
                        <select
                          {...register("service")}
                          data-testid="select-hero-service"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all"
                        >
                          <option value="Outbound Lead Generation (Clay + Waterfall)">01 // Outbound Lead Generation</option>
                          <option value="24/7 Voice AI Speed-to-Lead">02 // 24/7 Voice AI Speed-to-Lead</option>
                          <option value="Website, AEO & GEO AI Search Visibility">03 // Website & AI Search (AEO/GEO)</option>
                          <option value="Custom Automations & Internal RAG Knowledge">04 // Custom Automations & RAG</option>
                          <option value="Full Turnkey Revenue Infrastructure">Full Turnkey Revenue Engine</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        What bottleneck do you want solved? <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        {...register("problem")}
                        data-testid="input-hero-problem"
                        rows={3}
                        placeholder="e.g. Need outbound infrastructure set up, inbound leads going cold, or need automated CRM workflows..."
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
                      {isSubmitting ? "Submitting..." : "Get free pipeline diagnostic"}
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
            Tell us what is broken.
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Email <a href="mailto:kai@telzasales.com" className="text-rose-600 font-semibold hover:underline">kai@telzasales.com</a> or speak directly with our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => scrollTo("diagnostic")}
              data-testid="button-prefooter-diagnostic"
              className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl px-7 h-12 text-sm font-semibold shadow-xs transition-all hover:scale-105"
            >
              Request pipeline diagnostic
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
                Telza Sales builds autonomous revenue engines for founder-led B2B software companies. Signal-driven outbound, 24/7 Voice AI, conversion-engineered sites, and automated backend infrastructure.
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
                  <span>Serving founder-led B2B clients across North America, APAC & EMEA</span>
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
