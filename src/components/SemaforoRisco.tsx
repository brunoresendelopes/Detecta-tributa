/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface SemaforoRiscoProps {
  nivel: 'verde' | 'amarelo' | 'vermelho';
  justificativa: string;
}

export default function SemaforoRisco({ nivel, justificativa }: SemaforoRiscoProps) {
  const configs = {
    verde: {
      bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800',
      textColor: 'text-emerald-900 dark:text-emerald-300',
      iconColor: 'text-emerald-600',
      label: 'Enquadramento Objetivo (Baixo Risco)',
      icon: CheckCircle,
      badgeBg: 'bg-emerald-700 text-white',
      desc: 'Regra linear ou imunidade constitucional muito bem definida de forma inequívoca.'
    },
    amarelo: {
      bgColor: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800',
      textColor: 'text-amber-900 dark:text-amber-300',
      iconColor: 'text-amber-600',
      label: 'Exige Atenção (Médio Risco)',
      icon: AlertTriangle,
      badgeBg: 'bg-amber-600 text-black',
      desc: 'Múltiplos enquadramentos possíveis ou aplicação sujeita a condicionantes operacionais.'
    },
    vermelho: {
      bgColor: 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800',
      textColor: 'text-rose-900 dark:text-rose-300',
      iconColor: 'text-rose-700',
      label: 'Alto Risco Interpretativo (Zona Cinzenta)',
      icon: AlertOctagon,
      badgeBg: 'bg-rose-700 text-white',
      desc: 'Margem ampla para interpretação fiscal divergente pelas autoridades ou dependente de laudo químico.'
    }
  };

  const current = configs[nivel] || configs.verde;
  const Icon = current.icon;

  return (
    <div
      id="semaforo-paine-risco"
      className={`border rounded-none p-4 ${current.bgColor} transition-colors duration-200 shadow-none`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-none bg-white dark:bg-slate-900 border border-[#d1d1cf] ${current.iconColor} flex-shrink-0 mt-0.5`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-[9px] font-mono uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-none border border-black/10 ${current.badgeBg}`}>
              RISCO {nivel}
            </span>
            <h4 className="font-mono font-bold text-xs uppercase text-[#1a1a1a] dark:text-slate-100">
              {current.label}
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
            {current.desc}
          </p>
          <div className="pt-2 border-t border-[#d1d1cf]/60 dark:border-slate-800 mt-2">
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
              Justificativa Técnica Fictícia:
            </span>
            <p className={`text-xs ${current.textColor} italic font-serif leading-relaxed`}>
              "{justificativa}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
