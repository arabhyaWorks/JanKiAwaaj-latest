import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import type { Constituency } from './constituencies';
import { constituencies, Constituency } from "./constituencies";
import Select from "react-select";

// 🗳️ Party symbol + short + full
const partyInfo: Record<
  string,
  { short: string; full: string; symbol: string }
> = {
  BJP: { short: "BJP", full: "Bharatiya Janata Party", symbol: "🌸" },
  SP: { short: "SP", full: "Samajwadi Party", symbol: "🚲" },
  INC: { short: "INC", full: "Indian National Congress", symbol: "✋" },
  BSP: { short: "BSP", full: "Bahujan Samaj Party", symbol: "🐘" },
  RLD: { short: "RLD", full: "Rashtriya Lok Dal", symbol: "💧" },
  SBSP: { short: "SBSP", full: "Suheldev Bharatiya Samaj Party", symbol: "🔑" },
  "Apna Dal (SoneLal)": {
    short: "AD(S)",
    full: "Apna Dal (SoneLal)",
    symbol: "☕",
  },
  "Jansatta Dal Loktantrik": {
    short: "JDL",
    full: "Jansatta Dal Loktantrik",
    symbol: "🥃",
  },
  NISHAD: {
    short: "NISHAD",
    full: "Nirbal Indian Shoshit Hamara Aam Dal",
    symbol: "🛶",
  },
  Unknown: { short: "UNK", full: "Unknown/Independent", symbol: "❓" },
};

// Full name to code map (for JSON normalization)
const partyNameToCode: Record<string, string> = {
  "Bharatiya Janata Party": "BJP",
  "Samajwadi Party": "SP",
  "Indian National Congress": "INC",
  "Bahujan Samaj Party": "BSP",
  "Rashtriya Lok Dal": "RLD",
  "Suheldev Bharatiya Samaj Party": "SBSP",
  "Apna Dal (SoneLal)": "Apna Dal (SoneLal)",
  "Jansatta Dal Loktantrik": "Jansatta Dal Loktantrik",
  "Nirbal Indian Shoshit Hamara Aam Dal": "NISHAD",
};

