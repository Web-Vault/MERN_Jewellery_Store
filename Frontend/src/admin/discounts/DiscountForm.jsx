// Path: frontend/src/admin/pages/discounts/DiscountForm.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiTag, FiDollarSign, FiPercent } from 'react-icons/fi';

export default function DiscountForm() {
  const { discountId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!discountId;

  // Mock data - replace with API calls
  const [formData, setFormData] = useState(
    isEditing 
      ? {
          id: 'disc_101',
          code: 'SUMMER20',
          type: 'percentage',
          value: 20,
          minAmount: 100,
          expiryDate: '2023-08-31',
          status: 'active'
        }
      : {
          code: '',
          type: 'percentage',
          value: '',
          minAmount: '',
          expiryDate: '',
          status: 'active'
        }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(isEditing ? 'Updated:' : 'Created:', formData);
      navigate('/admin/discounts');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'value' || name === 'minAmount' ? parseFloat(value) || 0 : value
    });
  };

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/admin/discounts')}
          className="flex items-center gap-2 text-amber-900 hover:text-rose-800 transition-colors"
        >
          <FiArrowLeft className="text-lg" />
          <span>Back to Discounts</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-rose-100 p-6">
        <h1 className="text-2xl font-serif font-bold text-rose-800 flex items-center gap-3 mb-6">
          <FiTag className="text-rose-700" />
          <span>{isEditing ? 'Edit Discount Code' : 'Create New Discount Code'}</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Code */}
            <div>
              <label className="block text-amber-900 text-sm font-medium mb-2">
                Discount Code *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent font-mono"
                placeholder="SUMMER20"
                required
                maxLength="20"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-amber-900 text-sm font-medium mb-2">
                Discount Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'percentage'})}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border ${
                    formData.type === 'percentage' 
                      ? 'border-rose-300 bg-rose-50 text-rose-800' 
                      : 'border-rose-200 text-amber-900'
                  }`}
                >
                  <FiPercent />
                  Percentage
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'fixed'})}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border ${
                    formData.type === 'fixed' 
                      ? 'border-rose-300 bg-rose-50 text-rose-800' 
                      : 'border-rose-200 text-amber-900'
                  }`}
                >
                  <FiDollarSign />
                  Fixed Amount
                </button>
              </div>
            </div>

            {/* Value */}
            <div>
              <label className="block text-amber-900 text-sm font-medium mb-2">
                {formData.type === 'percentage' ? 'Percentage Off *' : 'Amount Off *'}
              </label>
              <div className="relative">
                {formData.type === 'percentage' ? (
                  <>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                      placeholder="20"
                      min="1"
                      max={formData.type === 'percentage' ? '100' : ''}
                      required
                    />
                    <span className="absolute left-3 top-2.5 text-amber-900">%</span>
                  </>
                ) : (
                  <>
                    <span className="absolute left-3 top-2.5 text-amber-900">$</span>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                      placeholder="15"
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </>
                )}
              </div>
            </div>

            {/* Minimum Amount */}
            <div>
              <label className="block text-amber-900 text-sm font-medium mb-2">
                Minimum Purchase Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-amber-900">$</span>
                <input
                  type="number"
                  name="minAmount"
                  value={formData.minAmount}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  placeholder="50"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-amber-900 text-sm font-medium mb-2">
                Expiry Date *
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Status */}
            {isEditing && (
              <div>
                <label className="block text-amber-900 text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-rose-100">
            <button
              type="button"
              onClick={() => navigate('/admin/discounts')}
              className="px-6 py-2 border border-rose-200 text-amber-900 rounded-lg hover:bg-rose-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-rose-700 text-white rounded-lg hover:bg-rose-800 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Processing...'
              ) : isEditing ? (
                'Update Discount'
              ) : (
                'Create Discount'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}