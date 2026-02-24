"use client";
import { useState, useRef, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  currentImageUrl?: string | null;
  isLoading?: boolean;
}

export default function ImageUploadModal({
  open,
  onClose,
  onUpload,
  currentImageUrl,
  isLoading = false,
}: ImageUploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFile(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleClose = () => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  if (!open) return null;

  const displayImage = preview || currentImageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto p-4">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl border border-white/10 bg-neutral-900/95 backdrop-blur">
        <CardContent className="relative p-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={handleClose}
          >
            <X className="w-5 h-5 text-white" />
          </Button>

          <h1 className="text-2xl font-semibold text-white mb-2">Upload Image</h1>
          <p className="italic text-xs text-slate-200 mb-6">
            Upload an image file to display
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Upload Image *
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-[#FF3B8D] bg-[#FF3B8D]/10'
                    : 'border-white/30 bg-white/5'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />

                {displayImage ? (
                  <div className="space-y-4">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      <Image
                        src={displayImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        Change Image
                      </Button>
                      <Button
                        onClick={handleUpload}
                        disabled={isLoading || !selectedFile}
                        className="bg-[#FF3B8D] hover:bg-[#FF3B8D]/90 text-white"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          'Upload Image'
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Upload className="w-12 h-12 text-white/40" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-2">
                        Drag & drop your image here
                      </p>
                      <p className="text-white/60 text-sm mb-4">
                        PNG, JPG, JPEG, WEBP
                      </p>
                      <p className="text-white/40 text-xs">
                        Max file size: 10MB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Select File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

