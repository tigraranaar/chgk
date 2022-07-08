import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useUnload = fn => {
  const cb = useRef(fn);
  const user = useSelector(state => state.lobby.clientType);

  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  useEffect(() => {
    const onUnload = (...args) => cb.current?.(...args);

    if (user) {
      window.addEventListener("beforeunload", onUnload);
    }

    return () => window.removeEventListener("beforeunload", onUnload);
  }, [user]);
};
