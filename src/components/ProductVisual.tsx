import React from 'react';
import { Product } from '../types/store';

interface ProductVisualProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'detail';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  className = '',
  size = 'md',
}) => {
  const { visualType, category } = product;

  // Render authentic domain-crafted technical illustrations
  const renderIllustration = () => {
    switch (visualType) {
      case 'wire-coil':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background subtle grid */}
            <rect width="240" height="180" rx="8" fill="#0F172A" />
            <path d="M20 90h200M120 20v140" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Shadow beneath coil */}
            <ellipse cx="120" cy="142" rx="76" ry="18" fill="#020617" opacity="0.6" />

            {/* Copper wire coils concentric rings */}
            <ellipse cx="120" cy="98" rx="72" ry="34" stroke="#78350F" strokeWidth="16" />
            <ellipse cx="120" cy="94" rx="70" ry="32" stroke="#B45309" strokeWidth="14" />
            <ellipse cx="120" cy="90" rx="68" ry="30" stroke="#D97706" strokeWidth="12" />
            <ellipse cx="120" cy="86" rx="64" ry="28" stroke="#F59E0B" strokeWidth="10" />

            {/* Internal spool core */}
            <ellipse cx="120" cy="85" rx="34" ry="15" fill="#0B132B" stroke="#334155" strokeWidth="2" />
            
            {/* Cable ties / binding strips */}
            <path d="M85 64v50M155 64v50M120 54v20M120 98v28" stroke="#F1F5F9" strokeWidth="3" strokeLinecap="round" />
            <rect x="83" y="82" width="5" height="10" rx="2" fill="#E2E8F0" />
            <rect x="153" y="82" width="5" height="10" rx="2" fill="#E2E8F0" />

            {/* Exposed copper wire tip showing multi-strand copper */}
            <path d="M178 96c14-2 26-14 30-28" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
            <path d="M208 68l10-8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="218" cy="60" r="2.5" fill="#FDE047" />

            {/* Tech tag */}
            <g transform="translate(18, 22)">
              <rect width="64" height="18" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="32" y="12.5" fill="#E2E8F0" fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="0.5">
                IS:694 FRLS
              </text>
            </g>
          </svg>
        );

      case 'switch-socket':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />
            <ellipse cx="120" cy="148" rx="80" ry="14" fill="#020617" opacity="0.5" />

            {/* Modular faceplate */}
            <rect x="42" y="32" width="156" height="104" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="2" />
            <rect x="46" y="36" width="148" height="96" rx="8" fill="#0B132B" stroke="#334155" strokeWidth="1" />

            {/* Switch 1: Rocker */}
            <rect x="62" y="52" width="34" height="64" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <path d="M64 54h30v36H64z" fill="#334155" />
            <rect x="77" y="58" width="4" height="2" rx="1" fill="#EF4444" /> {/* Switch ON indicator pip */}

            {/* Socket Unit with child shutters */}
            <rect x="110" y="52" width="74" height="64" rx="6" fill="#182234" stroke="#334155" strokeWidth="1.5" />
            {/* Earth Pin Top */}
            <circle cx="147" cy="68" r="6.5" fill="#090E17" stroke="#475569" strokeWidth="1.5" />
            {/* Live and Neutral shutter slots */}
            <rect x="131" y="86" width="7" height="12" rx="2" fill="#090E17" stroke="#334155" strokeWidth="1" />
            <rect x="156" y="86" width="7" height="12" rx="2" fill="#090E17" stroke="#334155" strokeWidth="1" />
            {/* Smaller 6A secondary pin holes */}
            <circle cx="134" cy="103" r="3" fill="#090E17" />
            <circle cx="160" cy="103" r="3" fill="#090E17" />

            {/* Status LED glow */}
            <circle cx="98" cy="120" r="2.5" fill="#F59E0B" />
            <circle cx="98" cy="120" r="5" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />

            {/* Tech tag */}
            <g transform="translate(18, 16)">
              <rect width="56" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="28" y="11.5" fill="#94A3B8" fontSize="8.5" fontWeight="600" textAnchor="middle">
                16A / 240V
              </text>
            </g>
          </svg>
        );

      case 'led-bulb':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />
            
            {/* Ambient soft glow radiating */}
            <circle cx="120" cy="72" r="48" fill="#F59E0B" opacity="0.12" />
            <circle cx="120" cy="72" r="32" fill="#FEF08A" opacity="0.18" />

            {/* Recessed Downlight Rim */}
            <ellipse cx="120" cy="74" rx="64" ry="24" fill="#1E293B" stroke="#475569" strokeWidth="2.5" />
            <ellipse cx="120" cy="74" rx="52" ry="18" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            {/* Stepped baffle reflector */}
            <ellipse cx="120" cy="75" rx="38" ry="12" fill="#1E293B" />
            <ellipse cx="120" cy="76" rx="24" ry="8" fill="#FFFBEB" stroke="#FDE047" strokeWidth="2" />

            {/* Die-cast cooling heatsink fins above */}
            <path d="M85 64V38h70v26" stroke="#475569" strokeWidth="2" fill="#182234" />
            <path d="M96 38v24M108 38v24M120 38v24M132 38v24M144 38v24" stroke="#334155" strokeWidth="2" />

            {/* Spring mounting clips */}
            <path d="M54 70l-22-14M186 70l22-14" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="56" r="3" fill="#EF4444" />
            <circle cx="208" cy="56" r="3" fill="#EF4444" />

            {/* Technical Driver Box connected */}
            <rect x="78" y="122" width="84" height="32" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
            <path d="M120 98v24" stroke="#94A3B8" strokeWidth="3" strokeDasharray="2 2" />
            <text x="120" y="142" fill="#E2E8F0" fontSize="9" fontWeight="600" textAnchor="middle">
              SURGE DRIVER 3.5kV
            </text>

            <g transform="translate(18, 16)">
              <rect width="66" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="33" y="11.5" fill="#FDE047" fontSize="8.5" fontWeight="600" textAnchor="middle">
                4000K · CRI&gt;85
              </text>
            </g>
          </svg>
        );

      case 'ceiling-fan':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />
            
            {/* Ceiling downrod and canopy */}
            <rect x="117" y="16" width="6" height="42" fill="#475569" />
            <ellipse cx="120" cy="18" rx="16" ry="6" fill="#334155" />

            {/* Airflow motion hints */}
            <path d="M40 144c20 8 50 14 80 14s60-6 80-14" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

            {/* Three aerofoil blades */}
            {/* Blade 1 (Left-top angle) */}
            <path d="M102 70L24 46c-6-2-8 6-3 10l84 32" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <path d="M30 49l66 22" stroke="#334155" strokeWidth="1" />
            {/* Blade 2 (Right-top angle) */}
            <path d="M138 70l78-24c6-2 8 6 3 10l-84 32" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <path d="M210 49l-66 22" stroke="#334155" strokeWidth="1" />
            {/* Blade 3 (Bottom center) */}
            <path d="M112 100l-6 58c0 6 16 6 18 0l-2-58" fill="#182234" stroke="#475569" strokeWidth="1.5" />

            {/* Central motor housing with bronze/gold ring accent */}
            <ellipse cx="120" cy="85" rx="30" ry="24" fill="#0F172A" stroke="#475569" strokeWidth="2.5" />
            <ellipse cx="120" cy="84" rx="22" ry="16" fill="#1E293B" stroke="#D97706" strokeWidth="2" />
            <circle cx="120" cy="83" r="8" fill="#D97706" />

            <g transform="translate(18, 16)">
              <rect width="66" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="33" y="11.5" fill="#38BDF8" fontSize="8.5" fontWeight="600" textAnchor="middle">
                1200mm · 230 CMM
              </text>
            </g>
          </svg>
        );

      case 'mcb-breaker':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />

            {/* DIN Rail section */}
            <rect x="20" y="80" width="200" height="20" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
            <line x1="20" y1="90" x2="220" y2="90" stroke="#475569" strokeWidth="1" strokeDasharray="6 3" />

            {/* MCB DP (Double Pole) Chassis */}
            <rect x="75" y="32" width="90" height="116" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
            <line x1="120" y1="32" x2="120" y2="148" stroke="#CBD5E1" strokeWidth="2" />

            {/* Top Terminals with copper screws */}
            <rect x="88" y="38" width="16" height="16" rx="2" fill="#334155" />
            <circle cx="96" cy="46" r="4" fill="#D97706" />
            <rect x="133" y="38" width="16" height="16" rx="2" fill="#334155" />
            <circle cx="141" cy="46" r="4" fill="#D97706" />

            {/* Breaker Handles / Dolly (Orange / Black toggles connected by pin) */}
            <rect x="86" y="74" width="20" height="34" rx="4" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
            <rect x="131" y="74" width="20" height="34" rx="4" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
            <rect x="100" y="86" width="37" height="8" rx="2" fill="#0F172A" />

            {/* Status Windows: Red ON indication */}
            <rect x="91" y="62" width="10" height="7" rx="1.5" fill="#DC2626" />
            <rect x="136" y="62" width="10" height="7" rx="1.5" fill="#DC2626" />

            {/* Breaker Markings */}
            <text x="96" y="125" fill="#0F172A" fontSize="9" fontWeight="700" textAnchor="middle">
              C32
            </text>
            <text x="141" y="125" fill="#0F172A" fontSize="9" fontWeight="700" textAnchor="middle">
              10kA
            </text>

            <g transform="translate(18, 16)">
              <rect width="64" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="32" y="11.5" fill="#F87171" fontSize="8.5" fontWeight="600" textAnchor="middle">
                DP C-CURVE 10kA
              </text>
            </g>
          </svg>
        );

      case 'multimeter':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />

            {/* Multimeter body (heavy duty yellow holster with dark grey interior) */}
            <rect x="74" y="24" width="92" height="132" rx="14" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />
            <rect x="80" y="30" width="80" height="120" rx="10" fill="#1E293B" />

            {/* LCD Display */}
            <rect x="88" y="38" width="64" height="34" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            <text x="146" y="62" fill="#4ADE80" fontSize="16" fontWeight="700" textAnchor="end" fontFamily="monospace">
              230.4
            </text>
            <text x="146" y="69" fill="#4ADE80" fontSize="7" fontWeight="600" textAnchor="end" fontFamily="monospace">
              V AC ~ TRMS
            </text>

            {/* Rotary Selector Dial */}
            <circle cx="120" cy="100" r="19" fill="#0F172A" stroke="#475569" strokeWidth="2" />
            <line x1="120" y1="100" x2="120" y2="85" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="120" cy="100" r="4" fill="#334155" />

            {/* Probe Jacks on bottom */}
            <circle cx="98" cy="135" r="5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <circle cx="120" cy="135" r="5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <circle cx="142" cy="135" r="5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />

            {/* Red & Black Test Probes leading out */}
            <path d="M120 138c-8 16-45 10-60 20" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
            <path d="M142 138c8 16 45 10 56 20" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <rect x="52" y="152" width="12" height="4" fill="#334155" />
            <rect x="194" y="152" width="12" height="4" fill="#B91C1C" />

            <g transform="translate(18, 16)">
              <rect width="66" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="33" y="11.5" fill="#4ADE80" fontSize="8.5" fontWeight="600" textAnchor="middle">
                TRUE-RMS 6000
              </text>
            </g>
          </svg>
        );

      case 'led-batten':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />
            {/* Soft luminous spread */}
            <path d="M20 70l200-20v40L20 110z" fill="#38BDF8" opacity="0.08" />

            {/* Batten tube casing (diagonal sleek view) */}
            <rect x="30" y="80" width="180" height="20" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="32" y="84" width="176" height="12" rx="2" fill="#E0F2FE" />
            {/* Aluminium heat dissipation backbone */}
            <rect x="28" y="74" width="184" height="6" rx="2" fill="#64748B" />

            {/* Snap mounting clips */}
            <rect x="65" y="68" width="10" height="12" rx="2" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
            <rect x="165" y="68" width="10" height="12" rx="2" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />

            {/* End caps */}
            <rect x="25" y="76" width="8" height="28" rx="2" fill="#334155" />
            <rect x="207" y="76" width="8" height="28" rx="2" fill="#334155" />

            <g transform="translate(18, 16)">
              <rect width="66" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="33" y="11.5" fill="#E0F2FE" fontSize="8.5" fontWeight="600" textAnchor="middle">
                20W · 6500K DAYLIGHT
              </text>
            </g>
          </svg>
        );

      case 'outdoor-floodlight':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />
            
            {/* IP65 Floodlight die-cast housing */}
            <rect x="60" y="38" width="120" height="84" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="2.5" />
            
            {/* Front reflector matrix */}
            <rect x="70" y="48" width="100" height="64" rx="4" fill="#0B132B" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Multiple LED SMD array elements */}
            <g fill="#FEF08A">
              <rect x="82" y="58" width="8" height="8" rx="1.5" />
              <rect x="98" y="58" width="8" height="8" rx="1.5" />
              <rect x="114" y="58" width="8" height="8" rx="1.5" />
              <rect x="130" y="58" width="8" height="8" rx="1.5" />
              <rect x="146" y="58" width="8" height="8" rx="1.5" />

              <rect x="82" y="74" width="8" height="8" rx="1.5" />
              <rect x="98" y="74" width="8" height="8" rx="1.5" />
              <rect x="114" y="74" width="8" height="8" rx="1.5" />
              <rect x="130" y="74" width="8" height="8" rx="1.5" />
              <rect x="146" y="74" width="8" height="8" rx="1.5" />

              <rect x="82" y="90" width="8" height="8" rx="1.5" />
              <rect x="98" y="90" width="8" height="8" rx="1.5" />
              <rect x="114" y="90" width="8" height="8" rx="1.5" />
              <rect x="130" y="90" width="8" height="8" rx="1.5" />
              <rect x="146" y="90" width="8" height="8" rx="1.5" />
            </g>

            {/* Heavy Yoke Mount bracket */}
            <path d="M48 80h12m120 0h12M48 80v56h144V80" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="54" cy="80" r="4" fill="#F59E0B" />
            <circle cx="186" cy="80" r="4" fill="#F59E0B" />

            <g transform="translate(18, 16)">
              <rect width="64" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="32" y="11.5" fill="#38BDF8" fontSize="8.5" fontWeight="600" textAnchor="middle">
                IP65 WATERPROOF
              </text>
            </g>
          </svg>
        );

      case 'distribution-box':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />

            {/* Steel Enclosure */}
            <rect x="52" y="28" width="136" height="124" rx="6" fill="#334155" stroke="#64748B" strokeWidth="2.5" />
            {/* Inner frame */}
            <rect x="62" y="38" width="116" height="104" rx="4" fill="#1E293B" />
            
            {/* Clear smoked acrylic window */}
            <rect x="72" y="52" width="96" height="64" rx="4" fill="#0B132B" stroke="#475569" strokeWidth="1.5" />
            
            {/* Mounted MCB Row visible inside */}
            <g fill="#F8FAFC">
              <rect x="80" y="60" width="10" height="48" rx="2" />
              <rect x="92" y="60" width="10" height="48" rx="2" />
              <rect x="104" y="60" width="10" height="48" rx="2" />
              <rect x="116" y="60" width="10" height="48" rx="2" />
              <rect x="128" y="60" width="10" height="48" rx="2" />
              <rect x="140" y="60" width="20" height="48" rx="2" fill="#E2E8F0" />
            </g>
            <rect x="142" y="74" width="16" height="12" rx="2" fill="#EA580C" />

            {/* Neutral busbar copper strip below */}
            <rect x="74" y="124" width="92" height="6" rx="1.5" fill="#D97706" />

            <g transform="translate(18, 16)">
              <rect width="64" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="32" y="11.5" fill="#E2E8F0" fontSize="8.5" fontWeight="600" textAnchor="middle">
                8-WAY SPN CRCA
              </text>
            </g>
          </svg>
        );

      case 'wire-stripper':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />

            {/* Hardened tool jaws with stripping notches */}
            <path d="M120 72l-40-36c-6-5-14 3-8 9l36 39" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
            <path d="M120 72l40-36c6-5 14 3 8 9l-36 39" fill="#94A3B8" stroke="#475569" strokeWidth="2" />

            {/* Center Pivot Bolt */}
            <circle cx="120" cy="78" r="7" fill="#334155" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="120" cy="78" r="3" fill="#0F172A" />

            {/* Ergonomic Red/Yellow Handles */}
            <path d="M112 84L76 150c-3 6 4 12 10 7l34-62" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            <path d="M128 84L164 150c3 6-4 12-10 7l-34-62" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            {/* Grip inserts */}
            <rect x="80" y="112" width="6" height="24" rx="3" fill="#FACC15" />
            <rect x="154" y="112" width="6" height="24" rx="3" fill="#FACC15" />

            <g transform="translate(18, 16)">
              <rect width="66" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="33" y="11.5" fill="#F87171" fontSize="8.5" fontWeight="600" textAnchor="middle">
                CR-V FORGED ALLOY
              </text>
            </g>
          </svg>
        );

      case 'extension-board':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />

            {/* Power board white body */}
            <rect x="34" y="60" width="172" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            
            {/* 4 Socket & Switch pairs */}
            {[50, 88, 126, 164].map((x, i) => (
              <g key={i}>
                <rect x={x} y="68" width="14" height="18" rx="2" fill="#DC2626" />
                <line x1={x + 2} y1="77" x2={x + 12} y2="77" stroke="#FEF08A" strokeWidth="2" />
                <circle cx={x + 24} cy="78" r="4" fill="#334155" />
                <circle cx={x + 19} cy="88" r="2.5" fill="#334155" />
                <circle cx={x + 29} cy="88" r="2.5" fill="#334155" />
              </g>
            ))}

            {/* Heavy 3-Core cable exiting */}
            <path d="M34 90C18 90 12 110 8 135" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            <rect x="194" y="102" width="6" height="6" rx="3" fill="#10B981" />

            <g transform="translate(18, 16)">
              <rect width="66" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="33" y="11.5" fill="#10B981" fontSize="8.5" fontWeight="600" textAnchor="middle">
                SURGE SPIKE 350J
              </text>
            </g>
          </svg>
        );

      case 'exhaust-fan':
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />

            {/* Square Frame */}
            <rect x="65" y="32" width="110" height="110" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2.5" />
            <circle cx="120" cy="87" r="44" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />

            {/* Fan Impeller Blades */}
            <g transform="translate(120, 87)">
              <circle r="12" fill="#334155" />
              <path d="M0 -12C12 -30 28 -34 32 -30C28 -18 16 -12 0 -12" fill="#E2E8F0" />
              <path d="M12 0C30 12 34 28 30 32C18 28 12 16 12 0" fill="#E2E8F0" />
              <path d="M0 12C-12 30 -28 34 -32 30C-28 18 -16 12 0 12" fill="#E2E8F0" />
              <path d="M-12 0C-30 -12 -34 -28 -30 -32C-18 -28 -12 -16 -12 0" fill="#E2E8F0" />
            </g>

            <g transform="translate(18, 16)">
              <rect width="64" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="32" y="11.5" fill="#60A5FA" fontSize="8.5" fontWeight="600" textAnchor="middle">
                150mm · 2000 RPM
              </text>
            </g>
          </svg>
        );

      default:
        // Generic industrial electrical fallback
        return (
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="180" rx="8" fill="#0F172A" />
            <circle cx="120" cy="90" r="50" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M120 40v100M70 90h100" stroke="#1E293B" strokeWidth="2" />
            
            {/* Electrical schematic symbol */}
            <circle cx="120" cy="90" r="28" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
            <path d="M120 74l-8 16h16l-8 16" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            <g transform="translate(18, 16)">
              <rect width="64" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="32" y="11.5" fill="#E2E8F0" fontSize="8.5" fontWeight="600" textAnchor="middle">
                GENUINE ISI GRADE
              </text>
            </g>
          </svg>
        );
    }
  };

  const aspectClass = size === 'detail' ? 'aspect-[4/3] max-h-[380px]' : 'aspect-[4/3]';

  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-900 rounded-lg flex items-center justify-center p-3 select-none ${aspectClass} ${className}`}
      role="img"
      aria-label={`${product.name} illustration`}
    >
      {renderIllustration()}

      {/* Discreet stock badge in corner */}
      <div className="absolute bottom-2 right-2.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-300 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>In Stock</span>
      </div>
    </div>
  );
};
