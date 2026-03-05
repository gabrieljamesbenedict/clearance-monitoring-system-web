import React from 'react'

const StatusText = ({children}: any) => {

    const bgColor = (() => {
        switch (children) { 
            case "PENDING": return "bg-yellow-500";
            case "APPROVED": return "bg-blue-500";
            case "REJECTED": return "bg-red-500";
            case "COMPLETED": return "bg-green-500";
            case "CANCELLED": return "bg-orange-500";
            default: return "bg-gray-300";
        }
    })();

    return (
        <p className={"text-white font-bold inline px-4 py-2 rounded-4xl " + bgColor}>{children}</p>
    )
}

export default StatusText