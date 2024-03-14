import { CustomTable } from 'shared/ui/components/03_templates/table/CustomTable'
import './expense-table.css'

export interface ExpenseTableProps {
  tableData: {
    header: {
      text: string
      buttons: { text: string; onPress: () => void }[]
    }
    body: (string | number)[][]
  }
}

export const ExpenseTable = ({ tableData }: ExpenseTableProps) => {
  return (
    <>
      {!!tableData && <CustomTable className="group-table" data={tableData} />}
      {tableData.body.length === 0 && <p>No hay gastos</p>}
    </>
  )
}
