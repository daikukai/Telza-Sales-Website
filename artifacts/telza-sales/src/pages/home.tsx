import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sun, Zap, Crosshair, Users, MessageSquare, Briefcase, Activity, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  company: z.string().min(1, "Please enter your company name"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", company: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 800));
    const subject = encodeURIComponent(`Strategy Call Request – ${data.company}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'd like to book a strategy call.\n\nName: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}${data.message ? `\nMessage: ${data.message}` : ""}\n`
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-red-500 to-primary/60" />

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-serif">Book a Strategy Call</h2>
                  <p className="text-zinc-400 text-sm mt-1">Free 15-minute session. No fluff, just results.</p>
                </div>
                <button
                  onClick={handleClose}
                  data-testid="button-close-modal"
                  className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 rounded-lg hover:bg-zinc-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-10 text-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-serif">You're all set!</h3>
                  <p className="text-zinc-400 max-w-xs">
                    Your email client should have opened. If not, reach out directly at{" "}
                    <a href="mailto:contact@telzasale.com" className="text-primary hover:underline">
                      contact@telzasale.com
                    </a>
                  </p>
                  <Button
                    onClick={handleClose}
                    className="mt-2 bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                    data-testid="button-close-success"
                  >
                    Close
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="form-booking">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("name")}
                      data-testid="input-name"
                      placeholder="Jane Smith"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5" data-testid="error-name">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Company <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("company")}
                      data-testid="input-company"
                      placeholder="Acme Solar Pty Ltd"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                    />
                    {errors.company && (
                      <p className="text-red-400 text-xs mt-1.5" data-testid="error-company">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("email")}
                      data-testid="input-email"
                      type="email"
                      placeholder="jane@yoursaas.com"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5" data-testid="error-email">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      What's your biggest sales challenge? <span className="text-zinc-600">(optional)</span>
                    </label>
                    <textarea
                      {...register("message")}
                      data-testid="input-message"
                      rows={3}
                      placeholder="e.g. We have a great product but can't get demos booked with solar installers..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="button-submit-booking"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 text-base font-semibold shadow-[0_0_20px_rgba(160,32,32,0.3)] transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {isSubmitting ? "Sending..." : "Book My Strategy Call"}
                    {!isSubmitting && <ChevronRight className="ml-2 h-5 w-5" />}
                  </Button>

                  <p className="text-zinc-600 text-xs text-center">
                    By submitting, you agree to be contacted at the email address provided.
                  </p>
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-primary/30">
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-md border-zinc-800/50 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <img src="/logo.png" alt="Telza Sales" className="h-8 md:h-10 object-contain" />
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
              <button onClick={() => scrollTo("verticals")} className="hover:text-zinc-50 transition-colors">Verticals</button>
              <button onClick={() => scrollTo("process")} className="hover:text-zinc-50 transition-colors">Process</button>
              <button onClick={() => scrollTo("why-telza")} className="hover:text-zinc-50 transition-colors">Why Telza</button>
            </div>
          </div>
          <Button
            data-testid="button-book-call-nav"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-[0_0_15px_rgba(160,32,32,0.3)] transition-all"
            onClick={() => setModalOpen(true)}
          >
            Book a Call
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/80 z-10"></div>
          <img
            src="/hero-bg.png"
            alt="Business Meeting"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
        </div>

        <div className="container max-w-6xl mx-auto px-6 md:px-12 relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Australian B2B Specialist</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 font-serif">
              I help Australian B2B companies solve the hardest part of sales: <br/>
              <span className="text-primary italic">Filling the calendar.</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
              Whether you're a Solar SaaS looking to reach installers or a Sports SaaS targeting grassroots clubs — getting the right decision-maker to say YES to a 15-minute demo is the hardest part. That's what I do.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                size="lg"
                data-testid="button-book-call-hero"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-base font-semibold shadow-[0_0_20px_rgba(160,32,32,0.4)] transition-all hover:scale-105"
                onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
              >
                Book a 15-Minute Strategy Call
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Verticals Section */}
      <section id="verticals" className="py-24 bg-white text-zinc-950">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">High-Growth Verticals</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight font-serif">Where I deliver the best results.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-zinc-50 border border-zinc-100 p-10 rounded-2xl hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white shadow-sm border border-zinc-100 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Sun className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-2xl font-bold mb-4 font-serif">Solar & Renewables</h4>
              <p className="text-zinc-600 leading-relaxed">
                Targeting installers and retailers with design and CRM solutions. I know how to cut through the noise and reach the operators driving the transition.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-zinc-50 border border-zinc-100 p-10 rounded-2xl hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white shadow-sm border border-zinc-100 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-2xl font-bold mb-4 font-serif">Sports & Athlete Tech</h4>
              <p className="text-zinc-600 leading-relaxed">
                Connecting event and performance tools with clubs and academies. Turning complex athletic data platforms into undeniable value propositions.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-zinc-50 border border-zinc-100 p-10 rounded-2xl hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white shadow-sm border border-zinc-100 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-2xl font-bold mb-4 font-serif">Specialized SaaS</h4>
              <p className="text-zinc-600 leading-relaxed">
                Helping technical founders move from founder-led sales to automated, predictable outreach. Building scalable engines for niche software.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
            <div className="w-full md:w-1/3">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">My Process</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight font-serif text-white mb-6">Built for precision, not volume.</h3>
              <p className="text-zinc-400 text-lg">
                The era of spray-and-pray outreach is over. I build hyper-targeted campaigns that treat your prospects like humans.
              </p>
            </div>

            <div className="w-full md:w-2/3">
              <div className="space-y-12">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary font-bold">1</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      Targeting <Crosshair className="h-5 w-5 text-zinc-500" />
                    </h4>
                    <p className="text-zinc-400 leading-relaxed">
                      I don't spray and pray. I build hyper-accurate lists of exactly who needs your solution right now, verifying every data point.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary font-bold">2</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      Messaging <MessageSquare className="h-5 w-5 text-zinc-500" />
                    </h4>
                    <p className="text-zinc-400 leading-relaxed">
                      I write scripts that sound like a human, not a bot. Relevant, concise, and focused entirely on the prospect's immediate pain points.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      Execution <Briefcase className="h-5 w-5 text-zinc-500" />
                    </h4>
                    <p className="text-zinc-400 leading-relaxed">
                      I handle the cold starts so your sales team can focus on the finish line. You get the qualified meetings, I handle the rejection.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Telza Section */}
      <section id="why-telza" className="py-24 bg-zinc-50 text-zinc-950">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-serif mb-6">Why work with me?</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm"
            >
              <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold mb-2">Australian B2B Specialist</h4>
                <p className="text-zinc-600">I understand the local market nuances, decision-making structures, and exactly how Australian business leaders prefer to be approached.</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm"
            >
              <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold mb-2">Domain-Specific Data Access</h4>
                <p className="text-zinc-600">Exclusive access and deep understanding of data structures in Solar and Sports Tech, finding the contacts others miss.</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm"
            >
              <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold mb-2">Human-First Outreach</h4>
                <p className="text-zinc-600">No automation that feels automated. Every message is designed to get genuine replies from skeptical decision-makers.</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm"
            >
              <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold mb-2">You Close, I Prospect</h4>
                <p className="text-zinc-600">Stop burning your expensive closers on top-of-funnel grunt work. Let them do what they do best while I keep their calendars full.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] opacity-10 mix-blend-overlay object-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
              Ready to fill your calendar?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Stop waiting for inbound. Let's put the right conversations in front of your team this week.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button
                size="lg"
                data-testid="button-book-call-cta"
                className="bg-white text-primary hover:bg-zinc-100 rounded-full px-10 h-16 text-lg font-bold shadow-2xl transition-all hover:scale-105"
                onClick={() => window.open("https://calendly.com/daikukaibindah/discovery_call", "_blank")}
              >
                Book a Free Strategy Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900">
        <div className="container max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/logo.png" alt="Telza Sales" className="h-8 object-contain" />
            <p className="text-zinc-500 text-sm">More leads. More Sales.</p>
          </div>

          <div className="flex gap-6 text-sm font-medium text-zinc-500">
            <button onClick={() => scrollTo("verticals")} className="hover:text-zinc-300 transition-colors">Verticals</button>
            <button onClick={() => scrollTo("process")} className="hover:text-zinc-300 transition-colors">Process</button>
            <button onClick={() => scrollTo("why-telza")} className="hover:text-zinc-300 transition-colors">Why Telza</button>
          </div>

          <div className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} telzasale.com
          </div>
        </div>
      </footer>
    </div>
  );
}
