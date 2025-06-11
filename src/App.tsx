import PassengerCodeDownloader from './PassengerCodeDownloader';
import './App.css';

function App() {
  return (
    <PassengerCodeDownloader
      handleClose={() => false}
      passengerData={{
        name: 'John',
        last_name: 'Doe',
        id_company: '12345',
        client_id: '67890',
        is_active: true,
        customFields: {},
        encryptedData: 'encrypted-data-example',
      }}
    />
  );
}

export default App;
