import { useEffect } from 'react'
import { CustomTableHeader } from '../../01_molecules/table-header/CustomTableHeader'
import { CustomTableBody } from '../../02_organisms/table-body/CustomTableBody'
import './CustomTable.css'

interface CustomTableProps {
  data?: any
  className?: string
  bodyClassName?: string
}

export const CustomTable = (props: CustomTableProps) => {
  const { data, className, bodyClassName } = props
  const { header, body } = data

  return (
    <table className={`group-table ${className ?? ''}`}>
      <CustomTableHeader headerText={header.text} buttons={header.buttons} />
      {body && <CustomTableBody className={bodyClassName} data={body} />}
    </table>
  )
}
