import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

const UploadSection = () => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = (files) => {
    const file = files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    setFileName(file.name);
    // Placeholder UX only (no backend yet)
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  return (
    <section id="upload" className="w-full bg-[#0f1226] py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Upload a Research Paper</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-300">
          Drag and drop a PDF to start the automated video generation pipeline.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition ${dragOver ? 'border-[#58C4DD] bg-[#58C4DD]/10' : 'border-white/10 bg-white/5'}`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-[#58C4DD]" />
              <p className="text-sm text-gray-300">Uploading…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-[#58C4DD]/10 p-3">
                <Upload className="h-6 w-6 text-[#58C4DD]" />
              </div>
              <p className="text-sm text-gray-300">
                {fileName ? (
                  <span>Selected: <span className="text-white">{fileName}</span></span>
                ) : (
                  'Drop your PDF here or click to browse'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
