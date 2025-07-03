import { PlusIcon, X, Edit3, Star, StarOff, Archive, Trash2, Copy, Share2, Download, Settings } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { Button } from '../../../../components/ui/button';
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
import { Input } from '../../../../components/ui/input';
import { useToast } from '../../../../hooks/useToast';

export const HeaderSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('all');
  const [tabs, setTabs] = useState([
    { id: 'all', label: 'All Orders', count: 25, starred: false },
    { id: 'pending', label: 'Pending', count: 8, starred: true },
    { id: 'reviewed', label: 'Reviewed', count: 12, starred: false },
    { id: 'arrived', label: 'Arrived', count: 5, starred: false },
  ]);
  const [isAddTabOpen, setIsAddTabOpen] = useState(false);
  const [newTabName, setNewTabName] = useState('');
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [editTabName, setEditTabName] = useState('');
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tab = tabs.find(t => t.id === value);
    console.log(`Tab changed to: ${value} (${tab?.label})`);
    toast({
      title: "Tab Changed",
      description: `Switched to ${tab?.label}`,
    });
  };

  const handleAddTab = () => {
    if (newTabName.trim()) {
      const newTab = {
        id: `tab-${Date.now()}`,
        label: newTabName.trim(),
        count: 0,
        starred: false,
      };
      setTabs([...tabs, newTab]);
      setNewTabName('');
      setIsAddTabOpen(false);
      console.log(`New tab added: ${newTab.label}`);
      toast({
        title: "Tab Added",
        description: `New tab "${newTab.label}" created`,
      });
    }
  };

  const handleRemoveTab = (tabId: string) => {
    if (tabs.length > 1) {
      setTabs(tabs.filter(tab => tab.id !== tabId));
      if (activeTab === tabId) {
        setActiveTab(tabs[0].id);
      }
      const removedTab = tabs.find(t => t.id === tabId);
      console.log(`Tab removed: ${removedTab?.label}`);
      toast({
        title: "Tab Removed",
        description: `Tab "${removedTab?.label}" removed`,
      });
    } else {
      toast({
        title: "Cannot Remove",
        description: "At least one tab must remain",
      });
    }
  };

  const handleStarTab = (tabId: string) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId 
        ? { ...tab, starred: !tab.starred }
        : tab
    ));
    const tab = tabs.find(t => t.id === tabId);
    const isStarred = !tab?.starred;
    console.log(`Tab ${isStarred ? 'starred' : 'unstarred'}: ${tab?.label}`);
    toast({
      title: isStarred ? "Tab Starred" : "Tab Unstarred",
      description: `Tab "${tab?.label}" ${isStarred ? 'starred' : 'unstarred'}`,
    });
  };

  const handleEditTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setEditingTab(tabId);
      setEditTabName(tab.label);
    }
  };

  const handleSaveEdit = () => {
    if (editTabName.trim() && editingTab) {
      setTabs(tabs.map(tab => 
        tab.id === editingTab 
          ? { ...tab, label: editTabName.trim() }
          : tab
      ));
      const oldTab = tabs.find(t => t.id === editingTab);
      console.log(`Tab renamed from "${oldTab?.label}" to "${editTabName.trim()}"`);
      toast({
        title: "Tab Renamed",
        description: `Tab renamed to "${editTabName.trim()}"`,
      });
      setEditingTab(null);
      setEditTabName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTab(null);
    setEditTabName('');
  };

  const handleDuplicateTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      const duplicatedTab = {
        ...tab,
        id: `tab-${Date.now()}`,
        label: `${tab.label} (Copy)`,
        starred: false,
      };
      setTabs([...tabs, duplicatedTab]);
      console.log(`Tab duplicated: ${duplicatedTab.label}`);
      toast({
        title: "Tab Duplicated",
        description: `Created copy: "${duplicatedTab.label}"`,
      });
    }
  };

  const handleArchiveTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    console.log(`Tab archived: ${tab?.label}`);
    toast({
      title: "Tab Archived",
      description: `Tab "${tab?.label}" archived`,
    });
  };

  const handleShareTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    console.log(`Tab shared: ${tab?.label}`);
    toast({
      title: "Tab Shared",
      description: `Tab "${tab?.label}" shared`,
    });
  };

  const handleExportTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    console.log(`Tab exported: ${tab?.label}`);
    toast({
      title: "Tab Exported",
      description: `Tab "${tab?.label}" exported`,
    });
  };

  const handleTabSettings = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    console.log(`Tab settings opened: ${tab?.label}`);
    toast({
      title: "Tab Settings",
      description: `Settings for "${tab?.label}" opened`,
    });
  };

  const handleTabClick = (tabId: string) => {
    if (activeTab !== tabId) {
      handleTabChange(tabId);
    }
  }

  const handleTabKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === 'Enter') {
      handleTabClick(tabId);
    }
  };

  const handleTabMouseOver = (tabId: string) => {
    if (editingTab === null) {
      setActiveTab(tabId);
    }
  };

  return (
    <header className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8 py-2 w-full bg-white border-t border-gray-200 h-10 sm:h-12 overflow-x-auto shadow-sm">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex items-center flex-1"
      >
        <TabsList className="bg-transparent p-0 h-auto gap-0 flex-1">
          <div className="flex items-center gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <div key={tab.id} className="relative group flex-shrink-0">
                <TabsTrigger
                  value={tab.id}
                  className={`px-2 sm:px-4 py-2 sm:py-3 rounded-none border-b-2 transition-all relative whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700 font-semibold'
                      : 'bg-transparent border-transparent text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {tab.starred && (
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  )}
                  
                  {editingTab === tab.id ? (
                    <div className="flex items-center gap-1">
                      <Input
                        value={editTabName}
                        onChange={(e) => setEditTabName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                        onBlur={handleSaveEdit}
                        className="h-6 px-1 text-xs border-none bg-white"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <>
                      <span className="text-xs sm:text-sm">{tab.label}</span>
                      <span
                        className={`ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${
                          activeTab === tab.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </>
                  )}
                </TabsTrigger>
                
                {/* Tab actions dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-1 -right-1 w-4 h-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
                    >
                      <X className="w-2 h-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Tab Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleStarTab(tab.id)}>
                      {tab.starred ? (
                        <>
                          <StarOff className="mr-2 h-4 w-4" />
                          Unstar Tab
                        </>
                      ) : (
                        <>
                          <Star className="mr-2 h-4 w-4" />
                          Star Tab
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditTab(tab.id)}>
                      <Edit3 className="mr-2 h-4 w-4" />
                      Rename Tab
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateTab(tab.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate Tab
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleShareTab(tab.id)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Tab
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExportTab(tab.id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Tab
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTabSettings(tab.id)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Tab Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleArchiveTab(tab.id)}>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive Tab
                    </DropdownMenuItem>
                    {tabs.length > 1 && (
                      <DropdownMenuItem 
                        onClick={() => handleRemoveTab(tab.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Tab
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
          
          {/* Add tab button */}
          <div className="flex items-center px-1 sm:px-2 flex-shrink-0">
            <Dialog open={isAddTabOpen} onOpenChange={setIsAddTabOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="Add new tab"
                >
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Tab</DialogTitle>
                  <DialogDescription>
                    Create a new tab to organize your data
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter tab name..."
                    value={newTabName}
                    onChange={(e) => setNewTabName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTab();
                    }}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddTabOpen(false);
                        setNewTabName('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddTab} disabled={!newTabName.trim()}>
                      Add Tab
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsList>
      </Tabs>
    </header>
  );
};