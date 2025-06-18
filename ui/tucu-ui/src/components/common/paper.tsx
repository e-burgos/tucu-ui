import React, { PropsWithChildren } from 'react';

export function Paper(
  props: PropsWithChildren<React.DetailsHTMLAttributes<HTMLDivElement>>
) {
  return <div className="relative" {...props} />;
}

export default Paper;
