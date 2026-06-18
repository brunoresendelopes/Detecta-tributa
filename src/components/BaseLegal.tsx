/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MOCK_BASES_LEGAIS } from '../dataService';
import { Book, Scale, Copy, Check, ExternalLink, Search, Bookmark } from 'lucide-react';

export default function BaseLegal() {
  const [busca, setBusca] = useState('');
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  const basesFiltradas = MOCK_BASES_LEGAIS.filter((base) => {
    const termo = busca.toLowerCase().trim();
    if (!termo) return true;
    return (
      base.ato_normativo.toLowerCase().includes(termo) ||
      base.artigo.toLowerCase().includes(termo) ||
      base.descricao.toLowerCase().includes(termo) ||
      (base.anexo && base.anexo.toLowerCase().includes(termo))
    );
  });

  const copiarReferencia = (id: string, texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiadoId(id);
    setTimeout(() => setCopiadoId(null), 2000);
  };

  return (
    <div id="base-legal-painel" className="space-y-4">
      {/* Cabeçalho */}
      <div className="bg-[#ebebe8] dark:bg-slate-900 border border-[#d1d1cf] dark:border-slate-800 rounded-none p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-mono font-bold text-xs text-[#1a1a1a] dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
            <Scale className="h-4 w-4 text-black dark:text-white" />
            Explorador de Bases Legais da Reforma (Fictício)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Acompanhe a fundamentação teórica fictícia por trás das classificações de CBS, IBS e Imposto Seletivo (IS).
          </p>
        </div>

        {/* Campo de Busca Rápida na Legislação */}
        <div className="relative min-w-[280px]">
          <input
            id="input-busca-lei"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="BUSCAR NORMA OU ARTIGO..."
            className="w-full pl-9 pr-3 py-1.5 border border-[#d1d1cf] dark:border-slate-800 rounded-none bg-white dark:bg-slate-950 font-mono text-[11px] text-[#1a1a1a] dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-black"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
        </div>
      </div>

      {/* Grid de Legislações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {basesFiltradas.map((base) => {
          const textoCopia = `${base.ato_normativo} — ${base.artigo} ${base.inciso || ''} ${base.paragrafo || ''} ${base.anexo ? `(${base.anexo})` : ''} - Descrição: ${base.descricao}`;
          return (
            <div
              key={base.id}
              id={`card-base-legal-${base.id}`}
              className="bg-white dark:bg-slate-900 border border-[#d1d1cf] dark:border-slate-800 rounded-none p-4 flex flex-col justify-between hover:border-[#666] transition-all duration-150"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[#f2f2f0] dark:border-slate-850 pb-2">
                  <span className="text-[9px] uppercase font-mono font-bold text-black bg-[#ebebe8] dark:bg-indigo-950/30 px-2 py-0.5 rounded-none border border-[#d1d1cf] flex items-center gap-1">
                    <Bookmark className="h-3 w-3" /> Fictício / Exemplo
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{base.id}</span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs uppercase text-[#1a1a1a] dark:text-slate-100 leading-tight">
                    {base.ato_normativo}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-500 font-mono">
                    {base.artigo} {base.inciso ? `, ${base.inciso}` : ''} {base.paragrafo ? `, ${base.paragrafo}` : ''} {base.anexo ? ` [${base.anexo}]` : ''}
                  </p>
                </div>

                <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed italic font-serif">
                  "{base.descricao}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f2f2f0] dark:border-slate-850 flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold text-slate-500 flex items-center gap-1 uppercase">
                  <Check className="h-3 w-3 text-black" /> Modelo Ilustrativo
                </span>

                <div className="flex gap-1.5">
                  <button
                    id={`btn-copiar-base-${base.id}`}
                    onClick={() => copiarReferencia(base.id, textoCopia)}
                    className="px-2.5 py-1 bg-white hover:bg-[#ebebe8] dark:bg-slate-800 border border-[#d1d1cf] dark:border-slate-750 text-slate-850 dark:text-slate-200 rounded-none text-[10px] font-mono font-bold uppercase flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiadoId === base.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span>Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>

                  <a
                    href={base.link_oficial}
                    onClick={(e) => e.preventDefault()} // Desativa link de formulário
                    className="px-2.5 py-1 bg-[#ebebe8]/50 border border-[#d1d1cf] text-[#666] rounded-none text-[10px] font-mono font-bold uppercase flex items-center gap-1 cursor-not-allowed"
                  >
                    <span>DOU</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {basesFiltradas.length === 0 && (
        <div className="bg-[#ebebe8] border border-[#d1d1cf] dark:bg-slate-950/20 rounded-none p-10 text-center">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Nenhum marco legal fictício encontrado para a pesquisa.</p>
        </div>
      )}
    </div>
  );
}
