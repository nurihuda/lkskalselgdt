const { useState, useEffect, useMemo, useRef } = React;

// 1. SVG COMPONENTS
const LogoGDT = ({ className }) => (
    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 678.2 437.6" className={className}>
        <g id="d"><path fill="currentColor" d="M580.57,405.99c-18.54,0-32-16.25-32-38.63v-.28c0-22.87,13.34-39.48,31.71-39.48,11.56,0,17.75,5.15,22.27,10.19l2.07,2.31v-32.14c0-2.49,2.02-4.51,4.51-4.51h20.66c2.49,0,4.51,2.02,4.51,4.51v91.68c0,2.49-2.02,4.51-4.51,4.51h-20.66c-2.49,0-4.51-2.02-4.51-4.51v-6.79l-2.06,2.22c-5.32,5.75-11.01,10.91-22,10.91ZM591.3,351.64c-7.87,0-14.03,6.6-14.03,15.02v.28c0,8.42,6.16,15.02,14.03,15.02s14.03-6.6,14.03-15.02v-.28c0-8.42-6.17-15.02-14.03-15.02Z"/></g>
        <g id="i"><rect fill="currentColor" x="510.93" y="329.44" width="29.68" height="74.72" rx="4.51" ry="4.51"/></g>
        <g id="_." data-name="."><path fill="currentColor" d="M487.67,405.85c-8.38,0-15.19-6.82-15.19-15.19s6.82-15.19,15.19-15.19,15.19,6.82,15.19,15.19-6.82,15.19-15.19,15.19Z"/></g>
        <g id="b"><path fill="currentColor" d="M436.48,405.99c-11.56,0-17.75-5.15-22.27-10.19l-2.07-2.31v6.16c0,2.49-2.02,4.51-4.51,4.51h-20.66c-2.49,0-4.51-2.02-4.51-4.51v-91.68c0-2.49,2.02-4.51,4.51-4.51h20.66c2.49,0,4.51,2.02,4.51,4.51v32.78l2.06-2.22c5.32-5.75,11-10.91,22-10.91,18.54,0,31.99,16.25,31.99,38.63v.28c0,22.87-13.34,39.48-31.71,39.48ZM425.47,351.64c-7.87,0-14.04,6.6-14.04,15.02v.28c0,8.42,6.17,15.02,14.04,15.02s14.03-6.6,14.03-15.02v-.28c0-8.42-6.16-15.02-14.03-15.02Z"/></g>
        <g id="a"><path fill="currentColor" d="M319.75,405.99c-18.54,0-32-16.25-32-38.63v-.28c0-22.87,13.34-39.48,31.71-39.48,11.57,0,17.75,5.15,22.27,10.19l2.07,2.31v-6.16c0-2.49,2.02-4.51,4.51-4.51h20.66c2.49,0,4.51,2.02,4.51,4.51v65.7c0,2.49-2.02,4.51-4.51,4.51h-20.66c-2.49,0-4.51-2.02-4.51-4.51v-6.79l-2.06,2.22c-5.32,5.75-11.01,10.91-22,10.91ZM330.48,351.64c-7.87,0-14.03,6.6-14.03,15.02v.28c0,8.42,6.16,15.02,14.03,15.02s14.03-6.6,14.03-15.02v-.28c0-8.42-6.17-15.02-14.03-15.02Z"/></g>
        <g id="l"><rect fill="currentColor" x="250.81" y="303.46" width="29.68" height="100.7" rx="4.51" ry="4.51"/></g>
        <g id="t"><path fill="currentColor" d="M222.22,405.85c-18.77,0-27.9-8.62-27.9-26.35v-22.03c0-3.16-2.59-5.67-5.75-5.7-1.82-.02-3.29-1.51-3.29-3.33v-11.34c0-2,1.35-3.7,3.25-4.31,5.75-1.86,5.79-8.56,5.79-8.56v-9.62c0-2.49,2.02-4.51,4.51-4.51h20.66c2.49,0,4.51,2.02,4.51,4.51v14.84h13.28c2.49,0,4.51,2.02,4.51,4.51v13.32c0,2.49-2.02,4.51-4.51,4.51h-13.28v20.67c0,6.12,2.93,9.09,8.95,9.09,1.41,0,2.93-.18,4.49-.53.25-.06.5-.08.74-.08,1.83,0,3.32,1.49,3.32,3.33v15.51c0,1.38-.85,2.61-2.16,3.12-4.82,1.89-11.07,2.97-17.13,2.97Z"/></g>
        <g id="d-2" data-name="d"><path fill="currentColor" d="M124.73,405.99c-18.54,0-32-16.25-32-38.63v-.28c0-22.87,13.34-39.48,31.71-39.48,11.57,0,17.75,5.15,22.27,10.19l2.07,2.31v-32.14c0-2.49,2.02-4.51,4.51-4.51h20.66c2.49,0,4.51,2.02,4.51,4.51v91.68c0,2.49-2.02,4.51-4.51,4.51h-20.66c-2.49,0-4.51-2.02-4.51-4.51v-6.79l-2.06,2.22c-5.32,5.75-11.01,10.91-22,10.91ZM135.46,351.64c-7.87,0-14.03,6.6-14.03,15.02v.28c0,8.42,6.16,15.02,14.03,15.02s14.03-6.6,14.03-15.02v-.28c0-8.42-6.17-15.02-14.03-15.02Z"/></g>
        <g id="g"><path fill="currentColor" d="M42.16,437.6c-13.85,0-25.55-2.21-36.82-6.97-1.14-.48-2-1.39-2.43-2.57-.43-1.18-.35-2.5.22-3.62l4.67-9.15c.76-1.49,2.28-2.41,3.97-2.41.64,0,1.27.13,1.86.4,7.84,3.47,15.29,5.09,23.44,5.09,10.38,0,17.13-4.62,18.99-13.01.22-1.11.35-2.25.4-3.44.04-1.04-.32-2.01-1.02-2.75-.72-.75-1.73-1.18-2.77-1.18-.94,0-1.85.35-2.56,1-3.59,3.26-8.89,7-18.13,7-18.54,0-32-16.25-32-38.63v-.28c0-22.87,13.34-39.48,31.71-39.48,11.57,0,17.75,5.15,22.27,10.19l2.07,2.31v-6.16c0-2.49,2.02-4.51,4.51-4.51h20.66c2.49,0,4.51,2.02,4.51,4.51v62.48c0,14.21-2.99,23.53-9.68,30.22-7.37,7.37-18.45,10.95-33.89,10.95ZM42.72,351.64c-7.87,0-14.03,6.6-14.03,15.02v.28c0,8.42,6.16,15.02,14.03,15.02s14.03-6.6,14.03-15.02v-.28c0-8.42-6.17-15.02-14.03-15.02Z"/></g>
        <g id="_7" data-name="7"><path fill="currentColor" d="M525.55,305.3c-8.8,0-15.93-7.13-15.93-15.93v-45.57c0-8.8,7.13-15.93,15.93-15.93s15.93,7.13,15.93,15.93v45.57c0,8.8-7.13,15.93-15.93,15.93Z"/></g>
        <g id="_6" data-name="6"><path fill="currentColor" d="M622.23,265.25c-4.08,0-8.15-1.55-11.26-4.67l-32.23-32.23c-6.22-6.22-6.22-16.3,0-22.52s16.3-6.22,22.52,0l32.23,32.23c6.22,6.22,6.22,16.3,0,22.52-3.11,3.11-7.19,4.67-11.26,4.67Z"/></g>
        <g id="_5" data-name="5"><path fill="currentColor" d="M662.27,168.58h-45.57c-8.8,0-15.93-7.13-15.93-15.93s7.13-15.93,15.93-15.93h45.57c8.8,0,15.93,7.13,15.93,15.93s-7.13,15.93-15.93,15.93Z"/></g>
        <g id="_4" data-name="4"><path fill="currentColor" d="M590,104.12c-4.08,0-8.15-1.55-11.26-4.66-6.22-6.22-6.22-16.3,0-22.52l32.23-32.23c6.22-6.22,16.3-6.22,22.52,0,6.22,6.22,6.22,16.3,0,22.52l-32.23,32.23c-3.11,3.11-7.19,4.67-11.26,4.67Z"/></g>
        <g id="_3" data-name="3"><path fill="currentColor" d="M525.55,77.43c-8.8,0-15.93-7.13-15.93-15.93V15.93c0-8.8,7.13-15.93,15.93-15.93s15.93,7.13,15.93,15.93v45.57c0,8.8-7.13,15.93-15.93,15.93Z"/></g>
        <g id="_2" data-name="2"><path fill="currentColor" d="M461.1,104.12c-4.08,0-8.15-1.55-11.26-4.66l-32.23-32.23c-6.22-6.22-6.22-16.3,0-22.52,6.22-6.22,16.3-6.22,22.52,0l32.23,32.23c6.22,6.22,6.22,16.3,0,22.52-3.11,3.11-7.19,4.67-11.26,4.67Z"/></g>
        <g id="_1" data-name="1"><path fill="currentColor" d="M434.4,168.58h-45.57c-8.8,0-15.93-7.13-15.93-15.93s7.13-15.93,15.93-15.93h45.57c8.8,0,15.93,7.13,15.93,15.93s-7.13,15.93-15.93,15.93Z"/></g>
        <g id="tongkat"><path fill="currentColor" d="M428.87,265.25c-4.08,0-8.15-1.55-11.26-4.67-6.22-6.22-6.22-16.3,0-22.52l96.68-96.68c6.22-6.22,16.3-6.22,22.52,0,6.22,6.22,6.22,16.3,0,22.52l-96.68,96.68c-3.11,3.11-7.19,4.67-11.26,4.67Z"/></g>
    </svg>
);

