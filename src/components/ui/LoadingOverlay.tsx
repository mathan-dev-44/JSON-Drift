interface LoadingOverlayProps {
  message?: string;
  background?: "solid" | "gradient" | "transparent";
}

export default function LoadingOverlay({
  message = "Processing...",
  background = "solid",
}: LoadingOverlayProps) {
  const bgStyles = {
    solid: "bg-jf-bg-card",
    gradient:
      "bg-gradient-to-br from-jf-bg-card/90 to-jf-bg/80 backdrop-blur-sm",
    transparent: "bg-jf-bg-card/50 backdrop-blur-md",
  };

  return (
    <div className={`rounded-xl shadow-2xl p-8 ${bgStyles[background]}`}>
      {/* Spinner */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-jf-border-line rounded-full"></div>
          <div className="absolute inset-0 border-4 border-jf-accent rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>

      {/* Message */}
      <p className="text-center text-sm font-medium text-jf-text whitespace-nowrap">
        {message}
      </p>
    </div>
  );
}
