import { CustomTable } from 'infrastructure/components/03_templates/table/CustomTable';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Group } from 'domain/group/Group';
import { getGroup } from 'application/get/getGroup';
import { GroupRepository } from 'domain/group/Group.repository';
import { localStorageGroupRepository } from 'infrastructure/repositories/group/LocalStorageGroup.repository';
import './App.css';
import { addExpense } from 'application/add/addExpense';
import { addMember } from 'application/add/addMember';

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
        { text: 'Añadir gasto', onPress: () => setShowExpenseForm(true) },
        { text: 'Añadir miembro al grupo', onPress: () => setShowUserForm(true) },
      ],
    },
    body: [],
  });
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState({
    payerName: 'Marcel',
    payerId: 1,
    description: '',
    amount: 0,
    date: '',
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const today = new Date().toISOString().split('T')[0];

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
        body: expenseList.sort((a, b) => b.date.localeCompare(a.date)).map((expense) => [expense.payerName, expense.description, expense.amount, expense.date]),
      };
      setTableData(updatedTableData);
    }
  }, [groupData]);

  useEffect(() => {
    if (showExpenseForm) setShowUserForm(false);
  }, [showExpenseForm]);

  useEffect(() => {
    if (showUserForm) setShowExpenseForm(false);
  }, [showUserForm]);

  const handleExpenseFormSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      await addExpense(localStorageGroupRepository, groupData, expenseFormData);
      const updatedTableData = await getGroup(localStorageGroupRepository);
      setGroupData(updatedTableData!);
      clearExpenseForm();
      setShowExpenseForm(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleExpenseFormCancel = () => {
    clearExpenseForm();
    setShowExpenseForm(false);
  };

  const clearExpenseForm = () => {
    setExpenseFormData({
      payerName: 'Marcel',
      payerId: 1,
      description: '',
      amount: 0,
      date: '',
    })
  }

  const handleUserFormSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const newUser = { name: newUserName, balance: 0, id: getNewUserId() }
      await addMember(localStorageGroupRepository, groupData, newUser);
      const updatedTableData = await getGroup(localStorageGroupRepository);
      setGroupData(updatedTableData!);
      clearUserForm();
      setShowUserForm(false);
      console.log("User ", newUser, " added to the group")
    } catch (error) {
      alert(error);
    }
  }

  const getNewUserId = () => {
    let id = Math.floor(Math.random() * 5000) + 1;

    while (Array.from(groupData.members).some((user) => user.id === id)) {
      id = Math.floor(Math.random() * 5000) + 1;
    }

    return id;
  };

  const handleUserFormCancel = () => {
    clearUserForm();
    setShowUserForm(false);
  }

  const clearUserForm = () => {
    setNewUserName('');
  }

  return (
    <div className="App">
      {tableData.body.length > 0 && <CustomTable className="group-table" data={tableData} />}
      {tableData.body.length === 0 && <p>No hay gastos</p>}
      {(showExpenseForm || showUserForm) && <section className='forms'>
        {showExpenseForm && (
          <form className="expense-form">
            <h3>Añadir gasto</h3>
            <label>Descripción:</label>
            <input
              type="text"
              value={expenseFormData.description}
              onChange={(e) => setExpenseFormData({ ...expenseFormData, description: e.target.value })}
            />
            <label>Cantidad:</label>
            <input
              type="number"
              value={expenseFormData.amount}
              onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: +e.target.value })}
            />
            <label htmlFor="datepicker">Selecciona una fecha:</label>
            <input
              type="date"
              id="datepicker"
              value={expenseFormData.date}
              max={today}
              onChange={(e) => setExpenseFormData({ ...expenseFormData, date: e.target.value })}
            />
            <section className='expense-form-buttons'>
              <button onClick={handleExpenseFormSubmit}>Enviar</button>
              <button onClick={handleExpenseFormCancel}>Cancelar</button>
            </section>
          </form>
        )}
        {showUserForm && (
          <form className="user-form">
            <h3>Añadir miembro al grupo</h3>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <section className='user-form-buttons'>
              <button onClick={handleUserFormSubmit}>Enviar</button>
              <button onClick={handleUserFormCancel}>Cancelar</button>
            </section>
          </form>
        )}
      </section>}
    </div>
  );
}

export default App;
