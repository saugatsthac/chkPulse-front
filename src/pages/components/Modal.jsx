export default function Modal1({ children, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-start pt-20 justify-center z-50"
            onClick={onClose}>
            <div className="bg-[#111827] 
             rounded-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* border border-slate-800 */}
                {children}
            </div>
        </div>
    );
};