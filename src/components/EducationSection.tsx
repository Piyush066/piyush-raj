import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              Education
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              My <span className="gradient-text">Journey</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />

            {/* Timeline dot */}
            <div className="absolute left-6 top-8 w-3 h-3 rounded-full bg-primary -translate-x-[5px] shadow-[0_0_12px_hsl(24_95%_53%_/_0.6)]" />

            <div className="ml-16">
              <div className="glass-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <GraduationCap size={22} className="text-primary" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-secondary border border-border text-muted-foreground">
                        <Calendar size={12} /> 2022 – 2026
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-secondary border border-border text-muted-foreground">
                        <MapPin size={12} /> Haldia, West Bengal
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-foreground text-xl mb-2">
                    B.Tech in Electronics & Communication Engineering
                  </h3>
                  <p className="text-muted-foreground">
                    Haldia Institute of Technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
