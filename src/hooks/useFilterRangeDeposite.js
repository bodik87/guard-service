import { useMemo } from 'react';

export const useFilterRangeDeposite = (clients = [], range = []) => {

  const filteredClients = clients.filter(client => +client.deposit >= range[0] && +client.deposit <= range[1])
  const filteredRangeDeposites = useMemo(() => {
    return filteredClients;
  }, [clients, range])

  return {
    filteredRangeDeposites
  }
}