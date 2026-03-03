import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Brain, TrendingUp, Sparkles } from "lucide-react";

const specializations = [
  { icon: Lightbulb, label: "Retention-focused editing" },
  { icon: Brain, label: "Audience psychology" },
  { icon: TrendingUp, label: "Social media growth content" },
  { icon: Sparkles, label: "AI-powered creative workflows" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
            Who I Am
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="glass-card rounded-2xl p-8 md:p-10 mb-8">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Piyush Raj is a creative video editor with over 2 years of
              freelance experience and 100+ completed projects across diverse
              industries including personal brands, startups, and digital
              agencies.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              Currently pursuing B.Tech in Electronics and Communication
              Engineering at Haldia Institute of Technology (Graduating 2026), he
              blends technical knowledge with creative storytelling.
            </p>

            <h3 className="text-foreground font-heading font-semibold text-xl mb-5">
              Specializations
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {specializations.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon size={18} className="text-primary" />
                  </div>
                  {s.label}
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Brain size={16} /> Strong foundation in Programming, AI &
              Computer Vision
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
