import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";

// One config entry per editable field this generic page can handle.
// groupKey = the property name on the mockGroups object.
const FIELD_CONFIG = {
  location: {
    title: "Location",
    groupKey: "location",
    placeholder: "Ground or venue address",
    type: "text",
  },
  city: {
    title: "City",
    groupKey: "city",
    placeholder: "Enter city",
    type: "text",
  },
  "contact-name": {
    title: "Contact Name",
    groupKey: "contactName",
    placeholder: "Enter contact person's name",
    type: "text",
  },
  "contact-email": {
    title: "Contact Email",
    groupKey: "contactEmail",
    placeholder: "Enter contact email",
    type: "email",
  },
  "contact-phone": {
    title: "Contact Phone",
    groupKey: "contactPhone",
    placeholder: "Enter contact phone number",
    type: "tel",
  },
  upi: {
    title: "UPI ID",
    groupKey: "upiId",
    placeholder: "e.g. club@upi",
    type: "text",
  },
};

export default function EditGroupField() {
  const navigate = useNavigate();
  const { id, field } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));
  const config = FIELD_CONFIG[field];

  const [value, setValue] = useState(
    config && group ? group[config.groupKey] || "" : ""
  );

  if (!group) return <div className="text-white p-4">Group not found</div>;

  if (!config) {
    return (
      <div className="min-h-screen bg-black p-4 text-white">
        <div className="max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="text-white text-xl mb-6">
            &larr;
          </button>
          <div className="text-neutral-400">
            Unknown field "{field}" — check the route/link for a typo.
          </div>
        </div>
      </div>
    );
  }

  function handleSave() {
    // TODO: replace with real PUT /groups/:id call once the Groups
    // Swagger doc is available.
    group[config.groupKey] = value.trim();
    navigate(`/groups/${id}/edit`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">{config.title}</h1>
        </div>

        <label className="text-neutral-400 text-sm mb-2 block">{config.title}</label>
        <input
          type={config.type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={config.placeholder}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-6"
          autoFocus
        />

        <button
          onClick={handleSave}
          className="w-full rounded-xl py-3 font-semibold bg-yellow-400 text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}