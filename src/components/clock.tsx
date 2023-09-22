import React, { useState } from 'react'
import { useAlarmContext } from '../context/AlarmContext'

const Clock: React.FC = () => {
  const { alarms, triggerAlarm } = useAlarmContext()
  let time = new Date().toLocaleTimeString()
  const [currentime, setCurrentime] = useState<string>(time)

  const updateTime = () => {
    let time = new Date().toLocaleTimeString()
    setCurrentime(time)
    // if an alarm is set at this time, we should trigger it
    const alarmExists = alarms.find(alarm => `${alarm.time}:00` === time)
    if (alarmExists) {
      triggerAlarm(alarmExists.id)
    }
  }

  setInterval(updateTime, 1000)

  return (
    <div className='flex justify-center'>
    <div className='w-96 p-4 mb-12 card bg-base-100 shadow-xl bg-neutral rounded-3xl'>
      <h2 className='text-8xl w-96'>{currentime}</h2>
    </div>
    </div>
  )
}

export default Clock
