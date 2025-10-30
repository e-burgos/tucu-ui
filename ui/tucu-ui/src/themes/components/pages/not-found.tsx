import { Image } from '../../../components';
import AnchorLink from '../../../components/links/anchor-link';
import { Button } from '../../../components/buttons';
import { useIsMounted } from '../../../hooks/use-is-mounted';
import ErrorLightImage from '../../../assets/images/404-light.svg';
import ErrorDarkImage from '../../../assets/images/404-dark.svg';
import { useTheme } from '../../use-theme';

export const NotFoundPage = () => {
  const isMounted = useIsMounted();
  const { mode, logo } = useTheme();
  const isDarkMode = mode === 'dark';
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-center absolute top-0 left-0">
      <div className="relative w-52 sm:w-[400px] xl:w-[450px] 3xl:w-[500px]">
        {isMounted && !isDarkMode && (
          <Image src={ErrorLightImage} alt="404 Error" />
        )}
        {isMounted && isDarkMode && (
          <Image src={ErrorDarkImage} alt="404 Error" />
        )}
      </div>

      <h2 className="mb-2 mt-5 text-xl font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
        Not Found Page
      </h2>
      <p className="mb-4 px-6 max-w-full text-lg leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 xs:w-[80%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] sm:text-sm">
        Sorry, the page you are looking for does not exist. Please check the URL
        or go back to the home page.
      </p>
      <AnchorLink to={logo?.path || '/'}>
        <Button shape="rounded">Go to Home</Button>
      </AnchorLink>
    </div>
  );
};

export default NotFoundPage;
