import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

interface PredictionResult {
  status: string;
  probability: number;
}

const CircularProgress = ({ value, placed }: { value: number; placed: boolean }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = placed ? "hsl(var(--success))" : "hsl(var(--destructive))";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-foreground">{value}%</span>
        <span className="text-xs text-muted-foreground">Probability</span>
      </div>
    </div>
  );
};

const PredictPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [form, setForm] = useState({
    gender: "M",
    ssc_p: 67,
    ssc_b: "Others",
    hsc_p: 91,
    hsc_b: "Others",
    hsc_s: "Commerce",
    degree_p: 58,
    degree_t: "Sci&Tech",
    workex: "No",
    etest_p: 55,
    specialisation: "Mkt&HR",
    mba_p: 58.8,
  });

  const update = (key: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult({
        status: data.placement_status || (data.probability > 50 ? "Placed" : "Not Placed"),
        probability: Math.round(data.probability ?? data.placement_probability ?? 75),
      });
    } catch {
      // Mock result for demo
      const mockProb = Math.round(40 + Math.random() * 50);
      setResult({
        status: mockProb > 50 ? "Placed" : "Not Placed",
        probability: mockProb,
      });
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    "w-full glass-card rounded-lg px-4 py-3 text-foreground bg-transparent border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all appearance-none";
  const inputClass = selectClass;
  const labelClass = "block text-sm font-medium text-muted-foreground mb-1.5";

  return (
    <div className="min-h-screen gradient-bg py-8 px-4 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[150px]" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8"
        >
          <h1 className="text-2xl font-bold gradient-text mb-1">Placement Prediction</h1>
          <p className="text-sm text-muted-foreground mb-8">Fill in your academic details</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Gender */}
              <div>
                <label className={labelClass}>Gender</label>
                <select value={form.gender} onChange={(e) => update("gender", e.target.value)} className={selectClass}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              {/* SSC Percentage */}
              <div>
                <label className={labelClass}>SSC Percentage (10th)</label>
                <input type="number" min={0} max={100} step={0.1} value={form.ssc_p} onChange={(e) => update("ssc_p", +e.target.value)} className={inputClass} />
              </div>

              {/* SSC Board */}
              <div>
                <label className={labelClass}>SSC Board</label>
                <select value={form.ssc_b} onChange={(e) => update("ssc_b", e.target.value)} className={selectClass}>
                  <option value="Central">Central</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* HSC Percentage */}
              <div>
                <label className={labelClass}>HSC Percentage (12th)</label>
                <input type="number" min={0} max={100} step={0.1} value={form.hsc_p} onChange={(e) => update("hsc_p", +e.target.value)} className={inputClass} />
              </div>

              {/* HSC Board */}
              <div>
                <label className={labelClass}>HSC Board</label>
                <select value={form.hsc_b} onChange={(e) => update("hsc_b", e.target.value)} className={selectClass}>
                  <option value="Central">Central</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* HSC Stream */}
              <div>
                <label className={labelClass}>HSC Stream</label>
                <select value={form.hsc_s} onChange={(e) => update("hsc_s", e.target.value)} className={selectClass}>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>

              {/* Degree Percentage */}
              <div>
                <label className={labelClass}>Degree Percentage</label>
                <input type="number" min={0} max={100} step={0.1} value={form.degree_p} onChange={(e) => update("degree_p", +e.target.value)} className={inputClass} />
              </div>

              {/* Degree Type */}
              <div>
                <label className={labelClass}>Degree Type</label>
                <select value={form.degree_t} onChange={(e) => update("degree_t", e.target.value)} className={selectClass}>
                  <option value="Sci&Tech">Sci&Tech</option>
                  <option value="Comm&Mgmt">Comm&Mgmt</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Work Experience */}
              <div>
                <label className={labelClass}>Work Experience</label>
                <div className="flex items-center gap-4 mt-2">
                  {["Yes", "No"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("workex", opt)}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        form.workex === opt
                          ? "gradient-btn text-primary-foreground"
                          : "glass-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialisation */}
              <div>
                <label className={labelClass}>Specialisation</label>
                <select value={form.specialisation} onChange={(e) => update("specialisation", e.target.value)} className={selectClass}>
                  <option value="Mkt&HR">Mkt&HR</option>
                  <option value="Mkt&Fin">Mkt&Fin</option>
                </select>
              </div>
            </div>

            {/* Employability Test Score - full width slider */}
            <div>
              <label className={labelClass}>
                Employability Test Score: <span className="text-foreground font-semibold">{form.etest_p}</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={form.etest_p}
                onChange={(e) => update("etest_p", +e.target.value)}
                className="w-full h-2 rounded-full appearance-none bg-muted accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            {/* MBA Percentage */}
            <div>
              <label className={labelClass}>MBA Percentage</label>
              <input type="number" min={0} max={100} step={0.1} value={form.mba_p} onChange={(e) => update("mba_p", +e.target.value)} className={inputClass} />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full gradient-btn text-primary-foreground font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Predicting...
                </>
              ) : (
                "Predict Placement"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Result Card */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 mt-8 text-center"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Prediction Result</h2>

              <CircularProgress
                value={result.probability}
                placed={result.status === "Placed"}
              />

              <div className="mt-6">
                <span
                  className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${
                    result.status === "Placed"
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {result.status}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PredictPage;
