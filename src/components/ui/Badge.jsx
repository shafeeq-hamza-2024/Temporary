const Badge = ({
  label,
  // children,
  // variant = "primary",
  // pill = true,
  // outline = false,
  // className = "",
  // ...props
}) => {
  return (
    <span
      className={`bg-green-600 text-white px-2.5 py-0.5 rounded-xl text-xs`}
    >
      {label}
    </span>
  );

  const baseClass =
    "inline-flex items-center justify-center font-medium transition-colors text-xs sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 whitespace-nowrap";

  const variants = {
    primary: {
      solid: "bg-blue-600 text-white",
      outline: "border border-blue-600 text-blue-600 bg-transparent",
    },
    secondary: {
      solid: "bg-gray-600 text-white",
      outline: "border border-gray-600 text-gray-600 bg-transparent",
    },
    success: {
      solid: "bg-green-600 text-white",
      outline: "border border-green-600 text-green-600 bg-transparent",
    },
    danger: {
      solid: "bg-red-600 text-white",
      outline: "border border-red-600 text-red-600 bg-transparent",
    },
    warning: {
      solid: "bg-yellow-500 text-white",
      outline: "border border-yellow-500 text-yellow-600 bg-transparent",
    },
    info: {
      solid: "bg-cyan-500 text-white",
      outline: "border border-cyan-500 text-cyan-600 bg-transparent",
    },
    light: {
      solid: "bg-gray-100 text-gray-800",
      outline: "border border-gray-300 text-gray-700 bg-transparent",
    },
    dark: {
      solid: "bg-gray-800 text-white",
      outline: "border border-gray-800 text-gray-800 bg-transparent",
    },
  };

  const getVariantClass = () => {
    const styleType = outline ? "outline" : "solid";

    // Check if standard variant exists to use tailwind utilities
    if (variants[variant]) {
      return variants[variant][styleType];
    }

    // Fallback for custom variants
    return outline
      ? `border border-current text-xs bg-transparent`
      : `bg-gray-200 text-gray-800`;
  };

  const pillClass = pill ? "rounded-full" : "rounded-md";
  const finalClassName =
    `${baseClass} ${pillClass} ${getVariantClass()} ${className}`.trim();

  return (
    <span className={finalClassName} {...props}>
      {label || children}
    </span>
  );
};

export default Badge;
