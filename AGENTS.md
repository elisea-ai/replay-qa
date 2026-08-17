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

## Definition of done

This is a checklist. Every item is verified against a **completed** session from
`logs/session-4f1e.ndjson` — 816 lines, 24 steps, 11:46. Not against an empty page.

1. **Timeline blocks are visible.** Twenty-four rectangles, grey before playback
   and black after. Common mistake: blocks get `position:absolute` with `left`
   and `width` but no vertical size, their height collapses to zero, and the
   timeline looks like an empty strip.

2. **The page is exactly viewport height and does not scroll.**
   `document.documentElement.scrollHeight` equals `innerHeight`.

3. **The transcript is the only shrinkable element.** Its parent must be a
   fixed-height column flex container, otherwise `flex:1` never reaches it.
   Verify on a completed session: the transcript's `scrollHeight` is clearly
   larger than its `clientHeight`. If they are equal, it is wrong.

4. **The transcript follows the playhead.** After every new event it is scrolled
   to the bottom: `scrollTop` close to `scrollHeight - clientHeight`. On a
   completed session the last events are visible, not the first ones.

5. **Controls stay in frame.** The bottom edge of the row holding Play, Restart
   and the speed slider never exceeds `innerHeight`, at the start or at the end.

6. **Seeking repaints everything.** After a click on the timeline the blocks,
   the playhead and the elapsed readout must match the new position, not only
   the counters and the transcript.

7. **Parsing is correct.** On this file the final counters read exactly:
   24 steps, 214.4k tokens, $0.41, duration 11:46.

## How we verify

```
npm test
npm run build
npm run typecheck
```

All three green before committing. Tests for new code are required.
