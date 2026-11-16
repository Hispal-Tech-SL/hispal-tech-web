import { cn } from "@/lib/utils";

/*
 * Illustrations of Hispal GYM, drawn as SVG so they stay sharp at any size.
 * They use fixed dark-card colours on purpose, like the app mockups. All data is fictitious.
 */

const ORANGE = "#f06800";

/** A member goes through the door: QR on the phone, face camera and the counting sensor. */
export function AccessScene({ className, label = "Un socio pasa su QR por el lector, la cámara verifica su cara y un sensor sobre la puerta cuenta a quien entra" }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 666 470" role="img" aria-label={label} className={cn("w-full", className)} fontFamily="Sora, system-ui, sans-serif">
      <rect x="1" y="1" width="664" height="468" rx="26" fill="#241915" stroke="#3b2a22" strokeWidth="2" />
      <line x1="24" y1="382" x2="642" y2="382" stroke="#3b2a22" strokeWidth="2" />
      <rect x="400" y="76" width="150" height="306" rx="8" fill="#120c0a" stroke={ORANGE} strokeWidth="3" />
      <rect x="412" y="88" width="126" height="294" fill="#3a2417" />
      <rect x="412" y="88" width="126" height="294" fill={ORANGE} opacity=".5" />
      <polygon points="412,88 438,88 438,382 412,382" fill="#4a2e1d" stroke="#6a4630" strokeWidth="2" />
      <polygon points="448,64 490,64 556,300 382,300" fill={ORANGE} opacity=".26" />
      <polygon points="448,64 490,64 556,300 382,300" fill="none" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="5 6" opacity=".7" />
      <rect x="436" y="44" width="66" height="20" rx="10" fill={ORANGE} />
      <circle cx="469" cy="54" r="4" fill="#fff" />
      <rect x="512" y="40" width="64" height="28" rx="14" fill={ORANGE} />
      <text x="544" y="60" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">1 pers.</text>
      <rect x="336" y="128" width="46" height="46" rx="10" fill="#f3ece7" />
      <circle cx="359" cy="151" r="13" fill="#1a1210" />
      <circle cx="359" cy="151" r="6" fill={ORANGE} />
      <rect x="336" y="200" width="46" height="74" rx="10" fill="#f3ece7" />
      <rect x="345" y="210" width="28" height="28" rx="4" fill="#1a1210" />
      <path d="M349 216h8v8h-8zM361 216h8v8h-8zM349 228h8v6h-8zM362 229h3v3h-3zM366 233h3v3h-3z" fill="#fff" />
      <circle cx="359" cy="254" r="5" fill={ORANGE} />
      <circle cx="190" cy="178" r="25" fill="#f3ece7" />
      <rect x="156" y="209" width="68" height="106" rx="30" fill={ORANGE} />
      <rect x="163" y="310" width="19" height="70" rx="9" fill="#cfc4bd" />
      <rect x="198" y="310" width="19" height="70" rx="9" fill="#cfc4bd" />
      <path d="M214 232 L270 214" stroke={ORANGE} strokeWidth="17" strokeLinecap="round" />
      <rect x="266" y="176" width="40" height="72" rx="8" fill="#1a1210" stroke="#f3ece7" strokeWidth="3" />
      <path d="M274 188h9v9h-9zM289 188h9v9h-9zM274 203h9v9h-9zM288 204h4v4h-4zM294 210h4v4h-4zM274 218h20v4h-20z" fill="#fff" />
      <circle cx="268" cy="214" r="9" fill="#f3ece7" />
      <path d="M310 224 H334" stroke={ORANGE} strokeWidth="3" strokeDasharray="4 5" strokeLinecap="round" />
      <path d="M150 154v-14h14M216 140h14v14M230 202v14h-14M164 216h-14v-14" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M232 160 L334 150" stroke={ORANGE} strokeWidth="2.5" strokeDasharray="4 5" strokeLinecap="round" />
      <rect x="402" y="324" width="146" height="36" rx="18" fill={ORANGE} />
      <path d="M416 342l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="436" y="347" fontSize="11" fontWeight="700" fill="#fff">Acceso concedido</text>
      <g fontSize="13.5" fontWeight="700" fill="#fff">
        <circle cx="48" cy="430" r="13" fill={ORANGE} /><text x="48" y="435" textAnchor="middle" fontWeight="800">1</text><text x="70" y="435">Identificación</text>
        <circle cx="258" cy="430" r="13" fill={ORANGE} /><text x="258" y="435" textAnchor="middle" fontWeight="800">2</text><text x="280" y="435">Verificación facial</text>
        <circle cx="468" cy="430" r="13" fill={ORANGE} /><text x="468" y="435" textAnchor="middle" fontWeight="800">3</text><text x="490" y="435">Sensor de conteo</text>
      </g>
    </svg>
  );
}

