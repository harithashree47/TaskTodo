import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), text: newTask, completed: false, date: new Date().toLocaleDateString() }, ...tasks]);
    setNewTask('');
  };

  const addNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), text: newNote, date: new Date().toLocaleDateString() }, ...notes]);
    setNewNote('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">TaskMaster</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500 hidden md:block">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-md hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Workspace Overview</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Hello, {user?.name?.split(' ')[0] || 'there'}!
              </h1>
              <p className="text-slate-500 mt-2 text-lg font-medium">{today}</p>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl">
                <span className="block text-xs font-bold text-indigo-400 uppercase">Tasks Active</span>
                <span className="text-xl font-bold text-indigo-700">{tasks.filter(t => !t.completed).length}</span>
              </div>
              <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
                <span className="block text-xs font-bold text-emerald-400 uppercase">Completed</span>
                <span className="text-xl font-bold text-emerald-700">{tasks.filter(t => t.completed).length}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Tasks Section */}
          <section className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Today's Work
                </h3>
                
                <form onSubmit={addTask} className="relative mb-8 group">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </form>

                <div className="space-y-3">
                  {tasks.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-slate-400 font-medium">No tasks yet. Start your day!</p>
                    </div>
                  ) : (
                    tasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`group flex items-center gap-4 p-4 rounded-2xl transition-all border ${task.completed ? 'bg-slate-50 border-transparent opacity-60' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'}`}
                      >
                        <button 
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300 hover:border-indigo-500'}`}
                        >
                          {task.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className={`flex-1 font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                          {task.text}
                        </span>
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Notes Section */}
          <section className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 h-full">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Quick Notes
              </h3>

              <form onSubmit={addNote} className="mb-8">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Capture an idea..."
                  rows="3"
                  className="w-full bg-amber-50/50 border-2 border-amber-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-400 focus:bg-white transition-all text-slate-700 placeholder:text-amber-300 font-medium resize-none"
                />
                <button 
                  type="submit"
                  className="mt-3 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  Save Note
                </button>
              </form>

              <div className="space-y-4">
                {notes.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-slate-400 text-sm font-medium italic">No notes captured yet.</p>
                  </div>
                ) : (
                  notes.map(note => (
                    <div key={note.id} className="relative bg-white border border-slate-100 p-5 rounded-2xl hover:shadow-md transition-all group">
                      <button 
                        onClick={() => deleteNote(note.id)}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <p className="text-slate-600 leading-relaxed font-medium mb-2 whitespace-pre-wrap">{note.text}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.date}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
