import { SwitchMode } from '../../themes';
import { ListContainer } from '../../components';
// import { PlaygroundButton } from './playground-button';

export const NavOptions = () => {
  return (
    <ListContainer
      label="Options"
      items={[
        {
          id: 'theme',
          content: <SwitchMode />,
        },
        // {
        //   id: 'layout',
        //   content: <PlaygroundButton />,
        // },
      ]}
    />
  );
};

export default NavOptions;
