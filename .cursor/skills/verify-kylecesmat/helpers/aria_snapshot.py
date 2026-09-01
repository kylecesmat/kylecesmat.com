#!/usr/bin/env python3
"""Extract headings, labeled landmarks, and link names from HTML for an ARIA-ish snapshot."""
from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path


class Snapshot(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.lines: list[str] = []
        self._capture: list[str] | None = None
        self._buf: list[str] = []
        self._skip = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"script", "style"}:
            self._skip += 1
            return
        ad = {k: v or "" for k, v in attrs}
        if tag in {"h1", "h2", "h3", "title", "a", "nav"}:
            self._capture = tag
            self._buf = []
            extra = []
            if ad.get("aria-label"):
                extra.append(f"aria-label={ad['aria-label']!r}")
            if ad.get("aria-current"):
                extra.append(f"aria-current={ad['aria-current']!r}")
            if tag == "a" and ad.get("href"):
                extra.append(f"href={ad['href']!r}")
            self._pending_extra = extra
        elif ad.get("aria-label") or ad.get("aria-current"):
            bits = [tag]
            if ad.get("aria-label"):
                bits.append(f"aria-label={ad['aria-label']!r}")
            if ad.get("aria-current"):
                bits.append(f"aria-current={ad['aria-current']!r}")
            self.lines.append(" ".join(bits))

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style"} and self._skip:
            self._skip -= 1
            return
        if self._capture == tag:
            text = "".join(self._buf).strip()
            extra = getattr(self, "_pending_extra", [])
            suffix = (" " + " ".join(extra)) if extra else ""
            if text or extra:
                self.lines.append(f"{tag}: {text}{suffix}".rstrip())
            self._capture = None
            self._buf = []

    def handle_data(self, data: str) -> None:
        if self._skip:
            return
        if self._capture is not None:
            self._buf.append(data)


def main() -> None:
    path = Path(sys.argv[1])
    parser = Snapshot()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    sys.stdout.write("\n".join(parser.lines) + "\n")


if __name__ == "__main__":
    main()
