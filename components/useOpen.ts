import React, { useState } from "react";

function useOpen() {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  function onOpen() {
    setOpen(true);
  }

  return { open, onClose, onOpen };
}

export default useOpen;
