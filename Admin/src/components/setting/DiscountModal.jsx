import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DiscountModal = ({ open, onClose, discount, onSave }) => {
  const [code, setCode] = useState('');
  const [type, setType] = useState('percentage');
  const [value, setValue] = useState('');
  const [validFrom, setValidFrom] = useState(new Date());
  const [validTo, setValidTo] = useState(new Date());
  const [maxUsage, setMaxUsage] = useState('');

  useEffect(() => {
    if (discount) {
      setCode(discount.code);
      setType(discount.type);
      setValue(discount.value);
      setValidFrom(new Date(discount.validFrom));
      setValidTo(new Date(discount.validTo));
      setMaxUsage(discount.maxUsage);
    } else {
      setCode('');
      setType('percentage');
      setValue('');
      setValidFrom(new Date());
      setValidTo(new Date());
      setMaxUsage('');
    }
  }, [discount]);

  const handleSubmit = () => {
    if (!code || !value || !maxUsage) {
      alert('Code, value, and max usage are required.');
      return;
    }
    if (validFrom > validTo) {
      alert('Valid From date must be before Valid To date.');
      return;
    }
    onSave({
      id: discount ? discount.id : undefined,
      code,
      type,
      value: parseFloat(value),
      validFrom: validFrom.toISOString(),
      validTo: validTo.toISOString(),
      maxUsage: parseInt(maxUsage),
      active: discount ? discount.active : true,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 rounded-lg border border-gray-200 max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {discount ? 'Edit Discount Code' : 'Create Discount Code'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:bg-gray-200 rounded-full p-2"
            aria-label="Close discount modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter discount code"
              className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              aria-label="Discount code"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              aria-label="Discount type"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={type === 'percentage' ? 'Enter percentage' : 'Enter amount'}
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              aria-label="Discount value"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Valid From</label>
            <DatePicker
              selected={validFrom}
              onChange={setValidFrom}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              aria-label="Valid from date"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Valid To</label>
            <DatePicker
              selected={validTo}
              onChange={setValidTo}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              aria-label="Valid to date"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Max Usage</label>
            <input
              type="number"
              value={maxUsage}
              onChange={(e) => setMaxUsage(e.target.value)}
              placeholder="Enter max usage limit"
              min="1"
              className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              aria-label="Max usage"
            />
          </div>
        </div>
        <div className="mt-6 text-right space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
            aria-label="Close modal"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            aria-label="Save discount code"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;