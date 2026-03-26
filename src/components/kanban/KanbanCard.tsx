'use client';
import { JobApplication } from '@/types';
import { CalendarIcon, ExternalLinkIcon, PencilIcon, Trash2Icon, SparklesIcon } from 'lucide-react';

interface Props {
  app: JobApplication;
  onEdit: (app: JobApplication) => void;
  onDelete: (app: JobApplication) => void;
  onAnalyze: (app: JobApplication) => void;
  onDragStart: (e: React.DragEvent, id: number) => void;
}

export default function KanbanCard({ app, onEdit, onDelete, onAnalyze, onDragStart }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, app.id)}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-semibold text-gray-800 text-sm">{app.role}</p>
          <p className="text-gray-500 text-xs">{app.company}</p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button onClick={() => onAnalyze(app)} className="p-1 hover:text-indigo-600 text-gray-400" title="AI Analyze">
            <SparklesIcon size={14} />
          </button>
          <button onClick={() => onEdit(app)} className="p-1 hover:text-blue-600 text-gray-400" title="Edit">
            <PencilIcon size={14} />
          </button>
          <button onClick={() => onDelete(app)} className="p-1 hover:text-red-500 text-gray-400" title="Delete">
            <Trash2Icon size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        {app.applied_date && (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <CalendarIcon size={12} />
            {new Date(app.applied_date).toLocaleDateString()}
          </span>
        )}
        {app.job_url && (
          <a          
            href={app.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLinkIcon size={13} />
          </a>
        )}
      </div>

      {app.ai_feedback && (
        <div className={`mt-2 rounded-lg px-2 py-1 text-xs font-semibold flex items-center gap-1
          ${app.ai_feedback.match_score >= 75 ? 'bg-green-50 text-green-700' :
            app.ai_feedback.match_score >= 50 ? 'bg-yellow-50 text-yellow-700' :
            'bg-red-50 text-red-600'}`}>
          <SparklesIcon size={11} />
          AI Match: {app.ai_feedback.match_score}%
        </div>
      )}
    </div>
  );
}