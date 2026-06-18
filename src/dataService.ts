/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CodigoFiscal, EnquadramentoTributario, BaseLegal } from './types';

// Banco de Dados Fictício Mockado representativo de regras da Reforma Tributária (EC 132/2023 / LC 214/2025)
// IMPORTANTE: Todas as alíquotas, códigos de enquadramento (CST, cClassTrib) e artigos são puramente FICTÍCIOS para fins de demonstração visual e lógica.

export const MOCK_CODIGOS_FISCAIS: CodigoFiscal[] = [
  {
    id: "EX-CF-001",
    tipo_codigo: "NCM",
    codigo: "2202.99.00",
    descricao: "Bebidas não alcoólicas gasificadas com aditivos de dulçor ou aromatizantes (Ex: Refrigerantes com açúcar livre)",
    tipo_item: "bem",
    data_inicio_vigencia: "2027-01-01",
    status: "Ativo"
  },
  {
    id: "EX-CF-002",
    tipo_codigo: "NBS",
    codigo: "01.01.11",
    descricao: "Serviços de desenvolvimento de softwares, aplicativos móveis e soluções digitais customizáveis ou de licenciamento geral",
    tipo_item: "serviço",
    data_inicio_vigencia: "2027-01-01",
    status: "Ativo"
  },
  {
    id: "EX-CF-003",
    tipo_codigo: "NCM",
    codigo: "3004.90.99",
    descricao: "Medicamentos e compostos químicos farmacêuticos essenciais destinados ao combate e tratamento oncológico (Câncer)",
    tipo_item: "bem",
    data_inicio_vigencia: "2027-01-01",
    status: "Ativo"
  },
  {
    id: "EX-CF-004",
    tipo_codigo: "NCM",
    codigo: "8703.80.00",
    descricao: "Veículos leves puramente elétricos recarregáveis via fonte externa, voltados ao transporte e trânsito urbano",
    tipo_item: "bem",
    data_inicio_vigencia: "2027-01-01",
    status: "Ativo"
  },
  {
    id: "EX-CF-005",
    tipo_codigo: "NBS",
    codigo: "12.01.14",
    descricao: "Serviços médicos e cirúrgicos especializados, consultas presenciais de medicina humana e exames integrados em clínicas",
    tipo_item: "serviço",
    data_inicio_vigencia: "2027-01-01",
    status: "Ativo"
  },
  {
    id: "EX-CF-006",
    tipo_codigo: "NCM",
    codigo: "2402.20.00",
    descricao: "Cigarros e compostos de tabaco manufaturados para fumantes e assemelhados (Sujeito a Alíquota Extra do Imposto Seletivo)",
    tipo_item: "bem",
    data_inicio_vigencia: "2027-01-01",
    status: "Ativo"
  },
  {
    id: "EX-CF-007",
    tipo_codigo: "NCM",
    codigo: "7325.99.00",
    descricao: "Outras obras moldadas, de ferro fundido, ferro ou aço (Ex: Tampas de bueiro, grelhas de escoamento, aduelas e peças industriais fundidas de metal duro)",
    tipo_item: "bem",
    data_inicio_vigencia: "2027-01-01",
    status: "Ativo"
  }
];

