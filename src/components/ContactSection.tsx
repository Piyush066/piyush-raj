import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Send,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_6chwvup";
const EMAILJS_TEMPLATE_ID = "template_ryus6fe";
const EMAILJS_PUBLIC_KEY = "IhpAE6nokuTqdwsfF";

const contactInfo = [
  { icon: Mail, label: "rajpiyush9572@gmail.com", href: "mailto:rajpiyush9572@gmail.com", color: "from-primary/20 to-orange-600/5" },
  { icon: Phone, label: "6204285965", href: "tel:6204285965", color: "from-orange-500/20 to-amber-500/5" },
  { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/piyushraj006", color: "from-blue-500/20 to-blue-600/5" },
  { icon: Github, label: "GitHub Profile", href: "https://github.com/Piyush066", color: "from-muted/30 to-muted/5" },
  { icon: MapPin, label: "Koderma, Jharkhand, India", href: "#", color: "from-amber-500/20 to-orange-500/5" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          project_type: form.type,
          budget: form.budget,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      toast({
        title: "Message Sent! ✨",
        description: "Your message has been sent successfully. I will get back to you within 24 hours.",
      });
      setForm({ name: "", email: "", type: "", budget: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again or email directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-secondary/80 transition-all duration-300 text-sm";

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            {contactInfo.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="group flex items-center gap-4 glass-card rounded-xl p-4 border border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <c.icon size={18} className="text-primary" />
                </div>
                <span className="relative z-10 text-muted-foreground text-sm group-hover:text-foreground transition-colors flex-1">
                  {c.label}
                </span>
                {c.href !== "#" && (
                  <ArrowUpRight size={14} className="relative z-10 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                )}
              </motion.a>
            ))}

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="glass-card rounded-xl p-5 border border-primary/20 mt-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-primary" />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Trusted by 50+ clients</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Average response time: <span className="text-primary font-medium">Under 24 hours</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 space-y-4 border border-border"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}
              >
                <option value="">Project Type</option>
                <option value="youtube">YouTube Editing</option>
                <option value="reels">Reels / Shorts</option>
                <option value="ads">Ad Creatives</option>
                <option value="motion">Motion Graphics</option>
                <option value="other">Other</option>
              </select>
              <select
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className={inputClass}
              >
                <option value="">Budget Range</option>
                <option value="500">Under $500</option>
                <option value="1000">$500 – $1,000</option>
                <option value="2500">$1,000 – $2,500</option>
                <option value="5000">$2,500+</option>
              </select>
            </div>
            <textarea
              placeholder="Tell me about your project..."
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm ${
                submitted
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(24_95%_53%_/_0.4)]"
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={16} /> Message Sent!
                </>
              ) : (
                <>
                  <Send size={16} /> Start Your Project
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
