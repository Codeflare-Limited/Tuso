
import React from 'react'
import { t} from '../../../i18n'
import { useSketchAppContainer } from './S_Main'

interface SectionProps extends React.HTMLProps<HTMLDivElement> {
    heading: string; 
    children: React.ReactNode | ((header: React.ReactNode) => React.ReactNode);
}



export const Section = ({heading, children, ...props}: SectionProps) => {

    const { id } = useSketchAppContainer()
    const header = (
        <h2 className="visually-hidden" id={`${id}-${heading}-title`}>
          {t(`headings.${heading}`)}
        </h2>
      );


    return (
        <section {...props} aria-labelledby={`${id}-${heading}-title`}>
            {typeof children === "function" ? (
                children(header)
            ) : (
                <>
                {header}
                {children}
                </>
            )}
        </section>
    )
}