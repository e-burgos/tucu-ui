import { lazy } from 'react';
import { HeroCard, LucideIcons } from '@e-burgos/tucu-ui';
import { DynamicSectionsPage, type SectionConfig } from '@e-burgos/tucu-ui';

const sections: SectionConfig[] = [
  // Coins & Prices
  {
    id: 'coin-card',
    label: 'CoinCard',
    category: 'Coins & Prices',
    component: lazy(
      () => import('./blockchain-components-sections/CoinCardSection')
    ),
  },
  {
    id: 'live-price-feed',
    label: 'LivePriceFeed',
    category: 'Coins & Prices',
    component: lazy(
      () => import('./blockchain-components-sections/LivePriceFeedSection')
    ),
  },
  {
    id: 'coin-info-card',
    label: 'CoinInfoCard',
    category: 'Coins & Prices',
    component: lazy(
      () => import('./blockchain-components-sections/CoinInfoCardSection')
    ),
  },
  {
    id: 'coin-listbox',
    label: 'CoinListBox',
    category: 'Coins & Prices',
    component: lazy(
      () => import('./blockchain-components-sections/CoinListBoxSection')
    ),
  },
  {
    id: 'currency-swap-icons',
    label: 'CurrencySwapIcons',
    category: 'Coins & Prices',
    component: lazy(
      () => import('./blockchain-components-sections/CurrencySwapIconsSection')
    ),
  },
  // NFTs & Collections
  {
    id: 'collection-card',
    label: 'CollectionCard',
    category: 'NFTs & Collections',
    component: lazy(
      () => import('./blockchain-components-sections/CollectionCardSection')
    ),
  },
  {
    id: 'nft-grid',
    label: 'NFTGrid',
    category: 'NFTs & Collections',
    component: lazy(
      () => import('./blockchain-components-sections/NFTGridSection')
    ),
  },
  {
    id: 'collection-select-list',
    label: 'CollectionSelectList',
    category: 'NFTs & Collections',
    component: lazy(
      () =>
        import('./blockchain-components-sections/CollectionSelectListSection')
    ),
  },
  // Transactions
  {
    id: 'transaction-info',
    label: 'TransactionInfo',
    category: 'Transactions',
    component: lazy(
      () => import('./blockchain-components-sections/TransactionInfoSection')
    ),
  },
];

export function BlockchainComponents() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
        <HeroCard
          title="Blockchain Components"
          description="Specialized components for DeFi applications, NFT marketplaces, crypto wallets, and Web3 interfaces. Built with modern blockchain development in mind."
          githubButton
          getStartedButton
          docsButton="blockchain-components"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
              <LucideIcons.Coins className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default BlockchainComponents;
