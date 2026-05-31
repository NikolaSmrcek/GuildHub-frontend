import { useEffect, useState } from 'react';
import type { RaidCatalog } from './types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000';

function App() {
  const [catalog, setCatalog] = useState<RaidCatalog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const res = await fetch(new URL('/loot/raid-items', BACKEND_URL).toString());
        if (!res.ok) {
          throw new Error(`Failed to fetch raid catalog: ${res.status}`);
        }
        const data = await res.json();
        setCatalog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchCatalog();
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>GuildHub</h1>
          <p>Loot council frontend for raid item tracking and distribution decisions.</p>
        </div>
      </header>

      <main>
        <section className="panel">
          <h2>Raid Loot Catalog</h2>
          <p>Fetched from the backend route <code>/loot/raid-items</code>.</p>
          {loading && <p>Loading raid catalog...</p>}
          {error && <p className="error-message">{error}</p>}
          {catalog && (
            <div className="catalog-list">
              {Object.entries(catalog).map(([raidName, bosses]) => (
                <div key={raidName} className="panel">
                  <h3>{raidName}</h3>
                  {Object.entries(bosses).map(([bossName, difficulties]) => (
                    <div key={bossName} className="boss-block">
                      <h4>{bossName}</h4>
                      {Object.entries(difficulties).map(([difficulty, payload]) => (
                        <div key={difficulty} className="card">
                          <h5>{difficulty}</h5>
                          {payload.items.map((item) => (
                            <div key={item.id} className="item-block">
                              <strong>{item.name}</strong>
                              <p>Item Level: {item.ilvl}</p>
                              <p>Patch: {item.sourcePatch}</p>
                              <div className="priority-list">
                                <strong>Player priorities:</strong>
                                <ul>
                                  {item.playersPriority.map((player) => (
                                    <li key={player.id}>
                                      {player.displayName} — {player.role} ({player.priority})
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
