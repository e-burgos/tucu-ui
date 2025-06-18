import { Image } from '../../../components';
import AnchorLink from '../../../components/links/anchor-link';
import { Button } from '../../../components/buttons';
import { useIsMounted } from '../../../hooks/use-is-mounted';
import ErrorLightImage from '../../../assets/images/404-light.svg';
import ErrorDarkImage from '../../../assets/images/404-dark.svg';
import { useTheme } from '../../use-theme';

export const NotFoundPage = () => {
  const isMounted = useIsMounted();
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';
  return (
    <div className="flex max-w-full flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
      <div className="relative w-52 max-w-full sm:w-[400px] xl:w-[450px] 3xl:w-[500px]">
        {isMounted && !isDarkMode && (
          <Image src={ErrorLightImage} alt="404 Error" />
        )}
        {isMounted && isDarkMode && (
          <Image src={ErrorDarkImage} alt="404 Error" />
        )}
      </div>

      <h2 className="mb-2 mt-5 text-base font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
        Error! Página no encontrada
      </h2>
      <p className="mb-4 max-w-full text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 sm:w-[430px] sm:text-sm sm:leading-loose">
        Lo sentimos, la página que estás buscando no existe. Por favor, verifica
        la URL o vuelve a la página de inicio.
      </p>
      <AnchorLink to="/">
        <Button shape="rounded">Volver al Inicio</Button>
      </AnchorLink>
    </div>
  );
};

export default NotFoundPage;
