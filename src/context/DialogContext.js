import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [dialogMap, setDialogMap] = useState({
    delete: false,
    device: false,
  });

  const setDialogOpen = (dialogName, isOpen) => {
    setDialogMap({
      ...dialogMap,
      [dialogName]: isOpen,
    });
  };
  return (
    <DialogContext.Provider value={{ dialogMap, setDialogOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export const useDialogContext = () => useContext(DialogContext);
