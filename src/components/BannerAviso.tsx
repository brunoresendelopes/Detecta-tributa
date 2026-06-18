/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle, Info } from 'lucide-react';

export default function BannerAviso() {
  return (
    <div
      id="banner-aviso-ficticio"
      className="bg-high-red text-white py-2.5 px-4 shadow-sm select-none border-b border-red-800 text-center font-sans"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 justify-center sm:justify-start font-bold uppercase tracking-widest text-center sm:text-left">
          <AlertTriangle className="h-4 w-4 text-white flex-shrink-0 animate-pulse" />
          <span>
            ⚠️ DADOS FICTÍCIOS PARA DEMONSTRAÇÃO — NÃO USAR PARA DECISÃO FISCAL REAL
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs bg-black/20 px-3 py-0.5 rounded-none border border-white/20 font-mono text-white/95">
          <Info className="h-3 w-3" />
          <span>PROTÓTIPO HIGH-DENSITY v1.0</span>
        </div>
      </div>
    </div>
  );
}
