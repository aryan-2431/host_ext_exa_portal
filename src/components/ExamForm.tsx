import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ExamFormData } from '../types/exam';

interface ExamFormProps {
  onSubmit: (examData: ExamFormData) => void;
}

export function ExamForm({ onSubmit }: ExamFormProps) {
  const [formData, setFormData] = useState<ExamFormData>({
    name: '',
    totalMarks: '',
    numberOfQuestions: '',
    meetLink: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      totalMarks: '',
      numberOfQuestions: '',
      meetLink: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Create Examination</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name of Examination"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-DEFAULT"
          required
        />
        <input
          type="number"
          placeholder="Total Marks"
          value={formData.totalMarks}
          onChange={(e) => setFormData(prev => ({ ...prev, totalMarks: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-DEFAULT"
          required
        />
        <input
          type="number"
          placeholder="Number of Questions"
          value={formData.numberOfQuestions}
          onChange={(e) => setFormData(prev => ({ ...prev, numberOfQuestions: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-DEFAULT"
          required
        />
        <input
          type="url"
          placeholder="Google Meet Link"
          value={formData.meetLink}
          onChange={(e) => setFormData(prev => ({ ...prev, meetLink: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-DEFAULT"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-2 bg-primary-DEFAULT text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        <Plus className="w-4 h-4" />
        Create Examination
      </button>
    </form>
  );
}