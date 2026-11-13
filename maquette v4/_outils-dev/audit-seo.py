import sys, os, re, json, glob, collections
from bs4 import BeautifulSoup
from PIL import Image
root = sys.argv[1]
DOMAIN = sys.argv[2] if len(sys.argv)>2 else 'https://www.pim-industrie.com/'
os.chdir(root)
pages = sorted(p for p in glob.glob('*.html') if p!='404.html')
issues = collections.defaultdict(list)
titles = collections.defaultdict(list); descs = collections.defaultdict(list); h1s=collections.defaultdict(list)
imgstats = {}
inlinks = collections.Counter()
rows=[]
for p in pages:
    s = BeautifulSoup(open(p,encoding='utf8').read(),'html.parser')
    t = s.title.string.strip() if s.title and s.title.string else ''
    d = (s.find('meta',attrs={'name':'description'}) or {}).get('content','') if s.find('meta',attrs={'name':'description'}) else ''
    h = [x.get_text(' ',strip=True) for x in s.find_all('h1')]
    can = s.find('link',rel='canonical'); can = can['href'] if can else ''
    robots = s.find('meta',attrs={'name':'robots'}); robots = robots['content'] if robots else ''
    titles[t].append(p); descs[d].append(p)
    for x in h: h1s[x].append(p)
    if not t: issues[p].append('title manquant')
    elif len(t)>60: issues[p].append(f'title long ({len(t)})')
    elif len(t)<30: issues[p].append(f'title court ({len(t)})')
    if not d: issues[p].append('meta description manquante')
    elif len(d)>160: issues[p].append(f'description longue ({len(d)})')
    elif len(d)<70: issues[p].append(f'description courte ({len(d)})')
    if len(h)!=1: issues[p].append(f'{len(h)} h1')
    if not can: issues[p].append('canonical manquant')
    exp = DOMAIN + ('' if p=='index.html' else p)
    if can and can!=exp: issues[p].append(f'canonical inattendu {can}')
    if not s.find('meta',property='og:image'): issues[p].append('og:image manquant')
    if not s.find('meta',property='og:title'): issues[p].append('og:title manquant')
    lds = s.find_all('script',type='application/ld+json')
    types=[]
    for l in lds:
        try:
            j=json.loads(l.string)
            for n in j.get('@graph',[j]):
                ty=n.get('@type'); types += ty if isinstance(ty,list) else [ty]
        except Exception as e: issues[p].append('JSON-LD invalide '+str(e))
    if not lds: issues[p].append('pas de JSON-LD')
    # heading order
    lv=[int(x.name[1]) for x in s.find_all(re.compile('^h[1-6]$'))]
    for a,b in zip(lv,lv[1:]):
        if b>a+1: issues[p].append(f'saut de titre h{a}->h{b}'); break
    for im in s.find_all('img'):
        src=im.get('src','')
        if im.get('alt') is None: issues[p].append(f'img sans alt {src}')
        if not im.get('width') or not im.get('height'): issues[p].append(f'img sans width/height {src}')
        if os.path.exists(src):
            imgstats[src]=os.path.getsize(src)
        elif not src.startswith('http') and not src.startswith('data:'): issues[p].append(f'img introuvable {src}')
    nimg=len(s.find_all('img')); nlazy=len(s.find_all('img',loading='lazy'))
    for a in s.find_all('a',href=True):
        href=a['href'].split('#')[0]
        if not href or re.match(r'^(https?:|mailto:|tel:)',href): continue
        if not os.path.exists(href): issues[p].append(f'lien cassé {a["href"]}')
        elif href.endswith('.html') and href!=p: inlinks[href]+=1
    for el in s.find_all(style=re.compile(r'url\(')):
        for u in re.findall(r"url\(['\"]?([^'\")]+)",el['style']):
            if os.path.exists(u): imgstats[u]=os.path.getsize(u)
            else: issues[p].append(f'bg introuvable {u}')
    main=s.find('main'); words=len((main or s).get_text(' ',strip=True).split())
    if words<300: issues[p].append(f'contenu court ({words} mots)')
    rows.append((p,len(t),len(d),len(h),words,nimg,nlazy,','.join(sorted(set(map(str,types)))),robots))
for k,v in titles.items():
    if len(v)>1: issues['_global'].append(f'title dupliqué: {k} -> {v}')
for k,v in descs.items():
    if len(v)>1: issues['_global'].append(f'description dupliquée -> {v}')
for k,v in h1s.items():
    if len(v)>1: issues['_global'].append(f'h1 dupliqué: {k} -> {v}')
# sitemap
sm=open('sitemap.xml').read(); locs=re.findall(r'<loc>([^<]+)',sm)
smp={('index.html' if l.endswith('/') else l.rsplit('/',1)[1]) for l in locs}
NOI={'cga.html','cgv.html','confidentialite.html','mentions-legales.html'}
for p in pages:
    if p not in smp and p not in NOI: issues['_global'].append('absent du sitemap: '+p)
    if inlinks[p]==0 and p!='index.html': issues['_global'].append('page orpheline: '+p)
for p in smp-set(pages): issues['_global'].append('sitemap -> page inexistante '+p)
# images
allimg=[f for f in glob.glob('img/**/*',recursive=True) if os.path.isfile(f)]
big=[(f,os.path.getsize(f)) for f in allimg if os.path.getsize(f)>200_000]
unused=[f for f in allimg if f not in imgstats and not any(f in open(x,encoding='utf8').read() for x in pages+['style.css'])]
print('page | title | desc | h1 | mots | img | lazy | jsonld | robots')
for r in rows: print(' | '.join(map(str,r)))
print('\nISSUES')
n=0
for k,v in issues.items():
    for i in v: print(k,':',i); n+=1
print('\nTOTAL issues',n)
print('\nImages >200KB:',len(big), 'total img KB', sum(os.path.getsize(f) for f in allimg)//1024)
for f,sz in sorted(big,key=lambda x:-x[1]): 
    try: w,h=Image.open(f).size
    except: w=h='?'
    print(f'  {f} {sz//1024}KB {w}x{h}')
print('Images non utilisées:',len(unused)); [print('  ',u) for u in unused]
