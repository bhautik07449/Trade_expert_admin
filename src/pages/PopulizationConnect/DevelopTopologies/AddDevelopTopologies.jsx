export default function AddDevelopTopologies() {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6 max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select a Preposition</label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                    <option value="">Select</option>
                </select>
            </div>

            <div className="mb-8 border border-gray-300 p-4 rounded-md bg-gray-50 max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-1">After selection, Type a Aim.</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2 bg-white" placeholder="Aim" />
            </div>

            <h3 className="text-lg font-semibold mb-4 text-center">Select Interested candidate to Accommodate.</h3>

            <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select a candidate.</label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                        <option value="">Select</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                        <option value="">Select</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                        <option value="">Select</option>
                    </select>
                </div>
            </div>

            <div className="border border-gray-300 min-h-[150px] flex items-center justify-center bg-gray-50 mb-2">
                <span className="text-gray-500 italic">Show Registered Details in Table here.</span>
            </div>
            <p className="text-sm text-gray-500 italic ml-2">&lt;- Details filled up in Join As a Service Personnel</p>

        </div>
    );

}