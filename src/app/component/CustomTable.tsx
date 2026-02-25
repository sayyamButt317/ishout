"use client";
import { Button } from '@/components/ui/button';
import { Check, Eye, Trash, Pencil } from 'lucide-react';
import Spinner from './custom-component/spinner';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import ImageUploadModal from './custom-component/image-upload-modal';

const STATUS_STEPS = [
  { key: 'pending', label: 'Pending', letter: 'P' },
  { key: 'approved', label: 'Approved By Admin', letter: 'A' },
  { key: 'processing', label: 'Approved By Brand', letter: 'B' },
  { key: 'completed', label: 'Negotiated', letter: 'N' }
] as const;

const STATUS_ORDER = ['pending', 'approved', 'processing', 'completed'] as const;

function getStatusSteps(currentStatus: string) {
  const normalizedStatus = currentStatus.toLowerCase();
  const currentIndex = STATUS_ORDER.indexOf(normalizedStatus as any);
  
  if (currentIndex === -1) {
    return STATUS_STEPS.map((step, index) => ({
      ...step,
      isActive: index === 0,
      isCurrent: false
    }));
  }
  
  return STATUS_STEPS.map((step, index) => ({
    ...step,
    isActive: index <= currentIndex,
    isCurrent: STATUS_ORDER[index] === normalizedStatus
  }));
}

interface TableProps {
  header: string[];
  paginationstart: number;
  paginationend: number;
  subheader: (string | React.ReactNode)[][];
  imageUrls?: (string | null | undefined)[];
  statuses?: string[];
  showTrashIcon?: boolean;
  showEyeIcon?: boolean;
  showEditIcon?: boolean;
  onDelete?: (rowIndex: number) => void;
  onView?: (rowIndex: number) => void;
  onEdit?: (rowIndex: number) => void;
  onImageUpload?: (rowIndex: number, file: File) => void;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  error?: {
    message: string;
  };
}

