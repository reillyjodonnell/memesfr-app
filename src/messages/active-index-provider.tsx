import React, {createContext, useContext, useState, ReactNode} from 'react';

interface ActiveIndexContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const ActiveIndexContext = createContext<ActiveIndexContextValue | null>(null);

export const useActiveIndex = (): ActiveIndexContextValue => {
  const context = useContext(ActiveIndexContext);
  if (!context) {
    throw new Error(
      'useActiveIndex must be used within an ActiveIndexProvider',
    );
  }
  return context;
};

interface ActiveIndexProviderProps {
  children: ReactNode;
}

export const ActiveIndexProvider: React.FC<ActiveIndexProviderProps> = ({
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <ActiveIndexContext.Provider value={{activeIndex, setActiveIndex}}>
      {children}
    </ActiveIndexContext.Provider>
  );
};
