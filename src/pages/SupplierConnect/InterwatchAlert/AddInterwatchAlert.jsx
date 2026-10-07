import React, { useState } from 'react';

export default function AddInterwatchAlert() {

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-700">Alert Type :</label>
            <select className="border border-gray-300 rounded-md p-2 w-64">
              <option value="">Select Alert Type</option>
              <option value="fall_short">Fall Short</option>
              <option value="availability">Availability</option>
              <option value="excessive">Excessive</option>
            </select>
          </div>
          <div className="text-right">
            <span className="font-medium text-gray-700 block">Notification</span>
            <span className="text-blue-500 text-2xl">🔔</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold">Description:</p>
          <p className="text-gray-600">This is the description for the new interwatch alert.</p>
        </div>
      </div>
    </div>
  );
};