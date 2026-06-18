/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CodigoFiscal, EnquadramentoTributario } from '../types';
import SemaforoRisco from './SemaforoRisco';
import { Copy, Check, Scale, ShieldAlert, BookOpen, Clock, Layers, FileSpreadsheet, Percent } from 'lucide-react';

interface DetalheTributarioProps {
  codigoSelected: CodigoFiscal | null;
  enquadramento: EnquadramentoTributario | null;
}

export default function DetalheTributario({ codigoSelected, enquadramento }: DetalheTributarioProps) {
  const [copiouLegal, setCopiouLegal] = useState(false);
  const [copiouGeral, setCopiouGeral] = useState(false);

  if (!codigoSelected || !enquadramento) {
    return (
      <div id="detalhe-empty-placeholder" className="bg-[#ebebe8] dark:bg-slate-950/20 border border-[#d1d1cf] dark:border-slate-800 p-10 text-center space-y-3 rounded-none">
        <div className="mx-auto w-12 h-12 rounded-none bg-white dark:bg-slate-800 flex items-center justify-center text-slate-550 border border-[#d1d1cf] dark:border-slate-800">
          <BookOpen className="h-6 w-6 text-black dark:text-white" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-mono font-bold text-[#1a1a1a] dark:text-slate-200 text-xs sm:text-sm uppercase tracking-widest">Nenhum Enquadramento Selecionado</h4>
          <p className="text-xs text-slate-650 dark:text-slate-400 max-w-md mx-auto">
            Por favor, selecione e clique no botão <strong className="font-extrabold uppercase text-black dark:text-white">"Selecionar"</strong> de um enquadramento fiscal na aba correspondente para carregar a ficha técnica completa estruturada.
          </p>
        </div>
      </div>
    );
  }

  const copiarBaseLegalRef = () => {
    const texto = `${enquadramento.base_legal_resumo} — Detalhes: ${enquadramento.base_legal_detalhada} (Ref: ${enquadramento.cClassTrib})`;
    navigator.clipboard.writeText(texto);
    setCopiouLegal(true);
    setTimeout(() => setCopiouLegal(false), 2000);
  };

  const copiarFichaCompleta = () => {
    const texto = `
========================================
FICHA DE ENQUADRAMENTO TRIBUTÁRIO (FICTÍCIA)
========================================
Código Fiscal: ${codigoSelected.tipo_codigo} ${codigoSelected.codigo}
Descrição: ${codigoSelected.descricao}
cClassTrib: ${enquadramento.cClassTrib}
CST Principal: ${enquadramento.CST_principal}
CST Regular: ${enquadramento.CST_regular}
CST Seletivo (IS): ${enquadramento.CST_IS || 'Não aplicável'}
Alíquota CBS: ${enquadramento.aliquota_CBS}%
Alíquota IBS: ${enquadramento.aliquota_IBS}%
Alíquota IS: ${enquadramento.aliquota_IS || 0.0}%
Alíquota Total Fictícia: ${enquadramento.aliquota_CBS + enquadramento.aliquota_IBS + (enquadramento.aliquota_IS || 0.0)}%
Base Legal: ${enquadramento.base_legal_resumo}
Vigência: da Regra: 01/01/2027
Confiabilidade de Risco: ${enquadramento.confiabilidade.toUpperCase()}
----------------------------------------
NOTA: DADOS DE EXEMPLO FICTÍCIOS - NÃO USAR EM RELAÇÕES TRIBUTÁRIAS REAIS.
========================================
    `.trim();
    navigator.clipboard.writeText(texto);
    setCopiouGeral(true);
    setTimeout(() => setCopiouGeral(false), 2000);
  };

  const aliquotaTotal = enquadramento.aliquota_CBS + enquadramento.aliquota_IBS + (enquadramento.aliquota_IS || 0);

  return (
    <div id="detalhe-tributario-painel" className="space-y-4">
      {/* Botão Copiar Dados Geral */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d1d1cf] pb-2">
        <h3 className="font-mono font-bold text-xs text-[#1a1a1a] dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-black dark:text-white" />
          Ficha Técnica de Detalhe Tributário
        </h3>
        <button
          id="btn-copiar-ficha-completa"
          onClick={copiarFichaCompleta}
          className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-black text-white rounded-none text-xs font-mono font-bold uppercase tracking-wide flex items-center gap-2 cursor-pointer border-none"
        >
          {copiouGeral ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Copiada!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copiar Ficha</span>
            </>
          )}
        </button>
      </div>

      {/* Grid de Informas Principais do Item */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card Informações Básicas */}
        <div className="bg-white dark:bg-slate-900 border border-[#d1d1cf] dark:border-slate-800 rounded-none p-4 space-y-3 shadow-none">
          <span className="text-[9px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 block tracking-widest">Identidade do Item</span>
          <div>
            <span className="font-mono text-[11px] font-extrabold bg-[#ebebe8] dark:bg-slate-800 text-[#1a1a1a] dark:text-slate-350 px-2 py-0.5 rounded-none">
              {codigoSelected.tipo_codigo} : {codigoSelected.codigo}
            </span>
          </div>
          <h4 className="font-bold text-xs uppercase text-[#1a1a1a] dark:text-slate-100 line-clamp-2 leading-tight">
            {codigoSelected.descricao}
          </h4>
          <div className="pt-2 border-t border-[#f2f2f0] dark:border-slate-850 flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
            <span>Tipo: <strong className="text-slate-700 dark:text-slate-300 uppercase">{codigoSelected.tipo_item}</strong></span>
            <span className="text-[#007b5e] uppercase font-bold">Vigente</span>
          </div>
        </div>

        {/* Card Classificação Técnico-Tributária */}
        <div className="bg-white dark:bg-slate-900 border border-[#d1d1cf] dark:border-slate-800 rounded-none p-4 space-y-3 shadow-none">
          <span className="text-[9px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 block tracking-widest">Registros Principais</span>
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
            <div className="p-1.5 bg-[#f2f2f0] dark:bg-slate-950 rounded-none border border-[#d1d1cf] dark:border-slate-850">
              <span className="text-[9px] text-[#666] block uppercase font-bold">cClassTrib</span>
              <span className="font-bold text-[#1a1a1a] dark:text-slate-300">{enquadramento.cClassTrib}</span>
            </div>
            <div className="p-1.5 bg-[#f2f2f0] dark:bg-slate-950 rounded-none border border-[#d1d1cf] dark:border-slate-850">
              <span className="text-[9px] text-[#666] block uppercase font-bold">CST regular</span>
              <span className="font-bold text-[#1a1a1a] dark:text-slate-300">{enquadramento.CST_regular}</span>
            </div>
            <div className="p-1.5 bg-[#f2f2f0] dark:bg-slate-950 rounded-none border border-[#d1d1cf] dark:border-slate-850">
              <span className="text-[9px] text-[#666] block uppercase font-bold">CST prin</span>
              <span className="font-bold text-[#1a1a1a] dark:text-slate-300">{enquadramento.CST_principal}</span>
            </div>
            <div className="p-1.5 bg-[#f2f2f0] dark:bg-slate-950 rounded-none border border-[#d1d1cf] dark:border-slate-850">
              <span className="text-[9px] text-[#666] block uppercase font-bold">CST adic IS</span>
              <span className="font-bold text-[#1a1a1a] dark:text-slate-300">{enquadramento.CST_IS || 'IMUNE'}</span>
            </div>
          </div>
        </div>

        {/* Card Alíquota & Resumo de Caixa */}
        <div className="bg-[#ebebe8] dark:bg-slate-900 border border-[#d1d1cf] dark:border-slate-855 rounded-none p-4 flex flex-col justify-between shadow-none">
          <div className="flex items-center justify-between border-b border-[#d1d1cf] pb-1.5 sm:pb-2">
            <span className="text-[9px] font-mono uppercase font-bold text-[#1a1a1a] dark:text-blue-300 tracking-widest">Imposto Consolidado</span>
            <span className="text-xs font-mono font-bold text-slate-550 dark:text-blue-300">
              MÉTODO: SUM
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-[#1a1a1a] dark:text-white font-mono">
              {aliquotaTotal.toFixed(2)}%
            </span>
            <p className="text-[9px] font-mono font-bold text-[#666] dark:text-slate-400 mt-1 uppercase">
              Soma teórica de CBS + IBS + IS fictícios
            </p>
          </div>
          <div className="pt-2 border-t border-[#d1d1cf] dark:border-blue-800/40 flex items-center justify-between text-[10px] font-mono font-bold text-[#1a1a1a] dark:text-slate-400">
            <span>CBS: {enquadramento.aliquota_CBS}%</span>
            <span>IBS: {enquadramento.aliquota_IBS}%</span>
            <span>IS: {enquadramento.aliquota_IS || 0}%</span>
          </div>
        </div>
      </div>

      {/* Detalhes de Benefícios, Reduções e Tratamento Especial */}
      <div className="bg-white dark:bg-slate-900 border border-[#d1d1cf] dark:border-slate-800 rounded-none p-5 shadow-none space-y-4">
        <h4 className="font-mono font-bold text-xs text-[#1a1a1a] dark:text-slate-200 uppercase tracking-widest flex items-center gap-1.5 border-b border-[#f2f2f0] dark:border-slate-850 pb-2">
          <FileSpreadsheet className="h-4 w-4 text-[#007b5e]" />
          INCENTIVOS, BENEFÍCIOS FISCAIS E REGRAS REDUZIDAS
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-[#f2f2f0] dark:bg-slate-950 rounded-none border border-[#d1d1cf] space-y-1">
            <span className="text-[9px] font-mono font-bold text-[#666] uppercase block">Redução de Base/Alíquota</span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-350 px-2 py-0.5 bg-white dark:bg-slate-900 border border-[#d1d1cf] inline-block font-mono">
              {enquadramento.reducao_base || 'Não autorizada'}
            </p>
          </div>

          <div className="p-3 bg-[#f2f2f0] dark:bg-slate-950 rounded-none border border-[#d1d1cf] space-y-1">
            <span className="text-[9px] font-mono font-bold text-[#666] uppercase block">Alíquota Zero / Isenção</span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-350">
              {enquadramento.aliquota_zero || enquadramento.isencao ? (
                <span className="bg-[#007b5e] text-white border border-[#007b5e] px-2 py-0.5 rounded-none font-mono text-[10px] block text-center uppercase tracking-wider">
                  CONCEDIDO / LEGISLADO
                </span>
              ) : (
                <span className="bg-[#ebebe8]/55 text-[#666] border border-[#d1d1cf] px-2 py-0.5 rounded-none font-mono text-[10px] block text-center uppercase tracking-wider">
                  Não contemplado
                </span>
              )}
            </p>
          </div>

          <div className="p-3 bg-[#f2f2f0] dark:bg-slate-950 rounded-none border border-[#d1d1cf] space-y-1">
            <span className="text-[9px] font-mono font-bold text-[#666] uppercase block">Suspensão / Diferimento</span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-355 flex-1">
              {enquadramento.suspensao || enquadramento.diferimento ? (
                <span className="bg-amber-500 text-black border border-amber-600 px-2 py-0.5 rounded-none font-mono text-[10px] block text-center uppercase tracking-wider">
                  DOU CONDICIONADO
                </span>
              ) : (
                <span className="bg-[#ebebe8]/55 text-[#666] border border-[#d1d1cf] px-2 py-0.5 rounded-none font-mono text-[10px] block text-center uppercase tracking-wider">
                  Inexistente/Regular
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-slate-955 border border-[#d1d1cf] dark:border-slate-800 space-y-1">
          <span className="text-[9px] font-mono font-bold text-[#666] dark:text-slate-500 uppercase tracking-widest block">
            Descrição do regime operacional de apuração:
          </span>
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {enquadramento.regime_especifico}
          </p>
        </div>
      </div>

      {/* Alertas Operacionais e Perigos de Classificação de Risco */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Painel Semáforo de Risco */}
        <div className="space-y-1.55">
          <h4 className="font-mono font-bold text-[10px] uppercase text-[#666] tracking-widest">
            Grau de Confiabilidade Legal da Inteligência
          </h4>
          <SemaforoRisco
            nivel={enquadramento.confiabilidade}
            justificativa={enquadramento.confiabilidade_justificativa}
          />
        </div>

        {/* Alertas Fiscais de Risco Operacional */}
        <div className="bg-white border border-[#d1d1cf] dark:bg-rose-500/5 dark:border-rose-950/40 rounded-none p-5 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#d94a38] font-bold text-xs uppercase tracking-wide">
              <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
              <span>Diagnóstico de Risco e Divergências</span>
            </div>
            <p className="text-xs text-[#555] dark:text-slate-400 leading-relaxed font-sans">
              O modelo de tributação dual (IBS/CBS) herda litígios e ambiguidades estritas. O preenchimento indevido de classificação pode gerar multas diretas reguladas de até 150% do valor do imposto.
            </p>
          </div>

          <div className="pt-2 border-t border-[#f2f2f0] dark:border-rose-800/40 flex items-center justify-between text-[10px] font-mono text-[#666] dark:text-rose-450 font-bold uppercase p-0.5">
            <span>Eficácia Tributária Operacional:</span>
            <span className="font-mono text-[#d94a38] font-extrabold flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> 01 JAN 2027
            </span>
          </div>
        </div>
      </div>

      {/* Base Legal - Seção Destacada com Avisos Importantes Obligatórios */}
      <div className="bg-[#ebebe8] dark:bg-slate-950 border border-[#d1d1cf] dark:border-slate-850 rounded-none p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#d1d1cf] dark:border-slate-800 pb-2">
          <h4 className="font-mono font-bold text-xs text-[#1a1a1a] dark:text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-black dark:text-white" />
            Base Legal e Referências Normativas
          </h4>

          <span className="text-[9px] font-mono font-bold text-slate-500">
            REGRA SIM_ID: {enquadramento.id}
          </span>
        </div>

        {/* REPETICION DEL BANNER FISCAL DE DADOS FICTICIOS PROXIMO A BASE LEGAL */}
        <div className="bg-[#d94a38] text-white p-2.5 rounded-none text-center text-xs font-bold uppercase tracking-wide">
          ⚠️ CONFORMIDADE: Todos os dispositivos normativos, artigos e parágrafos abaixo são fictícios de modelo conceitual. Não devem ser usados para tomada de decisão tributária oficial em empresas.
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-[9px] font-mono font-bold text-[#666] dark:text-slate-500 uppercase tracking-widest block mb-1">
              Resumo Doutrinário / Legal (Linguagem Simples):
            </span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-250 italic bg-white dark:bg-slate-900 p-3 rounded-none border border-[#d1d1cf] leading-relaxed font-serif">
              "{enquadramento.base_legal_resumo}"
            </p>
          </div>

          <div>
            <span className="text-[9px] font-mono font-bold text-[#666] dark:text-slate-500 uppercase tracking-widest block mb-1">
              Detalhamento da Lei Complementar e regulamentação complementar:
            </span>
            <div className="text-xs text-slate-700 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 p-3.5 rounded-none border border-dashed border-[#d1d1cf] leading-relaxed font-mono whitespace-pre-wrap">
              {enquadramento.base_legal_detalhada}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            id="btn-copiar-base-legal"
            onClick={copiarBaseLegalRef}
            className="px-3 py-1.5 bg-white hover:bg-[#f2f2f0] text-black border border-[#d1d1cf] text-xs font-mono font-bold uppercase tracking-wider rounded-none flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiouLegal ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Base Legal Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 font-bold" />
                <span>Copiar Referência Legal</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
