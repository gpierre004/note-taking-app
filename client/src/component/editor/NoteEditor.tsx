// client/src/components/editor/NoteEditor.tsx
import React, { useState, useEffect } from 'react';
import { Save, Folder, Tag } from 'lucide-react';
import { AudioRecorder } from '../audio/AudioRecorder';
import { TagSelect } from '../tags/TagSelect';
import { useNotes } from '@/hooks/useNotes';
import { useWebSocket } from '@/hooks/useWebSocket';

interface Note {
  id?: string;
  title: string;
  content: string;
  audioUrl?: string;
  tags: string[];
  folderId?: string;
}

interface NoteEditorProps {
  initialNote?: Note;
  onSave: (note: Note) => Promise<void>;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ 
  initialNote, 
  onSave 
}) => {
  const [note, setNote] = useState<Note>({
    title: '',
    content: '',
    tags: [],
    ...initialNote
  });

  const { saveNote, transcribeAudio } = useNotes();
  const { socket } = useWebSocket();

  useEffect(() => {
    if (note.id && socket) {
      socket.emit('join-note', note.id);
      
      socket.on('note-updated', (data: { content: string }) => {
        setNote(prev => ({ ...prev, content: data.content }));
      });

      return () => {
        socket.emit('leave-note', note.id);
        socket.off('note-updated');
      };
    }
  }, [note.id, socket]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNote(prev => ({ ...prev, content: newContent }));
    
    if (note.id && socket) {
      socket.emit('note-update', {
        noteId: note.id,
        content: newContent
      });
    }
  };

  const handleAudioSave = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    try {
      const audioUrl = await saveNote(formData);
      setNote(prev => ({ ...prev, audioUrl }));
    } catch (error) {
      console.error('Failed to save audio:', error);
    }
  };

  const handleTranscribe = async (audioBlob: Blob) => {
    try {
      const transcription = await transcribeAudio(audioBlob);
      setNote(prev => ({
        ...prev,
        content: prev.content 
          ? `${prev.content}\n\n${transcription}`
          : transcription
      }));
    } catch (error) {
      console.error('Failed to transcribe audio:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote(prev => ({ 
            ...prev, 
            title: e.target.value 
          }))}
          placeholder="Note title"
          className="flex-1 text-xl font-semibold bg-transparent border-b 
                   dark:text-white focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => onSave(note)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 
                   text-white rounded-lg hover:bg-green-600"
        >
          <Save size={20} />
          Save
        </button>
      </div>

      <div className="flex items-center gap-4">
        <AudioRecorder
          onSave={handleAudioSave}
          onTranscribe={handleTranscribe}
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1 
                         bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Folder size={16} />
          Select Folder
        </button>
        <TagSelect
          selectedTags={note.tags}
          onChange={(tags) => setNote(prev => ({ ...prev, tags }))}
        />
      </div>

      <textarea
        value={note.content}
        onChange={handleContentChange}
        placeholder="Start typing or recording your note..."
        className="w-full h-64 p-4 rounded-lg border resize-none 
                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
};