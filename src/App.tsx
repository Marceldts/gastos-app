import { CustomTable } from 'infrastructure/components/03_templates/table/CustomTable';
import { useEffect, useState } from 'react';
import { Group } from 'domain/group/Group';
import { getGroup } from 'application/get/getGroup';
import { GroupRepository } from 'domain/group/Group.repository';
import { localStorageGroupRepository } from 'infrastructure/repositories/group/LocalStorageGroup.repository';
import './App.css';

function App() {
  const [groupData, setGroupData] = useState({} as Group);
  const [tableData, setTableData] = useState<{
    header: {
      text: string;
      buttons: { text: string; onPress: () => void }[];
    };
    body: (string | number)[][];
  }>({
    header: {
      text: 'Gastos',
      buttons: [
        { text: 'Añadir gasto', onPress: () => console.log('Button 1 clicked') },
        { text: 'Añadir miembro al grupo', onPress: () => console.log('Button 2 clicked') },
      ],
    },
    body: [],
  });

  const repository: GroupRepository = localStorageGroupRepository;

  useEffect(() => {
    getGroup(repository).then((storedGroup) => {
      setGroupData(storedGroup!);
    });
  }, []);

  useEffect(() => {
    if (groupData.expenseList?.size !== 0) {
      const expenseList = Array.from(groupData.expenseList ?? []);
      const updatedTableData = {
        ...tableData,
        body: expenseList.map((expense) => [expense.payerId, expense.amount, expense.date]),
      };
      setTableData(updatedTableData);
    }
  }, [groupData]);

  return (
    <div className="App">
      {tableData.body.length > 0 && <CustomTable className="group-table" data={tableData} />}
      {tableData.body.length === 0 && <p>No hay gastos</p>}
    </div>
  );
}

export default App;
