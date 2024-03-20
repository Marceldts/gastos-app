import { CustomTableCell } from '../../00_atoms/table-cell/CustomTableCell'

export const CustomTableRow = (props: { data: any[] }) => {
  const { data } = props

  return (
    <tr>
      {data.map((cell, index) => (
        <CustomTableCell key={index} data={cell} />
      ))}
    </tr>
  )
}