export const MOCK_ENQUADRAMENTOS_TRIBUTARIOS: EnquadramentoTributario[] = [
  // 1. Refrigerantes (NCM 2202.99.00) - MULTIPLOS ENQUADRAMENTOS (AMBIGUIDADE / IS)
  {
    id: "EX-ENQ-001A",
    codigo_fiscal_id: "EX-CF-001",
    cClassTrib: "EX-CCT-2202-A",
    CST_principal: "EX-CST-50-SUG", // Tributação Integral + Seletivo
    CST_regular: "EX-CST-01", // Regime Geral comum
    CST_IS: "EX-CST-IS-12", // Incidência de Imposto Seletivo Ativo
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: true,
    aliquota_CBS: 8.8,
    aliquota_IBS: 17.7,
    aliquota_IS: 15.0, // Alíquota extra de imposto sobre pecado
    reducao_base: "Nenhuma",
    reducao_aliquota: "Não se aplica",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Imposto Seletivo (IS) - Incide sobre bebidas carbonatadas com adição de açúcares artificiais de alto prejuízo à saúde pública.",
    observacoes: "Enquadramento de maior custo fiscal. Aplica-se se o teor de açúcares refinados ou adicionados ultrapassar 5g por 100ml de bebida comercializada pródiga.",
    base_legal_resumo: "Artigo 20, Inciso III, da Lei Fictícia Complementar EX-B-123. Critério de nocividade à saúde.",
    base_legal_detalhada: "Norma Técnica Exemplo EX-NT-2027/04B, Seção IV, Art. 12: Fica instituído o adicional de Imposto Seletivo (IS) no montante de 15,0% para produtos manufaturados com níveis nocivos de adoçamento adicionado a fim de desestimular o consumo sistêmico.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-15",
    confiabilidade: "vermelho",
    confiabilidade_justificativa: "Classificação em zona cinzenta. Exige verificação laboratorial por lote para comprovar se os aditivos líquidos estão realmente acima do limite legal de isenção do IS."
  },
  {
    id: "EX-ENQ-001B",
    codigo_fiscal_id: "EX-CF-001",
    cClassTrib: "EX-CCT-2202-B",
    CST_principal: "EX-CST-10-SUG", // Tributação Integral Regular comum (sem Seletivo)
    CST_regular: "EX-CST-01",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: false,
    aliquota_CBS: 8.8,
    aliquota_IBS: 17.7,
    aliquota_IS: 0.0,
    reducao_base: "Nenhuma",
    reducao_aliquota: "Não se aplica",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Regime Geral IBS e CBS - Comprovação de Bebida Isenta de Açúcar Adicionado.",
    observacoes: "Aplicável apenas para bebidas adoçadas unicamente com sucos naturais de frutas de forma orgânica sem açúcares químicos livres agregados.",
    base_legal_resumo: "Regulamento Complementar EX-RC-2025, Anexo II, Tabela de Exclusões do Seletivo.",
    base_legal_detalhada: "Regulamento Fiscal Exemplo EX-Reg-99, Art. 45: Ficam isentos da parcela do Imposto Seletivo os sucos e refrescos que contenham exclusivamente edulcorantes naturais homologados pela agência sanitária ou açúcares próprios da biomassa original do insumo.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-15",
    confiabilidade: "amarelo",
    confiabilidade_justificativa: "Exige auditoria de receitas industriais e certificado de pureza técnica expedido por laboratório oficial para mitigar o risco de classificação forçada e lavratura de multas."
  },

  // 2. Serviços de Software (NBS 01.01.11) - MULTIPLOS ENQUADRAMENTOS
  {
    id: "EX-ENQ-002A",
    codigo_fiscal_id: "EX-CF-002",
    cClassTrib: "EX-CCT-0101-TEC",
    CST_principal: "EX-CST-25-SUG", // Alíquota Reduzida Inovação
    CST_regular: "EX-CST-02",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: false,
    aliquota_CBS: 3.52, // Redução de 60% sobre a alíquota padrão fictícia de 8.8%
    aliquota_IBS: 7.08, // Redução de 60% sobre a alíquota padrão fictícia de 17.7%
    reducao_base: "Não",
    reducao_aliquota: "60% de desconto legal de fomento",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Regime de Fomento à Ciência, Inovação e Tecnologia (Incentivo do Art. 89 do Marco Legal Fictício).",
    observacoes: "Enquadramento aplicável apenas quando o software destina-se a fins estritos de pesquisa científica acadêmica aplicada, inovação fabril de fronteira ou automação industrial sustentável cadastrada.",
    base_legal_resumo: "Decreto Fictício Complementar EX-DEC-400, Seção V - Incentivo à Ciência.",
    base_legal_detalhada: "Anexo Técnico EX-Anexo-Tec, Art. 88, Parágrafo 3: As licenças de softwares dedicados de forma exclusiva e certificada ao controle ecológico e automação industrial limpa gozam de redução de 60% nos recolhimentos correntes do IBS e CBS.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-10",
    confiabilidade: "amarelo",
    confiabilidade_justificativa: "Reclama que a contratante declare formalmente em cartório o escopo estritamente industrial e inovador do projeto sob pena de descaracterização retroativa pelo fisco."
  },
  {
    id: "EX-ENQ-002B",
    codigo_fiscal_id: "EX-CF-002",
    cClassTrib: "EX-CCT-0101-GEN",
    CST_principal: "EX-CST-10-SUG", // Tributação Regular Comum
    CST_regular: "EX-CST-01",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: false,
    aliquota_CBS: 8.8,
    aliquota_IBS: 17.7,
    reducao_base: "Nenhuma",
    reducao_aliquota: "Não se aplica",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Regime Geral de Serviços Digitais.",
    observacoes: "Enquadramento padrão residencial para licenciamento de uso de sistemas comerciais de prateleira, controle administrativo geral e websites simples.",
    base_legal_resumo: "Lei Geral da Reforma Tributária EX-LGR-102, Título de Serviços de Tecnologia.",
    base_legal_detalhada: "Cesta Geral EX-Lei-214/25, Art. 110: Atividades de fornecimento e hospedagem de software que não configurem pesquisa aplicada ou fomento verde são tributadas pela alíquota nominal padrão unificada do regime geral.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-10",
    confiabilidade: "verde",
    confiabilidade_justificativa: "Alto grau de segurança jurídica. É a regra geral conservadora aplicável na maior parte das relações B2B de informática padrão."
  },

  // 3. Medicamentos (NCM 3004.90.99) - ENQUADRAMENTO ÚNICO ISENTO
  {
    id: "EX-ENQ-003",
    codigo_fiscal_id: "EX-CF-003",
    cClassTrib: "EX-CCT-3004-SAUDE",
    CST_principal: "EX-CST-00-SUG", // Isenção / Alíquota Zero Total
    CST_regular: "EX-CST-00", // Código de Isenção
    incidencia_CBS: false,
    incidencia_IBS: false,
    incidencia_IS: false,
    aliquota_CBS: 0.0,
    aliquota_IBS: 0.0,
    reducao_base: "Não aplicável",
    reducao_aliquota: "100% de isenção sob crivo constitucional",
    aliquota_zero: true,
    isencao: true,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Cesta Especial de Saúde Pública – Benefício Social Integrado.",
    observacoes: "Isenção integral incondicional para fins de garantia do direito básico à saúde humana de alta complexidade. Proteção constitucional integral livre de barreiras.",
    base_legal_resumo: "Norma Constitucional Fictícia EX-Ato-132, Artigo 153, Alínea g.",
    base_legal_detalhada: "Disposição Especial EX-A-132, Art. 153: Estão plenamente isentos do IBS e CBS as operações de circulação física ou digital de medicamentos de classificação oncológica que constem na lista oficial unificada do SUS.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-05-18",
    confiabilidade: "verde",
    confiabilidade_justificativa: "Enquadramento altamente objetivo e blindado por regra imunizante constitucional. Risco nulo de fiscalização contestatória."
  },

  // 4. Veículos Elétricos (NCM 8703.80.00) - MULTIPLOS ENQUADRAMENTOS (SUPOSTA TRANSIÇÃO)
  {
    id: "EX-ENQ-004A",
    codigo_fiscal_id: "EX-CF-004",
    cClassTrib: "EX-CCT-8703-PUB",
    CST_principal: "EX-CST-30-SUG", // Suspensão Incentivada
    CST_regular: "EX-CST-03",
    incidencia_CBS: false,
    incidencia_IBS: false,
    incidencia_IS: false,
    aliquota_CBS: 0.0,
    aliquota_IBS: 0.0,
    reducao_base: "Não aplicável",
    reducao_aliquota: "Suspensão total condicionada",
    aliquota_zero: false,
    isencao: false,
    suspensao: true,
    diferimento: false,
    regime_especifico: "Regime de Fomento à Transição da Matriz Energética Governamental (Frota Pública).",
    observacoes: "Disponível apenas para venda de veículos elétricos novos a órgãos do governo, prefeituras ou permissionárias de transporte urbano público formalmente cadastradas.",
    base_legal_resumo: "Ato Normativo Extra EX-ATO-TRANSIC-27, Seção II, Artigo 5º.",
    base_legal_detalhada: "Deliberação Governamental EX-Gov-05, Art. 5: Concede-se o diferimento ou a suspensão integral das obrigações de IBS e CBS na importação ou manufatura de automóveis de tração puramente elétrica destinados a integrar as frotas estaduais de mobilidade coletiva.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-01",
    confiabilidade: "amarelo",
    confiabilidade_justificativa: "Depende de formalização contratual de convênio público, validação prévia em portal ministerial e termos de destinação de frota assinados."
  },
  {
    id: "EX-ENQ-004B",
    codigo_fiscal_id: "EX-CF-004",
    cClassTrib: "EX-CCT-8703-PRIV",
    CST_principal: "EX-CST-10-SUG", // Regime Geral Comum
    CST_regular: "EX-CST-01",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: false,
    aliquota_CBS: 8.8,
    aliquota_IBS: 17.7,
    reducao_base: "Nenhuma",
    reducao_aliquota: "Não se aplica",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Regime Geral de Circulação de Veículos de Baixa Emissão (Particular).",
    observacoes: "Isento do Imposto Seletivo (IS) por não causar poluição atmosférica do ar, mas sujeito às alíquotas ordinárias gerais e unificadas da reforma.",
    base_legal_resumo: "Lei Federal de Isenção Verde EX-LV-204, Artigo 18 (Garantia de Não Incidência do Seletivo).",
    base_legal_detalhada: "Regramento Único EX-Lei-214/25, Art. 308: Ficam expressamente vedadas as incidências do adicional Seletivo de carbono ou consumo sobre tecnologias de veículos de locomoção puramente elétrica de zero poluentes durante sua vida útil ativa.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-01",
    confiabilidade: "verde",
    confiabilidade_justificativa: "Definição pacífica e linear na constituição. Relação fiscal transparente sem arestas interpretativas."
  },

  // 5. Serviços Médicos (NBS 12.01.14) - ENQUADRAMENTO ÚNICO REGIME FAVORECIDO
  {
    id: "EX-ENQ-005",
    codigo_fiscal_id: "EX-CF-005",
    cClassTrib: "EX-CCT-1201-FAV",
    CST_principal: "EX-CST-22-SUG", // Alíquota Reduzida Saúde
    CST_regular: "EX-CST-02",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: false,
    aliquota_CBS: 3.52, // Redução constitucional de 60%
    aliquota_IBS: 7.08, // Redução constitucional de 60%
    reducao_base: "Sim",
    reducao_aliquota: "60% de alíquota outorgada por direito constitucional à saúde",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Regime de Desconto Constitucional para a Saúde Humana.",
    observacoes: "Garante-se a redução imediata da carga fiscal base em sessenta por cento do valor nominal para desincentivar taxas criminosas sobre o bem de vida clínico do cidadão.",
    base_legal_resumo: "Texto Constitucional EC 132/2023, Artigo 150-A, Inciso I.",
    base_legal_detalhada: "Artigo Constitucional EX-EC132, Art. 150-A: Conceder-se-á abatimento compulsório de 60% na tributação de CBS e IBS nas atividades estritamente assistenciais médicas humanas de especialidade diagnóstica, cirúrgica ou clínica.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-04-10",
    confiabilidade: "verde",
    confiabilidade_justificativa: "Enquadramento altamente estável. O cadastro profissional ativo (CRM) da pessoa jurídica ou de seus contratados diretos já é o suficiente para salvaguarda tributária."
  },

  // 6. Cigarros (NCM 2402.20.00) - ENQUADRAMENTO ÚNICO IMPOSTO SELETIVO ALTO
  {
    id: "EX-ENQ-006",
    codigo_fiscal_id: "EX-CF-006",
    cClassTrib: "EX-CCT-2402-SELET",
    CST_principal: "EX-CST-55-SUG", // Incidência Máxima de IS
    CST_regular: "EX-CST-01",
    CST_IS: "EX-CST-IS-90",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: true,
    aliquota_CBS: 8.8,
    aliquota_IBS: 17.7,
    aliquota_IS: 30.0, // Imposto sobre Pecado gravíssimo
    reducao_base: "Nenhuma",
    reducao_aliquota: "Expressamente proibida qualquer redução ou benefício fiscal",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Imposto Seletivo Federal Extraordinário (Sin Tax / Imposto do Pecado).",
    observacoes: "Incidência punitiva compulsória cumulativa com tributação nominal ordinária com intuito fiscal de encarecer significativamente o fumo e coibir o vício sistêmico geral.",
    base_legal_resumo: "Carta da Reforma Tributária, Artigo 153, Parágrafo 6º da CRFB fictícia.",
    base_legal_detalhada: "Emenda Constitucional Exemplo EX-EC-132, Art. 153-6: Fica instituído o adicional de Imposto Seletivo prejudicial ao fumo e tabagistas na monta máxima admissível de 30% decorrente da exteriorização prejudicial dos resíduos na rede pública de tratamento oncológico.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-12",
    confiabilidade: "verde",
    confiabilidade_justificativa: "Imposição compulsória e absoluta do legislador constitucional sem brechas legítimas de contestação jurídica ou contábil preventiva."
  },
  {
    id: "EX-ENQ-007A",
    codigo_fiscal_id: "EX-CF-007",
    cClassTrib: "EX-CCT-7325-GEN",
    CST_principal: "EX-CST-10-SUG",
    CST_regular: "EX-CST-01",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: false,
    aliquota_CBS: 8.8,
    aliquota_IBS: 17.7,
    aliquota_IS: 0.0,
    reducao_base: "Nenhuma",
    reducao_aliquota: "Não se aplica",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Regime Geral IBS e CBS - Obras Moldadas Industriais de Aço/Ferro.",
    observacoes: "Tributação nominal unificada para circulação de manufaturados fundidos comuns de fins industriais ou comerciais sem destinações especiais.",
    base_legal_resumo: "Emenda Constitucional nº 132/2023, Artigo 156-A e regulamentos de transição de 2027.",
    base_legal_detalhada: "Lei Complementar Fictícia nº 214/2025, Art. 10: Fica instituído o regime regulamentado nominal das mercadorias moldadas em ligas metálicas com aplicação da totalidade da alíquota unificada de 26,5% (CBS + IBS).",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-18",
    confiabilidade: "verde",
    confiabilidade_justificativa: "Operação padrão em conformidade com as regras gerais da reforma tributária de 2027. Baixo risco de fiscalização direta."
  },
  {
    id: "EX-ENQ-007B",
    codigo_fiscal_id: "EX-CF-007",
    cClassTrib: "EX-CCT-7325-INFRA",
    CST_principal: "EX-CST-35-SUG",
    CST_regular: "EX-CST-03",
    incidencia_CBS: false,
    incidencia_IBS: false,
    incidencia_IS: false,
    aliquota_CBS: 0.0,
    aliquota_IBS: 0.0,
    aliquota_IS: 0.0,
    reducao_base: "Sim - Diferimento de Drenagem",
    reducao_aliquota: "Suspensão temporária para saneamento",
    aliquota_zero: false,
    isencao: false,
    suspensao: true,
    diferimento: true,
    regime_especifico: "Regime de Diferimento para Obras de Infraestrutura, Saneamento e Empreendimentos de Interesse Público.",
    observacoes: "Aplicável quando as obras de ferro fundido (como tampas, grelhas ou aduelas) forem adquiridas diretamente para incorporação em concessões de saneamento básico homologadas ou drenagem urbana.",
    base_legal_resumo: "Projeto de Lei Complementar nº 214/2025 (Fictício), Artigo 42 (Incentivo ao Saneamento Saneadora).",
    base_legal_detalhada: "Projeto de Lei Complementar Fictício nº 214/2025, Art. 42: Fica postergado ou diferido o recolhimento do imposto dual (IBS/CBS) nas aquisições de artefatos fundidos metálicos estruturais por prestadoras de serviços públicos regulados de tratamento de esgoto.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-18",
    confiabilidade: "amarelo",
    confiabilidade_justificativa: "Requer comprovação contratual robusta e laudo de engenharia que ateste a destinação final exclusiva nas obras de saneamento ou drenagem urbana qualificada."
  },
  {
    id: "EX-ENQ-007C",
    codigo_fiscal_id: "EX-CF-007",
    cClassTrib: "EX-CCT-7325-CARBONO",
    CST_principal: "EX-CST-50-SUG",
    CST_regular: "EX-CST-01",
    CST_IS: "EX-CST-IS-15",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: true,
    aliquota_CBS: 8.8,
    aliquota_IBS: 17.7,
    aliquota_IS: 5.0,
    reducao_base: "Nenhuma",
    reducao_aliquota: "Não se aplica",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Simulação de Imposto Seletivo Verde / Penalização por Pegada de Carbono Siderúrgico.",
    observacoes: "Discussão regulatória fictícia referente à incidência do Imposto Seletivo sobre produtos siderúrgicos de alta pegada de carbono ou que não empreguem sucata reciclada (aço verde).",
    base_legal_resumo: "Discussão regulamentada no teor complementar sobre impostos extraordinários de emissões de CO2.",
    base_legal_detalhada: "Dispositivo de Transição Fictício EX-BL-Ecológico, Seção 3: Peças siderúrgicas sem laudo técnico atestado de origem de reciclagem ou energia de matriz limpa acima de 70% poderão receber sobretaxação de 5% de Imposto Seletivo para equiparação ambiental.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-18",
    confiabilidade: "vermelho",
    confiabilidade_justificativa: "Zona crítica interpretativa. Diversos juristas contestam o uso de Seletivo (IS) como adicional ecológico de siderurgia. Exige certificação de conformidade."
  }
];

