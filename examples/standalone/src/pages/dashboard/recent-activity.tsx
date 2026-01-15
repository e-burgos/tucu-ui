import { useState } from 'react';
import {
  Button,
  CardContainer,
  Typography,
  ReactRouter,
  LucideIcons,
  BasicTable,
  Input,
  Select,
  TableColumn,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '../../router/routes-config';

interface ActivityItem {
  user: string;
  action: string;
  date: string;
  status: string;
  type: string;
  details: string;
}

const RecentActivity = () => {
  const navigate = ReactRouter.useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Extended Activity Data
  const allActivityData: ActivityItem[] = [
    {
      user: 'John Doe',
      action: 'Created new order',
      date: '2024-01-15 10:30',
      status: 'Active',
      type: 'Order',
      details: 'Order #12345 - $299.99',
    },
    {
      user: 'Jane Smith',
      action: 'Updated profile',
      date: '2024-01-15 09:15',
      status: 'Active',
      type: 'Profile',
      details: 'Changed email address',
    },
    {
      user: 'Bob Johnson',
      action: 'Completed purchase',
      date: '2024-01-15 08:45',
      status: 'Active',
      type: 'Purchase',
      details: 'Payment processed successfully',
    },
    {
      user: 'Alice Williams',
      action: 'Cancelled subscription',
      date: '2024-01-14 16:20',
      status: 'Inactive',
      type: 'Subscription',
      details: 'Premium plan cancelled',
    },
    {
      user: 'Charlie Brown',
      action: 'Updated settings',
      date: '2024-01-14 14:10',
      status: 'Active',
      type: 'Settings',
      details: 'Notification preferences changed',
    },
    {
      user: 'Diana Prince',
      action: 'Created new order',
      date: '2024-01-14 12:30',
      status: 'Active',
      type: 'Order',
      details: 'Order #12346 - $149.99',
    },
    {
      user: 'Edward Norton',
      action: 'Failed login attempt',
      date: '2024-01-14 11:15',
      status: 'Inactive',
      type: 'Security',
      details: 'Invalid credentials',
    },
    {
      user: 'Fiona Apple',
      action: 'Completed purchase',
      date: '2024-01-14 09:20',
      status: 'Active',
      type: 'Purchase',
      details: 'Payment processed successfully',
    },
    {
      user: 'George Clooney',
      action: 'Updated profile',
      date: '2024-01-13 18:45',
      status: 'Active',
      type: 'Profile',
      details: 'Changed phone number',
    },
    {
      user: 'Helen Mirren',
      action: 'Created new order',
      date: '2024-01-13 15:30',
      status: 'Active',
      type: 'Order',
      details: 'Order #12347 - $89.99',
    },
    {
      user: 'Ian McKellen',
      action: 'Cancelled subscription',
      date: '2024-01-13 13:20',
      status: 'Inactive',
      type: 'Subscription',
      details: 'Basic plan cancelled',
    },
    {
      user: 'Julia Roberts',
      action: 'Updated settings',
      date: '2024-01-13 10:15',
      status: 'Active',
      type: 'Settings',
      details: 'Language changed to Spanish',
    },
  ];

  // Filter data based on search and filters
  const filteredData = allActivityData.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    const matchesType = typeFilter === 'all' || item.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Statistics
  const stats = {
    total: allActivityData.length,
    active: allActivityData.filter((item) => item.status === 'Active').length,
    inactive: allActivityData.filter((item) => item.status === 'Inactive')
      .length,
    filtered: filteredData.length,
  };

  // Table columns
  const activityColumns = [
    {
      key: 'user',
      label: 'User',
      render: (value: unknown) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
            <LucideIcons.User className="w-4 h-4 text-brand" />
          </div>
          <span className="font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      render: (value: unknown, row: ActivityItem) => (
        <div>
          <Typography
            tag="p"
            className="font-medium text-gray-900 dark:text-white"
          >
            {String(value)}
          </Typography>
          <Typography
            tag="p"
            className="text-xs text-gray-600 dark:text-gray-400"
          >
            {row.details}
          </Typography>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => {
        const typeColors: Record<string, string> = {
          Order:
            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
          Purchase:
            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          Profile:
            'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
          Subscription:
            'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
          Settings:
            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
          Security:
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              typeColors[String(value)] || typeColors.Settings
            }`}
          >
            {String(value)}
          </span>
        );
      },
    },
    {
      key: 'date',
      label: 'Date',
      render: (value: unknown) => (
        <div>
          <Typography tag="p" className="text-sm text-gray-900 dark:text-white">
            {String(value).split(' ')[0]}
          </Typography>
          <Typography
            tag="p"
            className="text-xs text-gray-600 dark:text-gray-400"
          >
            {String(value).split(' ')[1]}
          </Typography>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => {
        const isActive = value === 'Active';
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isActive
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            {String(value)}
          </span>
        );
      },
    },
  ];

  const statusOptions = [
    { value: 'all', name: 'All Status' },
    { value: 'Active', name: 'Active' },
    { value: 'Inactive', name: 'Inactive' },
  ];

  const typeOptions = [
    { value: 'all', name: 'All Types' },
    { value: 'Order', name: 'Order' },
    { value: 'Purchase', name: 'Purchase' },
    { value: 'Profile', name: 'Profile' },
    { value: 'Subscription', name: 'Subscription' },
    { value: 'Settings', name: 'Settings' },
    { value: 'Security', name: 'Security' },
  ];

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Typography
              tag="h1"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Recent Activity
            </Typography>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Monitor and track all user activities across the platform
            </Typography>
          </div>
          <Button
            variant="ghost"
            color="primary"
            size="medium"
            onClick={() => navigate(ROUTES.Dashboard.Base)}
          >
            <LucideIcons.ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <LucideIcons.Activity className="w-6 h-6" />
            </div>
          </div>
          <Typography
            tag="h3"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
          >
            {stats.total}
          </Typography>
          <Typography
            tag="p"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Total Activities
          </Typography>
        </CardContainer>

        <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg">
              <LucideIcons.CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <Typography
            tag="h3"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
          >
            {stats.active}
          </Typography>
          <Typography
            tag="p"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Active Activities
          </Typography>
        </CardContainer>

        <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white shadow-lg">
              <LucideIcons.XCircle className="w-6 h-6" />
            </div>
          </div>
          <Typography
            tag="h3"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
          >
            {stats.inactive}
          </Typography>
          <Typography
            tag="p"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Inactive Activities
          </Typography>
        </CardContainer>

        <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <LucideIcons.Filter className="w-6 h-6" />
            </div>
          </div>
          <Typography
            tag="h3"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
          >
            {stats.filtered}
          </Typography>
          <Typography
            tag="p"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Filtered Results
          </Typography>
        </CardContainer>
      </div>

      {/* Filters Section */}
      <CardContainer className="p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <LucideIcons.Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <Typography
            tag="h3"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Filters
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Search"
              placeholder="Search by user, action, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<LucideIcons.Search className="w-4 h-4" />}
            />
          </div>
          <div>
            <Select
              label="Status"
              options={statusOptions}
              selectedOption={
                statusOptions.find((opt) => opt.value === statusFilter) ||
                statusOptions[0]
              }
              onSelect={(value) => setStatusFilter(value as string)}
            />
          </div>
          <div>
            <Select
              label="Type"
              options={typeOptions}
              selectedOption={
                typeOptions.find((opt) => opt.value === typeFilter) ||
                typeOptions[0]
              }
              onSelect={(value) => setTypeFilter(value as string)}
            />
          </div>
        </div>
        {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              color="primary"
              size="small"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              <LucideIcons.X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Showing {filteredData.length} of {stats.total} activities
            </Typography>
          </div>
        )}
      </CardContainer>

      {/* Activity Table */}
      <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <Typography
            tag="h3"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Activity Log
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              color="primary"
              size="small"
              onClick={() => {
                // Export functionality
              }}
            >
              <LucideIcons.Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="ghost"
              color="primary"
              size="small"
              onClick={() => {
                // Refresh functionality
              }}
            >
              <LucideIcons.RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        {filteredData.length > 0 ? (
          <BasicTable
            columns={
              activityColumns as unknown as TableColumn<
                Record<string, unknown>
              >[]
            }
            data={filteredData as unknown as Record<string, unknown>[]}
            hoverable
            striped
          />
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <LucideIcons.Search className="w-8 h-8 text-gray-400" />
            </div>
            <Typography
              tag="p"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              No activities found
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Try adjusting your filters to see more results
            </Typography>
            <Button
              variant="ghost"
              color="primary"
              size="small"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </CardContainer>
    </div>
  );
};

export default RecentActivity;
