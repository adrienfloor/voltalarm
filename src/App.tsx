import voltaLogo from './volta-logo.png'
import './App.css'
import { AlarmProvider } from './context/AlarmContext'
import Clock from './components/clock'
import AlarmsList from './components/alarm-list'
import AlarmInputField from './components/alarm-input-field'

function App() {

  return (
    <div className='flex flex-col items-center'>
      <header className='flex-col items-center justify-center'>
        <img src={voltaLogo} className='p-12 w-80' alt='logo' />
      </header>
      <>
        <AlarmProvider>
          <div className='w-1/2'>
            <Clock />
            <div className='flex justify-between'>
            <AlarmsList />
            <div className="divider lg:divider-horizontal"></div>
            <AlarmInputField />
            </div>
          </div>
        </AlarmProvider>
      </>
    </div>
  );
}

export default App
