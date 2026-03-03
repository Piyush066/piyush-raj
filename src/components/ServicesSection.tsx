import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Film,
  Smartphone,
  Sparkles,
  Megaphone,
  User,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    icon: Film,
    title: "YouTube Long-Form Editing",
    desc: "Engaging edits that maximize watch time and audience retention.",
  },
  {
    icon: Smartphone,
    title: "Reels / Shorts Editing",
    desc: "Scroll-stopping short-form content optimized for virality.",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics & Transitions",
    desc: "Dynamic animations that elevate your brand's visual identity.",
  },
  {
    icon: Megaphone,
    title: "Ad Creatives",
    desc: "High-converting social media ads designed to drive action.",
  },
  {
    icon: User,
    title: "Personal Brand Content",
    desc: "Consistent, polished content that builds authority and trust.",
  },
  {
    icon: TrendingUp,
    title: "Growth-Focused Editing",
    desc: "Data-driven editing strategies for sustainable channel growth.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
            What I Do
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            My <span className="gradient-text">Services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-7 hover-lift group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
