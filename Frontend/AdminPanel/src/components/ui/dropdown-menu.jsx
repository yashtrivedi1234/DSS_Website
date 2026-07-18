import React, { useState, useRef, useEffect } from "react";

export function DropdownMenu({ children, className = "", ...props }) {
  return (
    <div className={`relative inline-block text-left ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuTrigger({
  children,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  open,
  setOpen,
  className = "",
  ...props
}) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