export const MOCK_BASES_LEGAIS: BaseLegal[] = [
  {
    id: "EX-BL-01",
    ato_normativo: "Emenda Constitucional nº 132/2023 (Fictícia)",
    artigo: "Artigo 153, § 6º",
    paragrafo: "Inciso II",
    descricao: "Dispõe sobre a instituição do Imposto Seletivo (IS) de competência tributária federal com o objetivo de desestimular o consumo de bens e serviços prejudiciais à saúde ou ao meio ambiente conforme critérios de lei complementar.",
    link_oficial: "#"
  },
  {
    id: "EX-BL-02",
    ato_normativo: "Projeto de Lei Complementar nº 214/2025 (Fictício)",
    artigo: "Artigo 45 ao 50",
    anexo: "Anexo Técnico de Reduções de Alíquota",
    descricao: "Contempla as reduções de alíquota gerais e as isenções sociais unificadas de CBS e IBS voltadas aos direitos fundamentais de saúde, alimentação, transporte urbano coletivo e software ambiental.",
    link_oficial: "#"
  },
  {
    id: "EX-BL-03",
    ato_normativo: "Norma Técnica Exemplo EX-NT-2027/04B (Fictícia)",
    artigo: "Artigo 12, Tabela C",
    paragrafo: "Item 4",
    descricao: "Aprova as diretrizes industriais para aferição laboratorial de resíduos químicos nocivos, aromatizantes artificiais e taxas de açúcares passíveis de Imposto Seletivo em embalagens de prateleira.",
    link_oficial: "#"
  },
  {
    id: "EX-BL-04",
    ato_normativo: "Marco Legal da Inovação e TI - EX-MGL-2026 (Fictício)",
    artigo: "Artigo 88, § 3º",
    descricao: "Institui o regime fiscal diferenciado de amortização e deduções para empresas atuantes no fomento das fronteiras analíticas de inteligência artificial profunda, automação limpa e software verde.",
    link_oficial: "#"
  },
  {
    id: "EX-BL-05",
    ato_normativo: "Lei Geral de Circulação Verde EX-LV-204 (Fictícia)",
    artigo: "Artigo 18",
    inciso: "Alínea b",
    descricao: "Veda taxação cumulativa do Seletivo Ambiental para fontes de tração que utilizem biocombustíveis puros ou tecnologia elétrica certificada sob chancela ambiental do Ibama fictício.",
    link_oficial: "#"
  }
];

