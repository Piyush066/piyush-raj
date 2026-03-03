import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Film,
  Smartphone,
  Sparkles,
  Megaphone,
  User,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Film,
    title: "YouTube Long-Form Editing",
    desc: "Engaging edits that maximize watch time and audience retention.",
    num: "01",
  },
  {
    icon: Smartphone,
    title: "Reels / Shorts Editing",
    desc: "Scroll-stopping short-form content optimized for virality.",
    num: "02",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics & Transitions",
    desc: "Dynamic animations that elevate your brand's visual identity.",
    num: "03",
  },
  {
    icon: Megaphone,
    title: "Ad Creatives",
    desc: "High-converting social media ads designed to drive action.",
    num: "04",
  },
  {
    icon: User,
    title: "Personal Brand Content",
    desc: "Consistent, polished content that builds authority and trust.",
    num: "05",
  },
  {
    icon: TrendingUp,
    title: "Growth-Focused Editing",
    desc: "Data-driven editing strategies for sustainable channel growth.",
    num: "06",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[180px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            What I Do
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Premium video editing services tailored for brands that want to stand out and grow.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative glass-card rounded-2xl p-7 border border-border hover:border-primary/40 transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Number + Icon row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <s.icon size={22} className="text-primary" />
                  </div>
                  <span className="text-3xl font-heading font-bold text-border group-hover:text-primary/20 transition-colors">
                    {s.num}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn more <ArrowUpRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
