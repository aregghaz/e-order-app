type TBorderStyles = 'solid' | 'dotted' | 'dashed' | undefined
export const customStyles = {
  border: (width: number, style: TBorderStyles, color: string) => ({
    borderWidth: width,
    borderStyle: style,
    borderColor: color,
  }),
}
