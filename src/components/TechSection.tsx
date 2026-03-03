import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, BrainCircuit, Globe, Wrench } from "lucide-react";

const techGroups = [
  {
    icon: Code2,
    title: "Programming",
    items: ["Python", "C", "C++", "SQL", "HTML", "CSS", "JavaScript"],
  },
  {
    icon: BrainCircuit,
    title: "AI & ML",
    items: ["Machine Learning", "Computer Vision", "OpenCV", "MediaPipe", "scikit-learn", "NumPy", "Pandas"],
  },
  {
    icon: Globe,
    title: "Full-Stack",
    items: ["Flask", "MySQL"],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Jupyter", "AWS (Basics)"],
  },
];

const TechSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
            Technical Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Technology & <span className="gradient-text">Innovation</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {techGroups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
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
                    className="px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground italic max-w-xl mx-auto"
        >
          "Combining creative media with AI-driven systems to build future-ready
          digital solutions."
        </motion.p>
      </div>
    </section>
  );
};

export default TechSection;
