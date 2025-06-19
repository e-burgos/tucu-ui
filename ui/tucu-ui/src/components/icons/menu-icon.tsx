import Image from '../utils/image';
import { useIsMounted } from '../../hooks/use-is-mounted';
import lightLogo from '../../assets/images/menu.svg';
import darkLogo from '../../assets/images/menu-dark.svg';
import { useTheme } from '../../themes/use-theme';

const Logo: React.FC<React.SVGAttributes<object>> = (props) => {
  const isMounted = useIsMounted();
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  return (
    <div className="flex cursor-pointer outline-hidden" {...props}>
      <span className="relative flex overflow-hidden">
        {isMounted && isDarkMode && (
          <Image src={darkLogo} alt="logo" priority />
        )}
        {isMounted && !isDarkMode && (
          <Image src={lightLogo} alt="logo" priority />
        )}
      </span>
    </div>
  );
};

export default Logo;
