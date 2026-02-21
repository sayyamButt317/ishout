import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Trash, Pencil } from 'lucide-react';
import Spinner from './custom-component/spinner';

interface TableProps {
  header: string[];
  paginationstart: number;
  paginationend: number;
  subheader: (string | React.ReactNode)[][];
  showTrashIcon?: boolean;
  showEyeIcon?: boolean;
  showEditIcon?: boolean; // ✅ Added
  onDelete?: (rowIndex: number) => void;
  onView?: (rowIndex: number) => void;
  onEdit?: (rowIndex: number) => void; // ✅ Added
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
  showTrashIcon = false,
  showEyeIcon = false,
  showEditIcon = false, // ✅ Default added
  onDelete,
  onView,
  onEdit, // ✅ Added
  onPageChange,
  isLoading = false,
  error,
}: TableProps) {
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

  const actionColumnCount =
    showTrashIcon || showEyeIcon || showEditIcon ? 1 : 0;

  return (
    <div className="w-full overflow-x-auto text-white border rounded-md">
      <div className="min-h-[400px] flex flex-col justify-between">
        <Table className="w-full min-w-[600px]">
          <TableHeader>
            <TableRow>
              {header.map((head, index) => (
                <TableHead
                  key={index}
                  className="text-left font-roboto font-medium text-[#535862] whitespace-nowrap"
                >
                  {head}
                </TableHead>
              ))}

              {(showTrashIcon || showEyeIcon || showEditIcon) && (
                <TableHead className="text-left font-roboto text-[#535862] whitespace-nowrap">
                  Action
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody className="border-t">
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={header.length + actionColumnCount}
                  className="text-center py-8"
                >
                  <Spinner size={20} />
                </TableCell>
              </TableRow>
            ) : !subheader || subheader?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={header.length + actionColumnCount}
                  className="text-center py-8"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={header.length + actionColumnCount}
                  className="text-center py-8"
                >
                  Error: {error.message}
                </TableCell>
              </TableRow>
            ) : (
              subheader.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className="font-normal font-open-sans whitespace-nowrap"
                    >
                      {cell}
                    </TableCell>
                  ))}

                  {(showTrashIcon || showEyeIcon || showEditIcon) && (
                    <TableCell className="flex items-center gap-3">
                      {showEyeIcon && (
                        <Eye
                          className="w-4 h-4 text-[#f7941D] cursor-pointer"
                          onClick={() => onView?.(rowIndex)}
                        />
                      )}

                      {showEditIcon && (
                        <Pencil
                          className="w-4 h-4 text-blue-400 cursor-pointer"
                          onClick={() => onEdit?.(rowIndex)}
                        />
                      )}

                      {showTrashIcon && (
                        <Trash
                          className="w-4 h-4 text-red-400 cursor-pointer"
                          onClick={() => onDelete?.(rowIndex)}
                        />
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-t mt-6 gap-2 sm:gap-0">
          <div className="flex space-x-2">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={handlePreviousPage}
              disabled={paginationstart <= 1 || isLoading}
            >
              Previous
            </Button>

            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={handleNextPage}
              disabled={paginationstart >= paginationend || isLoading}
            >
              Next
            </Button>
          </div>

          <div className="text-sm text-gray-500 sm:text-right">
            Page {paginationstart} of {paginationend}
          </div>
        </div>
      </div>
    </div>
  );
}