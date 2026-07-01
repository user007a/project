import re
with open(r'd:\dev\GitHub\project\pro_digitalvillages\html\dashboard\index.html', 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.split('\n')

print('=== .notice-item structure check ===')
for i, line in enumerate(lines):
    if 'class="notice-item' in line:
        next_lines = '\n'.join(lines[i:i+5])
        has_icon = 'notice-icon' in next_lines
        has_content = 'notice-content' in next_lines
        if not has_icon or not has_content:
            print('LINE %d: notice-item MISSING children - icon=%s, content=%s' % (i+1, has_icon, has_content))
        else:
            pass  # all good

print()
print('=== .h-bar-item structure check ===')
for i, line in enumerate(lines):
    if 'class="h-bar-item"' in line:
        next_lines = '\n'.join(lines[i:i+6])
        has_label = 'h-bar-label' in next_lines
        has_track = 'h-bar-track' in next_lines
        has_fill = 'h-bar-fill' in next_lines
        if not has_label or not has_track or not has_fill:
            print('LINE %d: h-bar-item MISSING parts - label=%s, track=%s, fill=%s' % (i+1, has_label, has_track, has_fill))

print()
print('=== .progress-item structure check ===')
for i, line in enumerate(lines):
    if 'class="progress-item"' in line:
        next_lines = '\n'.join(lines[i:i+10])
        has_header = 'progress-header' in next_lines
        has_bar = 'progress-bar' in next_lines
        has_fill = 'progress-fill' in next_lines
        if not has_header or not has_bar or not has_fill:
            print('LINE %d: progress-item MISSING parts - header=%s, bar=%s, fill=%s' % (i+1, has_header, has_bar, has_fill))

print()
print('=== filter-bar structure check ===')
filter_text = '\n'.join(lines[401:424])
fg = filter_text.count('filter-group')
fl = filter_text.count('filter-label')
fs = filter_text.count('filter-select')
br = 'btn-filter-reset' in filter_text
print('filter-group: %d, filter-label: %d, filter-select: %d, btn-filter-reset: %s' % (fg, fl, fs, br))

print()
print('=== Section structure check ===')
sections = [
    ('sec-overview', 67, 396),
    ('sec-industry', 401, 751),
    ('sec-ecology', 756, 1131),
    ('sec-culture', 1136, 1398),
    ('sec-governance', 1403, 1694),
    ('sec-prosperity', 1699, 2078),
]
for sec_id, start, end in sections:
    sec_text = '\n'.join(lines[start-1:end])
    has_filter = 'filter-bar' in sec_text
    has_weather = 'weather-bar' in sec_text
    has_alert = 'alert-banner' in sec_text
    has_kpi = 'kpi-grid' in sec_text
    has_three = 'layout-three' in sec_text
    has_two = 'layout-two' in sec_text
    if has_three:
        layout_type = 'layout-three'
    elif has_two:
        layout_type = 'layout-two'
    else:
        layout_type = 'NONE'
    print('%s (lines %d-%d): filter=%s, weather=%s, alert=%s, kpi=%s, layout=%s' % (sec_id, start, end, has_filter, has_weather, has_alert, has_kpi, layout_type))

# Count col-sort data-tips
print()
print('=== data-tip on col-sort (interactive sort buttons) ===')
for i, line in enumerate(lines):
    if 'col-sort' in line and 'data-tip' in line:
        print('LINE %d: %s' % (i+1, line.strip()))
