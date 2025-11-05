import {
  CardContainer,
  CardTitle,
  Badge,
  Typography,
  LucideIcons,
  CoinCard,
  LivePriceFeed,
  CollectionCard,
  Alert,
  CodeBlock,
} from 'tucu-ui';

import collection1Img from '../../assets/images/collection/collection-1.jpg';
import avatar1Img from '../../assets/images/avatar/1.png';
import bitcoinImg from '../../assets/images/coin/bitcoin.svg';
import ethereumImg from '../../assets/images/coin/tether.svg';
import cardanoImg from '../../assets/images/coin/cardano.svg';
import HeroPage from '../../components/HeroPage';

export function Blockchain() {
  const priceData = [
    { name: 1, value: 45000 },
    { name: 2, value: 45200 },
    { name: 3, value: 44800 },
    { name: 4, value: 45100 },
    { name: 5, value: 45300 },
  ];

  const collectionData = {
    id: 'collection-1',
    name: 'Crypto Punks',
    slug: 'crypto-punks',
    title: 'Crypto Punks Collection',
    cover_image: collection1Img,
    number_of_artwork: 42,
    user: {
      avatar: avatar1Img,
      name: 'CryptoPunk Studio',
      slug: 'cryptopunk-studio',
    },
  };

  const componentCategories = [
    {
      name: 'Cryptocurrency Components',
      description: 'Components for displaying cryptocurrency data and prices',
      icon: (
        <LucideIcons.Coins className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-cyan-500 to-sky-500',
      components: [
        'CoinCard',
        'CoinInfoCard',
        'CoinListBox',
        'LivePriceFeed',
        'CurrencySwapIcons',
      ],
    },
    {
      name: 'NFT Components',
      description: 'Components for NFT marketplaces and collections',
      icon: (
        <LucideIcons.Image className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      components: ['NFTGrid', 'CollectionCard', 'CollectionSelectList'],
    },
    {
      name: 'Transaction Components',
      description: 'Components for displaying transaction information',
      icon: (
        <LucideIcons.Receipt className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-green-500 via-emerald-500 to-teal-500',
      components: ['TransactionInfo'],
    },
  ];

  const blockchainFeatures = [
    {
      title: 'DeFi Integration',
      description:
        'Built-in support for decentralized finance protocols and interfaces',
      icon: (
        <LucideIcons.TrendingUp className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-cyan-500 to-sky-500',
    },
    {
      title: 'NFT Marketplace',
      description: 'Complete toolkit for building NFT marketplace interfaces',
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-violet-500 to-indigo-500',
    },
    {
      title: 'Crypto Wallets',
      description:
        'Wallet integration components for seamless Web3 connectivity',
      icon: (
        <LucideIcons.Wallet className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
    },
    {
      title: 'Real-time Data',
      description: 'Live price feeds and real-time blockchain data integration',
      icon: (
        <LucideIcons.Activity className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-green-500 via-emerald-500 to-teal-500',
    },
  ];

  const supportedCurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', color: 'bg-orange-500' },
    { symbol: 'ETH', name: 'Ethereum', color: 'bg-blue-500' },
    { symbol: 'USDT', name: 'Tether', color: 'bg-green-500' },
    { symbol: 'BNB', name: 'Binance Coin', color: 'bg-yellow-500' },
    { symbol: 'USDC', name: 'USD Coin', color: 'bg-blue-600' },
    { symbol: 'ADA', name: 'Cardano', color: 'bg-indigo-500' },
    { symbol: 'DOGE', name: 'Dogecoin', color: 'bg-yellow-600' },
  ];

  const bestPractices = [
    {
      category: 'Data Handling',
      items: [
        'Always validate cryptocurrency data before rendering',
        'Handle loading states appropriately',
        'Implement error boundaries for external data',
        'Use proper number formatting for currency values',
      ],
    },
    {
      category: 'User Experience',
      items: [
        'Provide clear visual feedback for state changes',
        'Use consistent iconography across components',
        'Implement proper loading indicators',
        'Handle edge cases gracefully',
      ],
    },
    {
      category: 'Performance',
      items: [
        'Lazy load images in NFT components',
        'Optimize chart rendering with proper libraries',
        'Minimize re-renders through proper prop handling',
        'Consider rate limiting for API calls',
      ],
    },
    {
      category: 'Security',
      items: [
        'Validate all external data sources',
        'Use secure connections for price feeds',
        'Implement proper error handling',
        'Format large numbers appropriately',
      ],
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Blockchain Components"
        description="Specialized components for DeFi applications, NFT marketplaces, crypto wallets, and Web3 interfaces. Built with modern blockchain development in mind."
        githubButton
        getStartedButton
        docsButton="blockchain-components"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.Coins className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Important Notice */}
      <section className="space-y-8">
        <Alert variant="success">
          <LucideIcons.Info className="h-4 w-4" />
          <div>
            <div className="font-semibold">Web3 Ready Components</div>
            <div>
              These components are designed for blockchain applications and
              include built-in support for cryptocurrency data, NFT displays,
              and transaction interfaces.
            </div>
          </div>
        </Alert>
      </section>

      {/* Component Categories */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Component Categories
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Comprehensive blockchain UI components for different use cases
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {componentCategories.map((category, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${category.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {category.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {category.name}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {category.description}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {category.components.map((component, componentIndex) => (
                    <Badge
                      key={componentIndex}
                      variant="outline"
                      className="text-xs"
                    >
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Blockchain Features */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Blockchain Features
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Advanced capabilities for modern blockchain applications
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {blockchainFeatures.map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {feature.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {feature.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {feature.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* CoinCard Component */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="CoinCard Component" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 via-orange-500 to-amber-500 shadow-md">
                  <LucideIcons.Coins className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Cryptocurrency Display Cards
                </Typography>
              </div>

              <div className="space-y-4">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <LucideIcons.Info className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        What is it?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Display cryptocurrency information in a clean, card
                        format with customizable background colors, price
                        changes, and balance information.
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Code className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        How is it implemented?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Uses props for <code>id</code>, <code>name</code>,{' '}
                        <code>symbol</code>, <code>logo</code>,{' '}
                        <code>balance</code>, <code>usdBalance</code>,{' '}
                        <code>change</code>, and <code>isChangePositive</code>{' '}
                        to display comprehensive coin data.
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Play className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        How is it used?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Perfect for crypto portfolio dashboards, wallet
                        interfaces, and trading applications.
                      </Typography>
                    </div>
                  </li>
                </ul>

                <Typography tag="h4" className="font-semibold text-lg mt-6">
                  Code Example
                </Typography>
                <CodeBlock
                  code={`<CoinCard
  id="bitcoin"
  name="Bitcoin"
  symbol="BTC"
  logo="/icons/bitcoin.svg"
  balance="1.25"
  usdBalance="45,000"
  change="+2.5%"
  isChangePositive={true}
  color="#FDEDD4"
/>`}
                  language="tsx"
                />

                <Typography tag="h4" className="font-semibold text-lg mt-6">
                  Live Demo
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <CoinCard
                    id="bitcoin"
                    name="Bitcoin"
                    symbol="BTC"
                    logo={bitcoinImg}
                    balance="1.25"
                    usdBalance="45,000"
                    change="+2.5%"
                    isChangePositive={true}
                    color="#FDEDD4"
                  />
                  <CoinCard
                    id="tether"
                    name="Tether"
                    symbol="USDT"
                    logo={ethereumImg}
                    balance="10.5"
                    usdBalance="33,600"
                    change="-1.2%"
                    isChangePositive={false}
                    color="#E1F5FE"
                  />
                  <CoinCard
                    id="cardano"
                    name="Cardano"
                    symbol="ADA"
                    logo={cardanoImg}
                    balance="1,500"
                    usdBalance="975"
                    change="+5.8%"
                    isChangePositive={true}
                    color="#E8F5E8"
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* LivePriceFeed Component */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="LivePriceFeed Component" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-md">
                  <LucideIcons.TrendingUp className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Real-time Price Display
                </Typography>
              </div>

              <div className="space-y-4">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <LucideIcons.Info className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        What is it?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Real-time price display with integrated chart
                        visualization for cryptocurrency price tracking.
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Code className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        How is it implemented?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Combines price data with chart visualization using{' '}
                        <code>prices</code> array for historical data and
                        real-time updates.
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Play className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        How is it used?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Ideal for trading interfaces, portfolio tracking, and
                        price monitoring dashboards.
                      </Typography>
                    </div>
                  </li>
                </ul>

                <Typography tag="h4" className="font-semibold text-lg mt-6">
                  Code Example
                </Typography>
                <CodeBlock
                  code={`const priceData = [
  { name: 1, value: 45000 },
  { name: 2, value: 45200 },
  { name: 3, value: 44800 },
  { name: 4, value: 45100 },
];

<LivePriceFeed
  id="bitcoin"
  name="Bitcoin"
  symbol="BTC"
  icon={<Bitcoin />}
  balance="1.25"
  usdBalance="45,000"
  change="+2.5%"
  isChangePositive={true}
  prices={priceData}
/>`}
                  language="tsx"
                />

                <Typography tag="h4" className="font-semibold text-lg mt-6">
                  Live Demo
                </Typography>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <LivePriceFeed
                    id="bitcoin"
                    name="Bitcoin"
                    symbol="BTC"
                    icon={<LucideIcons.Bitcoin className="w-6 h-6" />}
                    balance="1.25"
                    usdBalance="45,000"
                    change="+2.5%"
                    isChangePositive={true}
                    prices={priceData}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* CollectionCard Component */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="CollectionCard Component" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 shadow-md">
                  <LucideIcons.Image className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  NFT Collection Display
                </Typography>
              </div>

              <div className="space-y-4">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <LucideIcons.Info className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        What is it?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        NFT collection preview with statistics, cover image, and
                        creator information for marketplace interfaces.
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Code className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        How is it implemented?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Uses collection object with <code>id</code>,{' '}
                        <code>name</code>, <code>cover_image</code>,{' '}
                        <code>number_of_artwork</code>, and <code>user</code>{' '}
                        information.
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <LucideIcons.Play className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                    <div>
                      <Typography tag="span" className="font-semibold block">
                        How is it used?
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Perfect for NFT marketplaces, collection browsers, and
                        artist portfolios.
                      </Typography>
                    </div>
                  </li>
                </ul>

                <Typography tag="h4" className="font-semibold text-lg mt-6">
                  Code Example
                </Typography>
                <CodeBlock
                  code={`const collectionData = {
  id: 'bayc',
  name: 'BAYC',
  slug: 'bored-ape-yacht-club',
  title: 'Bored Ape Yacht Club',
  cover_image: '/collections/bayc-banner.jpg',
  number_of_artwork: 10000,
   user: {
    avatar: '/avatars/bayc-creator.jpg',
    name: 'Yuga Labs',
    slug: 'yuga-labs',
  },
};

<CollectionCard item={collectionData} className="w-full max-w-sm" />`}
                  language="tsx"
                />

                <Typography tag="h4" className="font-semibold text-lg mt-6">
                  Live Demo
                </Typography>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="max-w-sm">
                    <CollectionCard item={collectionData} />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Supported Currencies */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Supported Currencies" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500 shadow-md">
                  <LucideIcons.DollarSign className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Cryptocurrency Support
                </Typography>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
                {supportedCurrencies.map((currency, index) => (
                  <div key={index} className="text-center space-y-3">
                    <div className="relative group">
                      <div
                        className={`w-16 h-16 rounded-xl ${currency.color} mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200 flex items-center justify-center`}
                      >
                        <Typography
                          tag="span"
                          className="text-white font-bold text-sm"
                        >
                          {currency.symbol}
                        </Typography>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="space-y-1">
                      <Typography tag="h4" className="font-semibold text-sm">
                        {currency.symbol}
                      </Typography>
                      <Typography
                        tag="span"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        {currency.name}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Best Practices */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Best Practices
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Guidelines for optimal blockchain component implementation
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {bestPractices.map((practice, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-md">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="font-semibold text-lg">
                    {practice.category}
                  </Typography>
                </div>
                <ul className="space-y-2">
                  {practice.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <LucideIcons.ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Integration Examples */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Integration Examples" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 shadow-md">
                  <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Real-world Usage
                </Typography>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography tag="h4" className="font-semibold">
                    1. Crypto Portfolio Dashboard
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Combine multiple components to create a comprehensive crypto
                    portfolio view.
                  </Typography>
                  <CodeBlock
                    code={`function CryptoPortfolio() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CoinCard {...bitcoinData} image={bitcoinImg} />
      <CoinCard {...ethereumData} image={ethereumImg} />
      <CoinCard {...cardanoData} image={cardanoImg} />
      
      <div className="col-span-full">
        <LivePriceFeed {...livePriceData} image={livePriceImg} />
      </div>
    </div>
  );
}`}
                    language="tsx"
                  />
                </div>

                <div className="space-y-3">
                  <Typography tag="h4" className="font-semibold">
                    2. NFT Marketplace
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Build NFT marketplace interfaces with collection and
                    transaction components.
                  </Typography>
                  <CodeBlock
                    code={`function NFTMarketplace() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(collection => (
          <CollectionCard
            key={collection.id}
            item={collection}
            image={collectionCardImg}
          />
        ))}
      </div>
      
      <div className="mt-8">
        <TransactionInfo 
          label="Transaction Hash" 
          value="0x1234...5678" 
          image={transactionInfoImg}
        />
      </div>
    </div>
  );
}`}
                    language="tsx"
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Future Roadmap */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Future Roadmap" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 shadow-md">
                  <LucideIcons.Rocket className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Upcoming Features
                </Typography>
              </div>

              <div className="space-y-6">
                <Alert variant="info">
                  <LucideIcons.Info className="h-4 w-4" />
                  <div>
                    <div className="font-semibold">Planned Components</div>
                    <div className="text-sm mt-1">
                      Wallet connection interfaces, network switching
                      components, DeFi protocol integrations, staking
                      interfaces, and advanced trading components.
                    </div>
                  </div>
                </Alert>

                <Alert variant="warning">
                  <LucideIcons.Zap className="h-4 w-4" />
                  <div>
                    <div className="font-semibold">Enhanced Features</div>
                    <div className="text-sm mt-1">
                      Real-time WebSocket price feeds, advanced charting
                      capabilities, portfolio analytics, and gas fee estimation
                      tools.
                    </div>
                  </div>
                </Alert>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
