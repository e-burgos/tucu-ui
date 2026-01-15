import { FC } from 'react';
import { Button, AnchorLink } from '../../components';
import { useIsMounted } from '../../hooks/use-is-mounted';
import { useTheme } from '../hooks/use-theme';
import { Ban } from 'lucide-react';

export const ForbiddenPage: FC<{ basePath?: string }> = ({ basePath }) => {
  const pathBase =
    basePath || document.querySelector('base')?.getAttribute('href') || '/';

  const isMounted = useIsMounted();
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  const handleGoToHome = () => {
    window.location.href = pathBase;
  };

  return (
    <div className="bg-gradient-to-b from-primary/50 to-light-dark flex h-screen w-full flex-col items-center justify-center text-center absolute top-0 left-0">
      <div className="flex items-center justify-center relative w-52 sm:w-[400px] xl:w-[450px] 3xl:w-[500px]">
        {isMounted && !isDarkMode && <Ban className="w-52 h-52 text-primary" />}
        {isMounted && isDarkMode && <Ban className="w-52 h-52 text-primary" />}
      </div>

      <h2 className="mb-2 mt-5 text-xl font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
        Forbidden Page
      </h2>
      <p className="mb-4 px-6 max-w-full text-lg leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 xs:w-[80%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] sm:text-sm">
        You do not have permission to access this resource. Please contact
        support if you believe this is an error, or go back to the home page.
      </p>
      <AnchorLink to={pathBase} onClick={handleGoToHome}>
        <Button shape="rounded">Go to Home</Button>
      </AnchorLink>
    </div>
  );
};

export default ForbiddenPage;
