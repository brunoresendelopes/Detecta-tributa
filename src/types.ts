/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CodigoFiscal {
  id: string; // EX-XXXX
  tipo_codigo: 'NCM' | 'NBS';
  codigo: string;
  descricao: string;
  tipo_item: 'bem' | 'serviço';
  data_inicio_vigencia: string;
  data_fim_vigencia?: string;
  status: 'Ativo' | 'Inativo';
}

export interface EnquadramentoTributario {
  id: string;
  codigo_fiscal_id: string;
  cClassTrib: string; // EX-XXXX
  CST_principal: string; // EX-XXX
  CST_regular: string; // EX-XXX
  CST_IS?: string; // EX-XXX
  incidencia_CBS: boolean;
  incidencia_IBS: boolean;
  incidencia_IS: boolean;
  aliquota_CBS: number; // e.g. 8.8 (fictional %)
  aliquota_IBS: number; // e.g. 17.7 (fictional %)
  aliquota_IS?: number; // e.g. 5.5 (fictional %)
  reducao_base?: string;
  reducao_aliquota?: string;
  aliquota_zero?: boolean;
  isencao?: boolean;
  suspensao?: boolean;
  diferimento?: boolean;
  regime_especifico?: string;
  observacoes: string;
  base_legal_resumo: string;
  base_legal_detalhada: string;
  data_inicio_vigencia: string;
  data_atualizacao: string;
  confiabilidade: 'verde' | 'amarelo' | 'vermelho';
  confiabilidade_justificativa: string;
}

export interface BaseLegal {
  id: string;
  ato_normativo: string;
  artigo: string;
  inciso?: string;
  paragrafo?: string;
  anexo?: string;
  descricao: string;
  link_oficial?: string;
}
