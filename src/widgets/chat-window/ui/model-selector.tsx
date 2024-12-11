import { ChatModel } from '@/entities/model/types';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface ModelSelectorProps {
  models: ChatModel[];
  selectedModel: ChatModel | null;
  onChange: (model: ChatModel) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ModelSelector({
  models,
  selectedModel,
  onChange,
  isLoading,
  disabled,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="w-64">
        <div className="animate-pulse h-10 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <>
      <div className="w-64">
        <button
          onClick={() => !disabled && setIsOpen(true)}
          className={`w-full p-2 border rounded bg-white flex justify-between items-center ${
            disabled ? 'bg-gray-100' : 'hover:border-gray-400'
          }`}
          type="button"
          disabled={disabled}
        >
          <span className="truncate">{selectedModel?.chat_model_name || 'Select a model'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen &&
        !disabled &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Select Model</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  {models.map((model) => (
                    <button
                      key={model.chat_model_id}
                      onClick={() => {
                        onChange(model);
                        setIsOpen(false);
                      }}
                      className={`w-full p-3 text-left rounded-lg transition-colors ${
                        selectedModel?.chat_model_id === model.chat_model_id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{model.chat_model_name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t flex justify-end space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
