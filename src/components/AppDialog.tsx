"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface AppDialogProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  title: string;
  children: React.ReactNode;
}

/**
 * Native HTML <dialog> modal wrapper with showModal(), light-dismiss fallback,
 * and automatic focus restoration via the browser top layer.
 */
export function AppDialog({
  open,
  onClose,
  titleId,
  title,
  children,
}: AppDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressedOutsideRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const isOutside = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return false;
    const rect = dialog.getBoundingClientRect();
    return (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    );
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="app-dialog"
      onClose={() => {
        if (dialogRef.current) dialogRef.current.returnValue = "";
        onClose();
      }}
      onPointerDown={(e) => {
        pressedOutsideRef.current = isOutside(e);
      }}
      onPointerUp={(e) => {
        if (pressedOutsideRef.current && isOutside(e)) {
          onClose();
        }
        pressedOutsideRef.current = false;
      }}
    >
      <div className="rounded-[24px] bg-white p-5 shadow-2xl border border-[#EBEBF0]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 id={titleId} className="text-[17px] font-bold text-[#141416]">
            {title}
          </h2>
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close dialog"
              className="w-8 h-8 rounded-full bg-[#F5F5F7] text-[#141416] flex items-center justify-center hover:bg-[#EBEBF0] transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
        {children}
      </div>
    </dialog>
  );
}
