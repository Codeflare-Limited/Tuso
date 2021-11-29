import { TusodrawElement } from "../../../@types/element";
import { TusodrawState } from "../../../@types/types";
import { SHAPES } from "../../../shapes";
import { setCursor } from "../../../utils/util";
import { ToolButton } from "./ToolButton";
import { capitalizeString } from '../../../utils/util';
import { t } from '../../../i18n'




export const ShapesSwitcher = ({canvas, elementType, setAppState}: {
    canvas: HTMLCanvasElement | null; 
    elementType: TusodrawElement["type"], 
    setAppState: React.Component<any, TusodrawState>["setState"]
}) => (
    <>
        {SHAPES.map(({ value, icon, key}, index) => {
            const label = (`toolBar.${value}`); //t
            const letter = typeof key === "string" ? key : key[0];
            const shortcut = `${capitalizeString(letter)} ${t("helpDialog.or")} ${
                index + 1
            }`;


            return (
                <ToolButton
                    className="Shape"
                    key={value}
                    type="radio"
                    icon={icon}
                    checked={elementType === value}
                    name="editor-current-shape"
                    title={`${capitalizeString(label)} — ${shortcut}`}
                    keyBindingLabel={`${index + 1}`}
                    aria-keyshortcuts={shortcut}
                    data-testid={value}
                    onChange={() => {
                        setAppState({
                            elementType: value, 
                            multiElement: null, 
                            selectedElementIds: {},
                        })
                        setCursor(canvas, value); 
                        setAppState({})
                    }}

                />
            )
        })}
    </>
)