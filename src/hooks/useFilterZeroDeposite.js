import { useMemo } from 'react';

export const useFilterZeroDeposite = (clients = []) => {

  const filteredClients = clients.filter(client => +client.deposit === 0)
  const filteredZeroDeposites = useMemo(() => {
    return filteredClients;
  }, [clients])

  return {
    filteredZeroDeposites
  }
}