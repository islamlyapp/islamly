#!/usr/bin/env python3
"""
Simple builder: converts plan.md to plan.html.
Uses Python-Markdown if available, otherwise falls back to a minimal converter.
"""
import os
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
MD = HERE.parent / 'plan.md'
OUT = HERE.parent / 'plan.html'

if not MD.exists():
    print('plan.md not found at', MD)
    sys.exit(1)

text = MD.read_text(encoding='utf-8')

html_body = None

try:
    import markdown
    html_body = markdown.markdown(text, extensions=['fenced_code', 'tables', 'sane_lists'])
except Exception:
    # Minimal fallback converter
    lines = text.splitlines()
    out_lines = []
    in_code = False
    for line in lines:
        if line.startswith('```'):
            in_code = not in_code
            out_lines.append('<pre><code>' if in_code else '</code></pre>')
            continue
        if in_code:
            out_lines.append(line.replace('&', '&amp;').replace('<', '&lt;'))
            continue
        if line.startswith('# '):
            out_lines.append(f'<h1>{line[2:].strip()}</h1>')
            continue
        if line.startswith('## '):
            out_lines.append(f'<h2>{line[3:].strip()}</h2>')
            continue
        if line.startswith('### '):
            out_lines.append(f'<h3>{line[4:].strip()}</h3>')
            continue
        if line.startswith('- '):
            # simple list handling
            if not out_lines or not out_lines[-1].endswith('<ul>'):
                out_lines.append('<ul>')
            out_lines.append(f'<li>{line[2:].strip()}</li>')
            # close later
            continue
        if line.strip() == '':
            # close open ul
            if out_lines and out_lines[-1].startswith('<li>'):
                out_lines.append('</ul>')
            out_lines.append('<p></p>')
            continue
        # inline bold **text** and italics *text*
        l = line.replace('&', '&amp;').replace('<', '&lt;')
        import re
        l = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", l)
        l = re.sub(r"\*(.+?)\*", r"<em>\1</em>", l)
        out_lines.append(f'<p>{l}</p>')
    html_body = '\n'.join(out_lines)

html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Plan - Islamly</title>
<style>
body{{font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;max-width:900px;margin:40px auto;padding:0 20px;color:#0f172a}}
pre{{background:#0f172a;color:#fff;padding:12px;border-radius:6px;overflow:auto}}
code{{background:#f3f4f6;padding:2px 4px;border-radius:4px}}
h1,h2,h3{{color:#0b1220}}
table{{border-collapse:collapse;width:100%}}
td,th{{border:1px solid #e5e7eb;padding:8px}}
</style>
</head>
<body>
{html_body}
</body>
</html>'''

OUT.write_text(html, encoding='utf-8')
print('Wrote', OUT)