/** Counting sensor view: one identification, one person; two people on one access raise an alarm. */
export function SensorAlarm({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 640" role="img" aria-label="Vista del sensor en la puerta de entrada: una persona identificada, otra sin identificar y una alarma porque han pasado dos personas con una sola identificación" className={cn("w-full", className)} fontFamily="Sora, system-ui, sans-serif">
      <rect x="2" y="2" width="896" height="636" rx="34" fill="#241915" stroke="#3b2a22" strokeWidth="3" />
      <text x="44" y="62" fontSize="20" fontWeight="800" letterSpacing="4" fill={ORANGE}>SENSOR · PUERTA DE ENTRADA</text>
      <rect x="44" y="88" width="812" height="306" rx="22" fill="#1a120e" stroke="#3b2a22" strokeWidth="2" />
      <rect x="360" y="88" width="180" height="14" rx="4" fill={ORANGE} />
      <text x="450" y="124" textAnchor="middle" fontSize="15" fontWeight="700" letterSpacing="3" fill="#8f8178">PUERTA</text>
      <rect x="300" y="138" width="300" height="236" rx="16" fill={ORANGE} opacity=".08" />
      <rect x="300" y="138" width="300" height="236" rx="16" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeDasharray="10 8" />
      <line x1="300" y1="256" x2="600" y2="256" stroke="#3ddc84" strokeWidth="4" />
      <text x="76" y="262" fontSize="16" fontWeight="700" letterSpacing="2" fill="#3ddc84">LÍNEA DE CONTEO</text>
      <ellipse cx="410" cy="226" rx="42" ry="23" fill={ORANGE} />
      <circle cx="410" cy="213" r="21" fill="#f3ece7" />
      <rect x="462" y="198" width="104" height="36" rx="18" fill={ORANGE} />
      <path d="M478 216l6 6 11-12" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="502" y="222" fontSize="15" fontWeight="800" fill="#fff">1 ID</text>
      <ellipse cx="466" cy="306" rx="42" ry="23" fill="#8f8178" />
      <circle cx="466" cy="293" r="21" fill="#cfc4bd" />
      <circle cx="466" cy="300" r="56" fill="none" stroke="#ff4a3d" strokeWidth="4" />
      <rect x="528" y="286" width="150" height="36" rx="18" fill="#ff4a3d" />
      <text x="603" y="310" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">SIN IDENTIFICAR</text>
      <rect x="44" y="414" width="812" height="72" rx="22" fill="#ff4a3d" />
      <g transform="translate(74 430) scale(1.7)" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></g>
      <text x="140" y="458" fontSize="24" fontWeight="800" fill="#fff">ALARMA · 2 personas con 1 identificación</text>
      <g fontSize="14" fontWeight="700" letterSpacing="2">
        <rect x="44" y="506" width="256" height="104" rx="18" fill="#1a120e" stroke="#3b2a22" strokeWidth="2" /><text x="172" y="566" textAnchor="middle" fontSize="46" fontWeight="800" fill="#fff">18</text><text x="172" y="594" textAnchor="middle" fill="#8f8178">ENTRADAS</text>
        <rect x="322" y="506" width="256" height="104" rx="18" fill="#1a120e" stroke="#3b2a22" strokeWidth="2" /><text x="450" y="566" textAnchor="middle" fontSize="46" fontWeight="800" fill="#fff">11</text><text x="450" y="594" textAnchor="middle" fill="#8f8178">SALIDAS</text>
        <rect x="600" y="506" width="256" height="104" rx="18" fill="#1a120e" stroke="#3b2a22" strokeWidth="2" /><text x="728" y="566" textAnchor="middle" fontSize="46" fontWeight="800" fill="#fff">7</text><text x="728" y="594" textAnchor="middle" fill="#8f8178">DENTRO (ESTIMADO)</text>
      </g>
    </svg>
  );
}

