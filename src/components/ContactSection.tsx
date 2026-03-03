import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Mail, label: "rajpiyush9572@gmail.com", href: "mailto:rajpiyush9572@gmail.com" },
  { icon: Phone, label: "6204285965", href: "tel:6204285965" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/piyushraj006" },
  { icon: Github, label: "GitHub", href: "https://github.com/Piyush066" },
  { icon: MapPin, label: "Koderma, Jharkhand, India", href: "#" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setForm({ name: "", email: "", type: "", budget: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card rounded-xl p-4 hover-lift"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-primary" />
                </div>
                <span className="text-muted-foreground text-sm">{c.label}</span>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 space-y-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
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
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
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
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-orange"
            >
              <Send size={16} /> Start Your Project
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
