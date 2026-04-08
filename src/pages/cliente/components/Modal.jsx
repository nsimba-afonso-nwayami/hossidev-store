import React, { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, title, icon, children }) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-700 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white w-full h-full md:h-auto md:max-w-2xl md:rounded-3xl md:max-h-[90vh] relative shadow-2xl overflow-hidden transform transition-all duration-700 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* CABEÇALHO PREMIUM */}
        <div className="flex items-center gap-4 p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
          {icon && (
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-900 text-neutral-50 text-xl shadow-lg shadow-blue-900/20">
              <i className={icon}></i>
            </div>
          )}

          <div className="flex flex-col">
            <h2 className="text-sm font-black text-neutral-700 uppercase tracking-widest leading-none">
              {title}
            </h2>
            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.2em] mt-1">
              HOSSIDEV Management
            </span>
          </div>

          <button
            onClick={onClose}
            className="ml-auto cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-all"
            title="Fechar"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* CONTEÚDO COM SCROLL REFINADO */}
        <div className="overflow-y-auto h-[calc(100%-88px)] md:max-h-[calc(90vh-88px)] px-8 py-8 bg-white">
          <div className="text-neutral-500">
            {children}
          </div>
          {/* Espaçador final */}
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
}