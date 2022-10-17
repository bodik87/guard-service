import { useMemo } from 'react';

export const useFilterNegativeDeposite = (clients = []) => {

  const filteredClients = clients.filter(client => +client.deposit < 0)
  const filteredNegativeDeposites = useMemo(() => {
    return filteredClients;
  }, [clients])

  return {
    filteredNegativeDeposites
  }
}