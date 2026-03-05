import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Brain, Sparkles, TrendingUp } from "lucide-react";

const Particles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen gradient-bg flex items-center justify-center overflow-hidden">
      <Particles />

      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px]" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Predictions</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Placement</span>{" "}
          <span className="text-foreground">Predictor</span>{" "}
          <span className="gradient-text">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Predict your campus placement chances using AI. Get instant insights
          based on your academic profile.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/predict")}
          className="gradient-btn text-primary-foreground font-semibold text-lg px-10 py-4 rounded-xl animate-glow-pulse"
        >
          Start Prediction
        </motion.button>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { icon: Brain, title: "ML-Powered", desc: "Advanced machine learning model" },
            { icon: TrendingUp, title: "Accurate", desc: "High prediction accuracy" },
            { icon: Sparkles, title: "Instant", desc: "Get results in seconds" },
          ].map((f, i) => (
            <div key={i} className="glass-card rounded-xl p-6 text-center">
              <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
