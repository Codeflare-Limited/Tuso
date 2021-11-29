
import React, { useState, useRef } from 'react'; 
import { useIsMobile } from '../../../context/container'
import { LibraryItem, TusodrawProps, TusodrawState} from '../../../@types/types';
import clsx from 'clsx'
import { close } from "../components/icons";
import { t } from '../../../i18n'

import './LibraryUnit.scss'

const PLUS_ICON = (
    <svg viewBox="0 0 1792 1792">
      <path
        fill="currentColor"
        d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"
      />
    </svg>
);



const LibraryUnit = ({
    elements,
    pendingElements,
    onRemoveFromLibrary,
    onClick,
}: {
    elements?: LibraryItem;
    pendingElements?: LibraryItem;
    onRemoveFromLibrary: () => void;
    onClick: () => void;
}) => {

    const ref = useRef<HTMLDivElement | null>(null);
    const isMobile = useIsMobile();
    const [isHovered, setIsHovered] = useState(false);

    const adder = (isHovered || isMobile) && pendingElements && (
        <div className="library-unit__adder">{PLUS_ICON}</div>
      );

    return (
        <div
            className={clsx("library-unit", {
                "library-unit__active": elements || pendingElements,
            })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={clsx("library-unit__dragger", {
                    "library-unit__pulse": !!pendingElements,
                })}

                ref={ref}
                draggable={!!elements}
                onClick={!!elements || !!pendingElements ? onClick : undefined}
                onDragStart={(event) => {
                    setIsHovered(false);
                    // event.dataTransfer.setData(
                    // MIME_TYPES.excalidrawlib,
                    // JSON.stringify(elements),
                    // );
                }}
            />
            {adder}
            {elements && (isHovered || isMobile) && (
            <button
                className="library-unit__removeFromLibrary"
                aria-label={t("labels.removeFromLibrary")}  //t
                onClick={onRemoveFromLibrary}
            >
                {close}
            </button>
            )}
        </div>
    )
}



export default LibraryUnit; 