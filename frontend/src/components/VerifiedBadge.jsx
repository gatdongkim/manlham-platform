import React from 'react';
import { BadgeCheck } from 'lucide-react';

const VerifiedBadge = ({ isVetted, size = 16, className = "" }) => {
    if (!isVetted) return null;

    return (
        <span 
            className={`inline-flex items-center justify-center text-blue-600 bg-blue-50 rounded-full p-0.5 ${className}`}
            title="Verified Professional"
        >
            <BadgeCheck size={size} fill="currentColor" className="text-white" />
            {/* The fill="currentColor" with text-white creates the classic blue badge look */}
            <style jsx>{`
                span { color: #2563eb; } /* blue-600 */
                :global(svg) { fill: #2563eb; }
                :global(path) { stroke: white; stroke-width: 2px; }
            `}</style>
        </span>
    );
};

export default VerifiedBadge;