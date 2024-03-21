import { CustomTable } from 'shared/ui/components/03_templates/table/CustomTable'
import { TableData } from '../../hooks/useExpenseTableData'
import './expense-table.css'

export interface ExpenseTableProps {
  tableData: TableData
  setShowExpenseForm: (show: boolean) => void
  setShowUserForm: (show: boolean) => void
}

export const ExpenseTable = ({ tableData }: ExpenseTableProps) => {
  return (
    <>
      {!!tableData && <CustomTable className="group-table" data={tableData} />}
      {tableData.body.length === 0 && <p>No hay gastos</p>}
    </>
  )
}
