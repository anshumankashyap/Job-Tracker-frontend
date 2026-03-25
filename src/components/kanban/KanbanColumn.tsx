'use client';
import { JobApplication } from '@/types';
import KanbanCard from './KanbanCard';

interface Props {
  status: string;
  label: string;
  color: string;
  dotColor: string;
  applications: JobApplication[];
  onEdit: (app: JobApplication) => void;
  onDelete: (app: JobApplication) => void;
  onAnalyze: (app: JobApplication) => void;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
}

export default function KanbanColumn({
  status, label, color, dotColor, applications,
  onEdit, onDelete, onAnalyze, onDragStart, onDrop,
}: Props) {
  return (
    <div
      className="flex flex-col min-w-[260px] w-[260px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, status)}
    >
      {/* Column Header */}
      <div className={`rounded-t-xl px-4 py-3 ${color}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
            <span className="font-semibold text-gray-700 capitalize">{label}</span>
          </div>
          <span className="bg-white text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {applications.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 bg-gray-50 rounded-b-xl p-3 space-y-3 min-h-[400px]">
        {applications.map((app) => (
          <KanbanCard
            key={app.id}
            app={app}
            onEdit={onEdit}
            onDelete={onDelete}
            onAnalyze={onAnalyze}
            onDragStart={onDragStart}
          />
        ))}
        {applications.length === 0 && (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-xs text-gray-400">Drop here</p>
          </div>
        )}
      </div>
    </div>
  );
}