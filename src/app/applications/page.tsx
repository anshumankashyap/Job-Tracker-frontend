'use client';
import { useEffect, useState } from 'react';
import { getApplications, deleteApplication } from '@/services/api';
import { JobApplication } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import ApplicationModal from '@/components/modals/ApplicationModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';
import AIAnalyzerModal from '@/components/modals/AIAnalyzerModal';
import toast from 'react-hot-toast';
import { PlusIcon } from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);
  const [deletingApp, setDeletingApp] = useState<JobApplication | null>(null);
  const [analyzingApp, setAnalyzingApp] = useState<JobApplication | null>(null);

  useEffect(() => {
    getApplications()
      .then((res) => setApplications(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (saved: JobApplication) => {
    setApplications((prev) => {
      const exists = prev.find((a) => a.id === saved.id);
      return exists ? prev.map((a) => (a.id === saved.id ? saved : a)) : [saved, ...prev];
    });
  };

  const handleDelete = async () => {
    if (!deletingApp) return;
    try {
      await deleteApplication(deletingApp.id);
      setApplications((prev) => prev.filter((a) => a.id !== deletingApp.id));
      toast.success('Application deleted');
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeletingApp(null);
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: status as JobApplication['status'] } : a))
    );
  };

  const handleAnalyzed = (updated: JobApplication) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  const openAdd = () => { setEditingApp(null); setShowModal(true); };
  const openEdit = (app: JobApplication) => { setEditingApp(app); setShowModal(true); };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-screen-xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Applications</h1>
              <p className="text-gray-500 text-sm mt-1">
                {applications.length} total · Drag cards to update status
              </p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              <PlusIcon size={18} /> Add Application
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
          ) : (
            <KanbanBoard
              applications={applications}
              onEdit={openEdit}
              onDelete={setDeletingApp}
              onAnalyze={setAnalyzingApp}
              onStatusChange={handleStatusChange}
            />
          )}
        </main>
      </div>

      {showModal && (
        <ApplicationModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          existing={editingApp}
        />
      )}

      {deletingApp && (
        <DeleteConfirmModal
          company={deletingApp.company}
          role={deletingApp.role}
          onConfirm={handleDelete}
          onCancel={() => setDeletingApp(null)}
        />
      )}

      {analyzingApp && (
        <AIAnalyzerModal
          app={analyzingApp}
          onClose={() => setAnalyzingApp(null)}
          onAnalyzed={handleAnalyzed}
        />
      )}
    </ProtectedRoute>
  );
}