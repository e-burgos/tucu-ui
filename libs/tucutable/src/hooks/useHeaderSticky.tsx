import { useEffect, useState } from 'react';
import styles from '../common/styles/main.module.css';
import useComponentEventListener from './useComponentEventListener';

const useHeaderSticky = (tableId: string) => {
  const { position: tablePosition } = useComponentEventListener(
    `${tableId}-table`
  );

  const tablePositionY = tablePosition?.y ?? 0;

  const { element: containerElement } = useComponentEventListener(
    `${tableId}-container`
  );

  const containerElementOffsetHeight = containerElement?.offsetHeight ?? 0;

  const { element: headerElement } = useComponentEventListener(
    `${tableId}-header-fixed`
  );

  const [headerFixed, setHeaderFixed] = useState<boolean>(false);
  const [headerAnimation, setHeaderAnimation] = useState<string>('');

  useEffect(() => {
    if (
      tablePositionY < 0 &&
      -tablePositionY < containerElementOffsetHeight - 80
    ) {
      setHeaderAnimation(styles.slideTop);
      setHeaderFixed(true);
    }
    if (
      tablePositionY > 56 &&
      -tablePositionY < containerElementOffsetHeight - 56
    ) {
      setHeaderAnimation(styles.slideOutTop);
      setHeaderFixed(false);
    }
    if (-tablePositionY > containerElementOffsetHeight - 56) {
      setHeaderAnimation(styles.slideOutTop);
    }
    if (-tablePositionY > containerElementOffsetHeight) {
      setHeaderFixed(false);
    }
  }, [
    headerElement,
    containerElement,
    tablePosition,
    tablePositionY,
    containerElementOffsetHeight,
  ]);

  return {
    headerFixed,
    headerAnimation,
  };
};

export default useHeaderSticky;
