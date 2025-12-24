import React from "react";

export default function Card({ title, subtitle, children, actions, variant = "default" }) {
  // Define border styles based on variants for specific use cases (like alerts or highlights)
  const variants = {
    default: "border-gray-100",
    primary: "border-indigo-100 ring-1 ring-indigo-50",
    danger: "border-red-100 bg-red-50/10",
  };

  return (
    <div className={`
      bg-white rounded-[2rem] border p-6 md:p-8 
      transition-all duration-300 ease-in-out
      hover:shadow-xl hover:shadow-indigo-50/50 hover:-translate-y-1
      ${variants[variant]}
    `}>
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
          <div>
            {title && (
              <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Action slots can also be placed in the header if needed in the future */}
        </div>
      )}

      {/* Content Section */}
      <div className="text-gray-600 leading-relaxed text-sm">
        {children}
      </div>

      {/* Footer Actions */}
      {actions && (
        <div className="mt-8 pt-6 border-t border-gray-50 flex flex-wrap justify-end gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}