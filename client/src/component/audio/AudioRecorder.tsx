// client/src/components/audio/AudioRecorder.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Save } from 'lucide-react';
import { WaveformVisualizer } from './WaveformVisualizer';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

interface AudioRecorderProps {
  onSave: (audioBlob: Blob) => Promise<void>;
  onTranscribe: (audioBlob: Blob) => Promise<void>;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onSave, 
  onTranscribe 
}) => {
  const {
    isRecording,
    audioData,
    startRecording,
    stopRecording,
    error
  } = useAudioRecorder();

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSave = async () => {
    if (audioData) {
      await onSave(audioData);
      await onTranscribe(audioData);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-3 rounded-full ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isRecording ? <Square /> : <Mic />}
        </button>
        
        {audioData && !isRecording && (
          <>
            <button
              onClick={handlePlayback}
              className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white"
            >
              <Play />
            </button>
            <button
              onClick={handleSave}
              className="p-3 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Save />
            </button>
          </>
        )}
      </div>

      {isRecording && <WaveformVisualizer />}
      
      {audioData && (
        <audio ref={audioRef} src={URL.createObjectURL(audioData)} />
      )}

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};