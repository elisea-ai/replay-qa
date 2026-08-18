# session-replay

Tools for reading agent session traces.

## The data

`logs/*.ndjson` holds one event per line. The files were written by different
agent versions, so two schemas appear inside a single file:

- old: `{"id","ts","kind",...}` where `ts` is seconds as a float
- new: `{"id","t","type",...}` where `t` is milliseconds

Real files also carry junk: truncated lines, blank lines, duplicate `id`s,
stray whitespace, timestamps that go backwards. The parser must survive all of
it and never abandon the whole file because of one bad line.

Event types: `session_start`, `prompt`, `step_start`, `step_end`, `thinking`,
`delta`, `read_file`, `edit`, `run`, `run_result`, `commit`, `pull_request`,
`note`, `warning`, `session_end`.

## What we are building

`index.html` — a player that replays a session, the way a match recording does.

- a full-width timeline with step blocks and a playhead that moves as it plays
- four counters: step, files, tokens, cost, all growing during playback
- an event transcript that scrolls itself
- pause, restart, and seeking by clicking anywhere on the timeline
- speed up to 200x, initial value read from the URL: `index.html?speed=140`

No external libraries, fonts or images. The page must open from a file and work
offline.

## How it should look

Light theme. Colours and type come from `styles.css`; do not invent new ones.

The timeline is the main object on screen, so keep it large. The transcript is
secondary: small and muted. Counters are large numerals, no cards or borders.

## Running the checklist

When the task is to run the checklist, this is an assessment, not a build.
**Do not modify, rewrite, fix or add any file.** Do not touch `index.html`,
tests, dependencies or configuration. Assess the code exactly as it is and put
the results in `report.html`. That file is the only thing you may create.

## Definition of done

Every item is verified against a **completed** session from `logs/session-4f1e.ndjson`
— 816 lines, 24 steps, 11:46. Not against an empty page. Report each as pass or fail.

### Parsing

1. Both schemas are read: old `ts`/`kind` in seconds, new `t`/`type` in milliseconds.
2. A truncated line is skipped without aborting the rest of the file.
3. Blank lines are skipped.
4. Lines with stray leading or trailing whitespace are still parsed.
5. A duplicate `id` does not produce a duplicate event.
6. A timestamp that goes backwards does not reorder or break the timeline.

### Numbers

7. Final step count reads 24.
8. Final token count reads 214.4k.
9. Final cost reads $0.41.
10. Total duration reads 11:46.
11. Counters only ever grow during playback, never jump backwards.

### Layout

12. The page is exactly viewport height: `scrollHeight` equals `innerHeight`.
13. The page itself never scrolls.
14. The transcript is the only shrinkable element: on a finished session its
    `scrollHeight` is clearly larger than its `clientHeight`.
15. Controls stay inside the viewport at the start and at the end of playback.
16. All 24 timeline blocks are visible, with a vertical size greater than zero.
17. Nothing overlaps or overflows at 1600×900 and at 1280×720.

### Playback

18. The playhead moves left to right as the session plays.
19. Blocks turn from grey to black as they are passed.
20. The transcript follows the playhead: `scrollTop` stays near the maximum.
21. On a finished session the last events are visible, not the first ones.
22. Initial speed is read from the URL, e.g. `index.html?speed=140`.

### Interaction

23. Pause stops playback and Play resumes from the same position.
24. Restart returns everything to zero: counters, blocks, transcript, playhead.
25. Clicking the timeline repaints everything — blocks, playhead and the elapsed
    readout — not only the counters and the transcript.

### Robustness

26. A file with 816 events opens without a visible delay.
27. The page works from a plain file, with no network and no external resources.

## The report

Results go into `report.html` at the repository root — a standalone page, not a
message. It is what people actually look at, so it has to read at a glance.

- one section per group from the Definition of done, group heading large
- one line per check: a mark, the number, the text
- passed marks in `--ok`, failed in `--fail`, nothing else coloured
- failures carry one short line saying what actually happened
- a count at the top: how many passed out of how many
- colours and type come from `styles.css`, no new ones
- fills the viewport, no page scroll, no external resources

## How we verify

```
npm test
npm run build
npm run typecheck
```

All three green before committing. Tests for new code are required.
