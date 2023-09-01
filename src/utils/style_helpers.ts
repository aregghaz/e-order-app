type TBorderStyles = 'solid' | 'dotted' | 'dashed' | undefined
export const customStyles = {
  border: (width: number, style: TBorderStyles, color: string) => ({
    borderWidth: width,
    borderStyle: style,
    borderColor: color,
  }),
  borderBottom: (width: number, style: TBorderStyles, color: string) => ({
    borderBottomWidth: width,
    borderBottomStyle: style,
    borderBottomColor: color,
  }),
  borderTop: (width: number, style: TBorderStyles, color: string) => ({
    borderTopWidth: width,
    borderTopStyle: style,
    borderTopColor: color,
  }),
}
