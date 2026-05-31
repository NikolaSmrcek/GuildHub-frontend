import { useState } from 'react';
import type { Item, LootRequest } from './types';

const mockItems: Item[] = [
  { id: 'item-1', name: 'Dragonbone Greatsword', ilvl: 474, sourcePatch: '12.0.5' },
  { id: 'item-2', name: 'Zephyr Cloth Robe', ilvl: 472, sourcePatch: '12.0.5' },
];

const mockRequests: LootRequest[] = [
  {
    id: 'request-1',
    raidId: 'raid-1',
    itemId: 'item-1',
    requesterId: 'member-1',
    priority: 'main',
    reason: 'Best in slot for main spec',
    timestamp: '2026-05-31T18:00:00Z',
    status: 'open',
  },
];

function App() {
  const [items] = useState<Item[]>(mockItems);
  const [requests] = useState<LootRequest[]>(mockRequests);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>GuildHub</h1>
          <p>Loot council frontend for item distribution and raid reward management.</p>
        </div>
      </header>

      <main>
        <section className="panel">
          <h2>Item Catalog</h2>
          <p>Track raid drops, item ilvl, and patch metadata for loot decisions.</p>
          <div className="grid">
            {items.map((item) => (
              <article key={item.id} className="card">
                <h3>{item.name}</h3>
                <p>Item Level: {item.ilvl}</p>
                <p>Patch: {item.sourcePatch}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Loot Requests</h2>
          <p>Review open requests and prioritize items for council review.</p>
          <div className="grid">
            {requests.map((request) => (
              <article key={request.id} className="card">
                <h3>{request.requesterId}</h3>
                <p>Item: {request.itemId}</p>
                <p>Priority: {request.priority}</p>
                <p>Status: {request.status}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
