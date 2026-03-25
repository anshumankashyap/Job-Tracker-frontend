'use client';
import { useState } from 'react';
import { JobApplication, AiFeedback } from '@/types';
import { analyzeResume } from '@/services/api';
import toast from 'react-hot-toast';
import {
  XIcon, SparklesIcon, CheckCircleIcon,
  AlertCircleIcon, LightbulbIcon, BarChart2Icon
} from 'lucide-react';

interface Props {
  app: JobApplication;
  onClose: () => void;
  onAnalyzed: (app: JobApplication) => void;
}

export default function AIAnalyzerModal({ app, onClose, onAnalyzed }: Props) {
  const [jobDescription, setJobDescription] = useState(app.job_description || '');
  const [feedback, setFeedback] = useState<AiFeedback | null>(app.ai_feedback || null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }
    if (!app.resume) {
      toast.error('Please upload a resume for this application first');
      return;
    }
    setLoading(true);
    try {
      const res = await analyzeResume(app.id, jobDescription);
      setFeedback(res.data);
      onAnalyzed({ ...app, ai_feedback: res.data, job_description: jobDescription });
      toast.success('Analysis complete!');
    } catch {
      toast.error('AI analysis failed. Check your OpenAI API key.');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const scoreBarColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl">
          <div className="flex items-center gap-2 text-white">
            <SparklesIcon size={22} />
            <div>
              <h2 className="text-lg font-bold">AI Resume Analyzer</h2>
              <p className="text-blue-100 text-sm">{app.role} at {app.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <XIcon size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Resume Status */}
          <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg ${
            app.resume ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}>
            {app.resume
              ? <><CheckCircleIcon size={16} /> Resume uploaded ✓</>
              : <><AlertCircleIcon size={16} /> No resume uploaded — edit the application to add one</>
            }
          </div>

          {/* Job Description Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Paste the full job description here..."
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !app.resume}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Analyzing with AI...
              </>
            ) : (
              <><SparklesIcon size={18} /> Analyze My Resume</>
            )}
          </button>

          {/* Results */}
          {feedback && (
            <div className="space-y-5 pt-2">

              {/* Match Score */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart2Icon size={18} className="text-gray-600" />
                    <span className="font-semibold text-gray-700">Match Score</span>
                  </div>
                  <span className={`text-4xl font-black ${scoreColor(feedback.match_score)}`}>
                    {feedback.match_score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${scoreBarColor(feedback.match_score)}`}
                    style={{ width: `${feedback.match_score}%` }}
                  />
                </div>
                {feedback.overall_summary && (
                  <p className="text-gray-600 text-sm mt-3">{feedback.overall_summary}</p>
                )}
              </div>

              {/* Matched Keywords */}
              {feedback.matched_keywords?.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                    <CheckCircleIcon size={16} className="text-green-500" />
                    Matched Keywords ({feedback.matched_keywords.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {feedback.matched_keywords.map((kw, i) => (
                      <span key={i} className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {feedback.missing_keywords?.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                    <AlertCircleIcon size={16} className="text-red-500" />
                    Missing Keywords ({feedback.missing_keywords.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {feedback.missing_keywords.map((kw, i) => (
                      <span key={i} className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {feedback.suggestions?.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                    <LightbulbIcon size={16} className="text-yellow-500" />
                    AI Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {feedback.suggestions.map((s, i) => (
                      <li key={i} className="flex gap-3 bg-yellow-50 rounded-xl px-4 py-3 text-sm text-gray-700">
                        <span className="font-bold text-yellow-500 shrink-0">{i + 1}.</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}