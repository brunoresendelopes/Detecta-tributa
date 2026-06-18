/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Scale,
  Moon,
  Sun,
  Search,
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
  Hash,
  FileText,
  Bookmark,
  ChevronRight,
  Info
} from 'lucide-react';
import BannerAviso from './components/BannerAviso';
import Consulta from './components/Consulta';
import ListaEnquadramentos from './components/ListaEnquadramentos';
import DetalheTributario from './components/DetalheTributario';
import BaseLegal from './components/BaseLegal';
import { CodigoFiscal, EnquadramentoTributario } from './types';
import { dataService } from './dataService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'consulta' | 'enquadramentos' | 'detalhe' | 'base-legal'>('consulta');
  const [selectedCodigo, setSelectedCodigo] = useState<CodigoFiscal | null>(null);
  const [selectedEnquadramento, setSelectedEnquadramento] = useState<EnquadramentoTributario | null>(null);
  const [enquadramentos, setEnquadramentos] = useState<EnquadramentoTributario[]>([]);
  const [tipoFiltroPadrao, setTipoFiltroPadrao] = useState<'NCM' | 'NBS'>('NCM');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Monitora seleção de código para buscar seus enquadramentos da reforma correspondente
  useEffect(() => {
    if (selectedCodigo) {
      dataService.getEnquadramentosForCodigo(selectedCodigo.id).then((res) => {
        setEnquadramentos(res);
        setSelectedEnquadramento(null);
        // Sugere e navega para aba de enquadramentos para visualização
        setActiveTab('enquadramentos');
      });
    } else {
      setEnquadramentos([]);
      setSelectedEnquadramento(null);
    }
  }, [selectedCodigo]);

  // Monitora seleção de enquadramento para guiar o usuário na aba de detalhe
  const handleSelectEnquadramento = (enq: EnquadramentoTributario) => {
    setSelectedEnquadramento(enq);
    setActiveTab('detalhe');
  };

  // Gatilho rápido de heros na tela de início
  const handleStartConsulta = (tipo: 'NCM' | 'NBS') => {
    setTipoFiltroPadrao(tipo);
    setSelectedCodigo(null);
    setEnquadramentos([]);
    setSelectedEnquadramento(null);
    setActiveTab('consulta');

    // Desce suavemente se houver rolagem
    setTimeout(() => {
      const el = document.getElementById('consulta-secao');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#f2f2f0] text-[#1a1a1a]'} transition-colors duration-200 flex flex-col font-sans`}>
      {/* 1. Banner Fixo de Aviso Obrigatório de Dados Fictícios */}
      <BannerAviso />

      {/* Header Principal do Sistema - Conforme layout High Density */}
      <header id="header-cabecalho-principal" className="bg-white dark:bg-slate-900 border-b border-[#d1d1cf] dark:border-slate-800 sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1a1a] dark:bg-[#ebebe8] text-white dark:text-slate-950 px-3 py-1.5 font-mono text-xs font-bold rounded-none select-none tracking-widest">
              RT_v1.0
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg sm:text-xl tracking-tight uppercase text-[#1a1a1a] dark:text-white">
                  Consulta Tributária <span className="font-light text-[#666] dark:text-slate-400">| Reforma 2027</span>
                </h1>
              </div>
              <p className="text-[10px] font-mono font-bold text-[#666] dark:text-slate-500 uppercase tracking-wider">
                EC 132/2023 · LC 214/2025 · MODELO SISTÊMICO DE TRANSIÇÃO
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Seletor de Tema Claro/Escuro */}
            <button
              id="btn-alternar-tema"
              type="button"
              onClick={toggleDarkMode}
              className="p-2 flex items-center justify-center rounded-none bg-white hover:bg-[#ebebe8] dark:bg-slate-800 dark:hover:bg-slate-750 text-[#1a1a1a] dark:text-slate-300 cursor-pointer shadow-none border border-[#d1d1cf] dark:border-slate-700 transition-colors"
              title="Alternar Tema Escuro / Claro"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <span className="h-6 w-px bg-[#d1d1cf] dark:bg-slate-800 hidden sm:inline-block" />

            <div className="hidden sm:flex items-center gap-1.5 bg-[#ebebe8] dark:bg-slate-800 px-2.5 py-1 text-[10px] font-mono font-bold uppercase border border-[#d1d1cf] dark:border-slate-700">
              <span className="h-2 w-2 rounded-full bg-[#007b5e]" />
              <span className="text-[#007b5e] dark:text-emerald-400">HI_DENSITY PROTO</span>
            </div>
          </div>
        </div>
      </header>

      {/* Corpo da Página / Conteúdo de Transição */}
      <main id="main-portal-body" className="flex-1 py-6 px-6 max-w-7xl mx-auto w-full space-y-6">

        {/* Banner de Boas-Vindas - Swiss High Density Layout */}
        <div id="welcome-hero-banner" className="bg-[#1a1a1a] dark:bg-slate-900 border border-black dark:border-slate-850 rounded-none p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none hidden lg:block">
            <svg width="400" height="300" viewBox="0 0 100 100" fill="none">
              <rect x="10" y="10" width="80" height="80" stroke="white" strokeWidth="0.5" />
              <line x1="10" y1="10" x2="90" y2="90" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-[9px] font-mono uppercase bg-white/10 border border-white/20 text-white/90 px-2.5 py-0.5 rounded-none tracking-widest inline-block">
              DIRETRIZ DA REFORMA TRIBUTÁRIA NACIONAL
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
              Simulador e Buscador de Enquadramentos Sob Novas Alíquotas
            </h2>
            <p className="text-xs text-white/80 leading-relaxed font-sans max-w-2xl font-light">
              Navegue pelas regras de transição de <strong>CBS</strong>, <strong>IBS</strong> e do adicional do <strong>Imposto Seletivo (IS)</strong>. 
              Pesquise códigos fiscais NCM/NBS e identifique vulnerabilidades interpretativas (zonas cinzentas) com nosso semáforo de risco operacional.
            </p>

            {/* Dois botões da Tela Inicial regulamentar */}
            <div className="pt-2 flex flex-col xs:flex-row flex-wrap gap-2.5">
              <button
                id="btn-inicio-ncm"
                onClick={() => handleStartConsulta('NCM')}
                className="px-4 py-2.5 bg-white hover:bg-[#ebebe8] text-black rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border-none"
              >
                <Hash className="h-3.5 w-3.5" />
                <span>NCM (Bens)</span>
                <ChevronRight className="h-3 w-3" />
              </button>

              <button
                id="btn-inicio-nbs"
                onClick={() => handleStartConsulta('NBS')}
                className="px-4 py-2.5 bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>NBS (Serviços)</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Barra de Navegação de Abas Estruturada (Padrão High Density) */}
        <div id="barra-abas-navegacao" className="bg-[#ebebe8] dark:bg-slate-900 border border-[#d1d1cf] dark:border-slate-800 p-1 rounded-none overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1 sticky top-[69px] z-30 transition-colors">
          <button
            id="tab-btn-consulta"
            onClick={() => setActiveTab('consulta')}
            className={`flex-1 py-2.5 px-4 rounded-none text-xs tracking-wider uppercase font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'consulta'
                ? 'bg-[#1a1a1a] text-white shadow-none'
                : 'text-[#666] dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>Consulta</span>
          </button>

          <button
            id="tab-btn-enquadramentos"
            onClick={() => setActiveTab('enquadramentos')}
            className={`flex-1 py-2.5 px-4 rounded-none text-xs tracking-wider uppercase font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'enquadramentos'
                ? 'bg-[#1a1a1a] text-white shadow-none'
                : 'text-[#666] dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Enquadramentos</span>
            {enquadramentos.length > 0 && (
              <span className="font-mono text-[9px] font-bold bg-amber-500 text-black h-4 px-1.5 rounded-none flex items-center justify-center border border-black/10">
                {enquadramentos.length}
              </span>
            )}
          </button>

          <button
            id="tab-btn-detalhe"
            onClick={() => setActiveTab('detalhe')}
            disabled={!selectedEnquadramento}
            className={`flex-1 py-2.5 px-4 rounded-none text-xs tracking-wider uppercase font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !selectedEnquadramento ? 'opacity-40 cursor-not-allowed text-[#aaa] dark:text-slate-600' : ''
            } ${
              activeTab === 'detalhe'
                ? 'bg-[#1a1a1a] text-white shadow-none'
                : selectedEnquadramento
                ? 'text-[#666] dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                : 'text-slate-450 dark:text-slate-600'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Ficha Técnica</span>
          </button>

          <button
            id="tab-btn-base-legal"
            onClick={() => setActiveTab('base-legal')}
            className={`flex-1 py-2.5 px-4 rounded-none text-xs tracking-wider uppercase font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'base-legal'
                ? 'bg-[#1a1a1a] text-white shadow-none'
                : 'text-[#666] dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Base Legal</span>
          </button>
        </div>

        {/* 3. Área de Render Estrita da Aba Ativa */}
        <div id="conteudo-tab-ativo" className="transition-all duration-300">
          {activeTab === 'consulta' && (
            <Consulta
              tipoFiltroPadrao={tipoFiltroPadrao}
              onSelectCodigo={setSelectedCodigo}
              selectedCodigo={selectedCodigo}
            />
          )}

          {activeTab === 'enquadramentos' && (
            <ListaEnquadramentos
              codigoSelected={selectedCodigo}
              enquadramentos={enquadramentos}
              onSelectEnquadramento={handleSelectEnquadramento}
              selectedEnquadramento={selectedEnquadramento}
            />
          )}

          {activeTab === 'detalhe' && (
            <DetalheTributario
              codigoSelected={selectedCodigo}
              enquadramento={selectedEnquadramento}
            />
          )}

          {activeTab === 'base-legal' && (
            <BaseLegal />
          )}
        </div>

        {/* Alerta de Rodapé Geral de Conformidade do Protótipo (Estilo High Density de Barra Status) */}
        <footer id="footer-rodape-fiscal" className="bg-[#1a1a1a] border border-[#1a1a1a] text-white rounded-none p-5 text-left space-y-4 mt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 gap-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider font-extrabold">
              <Info className="h-4 w-4 text-[#d9a400]" />
              <span>DECLARAÇÃO FISCAL EXCLUSIVA DE PROTÓTIPO (DISCLAIMER)</span>
            </div>
            <div className="flex gap-1.5 items-center text-[10px] font-mono text-white/60">
              <span>EFICÁCIA SIMULADA: 01/01/2027</span>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-white/70 leading-relaxed font-sans font-light max-w-6xl">
            As alíquotas de referência da CBS e IBS e suas codificações sistêmicas (cClassTrib, CST_principal, CST do IS) são formulações fictícias para 
            validação conceitual da interface do usuário. Não devem ser empregadas para decisões societárias, recolhimentos tributários ou planejamento fiscal ativo.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[9px] font-mono text-white/50 pt-2 border-t border-white/5 border-dashed gap-2">
            <span>SISTEMA DE DIAGNÓSTICO DO IMPOSTO SELETIVO (IS) · REFORMA BRASILEIRA 2027</span>
            <span>MODELO DE DIAGNÓSTICO INTEGRADO - TODOS OS DIREITOS RESERVADOS</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
