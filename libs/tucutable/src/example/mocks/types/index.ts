export interface IBalanceByAsset {
  symbol: string;
  name: string;
  variationLastDay: string;
  marketPrice: string;
  isSupported: boolean;
  iconUrl: string;
  balance: {
    units: string;
    usd: string;
  };
  assetGroup: string;
  assetId: string;
  source: string;
  timestamp: number;
  tokens: IToken[];
}

export interface IToken {
  network: string;
  balance: string;
  balanceInUsd: string;
  networkIcon: string;
}

export interface IAccountBalance {
  balanceByAsset: IBalanceByAsset[];
  externalAccountId: string;
  totalBalance: {
    usd: string;
  };
}

export interface IAccount {
  externalAccountId: string;
  accountLabel: string;
  name: string;
  iconUrl: string;
  integrationId: number;
  integrationVenueTypeId: number;
  integrationCanSend: boolean;
  integrationCanReceive: boolean;
  address: string;
  deletedAt: string;
  canSend: boolean;
  canReceive: boolean;
  extraInfo: string;
  integrationName: string;
  syncStatus?: number;
  syncErrorCode?: string;
}

export interface IAccountWithBalance extends IAccount {
  balance?: IAccountBalance;
}

export interface IAssetWithTokensWithAccounts {
  externalAccountId: string;
  symbol: string;
  name: string;
  variationLastDay: string;
  isSupported?: boolean;
  marketPrice: string;
  iconUrl: string;
  balance: {
    units: string;
    usd: string;
  };
  assetGroup: string;
  assetId: string;
  source: string;
  timestamp: number;
  tokensWithAccounts: ITokenDataWithAccounts[];
}

export interface ITokenDataWithAccounts extends IToken {
  accounts: IAccountWithTokenBalance[];
}

export interface IAccountWithTokenBalance extends IAccount {
  tokenBalance: {
    usd: string;
    units: string;
  };
}

export type TAccountLabel =
  | 'Custodian'
  | 'Fireblocks'
  | 'Exchange'
  | 'Fiat'
  | 'Wallet';

export interface ExternalAccount {
  externalAccountId: string;
  name: string;
  accountLabel: TAccountLabel;
  iconUrl: string;
  integrationId: number;
  integrationVenueTypeId: number;
  canSend: boolean;
  canReceive: boolean;
  extraInfo: string;
  integrationCanSend: boolean;
  integrationCanReceive: boolean;
  integrationName: string;
  deletedAt?: string;
  address?: string;
}
