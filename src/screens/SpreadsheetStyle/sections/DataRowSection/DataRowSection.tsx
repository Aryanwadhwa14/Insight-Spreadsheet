import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  DownloadIcon,
  EyeIcon,
  FilterIcon,
  LayoutIcon,
  ShareIcon,
  PlusIcon,
  UploadIcon,
  Grid3X3,
  List,
  SlidersHorizontal,
  MoreHorizontal,
  FileDown,
  FileUp,
  Users,
  Copy,
  Trash2,
  Settings,
  Save,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Type,
  Hash,
  Calendar,
  Link,
  Image,
  BarChart3,
  PieChart,
  TrendingUp,
  Database,
  RefreshCw,
  Lock,
  Unlock,
  Eye,
  EyeOff,
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Separator } from '../../../../components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import { useToast } from '../../../../hooks/useToast';

export const DataRowSection = (): JSX.Element => {
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [hiddenFields, setHiddenFields] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [filterActive, setFilterActive] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isFormatDialogOpen, setIsFormatDialogOpen] = useState(false);
  const [isChartDialogOpen, setIsChartDialogOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [isLocked, setIsLocked] = useState(false);
  const { toast } = useToast();

  const toolbarActions = [
    {
      icon: <EyeIcon className="w-4 h-4" />,
      label: 'Hide fields',
      shortLabel: 'Hide',
      action: () => {
        const newHidden = hiddenFields.length > 0 ? [] : ['submitter', 'url'];
        setHiddenFields(newHidden);
        console.log('Hide fields clicked', { hiddenFields: newHidden });
        toast({
          title: "Fields Visibility",
          description: newHidden.length > 0 ? "Some fields are now hidden" : "All fields are now visible",
        });
      },
      active: hiddenFields.length > 0,
    },
    {
      icon: <ArrowUpDownIcon className="w-4 h-4" />,
      label: 'Sort',
      shortLabel: 'Sort',
      action: () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc';
        setSortOrder(newOrder);
        console.log('Sort clicked', { sortOrder: newOrder });
        toast({
          title: "Sort Applied",
          description: newOrder ? `Sorted in ${newOrder}ending order` : "Sort removed",
        });
      },
      active: sortOrder !== null,
    },
    {
      icon: <FilterIcon className="w-4 h-4" />,
      label: 'Filter',
      shortLabel: 'Filter',
      action: () => {
        setFilterActive(!filterActive);
        console.log('Filter clicked', { filterActive: !filterActive });
        toast({
          title: "Filter",
          description: !filterActive ? "Filter applied" : "Filter removed",
        });
      },
      active: filterActive,
    },
    {
      icon: viewMode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />,
      label: 'Cell view',
      shortLabel: 'View',
      action: () => {
        const newMode = viewMode === 'grid' ? 'list' : 'grid';
        setViewMode(newMode);
        console.log('Cell view clicked', { viewMode: newMode });
        toast({
          title: "View Mode",
          description: `Switched to ${newMode} view`,
        });
      },
      active: viewMode === 'list',
    },
  ];

  const formatActions = [
    {
      icon: <Bold className="w-4 h-4" />,
      label: 'Bold',
      action: () => handleFormatAction('Bold'),
    },
    {
      icon: <Italic className="w-4 h-4" />,
      label: 'Italic',
      action: () => handleFormatAction('Italic'),
    },
    {
      icon: <Underline className="w-4 h-4" />,
      label: 'Underline',
      action: () => handleFormatAction('Underline'),
    },
    {
      icon: <AlignLeft className="w-4 h-4" />,
      label: 'Align Left',
      action: () => handleFormatAction('Align Left'),
    },
    {
      icon: <AlignCenter className="w-4 h-4" />,
      label: 'Align Center',
      action: () => handleFormatAction('Align Center'),
    },
    {
      icon: <AlignRight className="w-4 h-4" />,
      label: 'Align Right',
      action: () => handleFormatAction('Align Right'),
    },
  ];

  const dataTypeActions = [
    {
      icon: <Type className="w-4 h-4" />,
      label: 'Text',
      action: () => handleDataTypeAction('Text'),
    },
    {
      icon: <Hash className="w-4 h-4" />,
      label: 'Number',
      action: () => handleDataTypeAction('Number'),
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: 'Date',
      action: () => handleDataTypeAction('Date'),
    },
    {
      icon: <Link className="w-4 h-4" />,
      label: 'URL',
      action: () => handleDataTypeAction('URL'),
    },
  ];

  const chartTypes = [
    {
      icon: <BarChart3 className="w-4 h-4" />,
      label: 'Bar Chart',
      action: () => handleChartAction('Bar Chart'),
    },
    {
      icon: <PieChart className="w-4 h-4" />,
      label: 'Pie Chart',
      action: () => handleChartAction('Pie Chart'),
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: 'Line Chart',
      action: () => handleChartAction('Line Chart'),
    },
  ];

  const rightActions = [
    {
      icon: <Save className="w-4 h-4" />,
      label: 'Save',
      action: () => {
        console.log('Save clicked');
        toast({
          title: "Saved",
          description: "Spreadsheet saved successfully",
        });
      },
    },
    {
      icon: <DownloadIcon className="w-4 h-4" />,
      label: 'Import',
      action: () => {
        setIsImportDialogOpen(true);
        console.log('Import clicked');
      },
    },
    {
      icon: <UploadIcon className="w-4 h-4" />,
      label: 'Export',
      action: () => {
        setIsExportDialogOpen(true);
        console.log('Export clicked');
      },
    },
    {
      icon: <ShareIcon className="w-4 h-4" />,
      label: 'Share',
      action: () => {
        setIsShareDialogOpen(true);
        console.log('Share clicked');
      },
    },
  ];

  const handleNewAction = () => {
    console.log('New Action clicked');
    toast({
      title: "New Action",
      description: "Creating new action item",
    });
  };

  const handleUndo = () => {
    console.log('Undo clicked');
    toast({
      title: "Undo",
      description: "Last action undone",
    });
  };

  const handleRedo = () => {
    console.log('Redo clicked');
    toast({
      title: "Redo",
      description: "Action redone",
    });
  };

  const handleRefresh = () => {
    console.log('Refresh clicked');
    toast({
      title: "Refresh",
      description: "Data refreshed",
    });
  };

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
    console.log(`Sheet ${isLocked ? 'unlocked' : 'locked'}`);
    toast({
      title: isLocked ? "Unlocked" : "Locked",
      description: `Sheet is now ${isLocked ? 'unlocked' : 'locked'}`,
    });
  };

  const handleFormatAction = (format: string) => {
    setSelectedFormat(format);
    console.log(`Format applied: ${format}`);
    toast({
      title: "Format Applied",
      description: `${format} formatting applied`,
    });
  };

  const handleDataTypeAction = (type: string) => {
    console.log(`Data type changed to: ${type}`);
    toast({
      title: "Data Type",
      description: `Column type changed to ${type}`,
    });
  };

  const handleChartAction = (chartType: string) => {
    console.log(`Chart created: ${chartType}`);
    toast({
      title: "Chart Created",
      description: `${chartType} created successfully`,
    });
    setIsChartDialogOpen(false);
  };

  const toggleToolbar = () => {
    setToolbarVisible(!toolbarVisible);
    console.log(`Toolbar ${toolbarVisible ? 'hidden' : 'shown'}`);
    toast({
      title: "Toolbar",
      description: `Toolbar ${toolbarVisible ? 'hidden' : 'shown'}`,
    });
  };

  const handleImport = (type: string) => {
    console.log(`Importing ${type}`);
    toast({
      title: "Import Started",
      description: `Importing data from ${type}`,
    });
    setIsImportDialogOpen(false);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    toast({
      title: "Export Started",
      description: `Exporting data as ${format}`,
    });
    setIsExportDialogOpen(false);
  };

  const handleShare = (method: string) => {
    console.log(`Sharing via ${method}`);
    toast({
      title: "Share",
      description: `Sharing spreadsheet via ${method}`,
    });
    setIsShareDialogOpen(false);
  };

  return (
    <header className="flex items-center gap-2 sm:gap-3 px-2 sm:px-6 py-2 sm:py-3 w-full bg-white border-b border-gray-200 h-12 sm:h-16 shadow-sm overflow-x-auto">
      {/* Quick actions - Save, Undo, Redo */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleUndo}
          className="w-8 h-8 hover:bg-gray-100 transition-colors"
          title="Undo"
        >
          <Undo className="w-4 h-4 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRedo}
          className="w-8 h-8 hover:bg-gray-100 transition-colors"
          title="Redo"
        >
          <Redo className="w-4 h-4 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          className="w-8 h-8 hover:bg-gray-100 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLockToggle}
          className={`w-8 h-8 transition-colors ${
            isLocked ? 'bg-red-50 hover:bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-600'
          }`}
          title={isLocked ? 'Unlock Sheet' : 'Lock Sheet'}
        >
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 sm:h-8 bg-gray-300" />

      {/* Tool bar toggle button */}
      <Button
        variant="ghost"
        onClick={toggleToolbar}
        className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200 shadow-sm flex-shrink-0"
      >
        <SlidersHorizontal className="w-4 h-4 text-gray-600" />
        <span className="hidden sm:inline text-sm text-gray-700 font-medium">Tools</span>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            toolbarVisible ? 'rotate-180' : ''
          }`}
        />
      </Button>

      <Separator orientation="vertical" className="h-6 sm:h-8 bg-gray-300" />

      {/* Left side toolbar actions */}
      {toolbarVisible && (
        <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
          {/* Desktop view - show all buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {toolbarActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={action.action}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 border ${
                  action.active
                    ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                    : 'border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                }`}
              >
                {action.icon}
                <span className="text-sm font-medium">{action.label}</span>
                {action.active && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </Button>
            ))}

            {/* Format dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:shadow-sm"
                >
                  <Palette className="w-4 h-4" />
                  <span className="text-sm font-medium">Format</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Text Formatting</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {formatActions.map((action, index) => (
                  <DropdownMenuItem key={index} onClick={action.action}>
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Data Type dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:shadow-sm"
                >
                  <Database className="w-4 h-4" />
                  <span className="text-sm font-medium">Data Type</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Column Data Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dataTypeActions.map((action, index) => (
                  <DropdownMenuItem key={index} onClick={action.action}>
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Chart button */}
            <Button
              variant="ghost"
              onClick={() => setIsChartDialogOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:shadow-sm"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">Chart</span>
            </Button>
          </div>

          {/* Tablet view - show with short labels */}
          <div className="hidden md:flex lg:hidden items-center gap-2">
            {toolbarActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={action.action}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 border ${
                  action.active
                    ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                    : 'border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                }`}
              >
                {action.icon}
                <span className="text-sm font-medium">{action.shortLabel}</span>
                {action.active && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </Button>
            ))}
          </div>

          {/* Mobile view - show first 2 buttons + more menu */}
          <div className="flex md:hidden items-center gap-2">
            {toolbarActions.slice(0, 2).map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={action.action}
                className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-all duration-200 border ${
                  action.active
                    ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                    : 'border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                }`}
              >
                {action.icon}
                {action.active && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </Button>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>More Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {toolbarActions.slice(2).map((action, index) => (
                  <DropdownMenuItem key={index} onClick={action.action}>
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsChartDialogOpen(true)}>
                  <BarChart3 className="w-4 h-4" />
                  <span className="ml-2">Create Chart</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {/* Right side actions */}
      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        {/* Desktop view - show all actions */}
        <div className="hidden lg:flex items-center gap-3">
          {rightActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.action}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
            >
              {action.icon}
              <span className="text-sm text-gray-700 font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Tablet view - show icons only */}
        <div className="hidden md:flex lg:hidden items-center gap-2">
          {rightActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              onClick={action.action}
              className="w-9 h-9 rounded-lg border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
              title={action.label}
            >
              {action.icon}
            </Button>
          ))}
        </div>

        {/* Mobile view - show only essential actions */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={rightActions[0].action}
            className="w-8 h-8 rounded-lg border-gray-300 hover:bg-gray-50"
            title="Save"
          >
            <Save className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={rightActions[3].action}
            className="w-8 h-8 rounded-lg border-gray-300 hover:bg-gray-50"
            title="Share"
          >
            <ShareIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* New Action button */}
        <Button
          onClick={handleNewAction}
          className="flex items-center gap-2 px-3 sm:px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-semibold">New Action</span>
        </Button>
      </div>

      {/* Chart Dialog */}
      <Dialog open={isChartDialogOpen} onOpenChange={setIsChartDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Chart</DialogTitle>
            <DialogDescription>
              Choose the type of chart you want to create
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4">
            {chartTypes.map((chart, index) => (
              <Button
                key={index}
                onClick={chart.action}
                className="flex items-center gap-3 p-4 h-auto justify-start"
                variant="outline"
              >
                {chart.icon}
                <span>{chart.label}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Data</DialogTitle>
            <DialogDescription>
              Choose the format you want to import data from
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handleImport('CSV')} className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              CSV File
            </Button>
            <Button onClick={() => handleImport('Excel')} className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              Excel File
            </Button>
            <Button onClick={() => handleImport('Google Sheets')} className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              Google Sheets
            </Button>
            <Button onClick={() => handleImport('JSON')} className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              JSON File
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>
              Choose the format you want to export data to
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handleExport('CSV')} className="flex items-center gap-2">
              <FileUp className="w-4 h-4" />
              CSV File
            </Button>
            <Button onClick={() => handleExport('Excel')} className="flex items-center gap-2">
              <FileUp className="w-4 h-4" />
              Excel File
            </Button>
            <Button onClick={() => handleExport('PDF')} className="flex items-center gap-2">
              <FileUp className="w-4 h-4" />
              PDF File
            </Button>
            <Button onClick={() => handleExport('JSON')} className="flex items-center gap-2">
              <FileUp className="w-4 h-4" />
              JSON File
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Spreadsheet</DialogTitle>
            <DialogDescription>
              Choose how you want to share this spreadsheet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button onClick={() => handleShare('Email')} className="w-full flex items-center gap-2">
              <Users className="w-4 h-4" />
              Share via Email
            </Button>
            <Button onClick={() => handleShare('Link')} className="w-full flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Share Link
            </Button>
            <Button onClick={() => handleShare('Collaborate')} className="w-full flex items-center gap-2">
              <Users className="w-4 h-4" />
              Invite Collaborators
            </Button>
            <Button onClick={() => handleShare('Public')} className="w-full flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Make Public
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};