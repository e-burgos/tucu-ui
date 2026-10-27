import { Card } from '@e-burgos/tucu-ui';
import { DashboardChart } from '../sections/dashboard-chart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Card title="Monthly revenue" description="Server page, client chart">
        <DashboardChart />
      </Card>
    </div>
  );
}
