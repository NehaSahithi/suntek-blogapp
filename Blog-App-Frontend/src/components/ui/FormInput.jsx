import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  {
    id,
    label,
    type = "text",
    icon: Icon,
    autoComplete,
    required = true,
    rightSlot,
    error,
    placeholder,
    ...fieldProps
  },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative group">
        {Icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 transition-colors duration-150 group-focus-within:text-indigo-500">
            <Icon />
          </span>
        ) : null}
        <input
          id={id}
          ref={ref}
          type={type}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={Boolean(error)}
          placeholder={placeholder || label}
          className={`w-full rounded-xl border bg-white/90 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${Icon ? "pl-10" : "pl-4"} ${rightSlot ? "pr-12" : "pr-4"} ${error ? "border-rose-400 focus:ring-rose-400" : "border-slate-200 hover:border-slate-300"}`}
          {...fieldProps}
        />
        {rightSlot ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightSlot}
          </span>
        ) : null}
      </div>
      {error ? <p className="mt-0.5 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
});

export default FormInput;