import { openDB } from 'idb'

const db = openDB('smartpos-offline', 1, {
  upgrade(database) {
    database.createObjectStore('sales', { keyPath: 'idempotencyKey' })
  },
})

export async function queueSale(sale: Record<string, unknown> & { idempotencyKey: string }) {
  return (await db).put('sales', sale)
}

export async function syncQueuedSales() {
  const database = await db
  const sales = await database.getAll('sales')
  for (const sale of sales) {
    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': sale.idempotencyKey },
      body: JSON.stringify(sale),
    })
    if (response.ok) await database.delete('sales', sale.idempotencyKey)
  }
}

window.addEventListener('online', () => void syncQueuedSales())
