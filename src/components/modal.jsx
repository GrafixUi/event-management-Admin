import React from 'react'

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay fixed inset-0 bg-black opacity-70"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50">
                <div className="modal-content overflow-y-auto py-4 text-left px-6 max-h-[850px]">
                    {children}
                </div>
                <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                    <span onClick={onClose} className="bg-gray-800 px-6 py-4 rounded-lg hover:bg-gray-700">
                        X
                    </span>
                </div>
            </div>
        </div>
    )
}
