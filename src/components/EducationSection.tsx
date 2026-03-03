import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2 text-center">
            Education
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-10">
            My <span className="gradient-text">Journey</span>
          </h2>

          <div className="relative pl-8 border-l-2 border-primary/30">
            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary -translate-x-[9px] animate-pulse-glow" />
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap size={22} className="text-primary" />
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  2022 – 2026
                </span>
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
                B.Tech in Electronics & Communication Engineering
              </h3>
              <p className="text-muted-foreground">
                Haldia Institute of Technology
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
