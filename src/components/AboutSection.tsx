import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Brain, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

const specializations = [
  { icon: Lightbulb, label: "Retention-focused editing", desc: "Maximize viewer watch time" },
  { icon: Brain, label: "Audience psychology", desc: "Data-backed creative decisions" },
  { icon: TrendingUp, label: "Social media growth", desc: "Viral content strategies" },
  { icon: Sparkles, label: "AI-powered workflows", desc: "Next-gen creative tools" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              Who I Am
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main content — 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-2xl p-8 md:p-10 h-full border border-border">
                <div className="w-12 h-1 bg-primary rounded-full mb-6" />
                <p className="text-foreground leading-relaxed text-lg mb-5">
                  A creative video editor with over <span className="text-primary font-semibold">2 years</span> of
                  freelance experience and <span className="text-primary font-semibold">100+ completed projects</span> across
                  personal brands, startups, and digital agencies.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base mb-8">
                  Currently pursuing B.Tech in Electronics and Communication
                  Engineering at Haldia Institute of Technology (Graduating 2026),
                  blending technical knowledge with creative storytelling.
                </p>

                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <Brain size={16} /> Strong foundation in Programming, AI & Computer Vision
                </div>
              </div>
            </motion.div>

            {/* Specializations — 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              {specializations.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="glass-card rounded-xl p-5 border border-border group hover-lift cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <s.icon size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground font-semibold text-sm mb-0.5">{s.label}</h4>
                      <p className="text-muted-foreground text-xs">{s.desc}</p>
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