// DATA SERVICE LAYER (Bypassable for direct Real API connections in the future)

export const dataService = {
  /**
   * Obtém todos os códigos fiscais cadastrados
   */
  getAllCodigos: async (): Promise<CodigoFiscal[]> => {
    // Simula atraso saudável de rede de 100ms para manter a filosofia pronto para API
    await new Promise(resolve => setTimeout(resolve, 80));
    return [...MOCK_CODIGOS_FISCAIS];
  },

  /**
   * Obtém um código fiscal pelo ID
   */
  getCodigoById: async (id: string): Promise<CodigoFiscal | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return MOCK_CODIGOS_FISCAIS.find(c => c.id === id);
  },

  /**
   * Busca códigos por código literal ou descrição comercial/fiscal
   */
  searchCodigos: async (query: string, filterTipo?: 'NCM' | 'NBS'): Promise<CodigoFiscal[]> => {
    await new Promise(resolve => setTimeout(resolve, 80));
    const normalizedQuery = query.toLowerCase().trim();

    // Se no filtro NCM, o usuário digitou exatamente 8 números
    const cleanNumbers = normalizedQuery.replace(/\D/g, '');
    if ((!filterTipo || filterTipo === 'NCM') && cleanNumbers.length === 8) {
      // Verifica se já temos ele localmente
      const localFound = MOCK_CODIGOS_FISCAIS.find(c => c.tipo_codigo === 'NCM' && c.codigo.replace(/\D/g, '') === cleanNumbers);
      if (!localFound) {
        // Tenta buscar no Banco de Dados confiável nacional (BrasilAPI)
        try {
          const apiResult = await dataService.fetchOfficialNcm(cleanNumbers);
          if (apiResult) {
            return [apiResult];
          }
        } catch (e) {
          console.warn("Erro ao buscar NCM na bases oficiais:", e);
        }
      }
    }

    if (!normalizedQuery) {
      if (filterTipo) {
        return MOCK_CODIGOS_FISCAIS.filter(c => c.tipo_codigo === filterTipo);
      }
      return [...MOCK_CODIGOS_FISCAIS];
    }

    return MOCK_CODIGOS_FISCAIS.filter(item => {
      // Filtra por tipo (NCM | NBS) se selecionado
      if (filterTipo && item.tipo_codigo !== filterTipo) {
        return false;
      }
      // Busca no código ou descrição
      const matchesCodigo = item.codigo.replace(/\D/g, '').includes(normalizedQuery.replace(/\D/g, '')) || item.codigo.includes(normalizedQuery);
      const matchesDesc = item.descricao.toLowerCase().includes(normalizedQuery);
      return matchesCodigo || matchesDesc;
    });
  },

  /**
   * Busca um código NCM oficial diretamente na API confiável (BrasilAPI)
   */
  fetchOfficialNcm: async (codigo: string): Promise<CodigoFiscal | null> => {
    const cleanCode = codigo.replace(/\D/g, '');
    if (cleanCode.length !== 8) return null;

    try {
      // API oficial gratuita e sem chaves: BrasilAPI
      const response = await fetch(`https://brasilapi.com.br/api/ncm/v1/${cleanCode}`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      if (data && data.codigo) {
        // Formata o código no padrão XXXX.XX.XX
        const formatted = data.codigo.substring(0, 4) + '.' + data.codigo.substring(4, 6) + '.' + data.codigo.substring(6, 8);
        
        const newCf: CodigoFiscal = {
          id: `API-NCM-${cleanCode}`,
          tipo_codigo: 'NCM',
          codigo: formatted,
          descricao: data.descricao || 'Obras ou mercadorias descritas na base nacional.',
          tipo_item: 'bem',
          data_inicio_vigencia: data.data_inicio || '2027-01-01',
          status: 'Ativo'
        };

        // Adiciona temporariamente à base em memória
        if (!MOCK_CODIGOS_FISCAIS.some(c => c.id === newCf.id)) {
          MOCK_CODIGOS_FISCAIS.push(newCf);

          // Gera enquadramentos inteligentes com regras reais de incidência de IS/CBS/IBS
          const generatedEnqs = generateEnquadramentosForDynamicNcm(newCf);
          MOCK_ENQUADRAMENTOS_TRIBUTARIOS.push(...generatedEnqs);
        }

        return newCf;
      }
    } catch (err) {
      console.warn("Falha de conexão com a BrasilAPI:", err);
    }
    return null;
  },

  /**
   * Obtém enquadramentos associados a um código fiscal ID
   */
  getEnquadramentosForCodigo: async (codigoFiscalId: string): Promise<EnquadramentoTributario[]> => {
    await new Promise(resolve => setTimeout(resolve, 70));
    return MOCK_ENQUADRAMENTOS_TRIBUTARIOS.filter(e => e.codigo_fiscal_id === codigoFiscalId);
  },

  /**
   * Retorna todas as bases legais cadastradas
   */
  getAllBasesLegais: async (): Promise<BaseLegal[]> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return [...MOCK_BASES_LEGAIS];
  },

  /**
   * Busca as bases legais pelo ID ou texto correspondente
   */
  getBaseLegalById: (id: string): BaseLegal | undefined => {
    return MOCK_BASES_LEGAIS.find(b => b.id === id);
  }
};

