import React, { createContext, useContext, useEffect, useState } from 'react'

interface Alarm {
  id: number;
  time: string;
}

interface AlarmContextType {
  alarms: Alarm[];
  addAlarm: (time: string) => void;
  removeAlarm: (id: number) => void;
  triggerAlarm: (id: number) => void;
}

interface Children {
  children: string | JSX.Element | JSX.Element[]
}

interface Sender {
  ports: [],
  sender: object,
  senderId: number
}

const AlarmContext = createContext<AlarmContextType | undefined>(undefined)

export const useAlarmContext = () => {
  const context = useContext(AlarmContext)
  if (!context) {
    throw new Error('useAlarmContext must be used within an AlarmProvider')
  }
  return context;
};

export const AlarmProvider = ({ children }: Children) => {
  const [alarms, setAlarms] = useState<Alarm[]>([])
  const w = (window as any).window;

  useEffect(() => {
    // Request alarms data from the main process when the component mounts
    w.electronAPI.sendIPCMessage('getAlarms')

    // Listen for alarms data response from the main process
    w.electronAPI.onIPCMessage('alarmsData', (sender: Sender, data: []) => {
      setAlarms(data)
    })

    // Clean up event listener when the component unmounts
    return () => {
      w.electronAPI.removeIPCListeners('alarmsData')
    };
  }, [w.electronAPI]);

  const addAlarm = (time: string) => {
    // Send an IPC message to the main process to add an alarm
    w.electronAPI.sendIPCMessage('addAlarm', time)
  };

  const removeAlarm = (id: number) => {
    // Send an IPC message to the main process to remove an alarm
    w.electronAPI.sendIPCMessage('removeAlarm', id)
  };

  const triggerAlarm = (id: number) => {
    // Send an IPC message to the main process to remove an alarm
    w.electronAPI.sendIPCMessage('triggerAlarm', id)
  };

  return (
    <AlarmContext.Provider
      value={{
        alarms,
        addAlarm,
        removeAlarm,
        triggerAlarm
      }}
    >
      {children}
    </AlarmContext.Provider>
  )
}
