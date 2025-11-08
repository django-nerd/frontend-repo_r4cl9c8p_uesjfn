import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, Loader2 } from 'lucide-react';

const sampleVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const sampleVtt = `WEBVTT

00:00.000 --> 00:04.000
Welcome to ConceptCast. This is a sample subtitle.

00:04.000 --> 00:08.000
Pause the video and ask a question to see the chat experience.
`;

const PlayerWithChat = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [subsEnabled, setSubsEnabled] = useState(true);

  useEffect(() => {
    // Inject sample subtitles
    const video = videoRef.current;
    if (!video) return;
    const track = document.createElement('track');
    track.kind = 'subtitles';
    track.label = 'English';
    track.srclang = 'en';
    const blob = new Blob([sampleVtt], { type: 'text/vtt' });
    track.src = URL.createObjectURL(blob);
    track.default = true;
    video.appendChild(track);

    return () => {
      video.removeChild(track);
      URL.revokeObjectURL(track.src);
    };
  }, []);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      await v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleAsk = async () => {
    const v = videoRef.current;
    if (!v) return;
    // Enforce pause-then-ask UX
    if (!v.paused) {
      v.pause();
      setIsPlaying(false);
    }
    const timestamp = v.currentTime; // precise pause timestamp
    if (!input.trim()) return;

    const newMsg = {
      role: 'user',
      text: input,
      time: timestamp,
    };
    setMessages((m) => [...m, newMsg]);
    setInput('');
    setLoading(true);

    // Simulated response (backend not wired in this UI-only pass)
    setTimeout(() => {
      const ai = {
        role: 'ai',
        text:
          'Those arrows indicate the direction of change. Here, they show how the vector field guides the transformation over time, connecting the visual to the paper\'s core equation.',
        time: timestamp,
        sources: {
          section: 'Section 2: Method',
          paper: 'Sample Paper',
        },
      };
      setMessages((m) => [...m, ai]);
      setLoading(false);
    }, 900);
  };

  const onSpeedChange = (s) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = s;
    setSpeed(s);
  };

  const toggleSubs = () => {
    const v = videoRef.current;
    if (!v) return;
    // Hide/show all text tracks
    for (let i = 0; i < v.textTracks.length; i++) {
      v.textTracks[i].mode = subsEnabled ? 'disabled' : 'showing';
    }
    setSubsEnabled((x) => !x);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="player" className="w-full bg-[#0f1226] py-16 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
          <video ref={videoRef} src={sampleVideo} className="h-full w-full" />
          <div className="flex items-center gap-2 border-t border-white/10 bg-white/5 p-3 text-sm">
            <button onClick={togglePlay} className="rounded bg-white/10 p-2 hover:bg-white/20">
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-white/70" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={(e) => {
                  if (videoRef.current) videoRef.current.volume = Number(e.target.value);
                }}
                defaultValue={1}
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <select
                value={speed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                className="rounded bg-white/10 px-2 py-1"
              >
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                  <option key={s} value={s}>{s}x</option>
                ))}
              </select>
              <button onClick={toggleSubs} className="rounded bg-white/10 px-2 py-1 hover:bg-white/20">
                {subsEnabled ? 'Subtitles On' : 'Subtitles Off'}
              </button>
              <div className="rounded bg-white/10 px-2 py-1 text-white/80">
                {videoRef.current ? `${formatTime(videoRef.current.currentTime)} / ${formatTime(videoRef.current.duration || 0)}` : '00:00 / 00:00'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[420px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-lg p-3 ${m.role === 'user' ? 'ml-auto bg-[#58C4DD] text-[#0b1020]' : 'bg-[#8B5CF6] text-white'}`}>
                <div className="text-xs opacity-80 mb-1">{m.role === 'user' ? 'You' : 'AI Tutor'} · {formatTime(m.time || 0)}</div>
                <div className="text-sm leading-relaxed">{m.text}</div>
                {m.role === 'ai' && m.sources && (
                  <div className="mt-2 text-xs text-white/80">Source: {m.sources.section} · {m.sources.paper}</div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking…
              </div>
            )}
            {!messages.length && !loading && (
              <div className="text-sm text-white/60">Pause the video, then ask a question about what you see on screen.</div>
            )}
          </div>
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAsk();
                }}
                disabled={isPlaying || loading}
                placeholder={isPlaying ? 'Pause to ask…' : 'Ask a question…'}
                className="flex-1 rounded-md bg-[#0f1226] px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-[#58C4DD] disabled:opacity-50"
              />
              <button
                onClick={handleAsk}
                disabled={isPlaying || loading || !input.trim()}
                className="rounded-md bg-[#58C4DD] px-4 py-2 text-sm font-semibold text-[#0b1020] disabled:opacity-50"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerWithChat;
