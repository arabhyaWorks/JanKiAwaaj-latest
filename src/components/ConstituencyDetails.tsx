import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { constituencies } from './constituencies';

export default function ConstituencyDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const entryFromState = location.state?.entry;
  const entry = entryFromState || Object.values(constituencies).find((c) => c.slug === slug);

  if (!entry) {
    return (
      <div className="p-6 text-center text-gray-600">
        🔄 Loading constituency details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center"
      >
        ← Back to Map
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {entry.constituency_name}
      </h1>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <Detail label="Vidhan Sabha No." value={entry.constituency_no} />
        <Detail label="District" value={entry.district} />
        <Detail label="Vidhayak (MLA)" value={entry.vidhayak} />
        <PartyDetail label="Party" value={entry.party} color={entry.party_color} />
        <Detail label="Slug" value={entry.slug} />
        <Detail label="State" value="Uttar Pradesh" />
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="bg-gray-50 border p-3 rounded-lg">
      <p className="text-gray-500 font-semibold">{label}</p>
      <p className="mt-1">{value || 'N/A'}</p>
    </div>
  );
}

function PartyDetail({ label, value, color }) {
  return (
    <div className="bg-gray-50 border p-3 rounded-lg">
      <p className="text-gray-500 font-semibold">{label}</p>
      <p className="mt-1 inline-flex items-center gap-2">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: color || '#ccc' }}
        ></span>
        {value}
      </p>
    </div>
  );
}
