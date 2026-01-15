import React, { lazy } from 'react';
import {
  HeroCard,
  LucideIcons,
  TableOfContents,
  type TableOfContentsItem,
  useAnchorScroll,
} from '../../../index';
import { LazyComponentSection } from '../../components';

// Lazy load component sections - Ordered by tocItems
const CoinCardSection = lazy(
  () => import('./blockchain-components-sections/CoinCardSection')
);
const LivePriceFeedSection = lazy(
  () => import('./blockchain-components-sections/LivePriceFeedSection')
);
const CollectionCardSection = lazy(
  () => import('./blockchain-components-sections/CollectionCardSection')
);
const CoinInfoCardSection = lazy(
  () => import('./blockchain-components-sections/CoinInfoCardSection')
);
const NFTGridSection = lazy(
  () => import('./blockchain-components-sections/NFTGridSection')
);
const CoinListBoxSection = lazy(
  () => import('./blockchain-components-sections/CoinListBoxSection')
);
const TransactionInfoSection = lazy(
  () => import('./blockchain-components-sections/TransactionInfoSection')
);
const CollectionSelectListSection = lazy(
  () => import('./blockchain-components-sections/CollectionSelectListSection')
);
const CurrencySwapIconsSection = lazy(
  () => import('./blockchain-components-sections/CurrencySwapIconsSection')
);

export function BlockchainComponents() {
  useAnchorScroll();

  // Table of contents items with categories
  const tocItems: TableOfContentsItem[] = [
    // Coins & Prices
    { id: 'coin-card', label: 'CoinCard', category: 'Coins & Prices' },
    {
      id: 'live-price-feed',
      label: 'LivePriceFeed',
      category: 'Coins & Prices',
    },
    { id: 'coin-info-card', label: 'CoinInfoCard', category: 'Coins & Prices' },
    { id: 'coin-listbox', label: 'CoinListBox', category: 'Coins & Prices' },
    {
      id: 'currency-swap-icons',
      label: 'CurrencySwapIcons',
      category: 'Coins & Prices',
    },
    // NFTs & Collections
    {
      id: 'collection-card',
      label: 'CollectionCard',
      category: 'NFTs & Collections',
    },
    { id: 'nft-grid', label: 'NFTGrid', category: 'NFTs & Collections' },
    {
      id: 'collection-select-list',
      label: 'CollectionSelectList',
      category: 'NFTs & Collections',
    },
    // Transactions
    {
      id: 'transaction-info',
      label: 'TransactionInfo',
      category: 'Transactions',
    },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
      {/* Hero Section */}
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

          {/* Lazy-loaded component sections */}
          <LazyComponentSection id="coin-card" component={CoinCardSection} />
          <LazyComponentSection
            id="live-price-feed"
            component={LivePriceFeedSection}
          />
          <LazyComponentSection
            id="collection-card"
            component={CollectionCardSection}
          />
          <LazyComponentSection
            id="coin-info-card"
            component={CoinInfoCardSection}
          />
          <LazyComponentSection id="nft-grid" component={NFTGridSection} />
          <LazyComponentSection
            id="coin-listbox"
            component={CoinListBoxSection}
          />
          <LazyComponentSection
            id="transaction-info"
            component={TransactionInfoSection}
          />
          <LazyComponentSection
            id="collection-select-list"
            component={CollectionSelectListSection}
          />
          <LazyComponentSection
            id="currency-swap-icons"
            component={CurrencySwapIconsSection}
        />
      </div>
      </TableOfContents>
    </div>
  );
}
