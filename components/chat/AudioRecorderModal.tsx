'use client';
import { useEffect, useRef, useState } from 'react';
import { Mic, Square, Play, Pause, Send, X, Trash2 } from 'lucide-react';

interface AudioRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (audioFile: File) => void;
}

export default function AudioRecorderModal({ isOpen, onClose, onSend }: AudioRecorderModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [waveform, setWaveform] = useState<number[]>(Array(20).fill(0));
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Start recording when modal opens
  useEffect(() => {
    if (isOpen) {
      startRecording();
    } else {
      cleanup();
    }
    return cleanup;
  }, [isOpen]);

  const cleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Setup audio context for waveform visualization
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 64;

      // Setup media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

      // Start waveform animation
      visualize();
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
      onClose();
    }
  };

  const visualize = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isRecording || isPaused) return;

      analyserRef.current!.getByteFrequencyData(dataArray);
      
      // Sample 20 points for waveform
      const samples = 20;
      const newWaveform: number[] = [];
      for (let i = 0; i < samples; i++) {
        const index = Math.floor((i / samples) * bufferLength);
        // Normalize to 0-100
        newWaveform.push((dataArray[index] / 255) * 100);
      }
      
      setWaveform(newWaveform);
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const togglePauseResume = () => {
    if (!mediaRecorderRef.current) return;

    if (isPaused) {
      // Resume
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      visualize();
    } else {
      // Pause
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const togglePlayback = () => {
    if (!audioURL) return;

    if (!audioElementRef.current) {
      audioElementRef.current = new Audio(audioURL);
      audioElementRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSend = async () => {
    if (!audioURL) return;

    try {
      const response = await fetch(audioURL);
      const audioBlob = await response.blob();
      const audioFile = new File([audioBlob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
      
      onSend(audioFile);
      onClose();
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-slide-in-center">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Mic className="w-6 h-6 text-emerald-600" />
            Voice Message
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Waveform Visualization */}
        <div className="mb-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6">
          <div className="flex items-end justify-center gap-1 h-24">
            {waveform.map((height, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-emerald-600 to-green-500 rounded-full transition-all duration-100"
                style={{
                  width: '8px',
                  height: `${Math.max(height, 5)}%`,
                  opacity: isRecording && !isPaused ? 1 : 0.3,
                }}
              />
            ))}
          </div>
          
          {/* Timer */}
          <div className="text-center mt-4">
            <span className="text-3xl font-bold text-emerald-600 font-mono">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center mb-6">
          {isRecording && !isPaused && (
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              Recording...
            </p>
          )}
          {isPaused && (
            <p className="text-gray-600">Recording paused</p>
          )}
          {!isRecording && audioURL && (
            <p className="text-gray-600">Recording complete - ready to send</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {isRecording ? (
            <>
              {/* Pause/Resume Button */}
              <button
                onClick={togglePauseResume}
                className="p-4 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              </button>

              {/* Stop Button */}
              <button
                onClick={stopRecording}
                className="p-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                title="Stop Recording"
              >
                <Square className="w-8 h-8" />
              </button>

              {/* Delete Button */}
              <button
                onClick={onClose}
                className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                title="Cancel"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </>
          ) : (
            <>
              {/* Playback Button */}
              {audioURL && (
                <button
                  onClick={togglePlayback}
                  className="p-4 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
              )}

              {/* Send Button */}
              {audioURL && (
                <button
                  onClick={handleSend}
                  className="p-6 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  title="Send Recording"
                >
                  <Send className="w-8 h-8" />
                </button>
              )}

              {/* Delete Button */}
              <button
                onClick={onClose}
                className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                title="Delete"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
