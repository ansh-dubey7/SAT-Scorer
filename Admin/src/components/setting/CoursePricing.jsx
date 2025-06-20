import React, { useState } from 'react';
import DiscountModal from './DiscountModal';

const CoursePricing = ({ discountCodes, setDiscountCodes }) => {
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateDiscount = (discount) => {
    setDiscountCodes([
      ...discountCodes,
      { id: discountCodes.length + 1, ...discount, active: true },
    ]);
    setIsCreating(false);
    alert('Discount code created successfully.');
  };

  const handleUpdateDiscount = (updatedDiscount) => {
    setDiscountCodes(
      discountCodes.map((code) =>
        code.id === updatedDiscount.id ? updatedDiscount : code
      )
    );
    setSelectedDiscount(null);
    alert('Discount code updated successfully.');
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this discount code?')) {
      setDiscountCodes(discountCodes.filter((code) => code.id !== id));
      alert('Discount code deleted successfully.');
    }
  };

  const handleToggleActive = (id) => {
    setDiscountCodes(
      discountCodes.map((code) =>
        code.id === id ? { ...code, active: !code.active } : code
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Pricing</h2>

      {/* Discount Codes */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-700">Discount Codes</h3>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
            aria-label="Create new discount code"
          >
            Create Discount
          </button>
        </div>
        {discountCodes.length === 0 ? (
          <p className="text-gray-600">No discount codes available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Value</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Valid From</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Valid To</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Max Usage</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {discountCodes.map((code, index) => (
                  <tr
                    key={code.id}
                    className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2">{code.code}</td>
                    <td className="px-4 py-2 capitalize">{code.type}</td>
                    <td className="px-4 py-2">
                      {code.type === 'percentage' ? `${code.value}%` : `$${code.value}`}
                    </td>
                    <td className="px-4 py-2">{new Date(code.validFrom).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{new Date(code.validTo).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{code.maxUsage}</td>
                    <td className="px-4 py-2">{code.active ? 'Active' : 'Inactive'}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => setSelectedDiscount(code)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        aria-label={`Edit ${code.code}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(code.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                        aria-label={`${code.active ? 'Deactivate' : 'Activate'} ${code.code}`}
                      >
                        {code.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(code.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                        aria-label={`Delete ${code.code}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DiscountModal
        open={isCreating || !!selectedDiscount}
        onClose={() => {
          setIsCreating(false);
          setSelectedDiscount(null);
        }}
        discount={selectedDiscount}
        onSave={selectedDiscount ? handleUpdateDiscount : handleCreateDiscount}
      />
    </div>
  );
};

export default CoursePricing;