const IconHome = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconMaximize = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>;
const IconMinimize = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>;
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconUnlock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;
const IconFileText = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconDatabase = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
const IconShare2 = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

// 2. MAIN APP COMPONENT
const App = () => {
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [timerScale, setTimerScale] = useState(1.0); // Fitur skala ukuran timer
    
    const [config, setConfig] = useState({ headline: "", docLink: "", submissionLink: "" });
    const [modules, setModules] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const timerRef = useRef(null);

    // Fetch Data
    useEffect(() => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
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
                console.error("Gagal menarik data:", error);
                setLoading(false);
            });
    }, []);

    // Real-time Clock
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Fullscreen Event Listener
    useEffect(() => {
        const handleFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement) setTimerScale(1.0); // Reset skala jika keluar fullscreen
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            timerRef.current.requestFullscreen().catch(err => console.error(err));
        } else {
            document.exitFullscreen();
        }
    };

    // Fungsi zoom timer
    const zoomIn = () => setTimerScale(prev => Math.min(prev + 0.1, 2.0));
    const zoomOut = () => setTimerScale(prev => Math.max(prev - 0.1, 0.6));

    // Logic Event
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
            {/* HEADER LEBAR SEKALIAN & LOGO SEJAJAR */}
            <header className="sticky top-0 z-50 brand-red shadow-lg w-full px-4 sm:px-12 py-3">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <button onClick={() => setView('dashboard')} className="hover:opacity-90 transition-opacity focus:outline-none">
                            <LogoGDT className="h-14 sm:h-16 w-auto text-white" />
                        </button>
                        <div className="h-8 w-[2px] bg-white bg-opacity-30 hidden sm:block"></div>
                        <h2 className="text-white text-base sm:text-xl font-black tracking-wide hidden sm:block uppercase">
                            {config.headline || "Portal Utama"}
                        </h2>
                    </div>
                    
                    {/* TOMBOL HOME TAMBAHAN KANAN */}
                    <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all flex items-center gap-2 font-bold text-sm uppercase tracking-wider border border-white border-opacity-20">
                        <IconHome />
                        <span className="hidden md:inline">Home</span>
                    </button>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-10 pb-16">
                
                {/* VIEW: DASHBOARD */}
                {view === 'dashboard' && (
                    <div className="space-y-12 animate-fade-in">
                        {/* Headline Teks Mobile Only */}
                        <div className="text-center sm:hidden">
                            <h2 className="text-2xl font-extrabold text-gray-800">{config.headline}</h2>
                        </div>

                        {/* KOTAK TIMER DENGAN FITUR PERBESAR / PERKECIL */}
                        <div 
                            ref={timerRef}
                            className={`bg-white shadow-xl max-w-4xl mx-auto text-center border border-gray-100 relative transition-all duration-300 ${
                                isFullscreen 
                                ? 'flex flex-col items-center justify-center w-full h-full p-12 m-0 max-w-none rounded-none' 
                                : 'rounded-3xl p-8'
                            }`}
                        >
                            {/* Toolbar Kontrol Kanan Atas */}
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200 z-10">
                                <button onClick={zoomOut} className="w-8 h-8 font-black text-gray-500 hover:bg-gray-200 rounded-lg flex items-center justify-center text-lg transition-colors focus:outline-none" title="Perkecil Ukuran">-</button>
                                <span className="text-xs text-gray-400 font-bold px-1">{Math.round(timerScale * 100)}%</span>
                                <button onClick={zoomIn} className="w-8 h-8 font-black text-gray-500 hover:bg-gray-200 rounded-lg flex items-center justify-center text-lg transition-colors focus:outline-none" title="Perbesar Ukuran">+</button>
                                <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
                                <button onClick={toggleFullScreen} className="w-8 h-8 text-gray-500 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors focus:outline-none" title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}>
                                    {isFullscreen ? <IconMinimize /> : <IconMaximize />}
                                </button>
                            </div>

                            <div style={{ transform: `scale(${timerScale})`, transformOrigin: 'center' }} className="transition-transform duration-200 my-4">
                                {isFinished ? (
                                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold mb-6">
                                        Seluruh Agenda Selesai
                                    </div>
                                ) : (
                                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold mb-8 shadow-sm ${
                                        activeEvent ? "bg-green-100 text-green-700 border border-green-200 animate-pulse-fast" : "bg-blue-100 text-blue-700 border border-blue-200"
                                    }`}>
                                        <span className="w-3 h-3 rounded-full bg-current"></span>
                                        {activeEvent ? `SEDANG BERLANGSUNG: ${activeEvent.title}` : `Agenda Berikutnya: ${nextEvent?.title || 'Menunggu Jadwal'}`}
                                    </div>
                                )}

                                <div className="flex justify-center items-center gap-4 sm:gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-gray-900 text-white w-20 h-24 sm:w-28 sm:h-32 flex items-center justify-center rounded-xl text-4xl sm:text-6xl font-black shadow-inner">{pad(hours)}</div>
                                        <span className="text-gray-500 font-bold mt-3 text-xs uppercase tracking-widest">Jam</span>
                                    </div>
                                    <div className="text-4xl sm:text-6xl font-black text-gray-300 -mt-8">:</div>
                                    <div className="flex flex-col items-center">
                                        <div className="brand-red w-20 h-24 sm:w-28 sm:h-32 flex items-center justify-center rounded-xl text-4xl sm:text-6xl font-black shadow-lg ring-4 ring-red-100">{pad(minutes)}</div>
                                        <span className="text-gray-500 font-bold mt-3 text-xs uppercase tracking-widest">Menit</span>
                                    </div>
                                    <div className="text-4xl sm:text-6xl font-black text-gray-300 -mt-8">:</div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-gray-900 text-white w-20 h-24 sm:w-28 sm:h-32 flex items-center justify-center rounded-xl text-4xl sm:text-6xl font-black shadow-inner">{pad(seconds)}</div>
                                        <span className="text-gray-500 font-bold mt-3 text-xs uppercase tracking-widest">Detik</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Menu Grid */}
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

                {/* VIEW: SCHEDULE DENGAN HIGHLIGHT JADWAL AKTIF */}
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
                                                <div key={item.id} className={`p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 border-l-4 transition-all duration-300 ${
                                                    isNow ? 'schedule-highlight border-l-red-500' : 'hover:bg-gray-50 border-l-transparent'
                                                }`}>
                                                    <div className="min-w-[140px] text-brand-red font-bold flex flex-col justify-center">
                                                        <div className="text-lg">{item.start.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})} - {item.end.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</div>
                                                        {item.duration && <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{item.duration}</div>}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                                                        {item.pic && <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md">PIC: {item.pic}</span>}
                                                    </div>
                                                    <div className="flex items-center justify-start sm:justify-end min-w-[120px]">
                                                        {isNow ? <span className="px-3 py-1 rounded-full bg-red-100 text-brand-red text-sm font-bold shadow-sm animate-pulse">Berlangsung</span> 
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

            {/* CREDIT FOOTER */}
            <footer className="w-full bg-white border-t border-gray-200 py-6 px-12 text-center text-sm font-medium text-gray-500 tracking-wide mt-auto">
                <p>Created by <span className="font-bold text-gray-800">Muhamad Nuri Huda</span> • Part of <span className="font-bold text-brand-red">GDTLAB Indonesia</span> • © 2026</p>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
