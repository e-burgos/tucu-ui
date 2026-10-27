import React, { useState } from 'react';
import {
  Alert,
  Badge,
  CardContainer,
  CardTitle,
  CodeBlock,
  DataTable,
  HeroCard,
  LucideIcons,
  Typography,
  type TanstackTable,
} from '@e-burgos/tucu-ui';

interface OrderRecord {
  id: string;
  customer: string;
  email: string;
  status: 'Paid' | 'Pending' | 'Refunded';
  total: number;
}

const orders: OrderRecord[] = [
  { id: 'ORD-1001', customer: 'Ada Lovelace', email: 'ada@example.com', status: 'Paid', total: 240 },
  { id: 'ORD-1002', customer: 'Alan Turing', email: 'alan@example.com', status: 'Pending', total: 89.5 },
  { id: 'ORD-1003', customer: 'Grace Hopper', email: 'grace@example.com', status: 'Paid', total: 1320 },
  { id: 'ORD-1004', customer: 'Linus Torvalds', email: 'linus@example.com', status: 'Refunded', total: 49 },
  { id: 'ORD-1005', customer: 'Margaret Hamilton', email: 'margaret@example.com', status: 'Paid', total: 610 },
];

const columns: TanstackTable.ColumnDef<OrderRecord>[] = [
  { id: 'customer', accessorKey: 'customer', header: 'Customer', size: 180 },
  { id: 'email', accessorKey: 'email', header: 'Email', size: 220 },
  { id: 'id', accessorKey: 'id', header: 'Order', size: 120 },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    cell: (info) => {
      const value = info.getValue() as OrderRecord['status'];
      const color =
        value === 'Paid' ? 'success' : value === 'Pending' ? 'warning' : 'danger';
      return (
        <Badge variant="soft" color={color}>
          {value}
        </Badge>
      );
    },
  },
  {
    id: 'total',
    accessorKey: 'total',
    header: 'Total',
    size: 110,
    cell: (info) => `$${(info.getValue() as number).toFixed(2)}`,
  },
];

const usageCode = `<DataTable
  tableId="orders"
  columns={columns}
  data={orders}
  pagination={{ showPagination: true, pageSize: 5 }}
  mobileCards={{
    breakpoint: 'md',
    titleColumnId: 'customer',
    subtitleColumnId: 'email',
    hiddenColumnIds: ['id'],
  }}
/>`;

const MobileCardsSection: React.FC = () => {
  const [narrow, setNarrow] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Mobile Cards"
        description="Render each row as a card below a breakpoint, with title, subtitle, labelled fields, row actions, selection and compact pagination."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer className="p-6">
        <CardTitle title="Interactive demo" className="mb-4">
          <Typography className="text-sm text-foreground/70 mb-4">
            <code>mobileCards</code> accepts <code>true</code> or an options
            object. Both layouts are rendered and the switch is done with CSS
            against the <strong>viewport</strong> width, not the container, so
            server and client markup match. The narrow frame below only
            simulates a phone when the window itself is narrower than the
            breakpoint; use the toggle to constrain the frame width.
          </Typography>
          <label className="mb-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={narrow}
              onChange={(event) => setNarrow(event.target.checked)}
            />
            Constrain preview to 360px
          </label>
          <div
            className="overflow-auto rounded-xl border border-border"
            style={{ maxWidth: narrow ? 360 : undefined }}
          >
            <DataTable
              tableId="mobile-cards-demo-table"
              columns={columns}
              data={orders}
              pagination={{ showPagination: true, pageSize: 3 }}
              mobileCards={{
                breakpoint: 'lg',
                titleColumnId: 'customer',
                subtitleColumnId: 'email',
                hiddenColumnIds: ['id'],
              }}
              setCurrentRow={() => undefined}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="p-6">
        <CardTitle title="Usage" className="mb-4">
          <CodeBlock language="tsx" code={usageCode} />
          <Alert variant="info" className="mt-4">
            <div className="text-sm">
              Options: <code>breakpoint</code> (<code>sm</code> |{' '}
              <code>md</code> | <code>lg</code>, default <code>md</code>),{' '}
              <code>titleColumnId</code>, <code>subtitleColumnId</code>,{' '}
              <code>hiddenColumnIds</code>, <code>className</code>. Tokens:{' '}
              <code>--tucu-datatable-card-*</code>.
            </div>
          </Alert>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default MobileCardsSection;