export default function TableComponent({
  header,
  paginationstart,
  paginationend,
  subheader,
  imageUrls,
  statuses,
  showTrashIcon = false,
  showEyeIcon = false,
  showEditIcon = false,
  onDelete,
  onView,
  onEdit,
  onImageUpload,
  onPageChange,
  isLoading = false,
  error,
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [uploadedImages, setUploadedImages] = useState<{ [key: number]: string }>({});
  const [uploadModalOpen, setUploadModalOpen] = useState<number | null>(null);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handlePreviousPage = () => {
    if (paginationstart > 1 && onPageChange) {
      onPageChange(paginationstart - 1);
    }
  };

  const handleNextPage = () => {
    if (paginationstart < paginationend && onPageChange) {
      onPageChange(paginationstart + 1);
    }
  };

  const toggleRowSelection = (rowIndex: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowIndex)) {
      newSelected.delete(rowIndex);
    } else {
      newSelected.add(rowIndex);
    }
    setSelectedRows(newSelected);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <Spinner size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-white/60">
        Error: {error.message}
      </div>
    );
  }

  if (!subheader || subheader.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-white/60">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="min-h-[400px] flex flex-col justify-between">
        <div className="space-y-3">
          {subheader.map((row, rowIndex) => {
            const isSelected = selectedRows.has(rowIndex);
            const currentStatus = statuses?.[rowIndex]?.toLowerCase() || 'pending';
            const statusSteps = getStatusSteps(currentStatus);
            
            return (
              <div key={rowIndex} className="w-full">
                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1A1A1A] p-3 sm:p-5 hover:border-white/20 transition-colors">
                  {statuses && (
                    <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-white/10 overflow-x-auto">
                      <div className="flex items-center justify-between min-w-[280px] sm:max-w-2xl">
                        {statusSteps.map((step, stepIndex) => (
                          <div key={step.key} className="flex items-center">
                            <div className="flex flex-col items-center">
                              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all ${
                                step.isActive 
                                  ? 'bg-[#FF3B8D] text-white' 
                                  : 'bg-white/10 text-white/40 border border-white/20'
                              }`}>
                                {step.isActive && stepIndex > 0 ? (
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                ) : (
                                  step.letter
                                )}
                              </div>
                              <span className={`text-[8px] sm:text-[10px] mt-1 whitespace-nowrap ${
                                step.isActive ? 'text-white/80' : 'text-white/40'
                              }`}>
                                {step.label}
                              </span>
                            </div>
                             {stepIndex < statusSteps.length - 1 && (
                               <div className={`w-12 sm:w-64 h-0.5 mx-1 sm:mx-2 ${
                                 step.isActive ? 'bg-[#FF3B8D]' : 'bg-white/20'
                               }`} />
                             )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="sm:hidden mb-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center relative">
                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => {
                          fileInputRefs.current[rowIndex] = el;
                        }}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedImages((prev) => {
                              if (prev[rowIndex] && prev[rowIndex].startsWith('blob:')) {
                                URL.revokeObjectURL(prev[rowIndex]);
                              }
                              const previewUrl = URL.createObjectURL(file);
                              return {
                                ...prev,
                                [rowIndex]: previewUrl,
                              };
                            });
                            setImageErrors((prev) => {
                              const newSet = new Set(prev);
                              newSet.delete(rowIndex);
                              return newSet;
                            });
                            if (onImageUpload) {
                              onImageUpload(rowIndex, file);
                            }
                            e.target.value = '';
                          }
                        }}
                      />
                      {(uploadedImages[rowIndex] || (imageUrls && imageUrls[rowIndex])) && !imageErrors.has(rowIndex) ? (
                        <button
                          type="button"
                          onClick={() => {
                            setUploadModalOpen(rowIndex);
                          }}
                          className="w-full h-full relative cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <Image
                            src={uploadedImages[rowIndex] || imageUrls?.[rowIndex] || ''}
                            alt="Campaign"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            unoptimized
                            priority
                            onError={() => {
                              setImageErrors((prev) => new Set(prev).add(rowIndex));
                              setUploadedImages((prev) => {
                                const newImages = { ...prev };
                                delete newImages[rowIndex];
                                return newImages;
                              });
                            }}
                          />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setUploadModalOpen(rowIndex);
                          }}
                          className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
                        >
                          <span className="text-white/40 text-xl font-semibold">+</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="hidden sm:flex shrink-0 items-center">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center relative">
                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => {
                            if (!fileInputRefs.current[rowIndex]) {
                              fileInputRefs.current[rowIndex] = el;
                            }
                          }}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploadedImages((prev) => {
                                if (prev[rowIndex] && prev[rowIndex].startsWith('blob:')) {
                                  URL.revokeObjectURL(prev[rowIndex]);
                                }
                                const previewUrl = URL.createObjectURL(file);
                                return {
                                  ...prev,
                                  [rowIndex]: previewUrl,
                                };
                              });
                              setImageErrors((prev) => {
                                const newSet = new Set(prev);
                                newSet.delete(rowIndex);
                                return newSet;
                              });
                              if (onImageUpload) {
                                onImageUpload(rowIndex, file);
                              }
                              e.target.value = '';
                            }
                          }}
                        />
                        {(uploadedImages[rowIndex] || (imageUrls && imageUrls[rowIndex])) && !imageErrors.has(rowIndex) ? (
                          <button
                            type="button"
                            onClick={() => {
                              setUploadModalOpen(rowIndex);
                            }}
                            className="w-full h-full relative cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <Image
                              src={uploadedImages[rowIndex] || imageUrls?.[rowIndex] || ''}
                              alt="Campaign"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                              unoptimized
                              priority
                              onError={() => {
                                setImageErrors((prev) => new Set(prev).add(rowIndex));
                                setUploadedImages((prev) => {
                                  const newImages = { ...prev };
                                  delete newImages[rowIndex];
                                  return newImages;
                                });
                              }}
                            />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setUploadModalOpen(rowIndex);
                            }}
                            className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
                          >
                            <span className="text-white/40 text-2xl font-semibold">+</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-4">
                        {row.map((cell, cellIndex) => {
                          const isLastColumn = cellIndex === row.length - 1;
                          const shouldSpanTwo = isLastColumn && row.length <= 11;
                          return (
                            <div key={cellIndex} className={`min-w-0 ${shouldSpanTwo ? 'lg:col-span-2' : ''}`}>
                              <p className="text-[10px] sm:text-xs text-white/60 mb-1 sm:mb-1.5 truncate font-medium">
                                {header[cellIndex] || `Field ${cellIndex + 1}`}
                              </p>
                              <div className="text-xs sm:text-sm text-white font-medium break-words">
                      {cell}
                              </div>
                            </div>
                          );
                        })}

                  {(showTrashIcon || showEyeIcon || showEditIcon) && (
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-white/60 mb-1 sm:mb-1.5 font-medium">Action</p>
                            <div className="flex items-center gap-2 sm:gap-3">
                      {showEyeIcon && (
                        <Eye
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f7941D] cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => onView?.(rowIndex)}
                        />
                      )}

                      {showEditIcon && (
                        <Pencil
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => onEdit?.(rowIndex)}
                        />
                      )}

                      {showTrashIcon && (
                        <Trash
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => onDelete?.(rowIndex)}
                        />
                      )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-0 py-4 mt-6 gap-3 sm:gap-0">
          <div className="flex space-x-2">
            <Button
              className="cursor-pointer border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed rounded-md px-4 py-2 text-sm font-medium"
              variant="outline"
              onClick={handlePreviousPage}
              disabled={paginationstart <= 1 || isLoading}
            >
              Previous
            </Button>

            <Button
              className="cursor-pointer border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed rounded-md px-4 py-2 text-sm font-medium"
              variant="outline"
              onClick={handleNextPage}
              disabled={paginationstart >= paginationend || isLoading}
            >
              Next
            </Button>
          </div>

          <div className="text-sm text-white/70 sm:text-right font-medium">
            Page {paginationstart} of {paginationend}
          </div>
        </div>
      </div>

      {uploadModalOpen !== null && (
        <ImageUploadModal
          open={uploadModalOpen !== null}
          onClose={() => setUploadModalOpen(null)}
          onUpload={(file) => {
            const previewUrl = URL.createObjectURL(file);
            setUploadedImages((prev) => {
              if (prev[uploadModalOpen] && prev[uploadModalOpen].startsWith('blob:')) {
                URL.revokeObjectURL(prev[uploadModalOpen]);
              }
              return {
                ...prev,
                [uploadModalOpen]: previewUrl,
              };
            });
            setImageErrors((prev) => {
              const newSet = new Set(prev);
              newSet.delete(uploadModalOpen);
              return newSet;
            });
            if (onImageUpload) {
              onImageUpload(uploadModalOpen, file);
            }
            setUploadModalOpen(null);
          }}
          currentImageUrl={imageUrls?.[uploadModalOpen] || uploadedImages[uploadModalOpen] || null}
        />
      )}
    </div>
  );
}