import { CardContainer, Typography } from '@e-burgos/tucu-ui';

interface AccountStat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface AccountInformationCardProps {
  stats: AccountStat[];
}

export const AccountInformationCard = ({
  stats,
}: AccountInformationCardProps) => {
  return (
    <CardContainer className="flex flex-col h-auto p-4 border border-gray-200 dark:border-gray-700">
      <Typography tag="h3" className="text-xl font-bold mb-4">
        Account Information
      </Typography>
      <div className="flex flex-col space-y-2 shrink-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-2 rounded-lg bg-white dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                {stat.icon}
              </div>
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                {stat.label}
              </Typography>
            </div>
            <Typography
              tag="p"
              className="text-sm font-semibold text-gray-900 dark:text-white"
            >
              {stat.value}
            </Typography>
          </div>
        ))}
      </div>
    </CardContainer>
  );
};
