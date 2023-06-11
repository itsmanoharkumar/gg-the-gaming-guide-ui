import { useEffect } from "react";

const useKeyboardShortcut = (key: string, callback: (event: any) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        if (event.key === key && event.getModifierState("Control")) {
          event.preventDefault();
          callback(event);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    callback,
  };
};

export default useKeyboardShortcut;
