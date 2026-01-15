import React from 'react';
import { Loader, LoaderTypes } from '../../components/loaders/loader';
import { Typography } from '../../components/typography';

interface FallbackPageProps {
  loadingText?: string;
  loaderProps?: LoaderTypes;
}

export const FallbackPage: React.FC<FallbackPageProps> = ({
  loadingText,
  loaderProps,
}) => {
  return (
    <div className="flex flex-col gap-[16px] items-center justify-center h-screen w-full absolute top-0 left-0">
      <Loader tag="span" size="large" variant="scaleUp" {...loaderProps} />
      {loadingText && <Typography tag="h3">{loadingText}</Typography>}
    </div>
  );
};

export default FallbackPage;