export default function Map() {
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedParty, setSelectedParty] = useState("All");

  const [showAllParties, setShowAllParties] = useState(false);
  const [expandedParties, setExpandedParties] = useState<
    Record<string, boolean>
  >({});
  const [svgContent, setSvgContent] = useState("");
  const [hoverData, setHoverData] = useState<Constituency | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(true);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const togglePartyExpand = (party: string) => {
    setExpandedParties((prev) => ({ ...prev, [party]: !prev[party] }));
  };

  // ⚙️ Filtered constituencies based on current filters
  const filteredConstituencies = Object.values(constituencies).filter((c) => {
    const partyCode = partyNameToCode[(c.party || "").trim()] || "Unknown";
    return (
      (selectedDistrict === "All" || c.district === selectedDistrict) &&
      (selectedParty === "All" || selectedParty === partyCode)
    );
  });

  // 🏙️ Dynamic districts (based on selected party)
  const allDistricts = [
    "All",
    ...Array.from(
      new Set(
        Object.values(constituencies)
          .filter(
            (c) =>
              selectedParty === "All" ||
              partyNameToCode[(c.party || "").trim()] === selectedParty
          )
          .map((c) => c.district)
      )
    ).sort(),
  ];

  // 🏳️ Dynamic parties (based on selected district)
  const allParties = [
    "All",
    ...Array.from(
      new Set(
        Object.values(constituencies)
          .filter(
            (c) => selectedDistrict === "All" || c.district === selectedDistrict
          )
          .map((c) => partyNameToCode[(c.party || "").trim()] || "Unknown")
      )
    ),
  ];

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      cursor: "pointer",
    }),
    option: (provided: any) => ({
      ...provided,
      cursor: "pointer",
    }),
  };

  const colorNameMap: Record<string, string> = {
    "#f97316": "Orange",
    "#1d4ed8": "Blue",
    "#22c55e": "Green",
    "#e11d48": "Red",
    "#9333ea": "Purple",
    "#0ea5e9": "Sky Blue",
    "#facc15": "Yellow",
    "#6b7280": "Gray",
    "#111827": "Dark",
    // Add more known colors as needed
  };

  // Build partyData from filtered constituencies
  const partyData = filteredConstituencies.reduce((acc, data) => {
    const cleaned = (data.party || "").replace(/\s+/g, " ").trim();
    const code = partyNameToCode[cleaned] || "Unknown";
    if (!acc[code]) acc[code] = { names: [], color: data.party_color };
    acc[code].names.push(data.constituency_name);
    return acc;
  }, {} as Record<string, { names: string[]; color?: string }>);

  const districtOptions = allDistricts.map((d, index) => ({
    value: d,
    label: d === "All" ? d : `${index}. ${d}`,
  }));

  const partyOptions = allParties.map((p, index) => ({
    value: p,
    label: p === "All" ? p : `${index}. ${p}`,
  }));

  // Load SVG
  useEffect(() => {
    fetch("/svg/uttarpradesh_up.svg")
      .then((res) => res.text())
      .then(setSvgContent)
      .catch((err) => console.error("Failed to load SVG:", err));
  }, []);

  // Interactivity
  useEffect(() => {
    const svgContainer = document.getElementById("svg-map");
    if (!svgContainer) return;

    const paths = svgContainer.querySelectorAll("[data-constituency]");

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    paths.forEach((el) => {
      const id = el.getAttribute("data-constituency");
      if (!id) return;

      const data = constituencies[id];
      if (!data) return; // 🛡️ Prevent crashing if data not found

      const slug = data?.slug || id.trim().toLowerCase().replace(/\s+/g, "-");
      let fillColor = data?.party_color || (darkMode ? "#333" : "#ccc");

      // Filtering logic
      if (
        (selectedParty !== "All" &&
          partyNameToCode[(data.party || "").trim()] !== selectedParty) ||
        (selectedDistrict !== "All" && data.district !== selectedDistrict)
      ) {
        fillColor = darkMode ? "#1f1f1f" : "#e5e5e5"; // dimmed
      }

      el.setAttribute("fill", fillColor);
      el.setAttribute("style", "cursor: pointer;");

      el.addEventListener("mouseenter", () => setHoverData(data));
      el.addEventListener("mouseleave", () => setHoverData(null));
      el.addEventListener("click", () => {
        const fill = el.getAttribute("fill");
        if (data && data.party_color && fill === data.party_color) {
          paths.forEach((p) =>
            p.setAttribute("fill", darkMode ? "#333" : "#ccc")
          );
          el.setAttribute("fill", "#f97316");
          navigate(`/${slug}`, { state: { entry: data } });
        }
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      paths.forEach((el) => el.replaceWith(el.cloneNode(true)));
    };
  }, [svgContent, darkMode, navigate, selectedDistrict, selectedParty]);

  // Theme coloring fallback
  useEffect(() => {
    const paths = document.querySelectorAll("[data-constituency]");
    paths.forEach((el) => {
      const id = el.getAttribute("data-constituency");
      const userColor = id && constituencies[id]?.party_color;
      if (!userColor) el.setAttribute("fill", darkMode ? "#333" : "#ccc");
    });
  }, [darkMode]);

  return (
    <div className="relative w-full  bg-white ">

      
      {/* Page Heading */}
      {/* <div className="w-full text-center py-6 bg-gradient-to-r from-blue-100 via-white to-green-100 shadow-inner">
        <h1 className="text-2xl md:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          🗺️ UP Vidhan Sabha Constituencies Map
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Interactive visualization of all 403 assembly constituencies with party-wise and district-wise filters.
        </p>
      </div> */}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end justify-center p-3">
        <div className="w-60">
          <label className="text-sm font-medium mb-1 block">
            Filter by District:
          </label>
          <Select
            value={districtOptions.find(
              (opt) => opt.value === selectedDistrict
            )}
            onChange={(selected) =>
              setSelectedDistrict(selected?.value || "All")
            }
            options={districtOptions}
            isSearchable
            styles={customSelectStyles}
            className="text-sm"
          />
        </div>

        <div className="w-60">
          <label className="text-sm font-medium mb-1 block">
            Filter by Party:
          </label>
          <Select
            value={partyOptions.find((opt) => opt.value === selectedParty)}
            onChange={(selected) => setSelectedParty(selected?.value || "All")}
            options={partyOptions}
            isSearchable
            styles={customSelectStyles}
            className="text-sm"
          />
        </div>

        {(selectedDistrict !== "All" || selectedParty !== "All") && (
          <div className="flex items-center h-[40px]">
            <button
              onClick={() => {
                setSelectedDistrict("All");
                setSelectedParty("All");
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-300 rounded-md shadow-sm hover:bg-red-100 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Reset Filters
            </button>
          </div>
        )}

     
      </div>

      {/* Legend Indicator */}
      <div className="flex flex-wrap justify-center items-center gap-4 px-4 py-2 border-t border-gray-300">
        {Object.entries(partyInfo).map(([code, info]) => {
          if (code === "Unknown") return null; // ❌ Skip UNK/Unknown

          const color = Object.values(constituencies).find(
            (c) => partyNameToCode[(c.party || "").trim()] === code
          )?.party_color;

          // If no matching color found, skip this party too
          if (!color) return null;

          return (
            <div key={code} className="flex items-center space-x-2 text-sm">
              <span
                className="inline-block w-4 h-4 rounded border"
                style={{ backgroundColor: color }}
              />
              <span
                className="text-gray-700"
                title={`${info.full} (${info.short})`}
              >
                {info.short}
              </span>
            </div>
          );
        })}
      </div>

      {/* SVG Map */}
      <div className="flex justify-center items-center w-full h-full bg-white p-4 overflow-auto">
        <div
          id="svg-map"
          className="max-w-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      {/* Tooltip */}
      {hoverData && (
        <div
          className="absolute z-[9999] bg-white text-gray-800 text-xs px-3 py-2 rounded shadow-lg pointer-events-none w-64 border border-gray-300"
          style={{
            top: `${cursorPos.y + 12}px`,
            left: `${cursorPos.x + 12}px`,
          }}
        >
          <div className="font-semibold text-sm text-black mb-1">
            {hoverData.constituency_name}
          </div>
          <div>
            <span className="font-medium text-gray-800">Constituency No:</span>{" "}
            {hoverData.constituency_no}
          </div>
          <div>
            <span className="font-medium text-gray-800">Member:</span>{" "}
            {hoverData.vidhayak}
          </div>

          {/* Party Info */}
          {(() => {
            const cleaned = (hoverData.party || "").replace(/\s+/g, " ").trim();
            const code = partyNameToCode[cleaned] || "Unknown";
            const p = partyInfo[code];
            return (
              <>
                <div>
                  <span className="font-medium text-gray-800">Party:</span>{" "}
                  {p.symbol} {p.full} ({p.short})
                </div>
              </>
            );
          })()}

          <div>
            <span className="font-medium text-gray-800">District:</span>{" "}
            {hoverData.district}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">Party Color:</span>
            <span
              className="inline-block w-4 h-4 border rounded"
              style={{ backgroundColor: hoverData.party_color }}
            />
            <span>{hoverData.party_color}</span>
          </div>
        </div>
      )}

      {/* Party Legend */}
      {/* <div className="fixed md:absolute top-2 right-2 z-50 bg-white p-3 rounded shadow text-sm max-h-[90vh] w-[90vw] md:w-80 overflow-y-auto">

        <div className="font-semibold mb-2">Legend (Party → Constituencies)</div>
        <div className="text-xs text-black-800 mb-2">
          Total Constituencies:{' '}
          <span className="font-semibold text-gray-800">
            {filteredConstituencies.length}
          </span>

        </div>
        <div className="text-xs text-black-800 mb-2">
          Total Unique Parties:{' '}
          <span className="font-semibold text-gray-800">
            {Object.keys(partyData).length}
          </span>

        </div>



        {Object.entries(partyData)
          .filter(([code, { names }]) => {
            if (selectedParty !== 'All' && selectedParty !== code) return false;
            if (selectedDistrict !== 'All') {
              return names.some(name => {
                const c = Object.values(constituencies).find(c => c.constituency_name === name);
                return c?.district === selectedDistrict;
              });
            }
            return true;
          })
          .sort((a, b) => b[1].names.length - a[1].names.length)
          .slice(0, showAllParties ? undefined : 9)
          .map(([code, { names, color }], index) => {
            const p = partyInfo[code] || partyInfo.Unknown;
            return (
              <div key={code} className="mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{p.symbol}</span>
                    <div>
                      <div className="font-semibold">
                        {`${index + 1}. ${p.short}`} ({names.length})

                      </div>

                      <div className="text-xs text-gray-500">{p.full}</div>
                    </div>
                    <span
                      className="inline-block w-4 h-4 rounded border ml-1"
                      style={{ backgroundColor: color || '#ccc' }}
                    />
                  </div>

                  {names.length > 3 && (
                    <button
                      className="text-blue-600 text-xs underline"
                      onClick={() => togglePartyExpand(code)}
                    >
                      {expandedParties[code] ? 'Hide' : 'View All'}
                    </button>
                  )}
                </div>

                <ul className="text-xs text-gray-600 pl-6 ">
                  {(expandedParties[code] ? names : names.slice(0, 3)).map((name, index) => {
                    const entry = Object.values(constituencies).find((c) => c.constituency_name === name);
                    return (
                      <li key={name} className="mb-2">
                        <div className="font-semibold" style={{ color: color || '#333' }}>
                          {index + 1}. {entry?.constituency_name} ({entry?.constituency_no})
                        </div>
                        <div className="ml-4 text-gray-500">
                          {entry?.district && <div>📍 {entry.district}</div>}
                          {entry?.vidhayak && <div>👤 {entry.vidhayak}</div>}
                        </div>
                      </li>
                    );
                  })}

                  {!expandedParties[code] && names.length > 3 && (
                    <li
                      className="italic text-blue-600 underline cursor-pointer text-xs"
                      onClick={() => togglePartyExpand(code)}
                    >
                      +{names.length - 3} more
                    </li>
                  )}
                </ul>


              </div>
            );
          })}


        {Object.keys(partyData).length > 9 && (
          <div className="text-center mt-2">
            <button
              className="text-blue-600 text-xs underline"
              onClick={() => setShowAllParties(!showAllParties)}
            >
              {showAllParties ? 'Hide Some Parties' : 'View All Parties'}
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
}

// Programmatic color update
export function updateConstituencyColor(id: string, color: string) {
  const el = document.querySelector(`[data-constituency="${id}"]`);
  if (el) (el as HTMLElement).setAttribute("fill", color);
}
