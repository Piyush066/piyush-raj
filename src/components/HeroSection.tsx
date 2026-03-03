import { motion } from "framer-motion";
import { Play, Handshake, Clock, FolderCheck, Briefcase, ChevronDown } from "lucide-react";
import profileSilhouette from "@/assets/profile-silhouette.jpeg";

const stats = [
  { icon: Clock, value: "2+", label: "Years Experience" },
  { icon: FolderCheck, value: "100+", label: "Projects Completed" },
  { icon: Briefcase, value: "∞", label: "Creative Ideas" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full bg-primary/8 blur-[150px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-primary/3 blur-[200px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Text — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                Available for Projects
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-heading font-extrabold leading-[1.1] mb-6">
              I'm{" "}
              <span className="gradient-text relative">
                Piyush Raj
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 bg-primary/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
              <br />
              <span className="text-muted-foreground font-bold text-3xl md:text-4xl lg:text-[2.5rem]">
                Creative Video Editor &
              </span>
              <br />
              <span className="gradient-text">AI-Based</span>{" "}
              <span className="text-muted-foreground font-bold text-3xl md:text-4xl lg:text-[2.5rem]">
                Tech Developer
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            >
              Crafting retention-driven videos that help brands grow — powered by
              creativity, strategy, and technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#portfolio"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_hsl(24_95%_53%_/_0.4)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-orange-400 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <Play size={18} /> View My Work
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Handshake size={18} /> Hire Me
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-8"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <s.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-heading font-bold text-lg leading-none">
                      {s.value}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">{s.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo — 2 cols */}
          <motion.div
            className="lg:col-span-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl animate-[pulse_4s_ease-in-out_infinite]" />

              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-3xl border border-primary/10" />
              <div className="absolute -inset-6 rounded-[2rem] border border-primary/5" />

              {/* Main image container */}
              <div className="relative w-72 h-[22rem] md:w-80 md:h-[28rem] rounded-2xl overflow-hidden">
                {/* Orange accent shape behind */}
                <div className="absolute -right-4 -top-4 w-40 h-40 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute -left-4 -bottom-4 w-32 h-32 rounded-full bg-primary/15 blur-2xl" />

                <img
                  src={profileSilhouette}
                  alt="Piyush Raj"
                  className="w-full h-full object-cover relative z-10"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-6 left-4 right-4 z-30 glass-card rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <Play size={14} className="text-primary-foreground ml-0.5" />
                  </div>
                  <div>
                    <p className="text-foreground text-xs font-semibold">Video Editor</p>
                    <p className="text-muted-foreground text-[10px]">100+ Projects Done</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={18} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
