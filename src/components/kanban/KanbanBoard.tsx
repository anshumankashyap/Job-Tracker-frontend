'use client';
import { JobApplication } from '@/types';
import KanbanColumn from './KanbanColumn';
import { updateApplication } from '@/services/api';
import toast from 'react-hot-toast';

export type Status = 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected';

const COLUMNS: { status: Status; label: string; color: string; dotColor: string }[] = [
  { status: 'wishlist',  label: 'Wishlist',   color: 'bg-indigo-100', dotColor: 'bg-indigo-500' },
  { status: 'applied',   label: 'Applied',    color: 'bg-blue-100',   dotColor: 'bg-blue-500' },
  { status: 'interview', label: 'Interview',  color: 'bg-yellow-100', dotColor: 'bg-yellow-500' },
  { status: 'offer',     label: 'Offer',      color: 'bg-green-100',  dotColor: 'bg-green-500' },
  { status: 'rejected',  label: 'Rejected',   color: 'bg-red-100',    dotColor: 'bg-red-500' },
];

interface Props {
  applications: JobApplication[];
  onEdit: (app: JobApplication) => void;
  onDelete: (app: JobApplication) => void;
  onAnalyze: (app: JobApplication) => void;
  onStatusChange: (id: number, status: Status) => void;
}

export default function KanbanBoard({ applications, onEdit, onDelete, onAnalyze, onStatusChange }: Props) {
  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('appId', String(id));
  };

  const handleDrop = async (e: React.DragEvent, newStatus: Status) => {
    const id = Number(e.dataTransfer.getData('appId'));
    const app = applications.find((a) => a.id === id);
    if (!app || app.status === newStatus) return;

    try {
      await updateApplication(id, { status: newStatus });
      onStatusChange(id, newStatus);
      toast.success(`Moved to ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map((col) => (
        <KanbanColumn
          key={col.status}
          {...col}
          applications={applications.filter((a) => a.status === col.status)}
          onEdit={onEdit}
          onDelete={onDelete}
          onAnalyze={onAnalyze}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}