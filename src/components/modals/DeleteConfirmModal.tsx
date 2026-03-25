'use client';
import { AlertTriangleIcon } from 'lucide-react';

interface Props {
  company: string;
  role: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ company, role, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangleIcon className="text-red-500" size={28} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Application?</h2>
        <p className="text-gray-500 mb-6">
          Are you sure you want to delete <strong>{role}</strong> at <strong>{company}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-semibold hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}