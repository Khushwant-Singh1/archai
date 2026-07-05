import React from "react";

export interface ProjectRequirements {
  functional_requirements: string[];
  non_functional_requirements: string[];
  business_domain: string;
  users: string[];
  integrations: string[];
  constraints: string[];
}

interface StructuredRequirementsProps {
  requirements: ProjectRequirements;
}

export function StructuredRequirements({ requirements }: StructuredRequirementsProps) {
  if (!requirements) return null;

  return (
    <div className="space-y-6 mb-12">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100">Structured Requirements (AI Extracted)</h2>
          <p className="text-xs text-slate-500 mt-1">Foundation constraints extracted from the SRS document</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Business Domain</h3>
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-3 text-sm text-slate-300">
            {requirements.business_domain || "N/A"}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Target Users / Roles</h3>
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-3 text-sm text-slate-300 flex flex-wrap gap-2">
            {requirements.users && requirements.users.length > 0 ? requirements.users.map((user, idx) => (
              <span key={idx} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/20">{user}</span>
            )) : "None specified"}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">External Integrations</h3>
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-3 text-sm text-slate-300 flex flex-wrap gap-2">
            {requirements.integrations && requirements.integrations.length > 0 ? requirements.integrations.map((int, idx) => (
              <span key={idx} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs border border-emerald-500/20">{int}</span>
            )) : "None specified"}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Key Constraints</h3>
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-3 text-sm text-slate-300 flex flex-wrap gap-2">
            {requirements.constraints && requirements.constraints.length > 0 ? requirements.constraints.map((c, idx) => (
              <span key={idx} className="bg-rose-500/20 text-rose-300 px-2 py-1 rounded text-xs border border-rose-500/20">{c}</span>
            )) : "None specified"}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Functional Requirements</h3>
        <ul className="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-sm text-slate-300 list-disc list-inside space-y-1">
          {requirements.functional_requirements && requirements.functional_requirements.length > 0 ? requirements.functional_requirements.map((req, idx) => (
            <li key={idx} className="leading-relaxed">{req}</li>
          )) : <li>None specified</li>}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Non-Functional Requirements</h3>
        <ul className="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-sm text-slate-300 list-disc list-inside space-y-1">
          {requirements.non_functional_requirements && requirements.non_functional_requirements.length > 0 ? requirements.non_functional_requirements.map((req, idx) => (
            <li key={idx} className="leading-relaxed">{req}</li>
          )) : <li>None specified</li>}
        </ul>
      </div>
    </div>
  );
}
