import {
  CardContainer,
  CardTitle,
  Badge,
  Typography,
  LucideIcons,
  CoinCard,
  CoinInfoCard,
  LivePriceFeed,
  CollectionCard,
  TransactionInfo,
  Alert,
} from 'tucu-ui';

export function Blockchain() {
  const priceData = [
    { name: 1, value: 45000 },
    { name: 2, value: 45200 },
    { name: 3, value: 44800 },
    { name: 4, value: 45100 },
    { name: 5, value: 45300 },
  ];

  const coinData = {
    id: 'bitcoin',
    name: 'Bitcoin',
    logo: '/icons/bitcoin.svg',
    balance: '1.25 BTC',
    coinType: 'BTC',
  };

  const collectionData = {
    id: 'collection-1',
    name: 'Crypto Punks',
    slug: 'crypto-punks',
    title: 'Crypto Punks Collection',
    cover_image: '/collection-1.jpg',
    number_of_artwork: 42,
    user: {
      avatar: '/avatar.jpg',
      name: 'CryptoPunk Studio',
      slug: 'cryptopunk-studio',
    },
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
        <LucideIcons.Coins className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <Typography tag="h1" className="mb-4 text-4xl font-bold">
          Blockchain Components
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Specialized components for DeFi applications, NFT marketplaces, crypto
          wallets, and Web3 interfaces.
        </Typography>
      </div>

      {/* Available Components Overview */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Package className="w-5 h-5 text-blue-500" />
          Available Components
        </CardTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <LucideIcons.Coins className="w-8 h-8 text-yellow-500" />,
              title: 'Cryptocurrency Components',
              components: [
                'CoinCard',
                'CoinInfoCard',
                'CoinListBox',
                'LivePriceFeed',
                'CurrencySwapIcons',
              ],
            },
            {
              icon: <LucideIcons.Image className="w-8 h-8 text-purple-500" />,
              title: 'NFT Components',
              components: ['NFTGrid', 'CollectionCard', 'CollectionSelectList'],
            },
            {
              icon: <LucideIcons.Receipt className="w-8 h-8 text-green-500" />,
              title: 'Transaction Components',
              components: ['TransactionInfo'],
            },
          ].map((category, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                {category.icon}
                <Typography tag="h3" className="font-semibold">
                  {category.title}
                </Typography>
              </div>
              <div className="space-y-1">
                {category.components.map((comp, i) => (
                  <Badge key={i} className="mr-2 mb-1">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContainer>

      {/* CoinCard Demo */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Coins className="w-5 h-5 text-yellow-500" />
          CoinCard Component
        </CardTitle>

        <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
          Display cryptocurrency information in a clean, card format with
          customizable background colors.
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <CoinCard
            id="bitcoin"
            name="Bitcoin"
            symbol="BTC"
            logo="/icons/bitcoin.svg"
            balance="1.25"
            usdBalance="45,000"
            change="+2.5%"
            isChangePositive={true}
            color="#FDEDD4"
          />
          <CoinCard
            id="ethereum"
            name="Ethereum"
            symbol="ETH"
            logo="/icons/ethereum.svg"
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
            logo="/icons/cardano.svg"
            balance="1,500"
            usdBalance="975"
            change="+5.8%"
            isChangePositive={true}
            color="#E8F5E8"
          />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Typography tag="h6" className="mb-3">
            Code Example:
          </Typography>
          <Typography tag="pre" className="text-sm">
            {`<CoinCard
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
          </Typography>
        </div>
      </CardContainer>

      {/* CoinInfoCard Demo */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Info className="w-5 h-5 text-blue-500" />
          CoinInfoCard Component
        </CardTitle>

        <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
          Compact cryptocurrency information display with three size variants.
        </Typography>

        <div className="flex flex-wrap gap-4 mb-6">
          <CoinInfoCard item={coinData} variant="small" />
          <CoinInfoCard item={coinData} variant="medium" />
          <CoinInfoCard item={coinData} variant="large" />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Typography tag="h6" className="mb-3">
            Code Example:
          </Typography>
          <Typography tag="pre" className="text-sm">
            {`const coinData = {
  id: 'bitcoin',
  name: 'Bitcoin',
  logo: '/icons/bitcoin.svg',
  balance: '1.25 BTC',
  coinType: 'BTC',
};

<CoinInfoCard item={coinData} variant="large" />`}
          </Typography>
        </div>
      </CardContainer>

      {/* CoinListBox Demo */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.List className="w-5 h-5 text-green-500" />
          CoinListBox Component
        </CardTitle>

        <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
          Searchable cryptocurrency selector with dropdown functionality.
        </Typography>

        <Alert>
          <div className="flex items-center gap-2">
            <LucideIcons.Info className="w-4 h-4 text-blue-500" />
            <Typography tag="p" className="text-sm">
              CoinListBox component is available but requires specific setup.
              Please refer to the component documentation.
            </Typography>
          </div>
        </Alert>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
          <Typography tag="h6" className="mb-3">
            Code Example:
          </Typography>
          <Typography tag="pre" className="text-sm">
            {`const [selectedCoin, setSelectedCoin] = useState(coins[0]);

<CoinListBox
  coins={coins}
  selectedCoin={selectedCoin}
  setSelectedCoin={setSelectedCoin}
  disabled={false}
/>`}
          </Typography>
        </div>
      </CardContainer>

      {/* LivePriceFeed Demo */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.TrendingUp className="w-5 h-5 text-purple-500" />
          LivePriceFeed Component
        </CardTitle>

        <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
          Real-time price display with integrated chart visualization.
        </Typography>

        <div className="mb-6">
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

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Typography tag="h6" className="mb-3">
            Code Example:
          </Typography>
          <Typography tag="pre" className="text-sm">
            {`const priceData = [
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
          </Typography>
        </div>
      </CardContainer>

      {/* CollectionCard Demo */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Image className="w-5 h-5 text-pink-500" />
          CollectionCard Component
        </CardTitle>

        <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
          NFT collection preview with statistics and cover image.
        </Typography>

        <div className="max-w-sm mb-6">
          <CollectionCard item={collectionData} />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Typography tag="h6" className="mb-3">
            Code Example:
          </Typography>
          <Typography tag="pre" className="text-sm">
            {`const collectionData = {
   id: 'collection-1',
   name: 'Crypto Punks',
   slug: 'crypto-punks',
   title: 'Crypto Punks Collection',
   cover_image: '/collection-1.jpg',
   number_of_artwork: 42,
   user: {
     avatar: '/avatar.jpg',
     name: 'CryptoPunk Studio',
     slug: 'cryptopunk-studio',
   },
 };

 <CollectionCard item={collectionData} />`}
          </Typography>
        </div>
      </CardContainer>

      {/* TransactionInfo Demo */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Receipt className="w-5 h-5 text-teal-500" />
          TransactionInfo Component
        </CardTitle>

        <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
          Simple transaction detail display component.
        </Typography>

        <div className="mb-6">
          <TransactionInfo label="Transaction Hash" value="0x1234...abcd" />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Typography tag="h6" className="mb-3">
            Code Example:
          </Typography>
          <Typography tag="pre" className="text-sm">
            {`<TransactionInfo label="Transaction Hash" value="0x1234...abcd" />`}
          </Typography>
        </div>
      </CardContainer>

      {/* Integration Examples */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Zap className="w-5 h-5 text-orange-500" />
          Integration Examples
        </CardTitle>

        <div className="space-y-6">
          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              Crypto Portfolio Dashboard
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Combine multiple components to create a comprehensive crypto
              portfolio view.
            </Typography>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Typography tag="pre" className="text-sm">
                {`function CryptoPortfolio() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CoinCard {...bitcoinData} />
      <CoinCard {...ethereumData} />
      <CoinCard {...cardanoData} />
      
      <div className="col-span-full">
        <LivePriceFeed {...livePriceData} />
      </div>
    </div>
  );
}`}
              </Typography>
            </div>
          </div>

          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              NFT Marketplace
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Build NFT marketplace interfaces with collection and transaction
              components.
            </Typography>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Typography tag="pre" className="text-sm">
                {`function NFTMarketplace() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(collection => (
          <CollectionCard key={collection.id} item={collection} />
        ))}
      </div>
      
      <div className="mt-8">
        <TransactionInfo />
      </div>
    </div>
  );
}`}
              </Typography>
            </div>
          </div>
        </div>
      </CardContainer>

      {/* Best Practices */}
      <Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LucideIcons.Lightbulb className="w-5 h-5 text-yellow-500" />
            <Typography tag="h6" className="font-semibold">
              Best Practices for Blockchain Components
            </Typography>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Always validate cryptocurrency data before displaying</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Use proper error handling for price feed failures</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Implement loading states for real-time data</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Consider rate limiting for API calls</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Format large numbers appropriately (K, M, B notation)</span>
            </li>
          </ul>
        </div>
      </Alert>
    </div>
  );
}
