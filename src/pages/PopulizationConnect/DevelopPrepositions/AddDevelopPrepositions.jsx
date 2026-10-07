import React from 'react';

export default function AddDevelopPrepositions() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">Fill a Preposition.</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Find a belief.</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Select a belief</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Find a Purpose.</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Select a Purpose</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Find a Goal.</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Select a Goal</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name a Preposition.</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Name" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Aim.</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Aim" />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center relative">
            <hr className="w-full border-t border-gray-300" />
            <span className="absolute bg-white px-2 text-gray-500 font-semibold">or</span>
          </div>

          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
              Create e. a one to list above for a New one.
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};