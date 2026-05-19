import { SwitchMode, SwitchVariant } from '../../themes';
import { ListContainer } from '../../components';

export const NavOptions = () => {
  return (
    <ListContainer
      label="Options"
      items={[
        {
          id: 'theme-variant',
          content: <SwitchVariant />,
        },
        {
          id: 'theme',
          content: <SwitchMode />,
        },
      ]}
    />
  );
};

export default NavOptions;
