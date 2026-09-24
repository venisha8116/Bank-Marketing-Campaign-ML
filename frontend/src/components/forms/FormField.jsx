export default function FormField({ field, value, onChange, error }) {
  const commonProps = {
    id: field.name,
    name: field.name,
    className: `form-control ${error ? "has-error" : ""}`,
    value: value ?? "",
    onChange: (e) => onChange(field.name, e.target.value),
  };

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={field.name}>
        {field.label}
        <span className="required">*</span>
      </label>

      {field.type === "select" ? (
        <select {...commonProps}>
          <option value="" disabled>Select {field.label.toLowerCase()}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          {...commonProps}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step || 1}
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      )}

      {field.helperText && !error && <span className="form-helper">{field.helperText}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
