import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Save, X } from 'lucide-react';

const Examiner_ManageCandidates = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Exam ID
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', mobileNumber: '' });

    useEffect(() => {
        fetchCandidates();
    }, [id]);

    const fetchCandidates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/candidates/exam/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setCandidates(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (candidateId) => {
        if (!window.confirm('Are you sure you want to delete this candidate?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/candidates/${candidateId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setCandidates(candidates.filter(c => c._id !== candidateId));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete candidate');
        }
    };

    const startEdit = (candidate) => {
        setEditingId(candidate._id);
        setEditForm({
            name: candidate.name,
            email: candidate.email || '',
            mobileNumber: candidate.mobileNumber || ''
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ name: '', email: '', mobileNumber: '' });
    };

    const handleUpdate = async (candidateId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/candidates/${candidateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });
            const data = await response.json();
            if (data.success) {
                setCandidates(candidates.map(c => c._id === candidateId ? data.data : c));
                setEditingId(null);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update candidate');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading candidates...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(`/configure-exam/${id}`)}
                    className="p-2 border border-[#E2E8F0] rounded-lg"
                >
                    <ArrowLeft className="w-5 h-5 text-[#64748B]" />
                </button>
                <h1 className="text-2xl font-semibold text-[#0F172A]">Manage Candidates</h1>
            </div>

            <div className="space-y-4">
                {candidates.length === 0 ? (
                    <div className="p-8 border border-dashed rounded-xl text-center text-[#64748B]">
                        No candidates found for this exam.
                    </div>
                ) : (
                    candidates.map((candidate) => (
                        <div key={candidate._id} className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-sm">
                            {editingId === candidate._id ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        className="px-3 py-2 border rounded-md text-sm"
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                        placeholder="Name"
                                    />
                                    <input
                                        type="email"
                                        className="px-3 py-2 border rounded-md text-sm"
                                        value={editForm.email}
                                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                        placeholder="Email"
                                    />
                                    <input
                                        type="text"
                                        className="px-3 py-2 border rounded-md text-sm"
                                        value={editForm.mobileNumber}
                                        onChange={e => setEditForm({ ...editForm, mobileNumber: e.target.value })}
                                        placeholder="Mobile Number"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(candidate._id)}
                                            className="px-3 py-1.5 bg-[#0F172A] text-white rounded-md text-xs flex items-center gap-1"
                                        >
                                            <Save className="w-3 h-3" /> Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="px-3 py-1.5 border rounded-md text-xs flex items-center gap-1"
                                        >
                                            <X className="w-3 h-3" /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="space-y-1">
                                        <p className="font-medium text-[#0F172A]">{candidate.name}</p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#64748B]">
                                            <span>{candidate.email || 'No email'}</span>
                                            <span>{candidate.mobileNumber}</span>
                                            <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-mono uppercase">{candidate.candidateId}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEdit(candidate)}
                                            className="p-2 text-[#64748B] hover:text-[#0F172A]"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(candidate._id)}
                                            className="p-2 text-rose-500 hover:text-rose-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Examiner_ManageCandidates;
