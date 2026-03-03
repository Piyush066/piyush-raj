import { motion } from "framer-motion";
import { Play, Handshake, Clock, FolderCheck, Briefcase } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: Clock, label: "2+ Years Experience" },
  { icon: FolderCheck, label: "100+ Projects Completed" },
  { icon: Briefcase, label: "Freelance Video Editor" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
              Creative Video Editor & Tech Developer
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight mb-6">
              I'm <span className="gradient-text">Piyush Raj</span>,
              <br />
              Creative Video Editor &{" "}
              <span className="gradient-text">AI-Based</span> Tech Developer
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              Crafting retention-driven videos that help brands grow — powered by
              creativity, strategy, and technology.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-orange"
              >
                <Play size={18} /> View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                <Handshake size={18} /> Hire Me
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <s.icon size={16} className="text-primary" />
                  {s.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="relative w-72 h-80 md:w-80 md:h-[26rem] rounded-2xl overflow-hidden border-2 border-primary/30">
                <img
                  src={profilePhoto}
                  alt="Piyush Raj"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
