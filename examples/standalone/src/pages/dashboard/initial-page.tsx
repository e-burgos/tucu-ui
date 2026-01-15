import {
  Button,
  CardContainer,
  Typography,
  ReactRouter,
  LucideIcons,
  BasicTable,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '../../router/routes-config';

const InitialPage = () => {
  const navigate = ReactRouter.useNavigate();

  // Metrics/KPI Cards Data
  const metrics = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12.5%',
      isPositive: true,
      icon: <LucideIcons.Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8.2%',
      isPositive: true,
      icon: <LucideIcons.DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '-3.1%',
      isPositive: false,
      icon: <LucideIcons.ShoppingCart className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Growth Rate',
      value: '24.8%',
      change: '+5.3%',
      isPositive: true,
      icon: <LucideIcons.TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  // Recent Activity Table Data
  const recentActivityColumns = [
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
    },
    {
      key: 'date',
      label: 'Date',
      render: (value: unknown) => (
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          {String(value)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => {
        const status = String(value);
        const isActive = status === 'Active';
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isActive
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  const recentActivityData = [
    {
      user: 'John Doe',
      action: 'Created new order',
      date: '2024-01-15 10:30',
      status: 'Active',
    },
    {
      user: 'Jane Smith',
      action: 'Updated profile',
      date: '2024-01-15 09:15',
      status: 'Active',
    },
    {
      user: 'Bob Johnson',
      action: 'Completed purchase',
      date: '2024-01-15 08:45',
      status: 'Active',
    },
    {
      user: 'Alice Williams',
      action: 'Cancelled subscription',
      date: '2024-01-14 16:20',
      status: 'Inactive',
    },
    {
      user: 'Charlie Brown',
      action: 'Updated settings',
      date: '2024-01-14 14:10',
      status: 'Active',
    },
  ];

  // Quick Actions
  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: <LucideIcons.UserPlus className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600',
      onClick: () => navigate(ROUTES.Dashboard.RecentActivity),
    },
    {
      title: 'View Reports',
      description: 'Access analytics and reports',
      icon: <LucideIcons.BarChart className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-600',
      onClick: () => navigate(ROUTES.Dashboard.RecentActivity),
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: <LucideIcons.Settings className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-600',
      onClick: () => navigate(ROUTES.Dashboard.RecentActivity),
    },
    {
      title: 'Notifications',
      description: 'View all notifications',
      icon: <LucideIcons.Bell className="w-5 h-5" />,
      color: 'from-orange-500 to-red-600',
      onClick: () => navigate(ROUTES.Dashboard.RecentActivity),
    },
  ];

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <Typography
          tag="h1"
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Dashboard
        </Typography>
        <Typography tag="p" className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your business today.
        </Typography>
      </div>

      {/* Metrics/KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {metrics.map((metric, index) => (
          <CardContainer
            key={index}
            className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${metric.color} flex items-center justify-center text-white shadow-lg`}
              >
                {metric.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  metric.isPositive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {metric.isPositive ? (
                  <LucideIcons.ArrowUp className="w-4 h-4" />
                ) : (
                  <LucideIcons.ArrowDown className="w-4 h-4" />
                )}
                {metric.change}
              </div>
            </div>
            <Typography
              tag="h3"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
            >
              {metric.value}
            </Typography>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              {metric.title}
            </Typography>
          </CardContainer>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Typography
              tag="h3"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
            >
              Revenue Overview
            </Typography>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <LucideIcons.Calendar className="w-4 h-4" />
              <span>Last 7 days</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 80, 45, 90, 70, 85, 95].map((height, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full bg-linear-to-t from-brand to-indigo-600 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${(height / 100) * 256}px`,
                    minHeight: '20px',
                  }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </CardContainer>

        {/* User Growth Chart */}
        <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Typography
              tag="h3"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
            >
              User Growth
            </Typography>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <LucideIcons.Users className="w-4 h-4" />
              <span>Last 30 days</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.75)}`}
                  className="text-brand"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Typography
                    tag="p"
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    75%
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-600 dark:text-gray-400"
                  >
                    Growth
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2">
          <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <Typography
                tag="h3"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
              >
                Recent Activity
              </Typography>
              <Button
                variant="ghost"
                color="primary"
                size="small"
                onClick={() => navigate(ROUTES.Dashboard.RecentActivity)}
              >
                View All
                <LucideIcons.ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <BasicTable
              columns={recentActivityColumns}
              data={recentActivityData}
              hoverable
              striped
            />
          </CardContainer>
        </div>

        {/* Quick Actions */}
        <div>
          <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
            <Typography
              tag="h3"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Quick Actions
            </Typography>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  onClick={action.onClick}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-linear-to-br ${action.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {action.icon}
                    </div>
                    <div className="grow">
                      <Typography
                        tag="h4"
                        className="font-semibold text-gray-900 dark:text-white"
                      >
                        {action.title}
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {action.description}
                      </Typography>
                    </div>
                    <LucideIcons.ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </CardContainer>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Status */}
        <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
          <Typography
            tag="h3"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
          >
            System Status
          </Typography>
          <div className="space-y-4">
            {[
              { label: 'Server Status', status: 'Online', isOnline: true },
              { label: 'Database', status: 'Connected', isOnline: true },
              { label: 'API Service', status: 'Running', isOnline: true },
              { label: 'Cache', status: 'Active', isOnline: true },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800"
              >
                <Typography
                  tag="p"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {item.label}
                </Typography>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.isOnline ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <Typography
                    tag="p"
                    className={`text-sm ${
                      item.isOnline
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.status}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </CardContainer>

        {/* Recent Updates */}
        <CardContainer className="p-6 border border-gray-200 dark:border-gray-700">
          <Typography
            tag="h3"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Recent Updates
          </Typography>
          <div className="space-y-4">
            {[
              {
                title: 'New feature released',
                description: 'User management v2.0 is now available',
                time: '2 hours ago',
                icon: <LucideIcons.Sparkles className="w-4 h-4" />,
              },
              {
                title: 'System maintenance',
                description: 'Scheduled maintenance completed successfully',
                time: '5 hours ago',
                icon: <LucideIcons.Wrench className="w-4 h-4" />,
              },
              {
                title: 'Security update',
                description: 'Latest security patches applied',
                time: '1 day ago',
                icon: <LucideIcons.Shield className="w-4 h-4" />,
              },
            ].map((update, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800"
              >
                <div className="w-8 h-8 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand shrink-0">
                  {update.icon}
                </div>
                <div className="grow">
                  <Typography
                    tag="h4"
                    className="text-sm font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    {update.title}
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-600 dark:text-gray-400 mb-1"
                  >
                    {update.description}
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-500 dark:text-gray-500"
                  >
                    {update.time}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default InitialPage;
