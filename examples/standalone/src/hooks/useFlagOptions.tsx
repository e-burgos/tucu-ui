import { useMemo } from 'react';
import * as Flags from 'country-flag-icons/react/3x2';
import { SelectOption } from '@e-burgos/tucu-ui';

const createFlagIcon = (countryCode: string) => {
  const FlagComponent = Flags[countryCode as keyof typeof Flags];
  if (!FlagComponent) return null;
  return <FlagComponent style={{ width: 16, height: 16 }} />;
};

export const useFlagOptions = () => {
  const countryOptions: SelectOption[] = useMemo(
    () => [
      // North America
      {
        name: '+1',
        value: '+1',
        icon: createFlagIcon('US'),
      },
      {
        name: '+1',
        value: '+1',
        icon: createFlagIcon('CA'),
      },
      {
        name: '+52',
        value: '+52',
        icon: createFlagIcon('MX'),
      },
      // South America
      {
        name: '+55',
        value: '+55',
        icon: createFlagIcon('BR'),
      },
      {
        name: '+54',
        value: '+54',
        icon: createFlagIcon('AR'),
      },
      {
        name: '+57',
        value: '+57',
        icon: createFlagIcon('CO'),
      },
      {
        name: '+56',
        value: '+56',
        icon: createFlagIcon('CL'),
      },
      {
        name: '+51',
        value: '+51',
        icon: createFlagIcon('PE'),
      },
      {
        name: '+58',
        value: '+58',
        icon: createFlagIcon('VE'),
      },
      {
        name: '+593',
        value: '+593',
        icon: createFlagIcon('EC'),
      },
      // Europe
      {
        name: '+44',
        value: '+44',
        icon: createFlagIcon('GB'),
      },
      {
        name: '+49',
        value: '+49',
        icon: createFlagIcon('DE'),
      },
      {
        name: '+33',
        value: '+33',
        icon: createFlagIcon('FR'),
      },
      {
        name: '+39',
        value: '+39',
        icon: createFlagIcon('IT'),
      },
      {
        name: '+34',
        value: '+34',
        icon: createFlagIcon('ES'),
      },
      {
        name: '+31',
        value: '+31',
        icon: createFlagIcon('NL'),
      },
      {
        name: '+32',
        value: '+32',
        icon: createFlagIcon('BE'),
      },
      {
        name: '+41',
        value: '+41',
        icon: createFlagIcon('CH'),
      },
      {
        name: '+43',
        value: '+43',
        icon: createFlagIcon('AT'),
      },
      {
        name: '+46',
        value: '+46',
        icon: createFlagIcon('SE'),
      },
      {
        name: '+47',
        value: '+47',
        icon: createFlagIcon('NO'),
      },
      {
        name: '+45',
        value: '+45',
        icon: createFlagIcon('DK'),
      },
      {
        name: '+48',
        value: '+48',
        icon: createFlagIcon('PL'),
      },
      {
        name: '+351',
        value: '+351',
        icon: createFlagIcon('PT'),
      },
      {
        name: '+30',
        value: '+30',
        icon: createFlagIcon('GR'),
      },
      {
        name: '+7',
        value: '+7',
        icon: createFlagIcon('RU'),
      },
      {
        name: '+90',
        value: '+90',
        icon: createFlagIcon('TR'),
      },
      // Asia
      {
        name: '+86',
        value: '+86',
        icon: createFlagIcon('CN'),
      },
      {
        name: '+91',
        value: '+91',
        icon: createFlagIcon('IN'),
      },
      {
        name: '+81',
        value: '+81',
        icon: createFlagIcon('JP'),
      },
      {
        name: '+82',
        value: '+82',
        icon: createFlagIcon('KR'),
      },
      {
        name: '+65',
        value: '+65',
        icon: createFlagIcon('SG'),
      },
      {
        name: '+60',
        value: '+60',
        icon: createFlagIcon('MY'),
      },
      {
        name: '+66',
        value: '+66',
        icon: createFlagIcon('TH'),
      },
      {
        name: '+62',
        value: '+62',
        icon: createFlagIcon('ID'),
      },
      {
        name: '+63',
        value: '+63',
        icon: createFlagIcon('PH'),
      },
      {
        name: '+84',
        value: '+84',
        icon: createFlagIcon('VN'),
      },
      {
        name: '+971',
        value: '+971',
        icon: createFlagIcon('AE'),
      },
      {
        name: '+966',
        value: '+966',
        icon: createFlagIcon('SA'),
      },
      {
        name: '+972',
        value: '+972',
        icon: createFlagIcon('IL'),
      },
      // Oceania
      {
        name: '+61',
        value: '+61',
        icon: createFlagIcon('AU'),
      },
      {
        name: '+64',
        value: '+64',
        icon: createFlagIcon('NZ'),
      },
      // Africa
      {
        name: '+27',
        value: '+27',
        icon: createFlagIcon('ZA'),
      },
      {
        name: '+20',
        value: '+20',
        icon: createFlagIcon('EG'),
      },
      {
        name: '+234',
        value: '+234',
        icon: createFlagIcon('NG'),
      },
      {
        name: '+254',
        value: '+254',
        icon: createFlagIcon('KE'),
      },
    ],
    [],
  );

  return {
    options: countryOptions || [],
  };
};
