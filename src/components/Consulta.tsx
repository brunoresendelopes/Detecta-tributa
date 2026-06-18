/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Hash, FileText, Check, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { CodigoFiscal } from '../types';
import { dataService } from '../dataService';

interface ConsultaProps {
  onSelectCodigo: (codigo: CodigoFiscal) => void;
  selectedCodigo: CodigoFiscal | null;
  tipoFiltroPadrao: 'NCM' | 'NBS';
}

export default function Consulta({ onSelectCodigo, selectedCodigo, tipoFiltroPadrao }: ConsultaProps) {
  const [tipoFiltro, setTipoFiltro] = useState<'NCM' | 'NBS'>(tipoFiltroPadrao);
  const [codigoBusca, setCodigoBusca] = useState('');
  const [descBusca, setDescBusca] = useState('');
  const [sugestoes, setSugestoes] = useState<CodigoFiscal[]>([]);
  const [mensagemFormat, setMensagemFormat] = useState('');
  const [buscandoApi, setBuscandoApi] = useState(false);

  // Sincroniza filtro inicial com quem envia (caso os botões iniciais de tela mudem)
  useEffect(() => {
    setTipoFiltro(tipoFiltroPadrao);
    setCodigoBusca('');
    setDescBusca('');
    setSugestoes([]);
    setBuscandoApi(false);
  }, [tipoFiltroPadrao]);

  // Executa busca e atualizações dinâmicas
  useEffect(() => {
    const fetchSugestoes = async () => {
      // Se ambos estiverem em branco, retorna tudo para o filtro
      if (!codigoBusca.trim() && !descBusca.trim()) {
        const todos = await dataService.searchCodigos('', tipoFiltro);
        setSugestoes(todos);
        setBuscandoApi(false);
        return;
      }

      const cleanNum = codigoBusca.replace(/\D/g, '');
      if (tipoFiltro === 'NCM' && cleanNum.length === 8) {
        setBuscandoApi(true);
      }

      let res: CodigoFiscal[] = [];
      try {
        if (codigoBusca.trim()) {
          res = await dataService.searchCodigos(codigoBusca, tipoFiltro);
        } else if (descBusca.trim()) {
          res = await dataService.searchCodigos(descBusca, tipoFiltro);
        }
      } catch (err) {
        console.warn("Erro ao buscar dados fiscais:", err);
      } finally {
        setBuscandoApi(false);
      }
      setSugestoes(res);
    };

    const timer = setTimeout(fetchSugestoes, 150);
    return () => clearTimeout(timer);
  }, [codigoBusca, descBusca, tipoFiltro]);

  // Formata código conforme máscara (NCM ou NBS) ao digitar
  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9A-Za-z]/g, ''); // preserva alfanumérico se houver marca fic
    let formattedVal = rawVal;

    if (tipoFiltro === 'NCM') {
      // Formato NCM: XXXX.XX.XX (8 dígitos)
      if (rawVal.length > 4) {
        formattedVal = rawVal.substring(0, 4) + '.' + rawVal.substring(4);
      }
      if (rawVal.length > 6) {
        formattedVal = formattedVal.substring(0, 7) + '.' + formattedVal.substring(7, 9);
      }
      if (rawVal.length > 8) {
        formattedVal = formattedVal.substring(0, 10);
      }
      setMensagemFormat(rawVal.length < 8 ? 'Código NCM incompleto (8 dígitos requeridos)' : 'Formato NCM correto');
    } else {
      // Formato NBS: XX.XX.XX (6 dígitos)
      if (rawVal.length > 2) {
        formattedVal = rawVal.substring(0, 2) + '.' + rawVal.substring(2);
      }
      if (rawVal.length > 4) {
        formattedVal = formattedVal.substring(0, 5) + '.' + rawVal.substring(5, 7);
      }
      if (rawVal.length > 6) {
        formattedVal = formattedVal.substring(0, 8);
      }
      setMensagemFormat(rawVal.length < 6 ? 'Código NBS incompleto (6 dígitos requeridos)' : 'Formato NBS correto');
    }

    setCodigoBusca(formattedVal);
    setDescBusca(''); // Limpa busca por descrição quando digita no código
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescBusca(e.target.value);
    setCodigoBusca(''); // Limpa busca por código
    setMensagemFormat('');
  };

  const alternarFiltro = (tipo: 'NCM' | 'NBS') => {
    setTipoFiltro(tipo);
    setCodigoBusca('');
    setDescBusca('');
    setMensagemFormat('');
    setSugestoes([]);
  };

  return (
    <div id="consulta-secao" className="space-y-4">
      {/* Botões seletores principais */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          id="btn-filtro-ncm"
          type="button"
          onClick={() => alternarFiltro('NCM')}
          className={`flex-1 py-3 px-5 rounded-none border text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${
            tipoFiltro === 'NCM'
              ? 'bg-[#1a1a1a] text-white border-black shadow-none font-bold'
              : 'bg-white dark:bg-slate-900 border-[#d1d1cf] dark:border-slate-800 text-[#1a1a1a] dark:text-slate-400 hover:bg-[#ebebe8] dark:hover:bg-slate-800/85'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`p-1.5 rounded-none ${tipoFiltro === 'NCM' ? 'bg-white text-black' : 'bg-[#ebebe8] dark:bg-slate-800 text-[#666]'}`}>
              <Hash className="h-4 w-4" />
            </span>
            <div>
              <span className="block text-[9px] uppercase tracking-widest font-mono opacity-80">BENS COMPATÍVEIS</span>
              <span className="text-xs uppercase font-bold">Classificação NCM</span>
            </div>
          </div>
          {tipoFiltro === 'NCM' && <span className="h-2 w-2 bg-[#d94a38]" />}
        </button>

        <button
          id="btn-filtro-nbs"
          type="button"
          onClick={() => alternarFiltro('NBS')}
          className={`flex-1 py-3 px-5 rounded-none border text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${
            tipoFiltro === 'NBS'
              ? 'bg-[#1a1a1a] text-white border-black shadow-none font-bold'
              : 'bg-white dark:bg-slate-900 border-[#d1d1cf] dark:border-slate-800 text-[#1a1a1a] dark:text-slate-400 hover:bg-[#ebebe8] dark:hover:bg-slate-800/85'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`p-1.5 rounded-none ${tipoFiltro === 'NBS' ? 'bg-white text-black' : 'bg-[#ebebe8] dark:bg-slate-800 text-[#666]'}`}>
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <span className="block text-[9px] uppercase tracking-widest font-mono opacity-80">SERVIÇOS / IMATERIAIS</span>
              <span className="text-xs uppercase font-bold">Classificação NBS</span>
            </div>
          </div>
          {tipoFiltro === 'NBS' && <span className="h-2 w-2 bg-[#d94a38]" />}
        </button>
      </div>

      {/* Inputs de Formulação de Consulta */}
      <div className="bg-white dark:bg-slate-900 border border-[#d1d1cf] dark:border-slate-800 rounded-none p-5 shadow-none space-y-4">
        <div className="flex items-center gap-2 border-b border-[#f2f2f0] dark:border-slate-800 pb-2">
          <Filter className="h-3.5 w-3.5 text-[#007b5e]" />
          <h3 className="font-mono font-bold text-xs text-[#1a1a1a] dark:text-slate-300 uppercase tracking-wider">
            FILTROS E PARÂMETROS DA CONSULTA ({tipoFiltro})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Código Input */}
          <div className="space-y-1.5">
            <label htmlFor="input-codigo-fiscal" className="block text-[10px] uppercase font-mono font-bold text-[#666] dark:text-slate-450">
              Por máscara do código {tipoFiltro}
            </label>
            <div className="relative">
              <input
                id="input-codigo-fiscal"
                type="text"
                placeholder={tipoFiltro === 'NCM' ? 'EX: 2202.99.00' : 'EX: 01.01.11'}
                value={codigoBusca}
                onChange={handleCodigoChange}
                className="w-full pl-9 pr-3 py-2 rounded-none border border-[#d1d1cf] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100 placeholder-slate-450 focus:outline-[#1a1a1a] text-xs font-mono tracking-wider"
              />
              <Hash className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>
            {codigoBusca && (
              <p className={`text-[9px] font-mono font-bold uppercase tracking-wider ${mensagemFormat.includes('incompleto') ? 'text-[#d94a38]' : 'text-[#007b5e]'}`}>
                {mensagemFormat}
              </p>
            )}
            {buscandoApi && (
              <p className="text-[9px] text-[#007b5e] font-mono font-bold uppercase tracking-widest animate-pulse mt-1">
                ⚡ CONSULTANDO BASE NACIONAL CONFIÁVEL (BRASILAPI)...
              </p>
            )}
            {tipoFiltro === 'NCM' && !buscandoApi && (
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-1 leading-normal">
                💡 DIGITE QUALQUER NCM REAL (8 dígitos) para buscar na base oficial da BrasilAPI!
              </p>
            )}
          </div>

          {/* Descrição Input */}
          <div className="space-y-1.5">
            <label htmlFor="input-desc-fiscal" className="block text-[10px] uppercase font-mono font-bold text-[#666] dark:text-slate-450">
              Por descrição tipologia de mercado
            </label>
            <div className="relative">
              <input
                id="input-desc-fiscal"
                type="text"
                placeholder="EX: Software de gestão, Refrigerantes, Consultoria, Serviços Médicos..."
                value={descBusca}
                onChange={handleDescChange}
                className="w-full pl-9 pr-3 py-2 rounded-none border border-[#d1d1cf] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100 placeholder-slate-450 focus:outline-[#1a1a1a] text-xs"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Auto Sugestão Ativa & Resultados Rápidos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#d9a400] animate-pulse" />
            <h3 className="font-mono font-bold text-xs text-[#1a1a1a] dark:text-slate-300 uppercase tracking-widest">
              RESULTADO DA PESQUISA ({sugestoes.length})
            </h3>
          </div>
          <span className="text-[10px] bg-white dark:bg-slate-800 text-[#666] border border-[#d1d1cf] dark:border-slate-700 px-2.5 py-0.5 rounded-none font-mono font-bold uppercase">
            REGULAMENTO FICTÍCIO: 2027
          </span>
        </div>

        {sugestoes.length === 0 ? (
          <div className="bg-[#ebebe8] dark:bg-slate-950/40 rounded-none p-8 border border-dashed border-[#d1d1cf] dark:border-slate-800 text-center">
            <p className="text-xs uppercase font-mono font-bold text-[#666] dark:text-slate-450">
              Nenhum código correspondente para as regras atuais de busca.
            </p>
            <p className="text-xs text-slate-500 mt-1.5">
              Experimente digitar termos como "Refrigerante", "Cerveja", "Software", "Médicos" ou mude o filtro superior.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sugestoes.map((item) => {
              const isSelected = selectedCodigo?.id === item.id;
              return (
                <div
                  key={item.id}
                  id={`item-codigo-${item.id}`}
                  onClick={() => onSelectCodigo(item)}
                  className={`p-4 rounded-none border text-left transition-all duration-150 cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-[#1a1a1a] dark:border-slate-200 ring-2 ring-black dark:ring-white'
                      : 'bg-white dark:bg-slate-900 border-[#d1d1cf] dark:border-slate-800 text-[#1a1a1a] dark:text-slate-200 hover:bg-[#ebebe8] dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-extrabold bg-[#ebebe8] dark:bg-slate-800 text-[#1a1a1a] dark:text-slate-300 px-2.5 py-0.5 rounded-none">
                      {item.tipo_codigo} : {item.codigo}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border ${
                        item.status === 'Ativo'
                          ? 'bg-transparent text-[#007b5e] border-[#007b5e]/20'
                          : 'bg-transparent text-slate-500 border-slate-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#444] dark:text-slate-300 line-clamp-2 pr-5 font-medium leading-relaxed">
                    {item.descricao}
                  </p>

                  <div className="mt-3 pt-2 border-t border-[#f2f2f0] dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-[#666] dark:text-slate-500">
                    <span className="font-bold uppercase">DIRETO DA SIMULAÇÃO</span>
                    <span className="flex items-center gap-1 text-[#007b5e] dark:text-emerald-400 font-extrabold group-hover:translate-x-1 transition-transform">
                      EXPLORAR REFORMA <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute right-0 top-0 h-6 w-6 bg-[#1a1a1a] text-white flex items-center justify-center rounded-none">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
