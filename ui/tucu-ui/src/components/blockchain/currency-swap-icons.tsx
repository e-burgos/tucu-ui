import { Bitcoin } from '../icons/bitcoin';
import { Ethereum } from '../icons/ethereum';
import { Tether } from '../icons/tether';
import { Bnb } from '../icons/bnb';
import { Usdc } from '../icons/usdc';
import { Cardano } from '../icons/cardano';
import { Doge } from '../icons/doge';

export type CoinList = 'BTC' | 'ETH' | 'USDT' | 'BNB' | 'USDC' | 'ADA' | 'DOGE';

const coinIcons: Record<CoinList, JSX.Element> = {
  BTC: <Bitcoin />,
  ETH: <Ethereum />,
  USDT: <Tether />,
  BNB: <Bnb />,
  USDC: <Usdc />,
  ADA: <Cardano />,
  DOGE: <Doge />,
};

export interface CurrencySwapIconsProps {
  from: CoinList;
  to: CoinList;
}

export function CurrencySwapIcons({ from, to }: CurrencySwapIconsProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="relative">{coinIcons[from]}</div>
        <div className="ltr:-ml-1.5 rtl:-mr-1.5">{coinIcons[to]}</div>
      </div>
      <div className="whitespace-nowrap text-sm font-medium uppercase text-black ltr:ml-3 rtl:mr-3 dark:text-white">
        {from}-{to}
      </div>
    </div>
  );
}

export default CurrencySwapIcons;
