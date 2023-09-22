import React from 'react'
import { useAlarmContext } from '../context/AlarmContext'

const AlarmsList: React.FC = () => {

  const { alarms, removeAlarm } = useAlarmContext()

    // Custom comparison function to compare time strings
    function compareByTime(a: any, b: any): number {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);

      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0]; // Compare hours
      } else {
        return timeA[1] - timeB[1]; // Compare minutes if hours are the same
      }
    }


  return (
    <div className="alarm-list w-80">
      <h3 className='text-4xl mb-2'>My alarms</h3>
      {
        alarms.sort(compareByTime).map(alarm => (
          <div className='flex items-center justify-between h-16 w-40' key={alarm.id}>
            <div className="text-3xl mr-4">{alarm.time}</div>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => removeAlarm(alarm.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default AlarmsList
