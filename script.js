const { useState, useEffect, useMemo } = React;

// 1. SVG ICON COMPONENTS
const IconHome = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconUnlock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;
const IconFileText = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconDatabase = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
const IconShare2 = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

// 2. MAIN APP COMPONENT
const App = () => {
    // STATE
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState(new Date());
    
    const [config, setConfig] = useState({ headline: "", docLink: "", submissionLink: "" });
    const [modules, setModules] = useState([]);
    const [schedule, setSchedule] = useState([]);

    // EFFECT: Fetch Data from data.json
    useEffect(() => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Ubah string tanggal dari JSON menjadi objek Date JavaScript
                const processedModules = data.modules.map(modul => ({
                    ...modul,
                    releaseTime: new Date(modul.releaseTime)
                })).sort((a, b) => a.releaseTime - b.releaseTime);

                const processedSchedule = data.schedule.map(item => ({
                    ...item,
                    start: new Date(item.start),
                    end: new Date(item.end)
                })).sort((a, b) => a.start - b.start);

                setConfig(data.config);
                setModules(processedModules);
                setSchedule(processedSchedule);
                setLoading(false);
            })
            .catch(error => {
                console.error("Gagal menarik data.json:", error);
                setLoading(false);
            });
    }, []);

    // EFFECT: Real-time clock (1 sec tick)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // LOGIC: Countdown & Status
    const { activeEvent, nextEvent } = useMemo(() => {
        let active = null;
        let next = null;
        for (let i = 0; i < schedule.length; i++) {
            const s = schedule[i];
            if (currentTime >= s.start && currentTime <= s.end) {
                active = s;
                break;
            }
            if (currentTime < s.start && !next) {
                next = s;
            }
        }
        return { activeEvent: active, nextEvent: next };
    }, [currentTime, schedule]);

    const countdownTarget = activeEvent ? activeEvent.end : (nextEvent ? nextEvent.start : null);
    
    const timeDiff = countdownTarget ? countdownTarget.getTime() - currentTime.getTime() : 0;
    const isFinished = !activeEvent && !nextEvent && schedule.length > 0;

    const hours = timeDiff > 0 ? Math.floor(timeDiff / (1000 * 60 * 60)) : 0;
    const minutes = timeDiff > 0 ? Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)) : 0;
    const seconds = timeDiff > 0 ? Math.floor((timeDiff % (1000 * 60)) / 1000) : 0;

    const pad = (num) => String(num).padStart(2, '0');

    // RENDERING
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-brand-red border-solid"></div>
                <p className="mt-4 text-gray-600 font-medium tracking-wide">Memuat Data Portal...</p>
            </div>
        );
    }

    return (
        <div className="app-container">
            {/* HEADER */}
            <header className="sticky top-0 z-50 brand-red shadow-lg">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-wider">gdtlab.id</h1>
                    <button onClick={() => setView('dashboard')} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors flex items-center gap-2 font-medium">
                        <IconHome />
                        <span className="hidden sm:inline">Home</span>
                    </button>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-6xl mx-auto px-6 py-10 pb-20">
                
                {/* VIEW: DASHBOARD */}
                {view === 'dashboard' && (
                    <div className="space-y-12 animate-fade-in">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
                                {config.headline}
                            </h2>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto text-center border border-gray-100">
                            {isFinished ? (
                                <div className="inline-flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold mb-6">
                                    Seluruh Agenda Selesai
                                </div>
                            ) : (
                                <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold mb-8 shadow-sm ${
                                    activeEvent ? "bg-green-100 text-green-700 border border-green-200 animate-pulse-fast" : "bg-blue-100 text-blue-700 border border-blue-200"
                                }`}>
                                    <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                                    {activeEvent ? `SEDANG BERLANGSUNG: ${activeEvent.title}` : `Agenda Berikutnya: ${nextEvent?.title || 'Menunggu Jadwal'}`}
                                </div>
                            )}

                            <div className="flex justify-center items-center gap-4 sm:gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="bg-gray-900 text-white w-20 h-24 sm:w-28 sm:h-32 flex items-center justify-center rounded-xl text-4xl sm:text-6xl font-black shadow-inner">{pad(hours)}</div>
                                    <span className="text-gray-500 font-bold mt-3 text-sm sm:text-base uppercase tracking-widest">Jam</span>
                                </div>
                                <div className="text-4xl sm:text-6xl font-black text-gray-300 -mt-8">:</div>
                                <div className="flex flex-col items-center">
                                    <div className="brand-red w-20 h-24 sm:w-28 sm:h-32 flex items-center justify-center rounded-xl text-4xl sm:text-6xl font-black shadow-lg ring-4 ring-red-100">{pad(minutes)}</div>
                                    <span className="text-gray-500 font-bold mt-3 text-sm sm:text-base uppercase tracking-widest">Menit</span>
                                </div>
                                <div className="text-4xl sm:text-6xl font-black text-gray-300 -mt-8">:</div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-gray-900 text-white w-20 h-24 sm:w-28 sm:h-32 flex items-center justify-center rounded-xl text-4xl sm:text-6xl font-black shadow-inner">{pad(seconds)}</div>
                                    <span className="text-gray-500 font-bold mt-3 text-sm sm:text-base uppercase tracking-widest">Detik</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <button onClick={() => setView('modules')} className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 border border-gray-100">
                                <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red flex items-center justify-center group-hover:scale-110 transition-transform"><IconFileText /></div>
                                <h3 className="text-xl font-bold text-gray-800">Akses Modul</h3>
                            </button>
                            <button onClick={() => setView('schedule')} className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 border border-gray-100">
                                <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red flex items-center justify-center group-hover:scale-110 transition-transform"><IconCalendar /></div>
                                <h3 className="text-xl font-bold text-gray-800">Jadwal Kompetisi</h3>
                            </button>
                            <a href={config.submissionLink} target="_blank" rel="noreferrer" className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 border border-gray-100">
                                <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red flex items-center justify-center group-hover:scale-110 transition-transform"><IconShare2 /></div>
                                <h3 className="text-xl font-bold text-gray-800">Link Pengumpulan</h3>
                            </a>
                            <a href={config.docLink} target="_blank" rel="noreferrer" className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 border border-gray-100">
                                <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red flex items-center justify-center group-hover:scale-110 transition-transform"><IconDatabase /></div>
                                <h3 className="text-xl font-bold text-gray-800">Dokumentasi</h3>
                            </a>
                        </div>
                    </div>
                )}

                {/* VIEW: MODULES */}
                {view === 'modules' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl brand-red flex items-center justify-center"><IconFileText /></div>
                            <h2 className="text-3xl font-extrabold text-gray-800">Modul Kompetisi</h2>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {modules.map((modul) => {
                                    const isUnlocked = currentTime >= modul.releaseTime;
                                    return (
                                        <div key={modul.id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-gray-50 transition-colors">
                                            <div className="space-y-2 flex-1">
                                                <h3 className="text-xl font-bold text-gray-800">{modul.title}</h3>
                                                <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                                                    <span>Rilis: {modul.releaseTime.toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                                    {modul.pic && <span className="bg-gray-200 px-2 py-0.5 rounded-md text-gray-700">PIC: {modul.pic}</span>}
                                                </div>
                                            </div>
                                            <div>
                                                {isUnlocked ? (
                                                    <a href={modul.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 brand-red px-6 py-3 rounded-xl font-bold shadow-md hover:bg-red-600 transition-colors">
                                                        <IconUnlock /> Buka Modul
                                                    </a>
                                                ) : (
                                                    <button disabled className="inline-flex items-center gap-2 bg-gray-200 text-gray-500 px-6 py-3 rounded-xl font-bold cursor-not-allowed">
                                                        <IconLock /> Terkunci
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: SCHEDULE */}
                {view === 'schedule' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl brand-red flex items-center justify-center"><IconCalendar /></div>
                            <h2 className="text-3xl font-extrabold text-gray-800">Jadwal Kompetisi</h2>
                        </div>
                        <div className="space-y-8">
                            {Object.entries(
                                schedule.reduce((acc, curr) => {
                                    const dateStr = curr.start.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                                    if (!acc[dateStr]) acc[dateStr] = [];
                                    acc[dateStr].push(curr);
                                    return acc;
                                }, {})
                            ).map(([dateLabel, items], idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100"><h3 className="font-bold text-lg text-gray-700">{dateLabel}</h3></div>
                                    <div className="divide-y divide-gray-100">
                                        {items.map((item) => {
                                            const isPast = currentTime > item.end;
                                            const isNow = currentTime >= item.start && currentTime <= item.end;
                                            return (
                                                <div key={item.id} className={`p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 hover:bg-gray-50 transition-colors ${isNow ? 'bg-red-50/30' : ''}`}>
                                                    <div className="min-w-[140px] text-brand-red font-bold flex flex-col justify-center">
                                                        <div className="text-lg">{item.start.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})} - {item.end.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</div>
                                                        {item.duration && <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{item.duration}</div>}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                                                        {item.pic && <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md">PIC: {item.pic}</span>}
                                                    </div>
                                                    <div className="flex items-center justify-start sm:justify-end min-w-[120px]">
                                                        {isNow ? <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold animate-pulse">Berlangsung</span> 
                                                        : isPast ? <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm font-bold">Selesai</span> 
                                                        : <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">Akan Datang</span>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
