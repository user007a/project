import urllib.request

urls = [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
]

for url in urls:
    try:
        resp = urllib.request.urlopen(url, timeout=10)
        size = len(resp.read())
        print(f'{url.split("/")[-1]}: OK ({size} bytes)')
    except Exception as e:
        print(f'{url.split("/")[-1]}: ERROR - {str(e)[:50]}')
