import { CustomTable } from 'infrastructure/components/03_templates/table/CustomTable';
import './App.css';

function App() {
  const mockData = {
    header: {
      text: 'Sample Header',
      buttons: [
        { text: 'Button 1', onPress: () => console.log('Button 1 clicked') },
        { text: 'Button 2', onPress: () => console.log('Button 2 clicked') },
      ],
    },
    body: [
      ['John Doe', 30, 'Male'],
      ['Jane Smith', 25, 'Female'],
      // Add more rows as needed
    ],
  };
  return (
    <div className="App">
      <CustomTable data={mockData} />
    </div>
  );
}

export default App;
