import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  GlassPanel,
  StateBadge,
  InlineNotice,
  MoneyText,
  SafeImage,
  StatCard,
} from '@e-burgos/tucu-ui';
import type { GlassPanelMaterial, StateBadgeTone } from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const materials: GlassPanelMaterial[] = ['thin', 'regular', 'thick', 'sub'];
const stateTones: StateBadgeTone[] = [
  'green',
  'orange',
  'red',
  'teal',
  'purple',
  'neutral',
];

const SurfacesSection: React.FC = () => (
  <>
    <HeroCard
      title="Surfaces"
      description="GlassPanel, StateBadge, InlineNotice, MoneyText, SafeImage and StatCard: token-driven building blocks for dashboards and order flows."
      icon={
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
          <LucideIcons.Layers className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
        </div>
      }
    />

    <CardContainer className="overflow-hidden">
      <CardTitle title="GlassPanel" className="mt-2 mb-2">
        <div className="w-full p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-linear-to-br from-indigo-400 to-pink-400 rounded-lg">
          {materials.map((material) => (
            <GlassPanel
              key={material}
              material={material}
              radius="card"
              elevation="card"
              className="p-4 text-center"
            >
              {material}
            </GlassPanel>
          ))}
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="StateBadge" className="mt-2 mb-2">
        <div className="w-full p-4 sm:p-6 flex flex-wrap gap-2">
          {stateTones.map((tone) => (
            <StateBadge key={tone} tone={tone} dot>
              {tone}
            </StateBadge>
          ))}
          <StateBadge tone="neutral" struck>
            Cancelled
          </StateBadge>
          <StateBadge tone="green" size="md">
            Paid
          </StateBadge>
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="InlineNotice" className="mt-2 mb-2">
        <div className="w-full p-4 sm:p-6 space-y-3">
          <InlineNotice
            tone="error"
            messages={['Email is required', 'Password is too short']}
          />
          <InlineNotice tone="success" messages="Changes saved" />
          <InlineNotice tone="info" messages="Your plan renews tomorrow" />
          <InlineNotice tone="warning" messages="Storage is almost full" />
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="MoneyText" className="mt-2 mb-2">
        <div className="w-full p-4 sm:p-6 space-y-2">
          <MoneyText value={1234.5} currency="ARS" variant="total" />
          <MoneyText value={980} currency="USD" variant="subtotal" />
          <MoneyText value={-80} currency="USD" variant="row" tone="auto" />
          <MoneyText value={42} currency="EUR" tone="auto" showSign />
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="SafeImage" className="mt-2 mb-2">
        <div className="w-full p-4 sm:p-6 flex gap-4">
          <SafeImage
            src="/missing-image.png"
            alt="Missing image falls back to an empty box"
            width={120}
            height={80}
            fallbackIcon={<LucideIcons.ImageOff className="w-6 h-6" />}
          />
          <SafeImage
            src="/another-missing-image.png"
            alt="Missing image without icon"
            width={120}
            height={80}
          />
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="StatCard" className="mt-2 mb-2">
        <div className="w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Revenue"
            value={<MoneyText value={48200} currency="USD" variant="total" />}
            tone="success"
            icon={<LucideIcons.TrendingUp className="w-5 h-5" />}
            trend={{ value: '12%', direction: 'up', label: 'vs last month' }}
          />
          <StatCard
            title="Open tickets"
            value="23"
            tone="warning"
            progress={{ value: 23, max: 40, label: 'Capacity' }}
          />
          <StatCard title="Loading" value="-" loading />
        </div>
      </CardTitle>
    </CardContainer>

    <Typography tag="h4" className="mt-4">
      Props
    </Typography>
    <AutoPropsTable componentName="GlassPanel" />
    <AutoPropsTable componentName="StateBadge" />
    <AutoPropsTable componentName="InlineNotice" />
    <AutoPropsTable componentName="MoneyText" />
    <AutoPropsTable componentName="SafeImage" />
    <AutoPropsTable componentName="StatCard" />

    <CardContainer className="overflow-hidden">
      <CardTitle title="Code Example" className="mt-2 mb-2">
        <div className="w-full p-4 sm:p-6">
          <CodeBlock
            language="tsx"
            code={`import {
  GlassPanel, StateBadge, InlineNotice, MoneyText, SafeImage, StatCard,
} from '@e-burgos/tucu-ui';

<GlassPanel material="regular" radius="card" elevation="card">...</GlassPanel>

<StateBadge tone="green" dot>Paid</StateBadge>

<InlineNotice tone="error" messages={['Email is required']} />

<MoneyText value={1234.5} currency="ARS" variant="total" />

<SafeImage src={url} alt="Product" fallbackIcon={<ImageOff />} />

<StatCard
  title="Revenue"
  value="$48,200"
  tone="success"
  trend={{ value: '12%', direction: 'up' }}
/>`}
          />
        </div>
      </CardTitle>
    </CardContainer>
  </>
);

export default SurfacesSection;
