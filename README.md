# session-replay

Tools for reading agent session traces.

`logs/` holds session recordings in NDJSON, one event per line. The files were
written by different agent versions, so schemas differ inside a single file and
some lines are malformed. See [AGENTS.md](AGENTS.md) for details.

```
npm install
npm test
npm run build
npm run typecheck
```
