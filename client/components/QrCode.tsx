"use client";

import React from 'react';
import { useQRCode } from 'next-qrcode';

interface QrCodeProps {
    qrDialogTitle: string; // Title shown over the qr code in the dialog
    buttonText?: string; // Text shown on the button to open the qr code
    className?: string;
    link: string;
    onClose?: () => void;
}

export const QrCode: React.FC<QrCodeProps> = ({
    qrDialogTitle: title,
    buttonText,
    className,
    link,
    onClose,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { SVG: QR_SVG } = useQRCode();

    // Function to handle outside click
    const handleClick = (event: any) => {
        if (!isOpen) return; 
        if (event.target.id === 'overlay-background') { // if the click is on the overlay outside the qr code
            setIsOpen(false);
            onClose && onClose(); // if onClose is defined, call it
        }
    };

    const handleEscape = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
            onClose && onClose(); // if onClose is defined, call it
        }
    };

    return (
        <>
            {/* button to open the modal */}
            <button className={className} onKeyDown={handleEscape} onClick={() => setIsOpen(true)}>{buttonText}</button>

            {/* overlay and dialog */}
            {(isOpen ?
                <dialog
                    className="fixed inset-0 z-50 h-fit min-h-52 md:w-1/3 rounded-2xl overflow-hidden"
                    open
                    onClick={handleClick}
                    onKeyDown={handleEscape}
                >
                    <div id='overlay-background'
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                    </div>
                    <div className="flex flex-col p-6 size-full align-middle transition-all transform bg-white shadow-xl">
                        <p className='text-center text-2xl'> {title} </p>
                        <QR_SVG
                            text={link}
                            options={{
                                margin: 2,
                                color: {
                                    dark: '#000000',
                                    light: '#FFFFFF',
                                },
                            }}
                        />
                    </div>
                </dialog>
                : null)}
        </>
    );
}

export default QrCode;