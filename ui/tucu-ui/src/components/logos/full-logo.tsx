import Typography from '../typography';
import TucuUiLogo from './tucu-ui-logo';

export function FullLogo(props: React.SVGAttributes<SVGElement>) {
  return (
    <div className="flex items-center justify-center">
      <TucuUiLogo size={60} className="w-[60px] h-[60px]" {...props} />
      <Typography
        tag="h1"
        className="-ml-2 text-2xl font-bold text-dark dark:text-light transition-colors duration-500"
      >
        TUCU<span className="text-primary">UI</span>
      </Typography>
    </div>
  );
}
