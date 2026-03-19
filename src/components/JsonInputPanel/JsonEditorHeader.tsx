export type ValidationStatus = "idle" | "valid" | "invalid";

interface JsonEditorHeaderProps {
  status: ValidationStatus;
}

const STATUS_CONFIG: Record<ValidationStatus, { label: string; dot: string }> =
  {
    idle: { label: "No input", dot: "bg-jf-text-secondary" },
    valid: { label: "Valid JSON", dot: "bg-jf-val-string" },
    invalid: { label: "Invalid JSON", dot: "bg-jf-val-null" },
  };

const JsonEditorHeader = ({ status }: JsonEditorHeaderProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-jf-border-line shrink-0">
      <span className="text-sm font-semibold text-jf-text">JSON Editor</span>
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${config.dot}`}
        />
        <span className="text-xs text-jf-text-secondary">{config.label}</span>
      </div>
    </div>
  );
};

export default JsonEditorHeader;
