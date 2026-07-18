import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`mb-2 border-b pb-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h2 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
