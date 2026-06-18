/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CodigoFiscal, EnquadramentoTributario } from '../types';
import { ArrowUpDown, ShieldCheck, Flame, Scale, ChevronRight, Eye } from 'lucide-react';

interface ListaEnquadramentosProps {
  codigoSelected: CodigoFiscal | null;
  enquadramentos: EnquadramentoTributario[];
  onSelectEnquadramento: (enq: EnquadramentoTributario) => void;
  selectedEnquadramento: EnquadramentoTributario | null;
}

export default function ListaEnquadramentos({
  codigoSelected,
  enquadramentos,
  onSelectEnquadramento,
  selectedEnquadramento,
}: ListaEnquadramentosProps) {
  const [colunaOrdenacao, setColunaOrdenacao] = useState<'aliquota_cbs' | 'confiabilidade' | 'cClassTrib'>('cClassTrib');
  const [direcaoOrdem, setDirecaoOrdem] = useState<'asc' | 'desc'>('asc');

  if (!codigoSelected) {
    return (
      <div id="lista-empty-placeholder" className="bg-[#ebebe8] dark:bg-slate-950/20 border border-[#d1d1cf] dark:border-slate-800 p-10 text-center space-y-3 rounded-none">
        <div className="mx-auto w-12 h-12 rounded-none bg-white dark:bg-slate-800 flex items-center justify-center text-slate-550 border border-[#d1d1cf] dark:border-slate-800">
          <Scale className="h-6 w-6 text-black dark:text-white" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-mono font-bold text-[#1a1a1a] dark:text-slate-200 text-xs sm:text-sm uppercase tracking-widest">Nenhum Código Fiscal Selecionado</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Por favor, utilize a aba de <strong className="font-extrabold uppercase text-black dark:text-white">Consulta</strong> primeiro para procurar e selecionar um código de classificação NCM ou NBS para listar os possíveis enquadramentos.
          </p>
        </div>
      </div>
    );
  }

  // Ordenação dos enquadramentos com base no estado de ordenação
  const enquadramentosOrdenados = [...enquadramentos].sort((a, b) => {
    let valorA: any = a[colunaOrdenacao as keyof EnquadramentoTributario] ?? '';
    let valorB: any = b[colunaOrdenacao as keyof EnquadramentoTributario] ?? '';

    // Tratamento para alíquotas de forma customizada
    if (colunaOrdenacao === 'aliquota_cbs') {
      valorA = a.aliquota_CBS + a.aliquota_IBS;
      valorB = b.aliquota_CBS + b.aliquota_IBS;
    }

    if (valorA < valorB) return direcaoOrdem === 'asc' ? -1 : 1;
    if (valorA > valorB) return direcaoOrdem === 'asc' ? 1 : -1;
    return 0;
  });

  const alterarOrdenacao = (coluna: typeof colunaOrdenacao) => {
    if (colunaOrdenacao === coluna) {
      setDirecaoOrdem(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setColunaOrdenacao(coluna);
      setDirecaoOrdem('asc');
    }
  };

  return (
    <div id="lista-enquadramentos-secao" className="space-y-4">
      {/* Resumo do Código Pesquisado */}
      <div className="bg-[#1a1a1a] border border-[#1a1a1a] text-slate-100 rounded-none p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] uppercase font-mono tracking-widest bg-white text-black px-2 py-0.5 rounded-none font-bold">
              {codigoSelected.tipo_codigo} Classificado
            </span>
            <span className="text-[10px] font-mono text-slate-400">ID Fictício: {codigoSelected.id}</span>
          </div>
          <h2 className="text-lg font-bold text-white font-sans uppercase tracking-tight">
            {codigoSelected.tipo_codigo} {codigoSelected.codigo}
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            {codigoSelected.descricao}
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-none py-2 px-4 text-center md:text-right flex-shrink-0">
          <p className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">Enquadramentos Encontrados</p>
          <span className="text-lg font-bold text-amber-400 font-mono">
            {enquadramentos.length} {enquadramentos.length > 1 ? 'Alternativas' : 'Regra Única'}
          </span>
        </div>
      </div>

      {enquadramentos.length > 1 && (
        <div className="bg-amber-500/15 border border-[#d1d1cf] dark:border-amber-900/40 text-amber-900 dark:text-amber-200 rounded-none p-4 flex gap-3 text-xs md:items-center">
          <Flame className="h-5 w-5 text-[#d9a400] flex-shrink-0 mt-0.5 md:mt-0" />
          <p className="leading-relaxed font-sans">
            <strong>⚠️ ZONA INTERPRETATIVA AMBÍGUA DA REFORMA TRIBUTÁRIA:</strong> Este código fiscal possui múltiplos enquadramentos de transição previstos na transição legislativa. Analisar condicionantes técnicas antes de adotar regimes reduzidos.
          </p>
        </div>
      )}

      {/* Cabeçalho da Lista / Ordenador */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-b border-[#d1d1cf] pb-2">
        <h3 className="font-mono font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-widest">
          ENQUADRAMENTOS FISCAIS DE TRANSIÇÃO (SIMULAÇÃO)
        </h3>

        <div className="flex gap-2 text-xs">
          <button
            onClick={() => alterarOrdenacao('cClassTrib')}
            className={`px-3 py-1.5 rounded-none border flex items-center gap-1 cursor-pointer transition-colors font-mono text-[10px] uppercase font-bold ${
              colunaOrdenacao === 'cClassTrib'
                ? 'bg-[#1a1a1a] text-white border-black font-bold'
                : 'bg-white dark:bg-slate-900 border-[#d1d1cf] dark:border-slate-800 text-slate-500 hover:bg-[#ebebe8]'
            }`}
          >
            cClassTrib <ArrowUpDown className="h-3 w-3" />
          </button>
          <button
            onClick={() => alterarOrdenacao('aliquota_cbs')}
            className={`px-3 py-1.5 rounded-none border flex items-center gap-1 cursor-pointer transition-colors font-mono text-[10px] uppercase font-bold ${
              colunaOrdenacao === 'aliquota_cbs'
                ? 'bg-[#1a1a1a] text-white border-black font-bold'
                : 'bg-white dark:bg-slate-900 border-[#d1d1cf] dark:border-slate-800 text-slate-500 hover:bg-[#ebebe8]'
            }`}
          >
            Alíquota Total <ArrowUpDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Lista de Registros */}
      <div className="space-y-3">
        {enquadramentosOrdenados.map((enq) => {
          const isSelected = selectedEnquadramento?.id === enq.id;
          const confColors = {
            verde: 'bg-emerald-600 text-white border-emerald-700',
            amarelo: 'bg-amber-600 text-black border-amber-700',
            vermelho: 'bg-rose-700 text-white border-rose-800'
          };

          return (
            <div
              key={enq.id}
              id={`card-enq-${enq.id}`}
              className={`border rounded-none transition-all duration-150 relative overflow-hidden flex flex-col md:flex-row justify-between items-stretch gap-4 ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-[#1a1a1a] ring-2 ring-black dark:ring-white'
                  : 'bg-white dark:bg-slate-900 border-[#d1d1cf] dark:border-slate-800 hover:bg-[#ebebe8] dark:hover:bg-slate-800/80 hover:border-[#666]'
              }`}
            >
              {/* Painel Esquerdo: Identificação e Alíquotas */}
              <div className="p-4 flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold bg-[#ebebe8] dark:bg-slate-800 text-slate-850 dark:text-slate-350 px-2 py-0.5 rounded-none border border-[#d1d1cf] dark:border-slate-700">
                    cClassTrib: {enq.cClassTrib}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold bg-[#ebebe8] dark:bg-slate-800 text-slate-850 dark:text-slate-350 px-2 py-0.5 rounded-none border border-[#d1d1cf] dark:border-slate-700">
                    CST Regular: {enq.CST_regular}
                  </span>
                  <span className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-none border ${confColors[enq.confiabilidade]}`}>
                    RISCO: {enq.confiabilidade}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                    Regime Geral Aplicável:
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm uppercase text-[#1a1a1a] dark:text-slate-100">
                    {enq.regime_especifico}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed font-sans">
                    {enq.observacoes}
                  </p>
                </div>

                {/* Sub-tabela Compacta das Alíquotas Fictícias */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#f2f2f0] dark:bg-slate-950 p-3 rounded-none border border-[#d1d1cf] dark:border-slate-850">
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-500 block">Alíquota CBS</span>
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                      {enq.aliquota_CBS.toFixed(2)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-500 block">Alíquota IBS</span>
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                      {enq.aliquota_IBS.toFixed(2)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-500 block">Adicional IS</span>
                    <span className={`font-mono text-xs font-bold ${enq.incidencia_IS ? 'text-[#d94a38] font-bold' : 'text-slate-400'}`}>
                      {enq.incidencia_IS ? `+${(enq.aliquota_IS || 0).toFixed(2)}%` : '0.00%'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-500 block">Imposto Total</span>
                    <span className="font-mono text-xs font-extrabold text-[#007b5e] dark:text-emerald-400">
                      {(enq.aliquota_CBS + enq.aliquota_IBS + (enq.aliquota_IS || 0)).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1 bg-[#ebebe8]/50 dark:bg-slate-950/20 p-2 border border-[#d1d1cf] dark:border-slate-850">
                  <span className="text-[9px] font-mono font-bold text-slate-550 dark:text-slate-400 uppercase block">
                    Base Legal Simplificada:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-400 font-serif italic line-clamp-1">
                    "{enq.base_legal_resumo}"
                  </p>
                </div>
              </div>

              {/* Botão de Ver Detalhes (Fração Direita) */}
              <div className="bg-[#f2f2f0] dark:bg-slate-950/50 p-4 shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-[#d1d1cf] dark:border-slate-850 gap-4 min-w-[140px]">
                <div className="text-left md:text-center">
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">EFICÁCIA</span>
                  <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-300">
                    JAN / 2027
                  </span>
                </div>

                <button
                  id={`btn-enq-detail-${enq.id}`}
                  onClick={() => onSelectEnquadramento(enq)}
                  className={`w-full py-2 px-3 rounded-none text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-none transition-all duration-150 border ${
                    isSelected
                      ? 'bg-[#1a1a1a] hover:bg-black text-white border-black'
                      : 'bg-white hover:bg-[#ebebe8] dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-[#d1d1cf] dark:border-slate-700'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Selecionar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
