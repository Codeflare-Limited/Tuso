
import { StackProps } from '../../../@types/stack'
import clsx from 'clsx'

const RowStack = ({
    children,
    gap,
    align,
    justifyContent,
    className,
    style,
}: StackProps) => {
    return (
        <div
            className={clsx("Stack Stack_horizontal", className)}
            style={{gap: gap,
                    alignItems: align,
                    justifyContent,
                    ...style,
            }}>
            {children}
      </div>
    )
}


const ColStack = ({
    children,
    gap,
    align,
    justifyContent,
    className,
  }: StackProps) => {
    return (
      <div className={clsx("Stack Stack_vertical", className)}
        style={{
          gap: gap,
          justifyItems: align,
          justifyContent,
        }}
      >
        {children}
      </div>
    );
  };
  
  export default {
    Row: RowStack,
    Col: ColStack,
  };