import { useBreakpoint } from './use-breakpoint';

export const useIsMobile = () => {
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'sm', 'md'].indexOf(breakpoint) !== -1;

  return { isMobile };
};

export default useIsMobile;
