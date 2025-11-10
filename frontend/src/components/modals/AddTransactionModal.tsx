import { useState, FormEvent } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useAddExpense } from "../../hooks/useAddExpense";
import type { ExpenseRequestDto } from "../../api/expenseService";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({
  isOpen,
  onClose,
}: AddTransactionModalProps) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { mutate: addExpense, isPending } = useAddExpense();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !expenseDate || !categoryId) {
      alert("Please fill in all fields");
      return;
    }

    const dto: ExpenseRequestDto = {
      description,
      amount: parseFloat(amount),
      expenseDate,
      categoryId: parseInt(categoryId),
    };

    addExpense(dto, {
      onSuccess: () => {
        setDescription("");
        setAmount("");
        setExpenseDate(new Date().toISOString().split("T")[0]);
        setCategoryId("");
        onClose();
      },
      onError: (error) => {
        alert(`Failed to add expense: ${error.message}`);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-900 to-black p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/50 text-slate-400 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
            close
          </span>
        </button>

        {/* Modal Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/30">
            <span className="material-symbols-outlined text-3xl text-indigo-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>
              add_circle
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Add Transaction
            </h2>
            <p className="text-sm text-slate-500">Record a new expense</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400"
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                subject
              </span>
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-indigo-500/50 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="e.g., Starbucks Coffee"
              required
            />
          </div>

          {/* Amount Field */}
          <div>
            <label
              htmlFor="amount"
              className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400"
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                payments
              </span>
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-500">$</span>
              <input
                type="number"
                id="amount"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 py-3 pl-8 pr-4 text-white placeholder-slate-500 transition-all focus:border-indigo-500/50 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Date Field */}
          <div>
            <label
              htmlFor="expenseDate"
              className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400"
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                calendar_today
              </span>
              Date
            </label>
            <input
              type="date"
              id="expenseDate"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white transition-all focus:border-indigo-500/50 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400"
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                category
              </span>
              Category
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white transition-all focus:border-indigo-500/50 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              required
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "Select a category"}
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-700/50 bg-slate-800/50 px-6 py-3 font-bold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending || categoriesLoading}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
