import React, { useState } from 'react';
import { ShieldCheck, FileText, Upload, AlertCircle, CheckCircle2, ArrowLeft, Loader2, Info } from 'lucide-react';

// Mock Verification Logic (Ported from Python)
const FAKE_PHRASES = {
  scam: ["guaranteed job", "payment for certificate", "no interview required", "100% placement"],
  generic: ["this is to certify that", "has successfully completed", "we wish him all the best"]
};

function App() {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [files, setFiles] = useState<{ cert: File | null; offer: File | null }>({ cert: null, offer: null });
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cert' | 'offer') => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const simulateVerification = () => {
    if (!files.cert) return;
    setStep('analyzing');

    // Simulate OCR and Analysis delay
    setTimeout(() => {
      // Mock Analysis Logic
      const score = Math.floor(Math.random() * 40) + 60; // 60-100 for simulator
      const status = score >= 80 ? 'High Confidence' : 'Medium Confidence';
      const color = score >= 80 ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50';
      
      const reasons = [
        "Standard internship completion phrasing detected.",
        "Organization structure follows professional standards.",
        files.offer ? "Verification boosted by supplementary offer letter." : "Optional offer letter could increase confidence."
      ];

      setResult({ score, status, color, reasons });
      setStep('result');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-200">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">

          <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-zinc-900">
            AI Certificate Verifier
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            Fair and transparent internship verification powered by pattern analysis. 
            Startup-friendly, no company bias.
          </p>
        </header>

        {step === 'upload' && (
          <main className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Internship Certificate *
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'cert')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`p-8 border-2 border-dashed rounded-2xl text-center transition-all ${files.cert ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 group-hover:border-zinc-400'}`}>
                      <Upload className={`w-8 h-8 mx-auto mb-3 ${files.cert ? 'text-zinc-900' : 'text-zinc-400'}`} />
                      <p className="font-medium text-zinc-900">
                        {files.cert ? files.cert.name : 'Click or drag to upload certificate'}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">PNG, JPG or PDF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Offer Letter (Optional)
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'offer')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`p-6 border-2 border-dashed rounded-2xl text-center transition-all ${files.offer ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 group-hover:border-zinc-400'}`}>
                      <p className="font-medium text-zinc-900">
                        {files.offer ? files.offer.name : 'Upload joining letter to boost score'}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={simulateVerification}
                  disabled={!files.cert}
                  className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                >
                  Analyze Authenticity
                </button>
              </div>
            </div>


          </main>
        )}

        {step === 'analyzing' && (
          <div className="text-center py-20 space-y-6 animate-in fade-in duration-500">
            <Loader2 className="w-16 h-16 mx-auto text-zinc-900 animate-spin" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-zinc-900">Analyzing Document</h2>
              <p className="text-zinc-500">Extracting text via OCR and scanning patterns...</p>
            </div>
          </div>
        )}

        {step === 'result' && (
          <main className="animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-lg overflow-hidden relative">
              <div className="text-center mb-10">
                <div className={`inline-block px-4 py-1.5 rounded-full font-bold text-sm mb-6 ${result.color}`}>
                  {result.status}
                </div>
                <div className="text-8xl font-black tracking-tighter text-zinc-900 mb-2">
                  {result.score}%
                </div>
                <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Confidence Score</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Reasoning Details
                </h3>
                <ul className="space-y-4">
                  {result.reasons.map((reason: string, i: number) => (
                    <li key={i} className="flex gap-3 text-zinc-600 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                      <CheckCircle2 className="w-5 h-5 text-zinc-900 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-100">
                <button
                  onClick={() => setStep('upload')}
                  className="flex items-center justify-center gap-2 w-full py-4 text-zinc-500 font-bold hover:text-zinc-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Verify Another Certificate
                </button>
              </div>
            </div>
            

          </main>
        )}
      </div>
    </div>
  );
}

export default App;
