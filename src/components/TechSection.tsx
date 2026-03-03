import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, BrainCircuit, Globe, Wrench } from "lucide-react";

const techGroups = [
  {
    icon: Code2,
    title: "Programming",
    items: ["Python", "C", "C++", "SQL", "HTML", "CSS", "JavaScript"],
    accent: "from-primary/20 to-orange-600/5",
  },
  {
    icon: BrainCircuit,
    title: "AI & ML",
    items: ["Machine Learning", "Computer Vision", "OpenCV", "MediaPipe", "scikit-learn", "NumPy", "Pandas"],
    accent: "from-orange-500/20 to-amber-500/5",
  },
  {
    icon: Globe,
    title: "Full-Stack",
    items: ["Flask", "MySQL"],
    accent: "from-amber-500/20 to-primary/5",
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Jupyter", "AWS (Basics)"],
    accent: "from-orange-600/20 to-amber-600/5",
  },
];

const TechSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/3 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Technology & <span className="gradient-text">Innovation</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A strong technical foundation powering creative solutions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
          {techGroups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card rounded-2xl p-7 border border-border hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${g.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <g.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {g.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-secondary/80 border border-border text-muted-foreground text-xs font-medium hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 border border-primary/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <p className="relative z-10 text-foreground font-heading font-medium text-lg leading-relaxed">
              "Combining creative media with AI-driven systems to build{" "}
              <span className="gradient-text font-bold">future-ready digital solutions</span>."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;