/** Opening hours of a real centre, as bars over a 24-hour scale. */
export function OpeningHours({ className }: { className?: string }) {
  const rows: [string, string, number][] = [["Lunes a viernes", "05:00 – 00:00", 5], ["Sábados, domingos y festivos", "07:00 – 00:00", 7]];
  return (
    <div className={cn("space-y-5", className)} role="img" aria-label="Horario de Premium GYM: de lunes a viernes de 5:00 a 00:00, y sábados, domingos y festivos de 7:00 a 00:00">
      {rows.map(([label, hours, start]) => (
        <div key={label}>
          <div className="mb-2 flex items-baseline justify-between gap-3 text-sm font-bold"><span>{label}</span><span className="text-primary">{hours}</span></div>
          <div className="relative h-3 rounded-full bg-muted"><span className="absolute inset-y-0 right-0 rounded-full bg-primary" style={{ left: `${(start / 24) * 100}%` }} /></div>
        </div>
      ))}
      <div className="flex justify-between text-[11px] text-muted-foreground" aria-hidden><span>00 h</span><span>06 h</span><span>12 h</span><span>18 h</span><span>24 h</span></div>
    </div>
  );
}

/** Night facade of a gym with the door lit: "open" while nobody is at reception. */
export function GymFacade({ className }: { className?: string }) {
  const stars: [number, number, number, number][] = [[80, 70, 2, 0.7], [190, 140, 1.6, 0.5], [300, 60, 2.2, 0.8], [420, 120, 1.5, 0.5], [560, 50, 2, 0.7], [660, 150, 1.6, 0.5], [740, 80, 2.4, 0.8], [930, 60, 1.8, 0.6], [120, 210, 1.5, 0.4], [870, 200, 1.6, 0.5], [500, 190, 1.4, 0.4]];
  return (
    <svg viewBox="0 0 1000 760" role="img" aria-label="Fachada de un gimnasio de noche, con el cartel de abierto y la puerta iluminada, sin nadie en recepción" className={cn("w-full", className)} fontFamily="Sora, system-ui, sans-serif">
      <defs>
        <linearGradient id="gf-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0c0912" /><stop offset="1" stopColor="#2b1608" /></linearGradient>
        <radialGradient id="gf-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor={ORANGE} stopOpacity=".6" /><stop offset="1" stopColor={ORANGE} stopOpacity="0" /></radialGradient>
        <filter id="gf-blur"><feGaussianBlur stdDeviation="7" /></filter>
        <mask id="gf-moon"><rect width="1000" height="760" fill="white" /><circle cx="868" cy="124" r="52" fill="black" /></mask>
      </defs>
      <rect width="1000" height="760" rx="30" fill="url(#gf-sky)" />
      {stars.map(([x, y, r, o]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#f3ece7" opacity={o} />)}
      <circle cx="840" cy="140" r="56" fill="#f3ece7" mask="url(#gf-moon)" />
      <rect x="150" y="262" width="700" height="392" fill="#241a14" />
      <rect x="130" y="238" width="740" height="38" rx="6" fill="#1b120d" />
      {[190, 330, 550, 690].map((x) => (
        <g key={x}>
          <rect x={x} y="330" width="120" height="150" rx="8" fill="#3a2417" />
          <rect x={x} y="330" width="120" height="150" rx="8" fill={ORANGE} opacity=".22" />
          <rect x={x + 58} y="330" width="4" height="150" fill="#241a14" />
        </g>
      ))}
      <ellipse cx="500" cy="664" rx="260" ry="46" fill="url(#gf-glow)" />
      <rect x="436" y="384" width="128" height="270" rx="6" fill={ORANGE} opacity=".95" />
      <rect x="450" y="398" width="100" height="256" fill="#ffb15e" opacity=".5" />
      <rect x="332" y="276" width="336" height="76" rx="16" fill="#120c0a" stroke={ORANGE} strokeWidth="4" />
      <text x="500" y="327" textAnchor="middle" fontSize="38" fontWeight="800" fill={ORANGE} filter="url(#gf-blur)" opacity=".9" letterSpacing="3">ABIERTO</text>
      <text x="500" y="327" textAnchor="middle" fontSize="38" fontWeight="800" fill="#ffd9b0" letterSpacing="3">ABIERTO</text>
      <rect x="0" y="654" width="1000" height="106" fill="#120c0a" />
      <rect x="104" y="440" width="8" height="214" fill="#3b2a22" />
      <circle cx="108" cy="432" r="14" fill="#ffd9b0" />
      <circle cx="108" cy="432" r="46" fill="url(#gf-glow)" opacity=".5" />
      <circle cx="330" cy="566" r="15" fill="#f3ece7" />
      <rect x="310" y="582" width="40" height="64" rx="18" fill={ORANGE} />
      <rect x="316" y="640" width="12" height="20" rx="5" fill="#cfc4bd" />
      <rect x="332" y="640" width="12" height="20" rx="5" fill="#cfc4bd" />
    </svg>
  );
}
