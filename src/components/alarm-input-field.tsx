import React, { useState, ChangeEvent } from 'react'
import { useAlarmContext } from '../context/AlarmContext'

const AlarmInputField: React.FC = () => {
  const { alarms, addAlarm } = useAlarmContext()
  const [newAlarm, setNewAlarm] = useState<string>('')

  const handleCreateAlarm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if(newAlarm) {
      // we don't want two alarms for the same exact time
      const alarmExists = alarms.find(alarm => alarm.time === newAlarm)
      if (alarmExists) {
        alert(`Alarm already set at ${newAlarm} , please choose another time`)
        setNewAlarm('')
        return
      }
      addAlarm(newAlarm)
      setNewAlarm('')
    } else {
      alert('Please select a time for your alarm')
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewAlarm(event.target.value)
  }

  return (
    <div className="alarm-input-field w-80">
      <h3 className='text-4xl mb-6 text-right'>Set a new alarm</h3>
      <div className='flex items-center justify-end'>
      <input
        type="time"
        onChange={handleInputChange}
        value={newAlarm}
        className='mr-6 px-6 py-2 rounded-lg cursor-pointer'
      />
      <button className='btn btn-main' onClick={handleCreateAlarm}>
        <span className='text-2xl'>Save</span>
      </button>
      </div>
    </div>
  )
}

export default AlarmInputField
