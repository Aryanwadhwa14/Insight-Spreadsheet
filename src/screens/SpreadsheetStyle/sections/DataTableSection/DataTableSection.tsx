import React, { useCallback, useRef, useState } from 'react';
import { Badge } from '../../../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import {
  Hash,
  Briefcase,
  Calendar,
  CheckCircle,
  User,
  Globe,
  UserCheck,
  AlertTriangle,
  Clock,
  DollarSign,
  Plus,
  RotateCcw,
  Link,
  ChevronDown,
  Eye,
  EyeOff,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit3,
  Trash2,
  Copy,
  Star,
  StarOff,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Filter,
  SortAsc,
  SortDesc,
  Columns,
  RowsIcon,
  Grid3X3,
  List,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useSpreadsheetNavigation } from '../../../../hooks/useSpreadsheetNavigation';
import { useColumnResize } from '../../../../hooks/useColumnResize';
import { Button } from '../../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { useToast } from '../../../../hooks/useToast';

export const DataTableSection = (): JSX.Element => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [filterConfig, setFilterConfig] = useState<{
    column: string;
    value: string;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'card'>('grid');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [starredRows, setStarredRows] = useState<Set<number>>(new Set());
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [editingCell, setEditingCell] = useState<{row: number, col: number} | null>(null);
  const [cellValues, setCellValues] = useState<Record<string, string>>({});
  const tableRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<{
    isResizing: boolean;
    columnIndex: number;
    startX: number;
    startWidth: number;
  }>({
    isResizing: false,
    columnIndex: -1,
    startX: 0,
    startWidth: 0,
  });
  const { toast } = useToast();

  const rowNumbers = Array.from({ length: 15 }, (_, i) => i + 1);

  const { selectedCell, activateNavigation, deactivateNavigation } =
    useSpreadsheetNavigation(15, 9);

  const { columns, resizeColumn, toggleColumnVisibility } = useColumnResize(9);

  const jobRequests = [
    {
      id: 1,
      title: 'Launch social media campaign for product XYZ',
      submitted: '15-11-2024',
      status: { label: 'In-process', color: 'bg-amber-100 text-amber-800 border-amber-200' },
      submitter: 'Aisha Patel',
      url: 'www.aishapatel.com',
      assigned: 'Sophie Choudhury',
      priority: { label: 'Medium', color: 'text-orange-600' },
      dueDate: '20-11-2024',
      estValue: '6,200,000',
    },
    {
      id: 2,
      title: 'Update press kit for company redesign',
      submitted: '28-10-2024',
      status: { label: 'Need to start', color: 'bg-slate-100 text-slate-700 border-slate-200' },
      submitter: 'Irfan Khan',
      url: 'www.irfankhanportfolio.com',
      assigned: 'Tejas Pandey',
      priority: { label: 'High', color: 'text-red-600' },
      dueDate: '30-10-2024',
      estValue: '3,500,000',
    },
    {
      id: 3,
      title: 'Finalize user testing feedback for app update',
      submitted: '05-12-2024',
      status: { label: 'In-process', color: 'bg-amber-100 text-amber-800 border-amber-200' },
      submitter: 'Mark Johnson',
      url: 'www.markjohnsondesigns.com',
      assigned: 'Rachel Lee',
      priority: { label: 'Medium', color: 'text-orange-600' },
      dueDate: '10-12-2024',
      estValue: '4,750,000',
    },
    {
      id: 4,
      title: 'Design new features for the website',
      submitted: '10-01-2025',
      status: { label: 'Complete', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
      submitter: 'Emily Green',
      url: 'www.emilygreenart.com',
      assigned: 'Tom Wright',
      priority: { label: 'Low', color: 'text-blue-600' },
      dueDate: '15-01-2025',
      estValue: '5,900,000',
    },
    {
      id: 5,
      title: 'Prepare financial report for Q4',
      submitted: '25-01-2025',
      status: { label: 'Blocked', color: 'bg-red-100 text-red-800 border-red-200' },
      submitter: 'Jessica Brown',
      url: 'www.jessicabrowncreative.com',
      assigned: 'Kevin Smith',
      priority: { label: 'Low', color: 'text-blue-600' },
      dueDate: '30-01-2025',
      estValue: '2,800,000',
    },
  ];

  const columnHeaders = [
    { icon: Hash, label: '#', bgColor: 'bg-gray-50', key: 'id', minWidth: 60 },
    { icon: Briefcase, label: 'Job Request', bgColor: 'bg-gray-50', key: 'title', minWidth: 200 },
    { icon: Calendar, label: 'Submitted', bgColor: 'bg-gray-50', key: 'submitted', minWidth: 120 },
    { icon: CheckCircle, label: 'Status', bgColor: 'bg-gray-50', key: 'status', minWidth: 120 },
    { icon: User, label: 'Submitter', bgColor: 'bg-gray-50', key: 'submitter', minWidth: 140 },
    { icon: Globe, label: 'URL', bgColor: 'bg-gray-50', key: 'url', minWidth: 180 },
    {
      icon: UserCheck,
      label: 'Assigned',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      headerBg: 'bg-emerald-100',
      headerText: 'text-emerald-800',
      headerTitle: 'ABC',
      key: 'assigned',
      minWidth: 140,
    },
    {
      icon: AlertTriangle,
      label: 'Priority',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      headerBg: 'bg-purple-100',
      headerText: 'text-purple-800',
      headerTitle: 'Answer a question',
      key: 'priority',
      minWidth: 100,
    },
    {
      icon: Clock,
      label: 'Due Date',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      headerBg: 'bg-purple-100',
      headerText: 'text-purple-800',
      headerTitle: 'Answer a question',
      key: 'dueDate',
      minWidth: 120,
    },
    {
      icon: DollarSign,
      label: 'Est. Value',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      headerBg: 'bg-orange-100',
      headerText: 'text-orange-800',
      headerTitle: 'Extract',
      key: 'estValue',
      minWidth: 120,
    },
  ];

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    console.log(`Sorting by ${key} in ${direction} order`);
    toast({
      title: "Sort Applied",
      description: `Sorted by ${key} in ${direction}ending order`,
    });
  };

  const handleFilter = (column: string, value: string) => {
    setFilterConfig({ column, value });
    console.log(`Filtering ${column} by ${value}`);
    toast({
      title: "Filter Applied",
      description: `Filtered ${column} by ${value}`,
    });
  };

  const handleViewModeChange = () => {
    const newMode = viewMode === 'grid' ? 'card' : 'grid';
    setViewMode(newMode);
    console.log(`View mode changed to: ${newMode}`);
    toast({
      title: "View Mode",
      description: `Switched to ${newMode} view`,
    });
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    console.log(`Fullscreen ${isFullscreen ? 'disabled' : 'enabled'}`);
    toast({
      title: "Fullscreen",
      description: `Fullscreen ${isFullscreen ? 'disabled' : 'enabled'}`,
    });
  };

  const handleStarRow = (rowIndex: number) => {
    const newStarred = new Set(starredRows);
    if (newStarred.has(rowIndex)) {
      newStarred.delete(rowIndex);
    } else {
      newStarred.add(rowIndex);
    }
    setStarredRows(newStarred);
    console.log(`Row ${rowIndex + 1} ${newStarred.has(rowIndex) ? 'starred' : 'unstarred'}`);
    toast({
      title: newStarred.has(rowIndex) ? "Starred" : "Unstarred",
      description: `Row ${rowIndex + 1} ${newStarred.has(rowIndex) ? 'starred' : 'unstarred'}`,
    });
  };

  const handleAddComment = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    const comment = prompt('Add a comment:');
    if (comment) {
      setComments(prev => ({
        ...prev,
        [cellKey]: [...(prev[cellKey] || []), comment]
      }));
      console.log(`Comment added to cell ${rowIndex + 1}-${colIndex + 1}: ${comment}`);
      toast({
        title: "Comment Added",
        description: "Comment added to cell",
      });
    }
  };

  const handleCellEdit = (rowIndex: number, colIndex: number, currentValue: string) => {
    setEditingCell({ row: rowIndex, col: colIndex });
    const cellKey = `${rowIndex}-${colIndex}`;
    setCellValues(prev => ({ ...prev, [cellKey]: currentValue }));
  };

  const handleCellSave = (rowIndex: number, colIndex: number) => {
    setEditingCell(null);
    const cellKey = `${rowIndex}-${colIndex}`;
    console.log(`Cell ${rowIndex + 1}-${colIndex + 1} saved with value: ${cellValues[cellKey]}`);
    toast({
      title: "Cell Updated",
      description: `Cell ${rowIndex + 1}-${colIndex + 1} updated`,
    });
  };

  const handleRowAction = (action: string, rowIndex: number) => {
    console.log(`${action} action on row ${rowIndex + 1}`);
    toast({
      title: `Row ${action}`,
      description: `${action} applied to row ${rowIndex + 1}`,
    });
  };

  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      console.log(`Cell clicked: Row ${rowIndex + 1}, Column ${colIndex + 1}`);
      setSelectedRow(rowIndex);
      activateNavigation();
    },
    [activateNavigation]
  );

  const handleRowClick = useCallback((rowIndex: number) => {
    setSelectedRow(rowIndex);
    console.log(`Row ${rowIndex + 1} selected`);
  }, []);

  const handleUrlClick = useCallback((url: string) => {
    console.log(`URL clicked: ${url}`);
    toast({
      title: "URL Clicked",
      description: `Opening ${url}`,
    });
  }, [toast]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, columnIndex: number) => {
      resizeRef.current = {
        isResizing: true,
        columnIndex,
        startX: e.clientX,
        startWidth: columns[columnIndex]?.width || 150,
      };
      e.preventDefault();
    },
    [columns]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeRef.current.isResizing) return;

      const diff = e.clientX - resizeRef.current.startX;
      const newWidth = resizeRef.current.startWidth + diff;
      const minWidth = columnHeaders[resizeRef.current.columnIndex]?.minWidth || 100;
      resizeColumn(resizeRef.current.columnIndex, Math.max(minWidth, newWidth));
    },
    [resizeColumn, columnHeaders]
  );

  const handleMouseUp = useCallback(() => {
    resizeRef.current.isResizing = false;
  }, []);

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="w-3 h-3 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-blue-600" />
    ) : (
      <ArrowDown className="w-3 h-3 text-blue-600" />
    );
  };

  // Determine visible columns based on screen size
  const getVisibleColumns = () => {
    if (typeof window === 'undefined') return columnHeaders;
    
    const width = window.innerWidth;
    if (width < 640) { // Mobile
      return columnHeaders.filter(col => ['title', 'status', 'priority'].includes(col.key));
    } else if (width < 1024) { // Tablet
      return columnHeaders.filter(col => !['url', 'submitter'].includes(col.key));
    }
    return columnHeaders; // Desktop - show all
  };

  const visibleColumns = getVisibleColumns();

  return (
    <div
      ref={tableRef}
      className={`flex flex-col w-full bg-white overflow-hidden border border-gray-200 rounded-none sm:rounded-lg shadow-sm ${
        isFullscreen ? 'fixed inset-0 z-50' : 'h-[calc(100vh-140px)] sm:h-[calc(100vh-200px)]'
      }`}
      onClick={deactivateNavigation}
    >
      {/* Top breadcrumb bar */}
      <div className="flex w-full h-8 sm:h-10 items-center bg-gradient-to-r from-gray-50 to-gray-100 px-2 sm:px-4 gap-2 sm:gap-3 border-b border-gray-200">
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white rounded-md shadow-sm border border-gray-200 text-xs sm:text-sm">
          <Link className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          <span className="text-gray-700 font-medium truncate">Q3 Financial Overview</span>
        </div>
        
        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleViewModeChange}
            className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-white hover:shadow-sm rounded-md transition-all duration-200"
            title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? (
              <List className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            ) : (
              <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreenToggle}
            className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-white hover:shadow-sm rounded-md transition-all duration-200"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            ) : (
              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              console.log('Refresh clicked');
              toast({ title: "Refreshed", description: "Data refreshed" });
            }}
            className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-white hover:shadow-sm rounded-md transition-all duration-200"
            title="Refresh data"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        {/* Row numbers column - hidden on mobile */}
        <div className="hidden sm:flex flex-none w-8 sm:w-12 flex-col border-r border-gray-200 bg-gray-50">
          <div className="h-8 sm:h-10 bg-gray-100 border-b border-gray-200"></div>
          <div className="h-10 sm:h-12 bg-gray-100 flex items-center justify-center border-b border-gray-200">
            <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
          </div>

          {rowNumbers.map((num) => (
            <div
              key={`row-${num}`}
              onClick={() => handleRowClick(num - 1)}
              className={`h-10 sm:h-12 flex items-center justify-center border-b border-gray-200 cursor-pointer transition-all duration-200 relative group ${
                selectedRow === num - 1
                  ? 'bg-blue-100 text-blue-800 shadow-sm'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-xs sm:text-sm font-medium">{num}</span>
              
              {/* Row actions dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 w-4 h-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Row Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleStarRow(num - 1)}>
                    {starredRows.has(num - 1) ? (
                      <>
                        <StarOff className="mr-2 h-4 w-4" />
                        Unstar Row
                      </>
                    ) : (
                      <>
                        <Star className="mr-2 h-4 w-4" />
                        Star Row
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRowAction('Insert Above', num - 1)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Insert Row Above
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRowAction('Insert Below', num - 1)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Insert Row Below
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRowAction('Copy', num - 1)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Row
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleRowAction('Delete', num - 1)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Row
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {starredRows.has(num - 1) && (
                <Star className="absolute left-1 w-2 h-2 text-yellow-500 fill-current" />
              )}
            </div>
          ))}
        </div>

        {/* Main table content */}
        <div className="flex-1 overflow-auto">
          <Table className="border-collapse">
            <TableHeader>
              {/* Header titles row - hidden on mobile */}
              <TableRow className="border-none hidden sm:table-row">
                {visibleColumns.slice(1).map((header, index) => {
                  if (columns[index]?.hidden) return null;
                  return (
                    <TableHead
                      key={`header-${index}`}
                      className={`h-8 sm:h-10 px-0 ${
                        header.headerBg || 'bg-white'
                      } border-none relative`}
                      style={{ width: columns[index]?.width || header.minWidth }}
                    >
                      {header.headerTitle && (
                        <div
                          className={`h-8 sm:h-10 flex items-center justify-center px-2 sm:px-4 ${header.headerBg}`}
                        >
                          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white shadow-sm border border-gray-200">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                              <span className="text-xs text-white font-bold">⚡</span>
                            </div>
                            <span
                              className={`text-xs sm:text-sm font-semibold ${header.headerText} truncate`}
                            >
                              {header.headerTitle}
                            </span>
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          </div>
                        </div>
                      )}
                      {/* Resize handle - hidden on mobile */}
                      <div
                        className="hidden sm:block absolute right-0 top-0 w-2 h-full cursor-col-resize hover:bg-blue-200 opacity-0 hover:opacity-70 transition-opacity"
                        onMouseDown={(e) => handleMouseDown(e, index)}
                      />
                    </TableHead>
                  );
                })}
              </TableRow>

              {/* Column headers row */}
              <TableRow className="border-none">
                {visibleColumns.slice(1).map((header, index) => {
                  if (columns[index]?.hidden) return null;
                  const IconComponent = header.icon;
                  return (
                    <TableHead
                      key={`subheader-${index}`}
                      className={`h-10 sm:h-12 ${header.bgColor} border-b border-gray-200 relative group`}
                      style={{ width: columns[index]?.width || header.minWidth }}
                    >
                      <div className="flex h-10 sm:h-12 items-center gap-1 sm:gap-3 px-2 sm:px-4">
                        <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                          <span
                            className={`text-xs sm:text-sm font-semibold ${
                              header.textColor || 'text-gray-700'
                            } truncate`}
                          >
                            {header.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSort(header.key)}
                            className="w-5 h-5 sm:w-6 sm:h-6 p-0 hover:bg-white hover:shadow-sm rounded transition-all duration-200"
                            title={`Sort by ${header.label}`}
                          >
                            {getSortIcon(header.key)}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleColumnVisibility(index)}
                            className="hidden sm:flex w-6 h-6 p-0 hover:bg-white hover:shadow-sm rounded transition-all duration-200"
                            title={columns[index]?.hidden ? 'Show column' : 'Hide column'}
                          >
                            {columns[index]?.hidden ? (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-600" />
                            )}
                          </Button>
                          
                          {/* Column actions dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-5 h-5 sm:w-6 sm:h-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-white hover:shadow-sm rounded transition-all duration-200"
                              >
                                <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Column Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleSort(header.key)}>
                                <SortAsc className="mr-2 h-4 w-4" />
                                Sort Ascending
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSort(header.key)}>
                                <SortDesc className="mr-2 h-4 w-4" />
                                Sort Descending
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleFilter(header.key, 'filter')}>
                                <Filter className="mr-2 h-4 w-4" />
                                Add Filter
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toggleColumnVisibility(index)}>
                                {columns[index]?.hidden ? (
                                  <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Show Column
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="mr-2 h-4 w-4" />
                                    Hide Column
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      {/* Resize handle - hidden on mobile */}
                      <div
                        className="hidden sm:block absolute right-0 top-0 w-2 h-full cursor-col-resize hover:bg-blue-200 opacity-0 hover:opacity-70 transition-opacity"
                        onMouseDown={(e) => handleMouseDown(e, index)}
                      />
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {jobRequests.map((job, rowIndex) => (
                <TableRow
                  key={`job-${job.id}`}
                  className={`border-none transition-all duration-200 hover:shadow-sm group ${
                    selectedRow === rowIndex
                      ? 'bg-blue-50 shadow-sm'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {visibleColumns.slice(1).map((header, colIndex) => {
                    if (columns[colIndex]?.hidden) return null;
                    
                    let cellContent;
                    let cellValue;
                    const cellKey = `${rowIndex}-${colIndex}`;
                    const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                    const hasComments = comments[cellKey]?.length > 0;
                    
                    switch (header.key) {
                      case 'title':
                        cellValue = job.title;
                        cellContent = isEditing ? (
                          <input
                            type="text"
                            value={cellValues[cellKey] || cellValue}
                            onChange={(e) => setCellValues(prev => ({ ...prev, [cellKey]: e.target.value }))}
                            onBlur={() => handleCellSave(rowIndex, colIndex)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCellSave(rowIndex, colIndex);
                              if (e.key === 'Escape') setEditingCell(null);
                            }}
                            className="w-full bg-transparent border-none outline-none text-xs sm:text-sm"
                            autoFocus
                          />
                        ) : (
                          <div 
                            className="text-xs sm:text-sm text-gray-900 font-medium truncate cursor-pointer"
                            onDoubleClick={() => handleCellEdit(rowIndex, colIndex, cellValue)}
                          >
                            {cellValue}
                          </div>
                        );
                        break;
                      case 'submitted':
                        cellValue = job.submitted;
                        cellContent = (
                          <div className="text-xs sm:text-sm text-gray-700">
                            {cellValue}
                          </div>
                        );
                        break;
                      case 'status':
                        cellContent = (
                          <Badge
                            className={`${job.status.color} rounded-full font-medium text-xs px-2 sm:px-3 py-1 sm:py-1.5 cursor-pointer hover:shadow-sm transition-all duration-200 border`}
                            onClick={() => {
                              console.log(`Status clicked: ${job.status.label}`);
                              toast({
                                title: "Status",
                                description: `Status: ${job.status.label}`,
                              });
                            }}
                          >
                            {job.status.label}
                          </Badge>
                        );
                        break;
                      case 'submitter':
                        cellValue = job.submitter;
                        cellContent = (
                          <div className="text-xs sm:text-sm text-gray-900 font-medium truncate">
                            {cellValue}
                          </div>
                        );
                        break;
                      case 'url':
                        cellContent = (
                          <div
                            className="text-xs sm:text-sm text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors font-medium truncate"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUrlClick(job.url);
                            }}
                          >
                            {job.url}
                          </div>
                        );
                        break;
                      case 'assigned':
                        cellValue = job.assigned;
                        cellContent = (
                          <div className="text-xs sm:text-sm text-gray-900 font-medium truncate">
                            {cellValue}
                          </div>
                        );
                        break;
                      case 'priority':
                        cellContent = (
                          <div
                            className={`text-xs sm:text-sm font-semibold ${job.priority.color} cursor-pointer hover:opacity-80 transition-opacity`}
                            onClick={() => {
                              console.log(`Priority clicked: ${job.priority.label}`);
                              toast({
                                title: "Priority",
                                description: `Priority: ${job.priority.label}`,
                              });
                            }}
                          >
                            {job.priority.label}
                          </div>
                        );
                        break;
                      case 'dueDate':
                        cellValue = job.dueDate;
                        cellContent = (
                          <div className="text-xs sm:text-sm text-gray-700">{cellValue}</div>
                        );
                        break;
                      case 'estValue':
                        cellContent = (
                          <div className="flex justify-end items-center gap-1">
                            <span className="text-xs sm:text-sm text-gray-900 font-medium">
                              {job.estValue}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 font-medium">
                              ₹
                            </span>
                          </div>
                        );
                        break;
                      default:
                        cellContent = null;
                    }

                    return (
                      <TableCell
                        key={`cell-${rowIndex}-${colIndex}`}
                        className={`h-10 sm:h-12 px-2 sm:px-4 py-2 sm:py-3 bg-white border-b border-gray-100 cursor-pointer transition-all duration-200 relative group ${
                          selectedCell.row === rowIndex && selectedCell.col === colIndex
                            ? 'ring-2 ring-blue-400 ring-opacity-50'
                            : ''
                        } ${header.key === 'status' || header.key === 'priority' ? 'text-center' : ''}`}
                        style={{ width: columns[colIndex]?.width || header.minWidth }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCellClick(rowIndex, colIndex);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            {cellContent}
                          </div>
                          
                          {/* Cell actions */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {hasComments && (
                              <MessageSquare className="w-3 h-3 text-blue-500" />
                            )}
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-4 h-4 p-0 hover:bg-gray-200 rounded"
                                >
                                  <MoreHorizontal className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Cell Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleCellEdit(rowIndex, colIndex, cellValue || '')}>
                                  <Edit3 className="mr-2 h-4 w-4" />
                                  Edit Cell
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAddComment(rowIndex, colIndex)}>
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Add Comment
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  navigator.clipboard.writeText(cellValue || '');
                                  toast({ title: "Copied", description: "Cell content copied" });
                                }}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy Cell
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}

              {/* Empty rows */}
              {Array.from({ length: 10 }, (_, i) => (
                <TableRow
                  key={`empty-row-${i}`}
                  className={`border-none transition-all duration-200 hover:bg-gray-50 group ${
                    selectedRow === i + 5 ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleRowClick(i + 5)}
                >
                  {visibleColumns.slice(1).map((header, j) => {
                    if (columns[j]?.hidden) return null;
                    return (
                      <TableCell
                        key={`empty-cell-${i}-${j}`}
                        className={`h-10 sm:h-12 bg-white border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                          selectedCell.row === i + 5 && selectedCell.col === j
                            ? 'ring-2 ring-blue-400 ring-opacity-50'
                            : ''
                        }`}
                        style={{ width: columns[j]?.width || header.minWidth }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCellClick(i + 5, j);
                        }}
                      >
                        {i === 2 && j === 1 && (
                          <div className="h-6 sm:h-8 w-full bg-white border-2 border-blue-300 shadow-md rounded mx-1 sm:mx-2 animate-pulse"></div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add column - hidden on mobile */}
        <div className="hidden sm:flex flex-none w-24 sm:w-32 border-2 border-dashed border-gray-300 flex-col bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="h-8 sm:h-10 bg-gray-100 flex items-center justify-center border-b border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                console.log('Add column clicked');
                toast({
                  title: "Add Column",
                  description: "New column added",
                });
              }}
              className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-white hover:shadow-sm rounded-md transition-all duration-200"
              title="Add new column"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </Button>
          </div>
          <div className="flex-1 bg-gray-50"></div>
        </div>
      </div>
    </div>
  );
};