// HELPER INTELIGENTE: Gerador de Regras Progressivas da Reforma para Obras Fiscais do BrasilAPI
function generateEnquadramentosForDynamicNcm(cf: CodigoFiscal): EnquadramentoTributario[] {
  const codeDigits = cf.codigo.replace(/\D/g, '');
  const prefix2 = codeDigits.substring(0, 2);
  const prefix4 = codeDigits.substring(0, 4);

  const enqs: EnquadramentoTributario[] = [];

  // Padrão Geral Nominal da Reforma
  let isRate = 0.0;
  let isIncidence = false;
  let obsGeral = "Operação comum de circulação industrial sob recolhimento pleno unificado.";
  
  // Regras de inteligência de simulação conforme classes NCM conhecidas
  if (prefix2 === '30' || prefix4 === '3822') { // Saúde / Medicamentos / Diagnosticadores
    enqs.push({
      id: `ENQ-DYN-${codeDigits}-RED`,
      codigo_fiscal_id: cf.id,
      cClassTrib: `EX-CCT-${prefix2}-SAUDE`,
      CST_principal: "EX-CST-12-SUG",
      CST_regular: "EX-CST-02",
      incidencia_CBS: true,
      incidencia_IBS: true,
      incidencia_IS: false,
      aliquota_CBS: 3.52, // 60% de redução
      aliquota_IBS: 7.08, // 60% de redução
      aliquota_IS: 0.0,
      reducao_base: "Base Integral",
      reducao_aliquota: "Redução de 60% (Fins de Saúde)",
      aliquota_zero: false,
      isencao: false,
      suspensao: false,
      diferimento: false,
      regime_especifico: "Alíquota favorecida constitucional para insumos de saúde recomendados.",
      observacoes: "Medicamento humano atestado sob regulamento do SUS e conselhos nacionais de saúde.",
      base_legal_resumo: "Lei Complementar nº 214/2025, Artigo 9º.",
      base_legal_detalhada: "Bens e serviços associados à proteção da saúde possuem desoneração de 60% nas alíquotas padrões estabelecidas.",
      data_inicio_vigencia: "2027-01-01",
      data_atualizacao: "2026-06-18",
      confiabilidade: "verde",
      confiabilidade_justificativa: "Redução de alíquota expressamente assegurada na reforma tributária nacional."
    });
  } else if (prefix4 === '2202' || prefix4 === '2203' || prefix2 === '24') { // Bebidas doces, álcoois, cigarros
    isRate = 5.0;
    isIncidence = true;
    obsGeral = "Incidência de Imposto Seletivo Federal ecológico/social adicional sobre consumo residual.";

    enqs.push({
      id: `ENQ-DYN-${codeDigits}-IS`,
      codigo_fiscal_id: cf.id,
      cClassTrib: `EX-CCT-${prefix4}-SELETIVO`,
      CST_principal: "EX-CST-50-SUG",
      CST_regular: "EX-CST-01",
      CST_IS: "EX-CST-IS-10",
      incidencia_CBS: true,
      incidencia_IBS: true,
      incidencia_IS: true,
      aliquota_CBS: 8.8,
      aliquota_IBS: 17.7,
      aliquota_IS: 5.0,
      reducao_base: "Nenhuma",
      reducao_aliquota: "Não se aplica",
      aliquota_zero: false,
      isencao: false,
      suspensao: false,
      diferimento: false,
      regime_especifico: "Penalização Geral via Imposto Seletivo (Imposto do Pecado) sob Alíquota de 5.0%.",
      observacoes: "Fato gerador de desestímulo ao consumo em vigor a partir de 2027 para formulações com elevados volumes de componentes artificiais.",
      base_legal_resumo: "Artigo 153, VIII da Emenda Constitucional 132/2023.",
      base_legal_detalhada: "O imposto seletivo incide sobre a comercialização, importação ou fabricação de bens que possam acarretar danos biológicos ou ambientais.",
      data_inicio_vigencia: "2027-01-01",
      data_atualizacao: "2026-06-18",
      confiabilidade: "amarelo",
      confiabilidade_justificativa: "Enquadramento altamente sensível com discussões intensas sobre limites de tolerância técnica."
    });
  } else if (prefix2 === '72' || prefix2 === '73') { // Obras de metais e fundição (como o 7325.99.00)
    enqs.push({
      id: `ENQ-DYN-${codeDigits}-INFRA`,
      codigo_fiscal_id: cf.id,
      cClassTrib: `EX-CCT-${prefix2}-MET-INFRA`,
      CST_principal: "EX-CST-35-SUG",
      CST_regular: "EX-CST-03",
      incidencia_CBS: false,
      incidencia_IBS: false,
      incidencia_IS: false,
      aliquota_CBS: 0.0,
      aliquota_IBS: 0.0,
      aliquota_IS: 0.0,
      reducao_base: "Suspensão Técnica de Infraestrutura",
      reducao_aliquota: "Diferimento integral homologado",
      aliquota_zero: false,
      isencao: false,
      suspensao: true,
      diferimento: true,
      regime_especifico: "Regime com Suspensão/Diferimento do IBS/CBS para Incorporação Metálica em Infraestrutura e Saneamento.",
      observacoes: "Permite postergação integral do recolhimento quando o artefato moldado de aço ou ferro for faturado diretamente para consórcios de obras públicas homologadas.",
      base_legal_resumo: "Projeto de Lei Complementar nº 214/2025, Seção Saneamento.",
      base_legal_detalhada: "Fica suspenso o IBS e CBS Incidentes sobre materiais e insumos metálicos de drenagem hidráulica, saneamento e infraestrutura quando destinados a obras públicas.",
      data_inicio_vigencia: "2027-01-01",
      data_atualizacao: "2026-06-18",
      confiabilidade: "amarelo",
      confiabilidade_justificativa: "Necessita de credenciamento do fornecedor e aprovação prévia do projeto de investimento no órgão fiscalizador."
    });
  } else if (['01', '02', '03', '07', '08', '09', '10', '11', '12', '15', '17', '19'].includes(prefix2)) { // Cesta básica, grãos, carnes, hortaliças
    enqs.push({
      id: `ENQ-DYN-${codeDigits}-ZERO`,
      codigo_fiscal_id: cf.id,
      cClassTrib: `EX-CCT-${prefix2}-ALIMENTO`,
      CST_principal: "EX-CST-40-SUG",
      CST_regular: "EX-CST-05",
      incidencia_CBS: false,
      incidencia_IBS: false,
      incidencia_IS: false,
      aliquota_CBS: 0.0,
      aliquota_IBS: 0.0,
      aliquota_IS: 0.0,
      reducao_base: "Redução de 100% (Cesta Básica Social)",
      reducao_aliquota: "Alíquota Zero Homologada",
      aliquota_zero: true,
      isencao: true,
      suspensao: false,
      diferimento: false,
      regime_especifico: "Isenção Plena para Merenda e Alimentação Humana Direta da Cesta Básica.",
      observacoes: "Zera as alíquotas de IBS e CBS para itens alimentícios constitucionais de cesta básica para combate de fome de vulneráveis.",
      base_legal_resumo: "Art. 156-A, § 5º da CF pela EC 132/2023.",
      base_legal_detalhada: "Dispõe que lei ordinária de consolidação detalhará o rol inviolável de produtos alimentícios com imposto seletivo, IBS e CBS zerados.",
      data_inicio_vigencia: "2027-01-01",
      data_atualizacao: "2026-06-18",
      confiabilidade: "verde",
      confiabilidade_justificativa: "Pilar absoluto de desoneração de consumo social e popular na nova constituição tributária."
    });
  }

  // Regime Geral Padrão
  enqs.push({
    id: `ENQ-DYN-${codeDigits}-GERAL`,
    codigo_fiscal_id: cf.id,
    cClassTrib: `EX-CCT-${prefix2 || 'GEN'}-STANDARD`,
    CST_principal: "EX-CST-10-SUG",
    CST_regular: "EX-CST-01",
    incidencia_CBS: true,
    incidencia_IBS: true,
    incidencia_IS: isIncidence,
    aliquota_CBS: 8.8,
    aliquota_IBS: 17.7,
    aliquota_IS: isRate,
    reducao_base: "Nenhuma",
    reducao_aliquota: "Não se aplica",
    aliquota_zero: false,
    isencao: false,
    suspensao: false,
    diferimento: false,
    regime_especifico: "Regime Geral IBS/CBS Nominal das Atividades Comerciais e Industriais Gerais.",
    observacoes: obsGeral,
    base_legal_resumo: "Emenda Constitucional nº 132/2023, Artigo 156-A (IBS) e Artigo 195, V (CBS).",
    base_legal_detalhada: "As operações ordinárias com faturamento e industrialização de mercadorias comuns recolhem a alíquota referencial e unificada estabelecida em 26,5% para recomposição do caixa subnacional.",
    data_inicio_vigencia: "2027-01-01",
    data_atualizacao: "2026-06-18",
    confiabilidade: "verde",
    confiabilidade_justificativa: "Incidência tributária normal sobre a classe sem exceções setoriais documentadas."
  });

  return enqs;
}
