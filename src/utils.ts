import { useCallback, useState } from 'react';

function useForceUpdate(): () => void {
  const [, dispatch] = useState(Object.create(null));

  return useCallback(() => {
    dispatch(Object.create(null));
  }, [dispatch]);
}

export { useForceUpdate };
