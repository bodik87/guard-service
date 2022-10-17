import { useMemo } from 'react';

export const useFilterWithoutCar = (clients = []) => {

  const filteredClients = clients.filter(client => client.isCar === false)
  const filteredWithoutCar = useMemo(() => {
    return filteredClients;
  }, [clients])

  return {
    filteredWithoutCar
  }
}