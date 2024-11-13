// client/src/components/tags/TagSelect.tsx
import React from 'react';
import { Tag as TagIcon, X } from 'lucide-react';

interface TagSelectProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export const TagSelect: React.FC<TagSelectProps> = ({ 
  selectedTags, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]);
    }
    setInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        {selectedTags.map(tag => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-blue-100 
                     dark:bg-blue-900 rounded-lg text-sm"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1 bg-gray-100 
                   dark:bg-gray-800 rounded-lg"
        >
          <TagIcon size={16} />
          Add Tag
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white dark:bg-gray-800 
                      rounded-lg shadow-lg border dark:border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTag(input);
              }
            }}
            placeholder="Type tag name..."
            className="w-full p-2 bg-transparent border-b dark:border-gray-700"
          />
        </div>
      )}
    </div>
  );
};