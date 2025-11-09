import React from "react";
import {FAQ} from "@/types/types";

type Props = {
    faq: FAQ,
    i: number
}

const ListItem = ({faq, i} : Props) => {
    return (
        <div
            key={faq.id}
            className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow mb-2"
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {i+1}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {faq.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{faq.body}</p>
                </div>
            </div>
        </div>
    )
}

export default ListItem;