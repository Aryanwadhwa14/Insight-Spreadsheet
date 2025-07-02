import {
  BellIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  SearchIcon,
  Menu,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Home,
  Folder,
  FileSpreadsheet,
  Star,
  Clock,
  Trash2,
  Copy,
  Download,
  Share2,
  Edit3,
  FolderOpen,
} from 'lucide-react';
import React, { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar';
import { Badge } from '../../../../components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
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

export const NavigationBarSection = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const { toast } = useToast();

  const breadcrumbItems = [
    { label: 'Workspace', href: '#', active: false, icon: Home },
    { label: 'Q3 Reports', href: '#', active: false, icon: Folder },
    { label: 'Financial Overview', href: '#', active: true, icon: FileSpreadsheet },
  ];

  const notifications = [
    { id: 1, title: 'New comment on row 3', time: '2 min ago', read: false },
    { id: 2, title: 'Data updated by Sarah', time: '5 min ago', read: false },
    { id: 3, title: 'Spreadsheet shared with team', time: '1 hour ago', read: true },
  ];

  const menuItems = [
    { label: 'Home', icon: Home, action: () => handleMenuAction('Home') },
    { label: 'Recent Files', icon: Clock, action: () => handleMenuAction('Recent Files') },
    { label: 'Starred', icon: Star, action: () => handleMenuAction('Starred') },
    { label: 'Shared with me', icon: Share2, action: () => handleMenuAction('Shared') },
    { label: 'Trash', icon: Trash2, action: () => handleMenuAction('Trash') },
  ];

  const handleBreadcrumbClick = (label: string, index: number) => {
    console.log(`Navigating to: ${label} (level ${index})`);
    toast({
      title: "Navigation",
      description: `Navigating to ${label}`,
    });
  };

  const handleNotificationClick = (notificationId?: number) => {
    if (notificationId) {
      console.log(`Opening notification: ${notificationId}`);
      toast({
        title: "Notification",
        description: `Opening notification ${notificationId}`,
      });
    } else {
      console.log('Opening notifications panel');
      toast({
        title: "Notifications",
        description: "Opening notifications panel",
      });
    }
  };

  const markNotificationAsRead = (notificationId: number) => {
    console.log(`Marking notification ${notificationId} as read`);
    setNotificationCount(Math.max(0, notificationCount - 1));
    toast({
      title: "Notification",
      description: "Marked as read",
    });
  };

  const markAllAsRead = () => {
    setNotificationCount(0);
    console.log('All notifications marked as read');
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
    });
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    toast({
      title: "Profile",
      description: "Profile menu opened",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Simulate search results
    if (value.length > 0) {
      const mockResults = [
        'Launch social media campaign',
        'Update press kit',
        'Finalize user testing',
        'Design new features',
        'Prepare financial report'
      ].filter(item => item.toLowerCase().includes(value.toLowerCase()));
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
    
    console.log(`Searching for: ${value}`);
  };

  const handleSearchSelect = (result: string) => {
    setSearchValue(result);
    setSearchResults([]);
    console.log(`Selected search result: ${result}`);
    toast({
      title: "Search",
      description: `Found: ${result}`,
    });
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Main menu toggled');
    toast({
      title: "Menu",
      description: isMenuOpen ? "Menu closed" : "Menu opened",
    });
  };

  const handleMenuAction = (action: string) => {
    console.log(`Menu action: ${action}`);
    toast({
      title: "Menu Action",
      description: `${action} selected`,
    });
  };

  const handleSpreadsheetAction = (action: string) => {
    console.log(`Spreadsheet action: ${action}`);
    toast({
      title: "Spreadsheet Action",
      description: `${action} executed`,
    });
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    toast({
      title: "Logout",
      description: "Logging out...",
    });
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    toast({
      title: "Settings",
      description: "Opening settings panel",
    });
  };

  const handleHelp = () => {
    console.log('Help clicked');
    toast({
      title: "Help",
      description: "Opening help documentation",
    });
  };

  const handleProfileAction = (action: string) => {
    console.log(`Profile action: ${action}`);
    toast({
      title: "Profile",
      description: `${action} selected`,
    });
  };

  return (
    <header className="flex items-center justify-between px-2 sm:px-4 py-2 w-full bg-white border-b border-gray-200 h-12 sm:h-14 shadow-sm">
      {/* Left side - Logo and breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuClick}
              className="hover:bg-gray-100 flex-shrink-0 transition-all duration-200"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {menuItems.map((item, index) => (
              <DropdownMenuItem key={index} onClick={item.action}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList className="flex items-center gap-1">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <BreadcrumbSeparator>
                    <ChevronRightIcon className="w-3 h-3 text-gray-400" />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleBreadcrumbClick(item.label, index);
                    }}
                    className={`flex items-center gap-1 text-sm font-medium hover:text-gray-900 transition-colors ${
                      item.active ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    {item.active && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-5 h-5 p-0 ml-1 hover:bg-gray-100"
                          >
                            <MoreHorizontalIcon className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Spreadsheet Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSpreadsheetAction('Rename')}>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSpreadsheetAction('Duplicate')}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSpreadsheetAction('Move')}>
                            <FolderOpen className="mr-2 h-4 w-4" />
                            Move to folder
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSpreadsheetAction('Download')}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSpreadsheetAction('Delete')} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Mobile breadcrumb - just show current page */}
        <div className="sm:hidden flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900 truncate">
            Financial Overview
          </span>
        </div>
      </div>

      {/* Right side - Search, notifications, and profile */}
      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        {/* Search field - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors relative">
          <SearchIcon className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search within sheet"
            value={searchValue}
            onChange={handleSearchChange}
            className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-sm text-gray-700 w-32 lg:w-40 placeholder:text-gray-500"
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onClick={() => handleSearchSelect(result)}
                >
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile search dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SearchIcon className="w-5 h-5 text-gray-600" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search Spreadsheet</DialogTitle>
              <DialogDescription>
                Search for content within this spreadsheet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Input
                placeholder="Enter search term..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full"
              />
              {searchResults.length > 0 && (
                <div className="space-y-1">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm rounded"
                      onClick={() => {
                        handleSearchSelect(result);
                        setIsSearchOpen(false);
                      }}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Notification bell with badge */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-600 text-white rounded-full border-2 border-white flex items-center justify-center p-0">
                  <span className="text-xs font-medium">{notificationCount}</span>
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className="flex flex-col items-start p-3 space-y-1"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">{notification.title}</span>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationAsRead(notification.id);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 p-0 h-auto"
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            {notifications.length === 0 && (
              <DropdownMenuItem disabled>
                No new notifications
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              onClick={handleProfileClick}
              className="flex items-center gap-2 px-1 sm:px-2 py-1.5 bg-white rounded-lg hover:bg-gray-100 transition-colors h-auto"
            >
              <Avatar className="w-6 h-6 sm:w-7 sm:h-7">
                <AvatarImage
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                  alt="John Doe"
                />
                <AvatarFallback className="bg-blue-500 text-white text-xs sm:text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col max-w-[120px] text-left">
                <div className="text-sm font-normal text-gray-900 truncate">
                  John Doe
                </div>
                <div className="text-xs text-gray-500 truncate">
                  john.doe@company.com
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileAction('Profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileAction('Account')}>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileAction('Preferences')}>
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleHelp}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};