import React from 'react';

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
            {/* <img src="path/to/your/empty-state-image.png" alt="No data" className="max-w-xs mb-8" /> */}
            <h2 className="text-2xl font-semibold mb-4">No Data Available</h2>
            <p className="text-gray-500">Please Add Account</p>
        </div>
    );
}
