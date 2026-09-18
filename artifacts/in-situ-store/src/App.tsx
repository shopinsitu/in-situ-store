import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Route, Switch, Link, useLocation, useRoute } from 'wouter';
import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import '@/index.css';

type Product = {
  id: string; name: string; category: string; era: string; material: string; price: number;
  image: string; secondary?: string; note: string; dimensions: string; origin: string;
};

const image = (id: string, width = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
const products: Product[] = [
  { id: 'italian-lounge-chair', name: 'Italian lounge chair in oxblood leather', category: 'Furniture', era: '1970s', material: 'Leather', price: 1850, image: image('276528'), secondary: image('276583'), note: 'A low, generous chair with the patina of a life already well lived. The leather has deepened to the colour of dried cherries.', dimensions: '29 × 31 × 29 in', origin: 'Northern Italy' },
  { id: 'travertine-candleholder', name: 'Travertine candleholder, pair', category: 'Objects', era: 'Contemporary', material: 'Stone', price: 240, image: image('6186509'), secondary: image('2121121'), note: 'Carved from a single block of warm Roman travertine. The small voids and mineral traces are part of its quiet character.', dimensions: '3 × 3 × 6 in each', origin: 'Lazio, Italy' },
  { id: 'brass-library-lamp', name: 'Brass library lamp by Stilnovo', category: 'Lighting', era: '1960s', material: 'Brass', price: 780, image: image('1112598'), secondary: image('157811'), note: 'A precise, architectural pool of light. Rewired and ready for an evening of reading.', dimensions: '8 × 8 × 19 in', origin: 'Milan, Italy' },
  { id: 'walnut-sideboard', name: 'Walnut sideboard with sliding doors', category: 'Furniture', era: '1950s', material: 'Walnut', price: 3200, image: image('2082087'), secondary: image('2082090'), note: 'Beautifully restrained storage, with a floating top and two doors that move with a satisfying weight.', dimensions: '72 × 18 × 29 in', origin: 'Copenhagen, Denmark' },
  { id: 'linen-work', name: 'Untitled linen work, 1984', category: 'Art', era: '1980s', material: 'Linen', price: 1100, image: image('1099816'), secondary: image('4207892'), note: 'A study in chalk, tea and the soft geometry of a remembered room. Signed verso.', dimensions: '24 × 30 in framed', origin: 'New York, USA' },
  { id: 'wool-stripe-throw', name: 'Handwoven wool throw in tobacco stripe', category: 'Textiles', era: 'Contemporary', material: 'Wool', price: 360, image: image('3932930'), secondary: image('5824519'), note: 'Soft enough for the sofa, handsome enough to leave there. Woven in small batches on a traditional floor loom.', dimensions: '55 × 78 in', origin: 'Maine, USA' },
  { id: 'oak-stool', name: 'Oak milking stool with turned legs', category: 'Furniture', era: '1920s', material: 'Oak', price: 420, image: image('1350789'), note: 'The kind of useful object that becomes part of a room without asking for attention.', dimensions: '14 × 14 × 18 in', origin: 'Normandy, France' },
  { id: 'ceramic-vessel', name: 'Black clay vessel with ash glaze', category: 'Objects', era: 'Contemporary', material: 'Ceramic', price: 290, image: image('4207892'), note: 'An irregular, hand-thrown vessel with a smoke-dark surface and a generous opening for branches.', dimensions: '8 × 8 × 12 in', origin: 'Hudson Valley, USA' },
  { id: 'photography-study', name: 'Study of a chair, silver gelatin print', category: 'Art', era: '1990s', material: 'Paper', price: 640, image: image('298842'), note: 'A quiet photograph about the shape left behind when someone has just stood up.', dimensions: '16 × 20 in framed', origin: 'London, UK' },
];

const collections = [
  { slug: 'rooms-for-reading', title: 'Rooms for reading', kicker: 'A small library of things', text: 'Objects for the long afternoon: a good lamp, a chair that holds you, and somewhere to put the book you are not finished with.', image: image('271743') },
  { slug: 'material-studies', title: 'Material studies', kicker: 'Made to be handled', text: 'Stone with a cool edge. Leather softened by use. Linen that catches a late light. A study of surfaces with a memory.', image: image('2079246') },
  { slug: 'the-useful-beautiful', title: 'The useful beautiful', kicker: 'No decoration for decoration’s sake', text: 'The objects that earn their place by doing one thing exceptionally well, then stay for how they look doing it.', image: image('2121120') },
];

type CartItem = { product: Product; quantity: number };
const money = (value: number) => `$${value.toLocaleString('en-US')}`;

function Header({ setMenuOpen, setCartOpen, setSearchOpen, cartCount }: any) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8 flex justify-between items-start mix-blend-difference text-white pointer-events-none">
      <div className="flex gap-7 pointer-events-auto">
        <button onClick={() => setMenuOpen(true)} className="mono text-[9px] hover:opacity-70 transition-opacity md:hidden">Menu</button>
        <nav className="hidden md:flex gap-7">
          <Link href="/shop" className="mono text-[9px] hover:opacity-70 transition-opacity">Shop</Link>
          <Link href="/collections" className="mono text-[9px] hover:opacity-70 transition-opacity">Collections</Link>
          <Link href="/about" className="mono text-[9px] hover:opacity-70 transition-opacity">About</Link>
          <Link href="/visit" className="mono text-[9px] hover:opacity-70 transition-opacity">Visit</Link>
        </nav>
      </div>
      
      <Link href="/" className="pointer-events-auto mt-[-6px] md:absolute md:left-1/2 md:-translate-x-1/2">
        <div className="wordmark-wrapper">
          <span className="wordmark text-[36px] md:text-[56px] leading-none">IN SITU</span>
        </div>
      </Link>
      
      <div className="flex gap-6 pointer-events-auto">
        <button onClick={() => setSearchOpen(true)} className="mono text-[10px] hover:opacity-70 transition-opacity hidden md:block">Search</button>
        <button onClick={() => setCartOpen(true)} className="mono text-[10px] hover:opacity-70 transition-opacity">Cart ({cartCount})</button>
      </div>
    </header>
  );
}

function MenuDrawer({ close }: { close: () => void }) {
  const [, setLocation] = useLocation();
  const nav = (path: string) => { close(); setLocation(path); };
  
  return (
    <motion.div 
      initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-foreground text-background flex flex-col"
    >
      <div className="p-6 md:p-8 flex justify-between items-start">
        <span className="mono text-[10px]">Navigation</span>
        <button onClick={close} className="mono text-[10px] hover:opacity-70">Close</button>
      </div>
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 space-y-2 md:space-y-4">
        {['Shop', 'Collections', 'About', 'Visit'].map(item => (
          <button key={item} onClick={() => nav(`/${item.toLowerCase()}`)} className="text-left display-serif text-6xl md:text-[140px] leading-[0.85] hover:italic hover:translate-x-4 transition-all duration-300">
            {item}
          </button>
        ))}
      </div>
      <div className="p-6 md:p-8 flex justify-between mono text-[10px] opacity-50">
        <span>© 2024 IN SITU</span>
        <span>New York</span>
      </div>
    </motion.div>
  );
}

function CartDrawer({ cart, setCart, close }: any) {
  const total = cart.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);
  
  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.flatMap((item: CartItem) => item.product.id === id ? (item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []) : [item]));
  };

  return (
    <motion.div 
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-background text-foreground flex flex-col border-l border-foreground"
    >
      <div className="p-6 md:p-8 flex justify-between items-start border-b border-foreground">
        <span className="mono text-[10px]">Cart ({cart.reduce((acc: number, i: CartItem) => acc + i.quantity, 0)})</span>
        <button onClick={close} className="mono text-[10px] hover:opacity-70">Close</button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col justify-center">
            <p className="display-serif text-5xl">Your bag is empty.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {cart.map((item: CartItem) => (
              <div key={item.product.id} className="flex gap-6 group">
                <div className="w-24 h-32 bg-muted shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale-[20%]" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="display-serif text-2xl leading-none mb-2">{item.product.name}</p>
                    <p className="mono text-[9px] opacity-60">{item.product.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="mono text-[10px]">{money(item.product.price)}</p>
                    <div className="flex items-center gap-4 border border-foreground px-2 py-1">
                       <button
                         type="button"
                         aria-label={`Decrease quantity of ${item.product.name}`}
                         onClick={() => updateQuantity(item.product.id, -1)}
                       >
                         <Minus size={10} aria-hidden="true" />
                       </button>
                       <span className="mono text-[10px]" aria-live="polite">{item.quantity}</span>
                       <button
                         type="button"
                         aria-label={`Increase quantity of ${item.product.name}`}
                         onClick={() => updateQuantity(item.product.id, 1)}
                       >
                         <Plus size={10} aria-hidden="true" />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="p-6 md:p-8 border-t border-foreground bg-foreground text-background">
          <div className="flex justify-between items-center mb-8">
            <span className="mono text-[10px]">Total</span>
            <span className="text-xl">{money(total)}</span>
          </div>
          <button className="w-full border border-background py-5 mono text-[10px] hover:bg-background hover:text-foreground transition-colors">
            Proceed to checkout
          </button>
        </div>
      )}
    </motion.div>
  );
}

function SearchDrawer({ close }: { close: () => void }) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const searchResults = products.filter((p) => `${p.name} ${p.category} ${p.material}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md text-foreground flex flex-col"
    >
      <div className="p-6 md:p-8 flex justify-between items-start">
        <span className="mono text-[10px]">Search</span>
        <button onClick={close} className="mono text-[10px] hover:opacity-70">Close</button>
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 md:px-24 w-full max-w-5xl mx-auto">
        <label htmlFor="store-search" className="mono mb-4 text-[10px]">
          Search products
        </label>
        <input 
          id="store-search"
          autoFocus 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Material, object, era..." 
          className="bg-transparent border-b border-foreground/30 pb-4 text-4xl md:text-7xl display-serif outline-none placeholder:text-foreground/30 w-full"
        />
        <div className="mt-12">
          {query && searchResults.map(p => (
            <button key={p.id} onClick={() => { close(); setLocation(`/product/${p.id}`); }} className="flex w-full items-center justify-between border-b border-foreground/20 py-6 text-left hover:italic transition-all">
              <span className="display-serif text-2xl md:text-4xl">{p.name}</span>
              <span className="mono text-[10px] opacity-60 hidden md:block">{p.category}</span>
            </button>
          ))}
          {query && searchResults.length === 0 && <p className="display-serif text-3xl opacity-50 mt-8">Nothing quite like that.</p>}
        </div>
      </div>
    </motion.div>
  );
}

function FilterDrawer({ close, ...props }: any) {
  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label="Filter and sort products"
      className="fixed inset-0 z-[100] isolate w-full md:right-auto md:w-[480px] bg-background text-foreground flex min-h-[100dvh] flex-col overflow-hidden border-r border-foreground"
    >
      <div className="shrink-0 px-6 pb-5 pt-[max(1.5rem,env(safe-area-inset-top))] md:p-8 flex justify-between items-start border-b border-foreground">
        <span className="mono text-[10px]">Filter & Sort</span>
        <button type="button" onClick={close} className="mono text-[10px] hover:opacity-70">Close</button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 md:p-8 space-y-12">
        <div>
          <p className="mono text-[10px] mb-4 opacity-50">Category</p>
          <div className="flex flex-wrap gap-2">
            {['All', 'Furniture', 'Objects', 'Lighting', 'Art', 'Textiles'].map(c => (
              <button type="button" key={c} onClick={() => props.setCategory(c)} className={`border border-foreground px-4 py-2 mono text-[9px] ${props.category === c ? 'bg-foreground text-background' : 'hover:bg-foreground/10'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mono text-[10px] mb-4 opacity-50">Era</p>
          <div className="flex flex-wrap gap-2">
            {['All eras', '1920s', '1950s', '1960s', '1970s', '1980s', '1990s', 'Contemporary'].map(e => (
              <button type="button" key={e} onClick={() => props.setEra(e)} className={`border border-foreground px-4 py-2 mono text-[9px] ${props.era === e ? 'bg-foreground text-background' : 'hover:bg-foreground/10'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="shrink-0 px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:p-8 border-t border-foreground bg-background">
        <button type="button" onClick={close} className="w-full bg-foreground text-background py-5 mono text-[10px] hover:bg-foreground/90 transition-colors">
          View {props.resultCount} pieces
        </button>
      </div>
    </motion.div>,
    document.body,
  );
}

function Home() {
  const categoryEdit = [
    { label: 'Seating', fig: 'A', product: products[0] },
    { label: 'Art', fig: 'B', product: products[4] },
    { label: 'Objects', fig: 'C', product: products[1] },
    { label: 'Lighting', fig: 'D', product: products[2] },
    { label: 'Useful things', fig: 'E', product: products[6] },
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#17130f] text-white">
        <motion.img
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          src={image('271743', 2000)}
          alt="A considered room of collected objects"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,8,.18),rgba(17,12,8,.08)_45%,rgba(17,12,8,.5))]" />
        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
          <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, duration: 1.2, ease: "easeOut" }}>
            <h1 className="wordmark display-serif text-[76px] leading-none sm:text-[110px] md:text-[176px]">IN SITU</h1>
            <p className="mono mt-10 text-[8px] tracking-[0.42em] md:text-[10px]">Art · Objects · Furnishings</p>
            <p className="display-serif mx-auto mt-12 max-w-xl text-2xl italic leading-tight md:text-4xl">
              Curated items with unique personalities and humble intention.
            </p>
            <Link href="/shop" className="mono pointer-events-auto mt-10 inline-block border-b border-white pb-2 text-[9px] transition-opacity hover:opacity-60">
              Shop new arrivals →
            </Link>
          </motion.div>
        </div>
        <p className="mono absolute bottom-7 right-6 z-10 max-w-32 text-right text-[8px] leading-relaxed md:bottom-8 md:right-8">
          A more considered home
        </p>
      </section>

      <section className="border-b border-foreground px-6 pb-10 pt-14 md:px-10 md:pb-12 md:pt-20">
        <div className="mb-12 grid gap-8 border-b border-foreground pb-10 md:grid-cols-[1fr_1fr] md:items-start">
          <h2 className="mono text-[13px] tracking-[0.35em] md:text-[18px]">The considered edit</h2>
          <div className="md:ml-auto md:max-w-sm">
            <p className="display-serif text-2xl italic leading-tight md:text-3xl">
              Art, objects, and old things selected for character—not perfection.
            </p>
            <Link href="/shop" className="mono mt-7 inline-block border-b border-foreground pb-2 text-[9px]">Explore all →</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-10 md:gap-x-6">
          {categoryEdit.map((item, index) => (
            <Link
              key={item.label}
              href={`/product/${item.product.id}`}
              className={`group block ${index === 0 ? 'md:col-span-2' : index === 1 ? 'md:col-span-2 md:mt-20' : index === 2 ? 'md:col-span-2' : index === 3 ? 'md:col-span-2 md:mt-28' : 'col-span-2 md:col-span-2 md:mt-8'}`}
            >
              <div className={`overflow-hidden bg-muted ${index === 4 ? 'aspect-[2/1] md:aspect-[3/4]' : index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover grayscale-[28%] sepia-[12%] transition-transform duration-[1.8s] group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="display-serif text-lg italic">fig. {item.fig}</span>
                <span className="mono text-[8px]">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mono mt-14 flex justify-between border-t border-foreground pt-5 text-[8px]">
          <span>Objects for a more considered home.</span>
          <span>IN SITU</span>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mb-8 flex items-end gap-6">
          <h2 className="display-serif text-4xl italic md:text-6xl">New arrivals</h2>
          <div className="mb-2 h-px flex-1 bg-foreground" />
          <Link href="/shop" className="mono mb-1 text-[8px]">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover grayscale-[18%] transition-transform duration-[1.8s] group-hover:scale-[1.03]" />
              </div>
              <p className="display-serif mt-3 text-lg leading-tight md:text-2xl">{product.name}</p>
              <div className="mono mt-2 flex justify-between text-[8px]">
                <span>{product.era}</span>
                <span>{money(product.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Shop({ addToCart }: { addToCart: (p: Product) => void }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [era, setEra] = useState('All eras');
  
  const filtered = useMemo(() => products.filter(p => 
    (category === 'All' || p.category === category) && 
    (era === 'All eras' || p.era === era)
  ), [category, era]);

  useEffect(() => {
    if (!filterOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFilterOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [filterOpen]);

  return (
    <div className="bg-background text-foreground min-h-[100dvh]">
      <div className="h-40 md:h-48"></div>
      
      <div className="px-6 md:px-12 flex justify-between items-end mb-16 md:mb-24">
        <h1 className="display-serif text-7xl md:text-[160px] leading-[0.8] tracking-tighter">Collection</h1>
        <button onClick={() => setFilterOpen(true)} className="mono text-[10px] hover:opacity-70 mb-2 md:mb-6">Filter / Sort</button>
      </div>
      
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-foreground">
          {filtered.map(p => (
            <div key={p.id} className="group relative w-full aspect-[4/5] border-b border-foreground md:even:border-l overflow-hidden bg-muted">
               <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover grayscale-[15%] transition-transform duration-[2.5s] group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
               
               <Link href={`/product/${p.id}`} className="absolute inset-0 z-10">
                 <span className="sr-only">View {p.name}</span>
               </Link>
               
               <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col justify-end text-white mix-blend-difference pointer-events-none z-20 h-1/2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="display-serif text-4xl md:text-5xl">{p.name}</p>
                     <p className="mono text-[10px] mt-3 opacity-80">{p.category} · {p.era}</p>
                   </div>
                   <p className="mono text-[10px] shrink-0">{money(p.price)}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-t border-foreground py-32 text-center">
          <p className="display-serif text-5xl">Nothing quite like that.</p>
          <button onClick={() => { setCategory('All'); setEra('All eras'); }} className="mt-8 mono text-[10px] hover:opacity-70">Clear filters</button>
        </div>
      )}
      
      <AnimatePresence>
        {filterOpen && <FilterDrawer close={() => setFilterOpen(false)} category={category} setCategory={setCategory} era={era} setEra={setEra} resultCount={filtered.length} />}
      </AnimatePresence>
    </div>
  );
}

function ProductDetail({ addToCart, openCart }: { addToCart: (p: Product) => void, openCart: () => void }) {
  const [, params] = useRoute('/product/:id');
  const product = products.find(p => p.id === params?.id) || products[0];
  
  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      <div className="w-full md:w-[60%] h-[60vh] md:h-[100dvh] md:sticky md:top-0 bg-muted">
        <motion.img 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          src={product.image} alt={product.name} className="w-full h-full object-cover" 
        />
      </div>
      <div className="w-full md:w-[40%] bg-foreground text-background min-h-[50vh] md:min-h-[100dvh] p-8 md:p-20 flex flex-col justify-center relative">
        <p className="mono text-[10px] opacity-60 mb-6">{product.category} · {product.era}</p>
        <h1 className="display-serif text-5xl md:text-7xl leading-[0.9] mb-8">{product.name}</h1>
        <p className="mono text-[12px] mb-12">{money(product.price)}</p>
        
        <p className="text-base md:text-lg leading-relaxed font-light mb-16 opacity-90">{product.note}</p>
        
        <div className="grid grid-cols-2 gap-y-6 text-sm border-t border-background/20 py-8 mb-12">
          <div><span className="mono text-[9px] opacity-60 block mb-2">Material</span>{product.material}</div>
          <div><span className="mono text-[9px] opacity-60 block mb-2">Origin</span>{product.origin}</div>
          <div className="col-span-2"><span className="mono text-[9px] opacity-60 block mb-2">Dimensions</span>{product.dimensions}</div>
        </div>
        
        <button onClick={() => { addToCart(product); openCart(); }} className="w-full border border-background py-5 mono text-[10px] hover:bg-background hover:text-foreground transition-colors">
          Acquire piece
        </button>
      </div>
    </div>
  );
}

function Collections() {
  return (
    <div className="bg-foreground text-background min-h-[100dvh] pt-32 md:pt-48 pb-0">
       <div className="px-6 md:px-12 mb-16 md:mb-32">
         <h1 className="display-serif text-6xl md:text-[160px] leading-[0.8] tracking-tighter">Rooms</h1>
       </div>
       <div className="flex flex-col">
         {collections.map((c) => (
           <Link key={c.slug} href={`/collection/${c.slug}`} className="group relative w-full h-[60vh] md:h-[90vh] border-t border-background/20 overflow-hidden block bg-black">
              <img src={c.image} alt={`${c.title} collection`} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-[3s] grayscale-[20%]" />
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-white">
               <p className="mono text-[10px] mb-6">{c.kicker}</p>
               <h2 className="display-serif text-5xl md:text-[100px] leading-none text-center px-4">{c.title}</h2>
             </div>
           </Link>
         ))}
       </div>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col items-center justify-center p-8 md:p-24 text-center">
      <div className="h-32"></div>
      <h1 className="display-serif text-6xl md:text-[140px] mb-16 leading-[0.8] tracking-tighter">The House</h1>
      <div className="max-w-3xl text-xl md:text-3xl leading-[1.4] font-light space-y-12">
        <p>IN SITU was founded on a simple premise: not everything needs to be new to feel entirely right.</p>
        <p>We source useful, peculiar, and quietly beautiful objects. Pieces with a material intelligence that rewards living alongside them.</p>
        <p>Each object is considered for its place in a room, but never prescribed one. The final edit belongs to you.</p>
      </div>
      <div className="h-32"></div>
    </div>
  );
}

function Visit() {
  return (
    <div className="min-h-[100dvh] bg-foreground text-background flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center min-h-[60vh] md:min-h-screen">
        <h1 className="display-serif text-6xl md:text-[140px] leading-[0.8] tracking-tighter mb-12">Visit</h1>
        <p className="text-xl md:text-2xl mb-16 font-light opacity-90">Our rooms in New York are open by appointment.</p>
        <div className="mono text-[10px] space-y-6 opacity-60">
          <p>128 Sparse Avenue<br/>New York, NY 10012</p>
          <p>appointments@insitu.com</p>
        </div>
        <button className="mt-16 w-max border border-background px-8 py-5 mono text-[10px] hover:bg-background hover:text-foreground transition-colors">
          Request an appointment
        </button>
      </div>
      <div className="w-full md:w-1/2 h-[50vh] md:h-[100dvh]">
        <img src={image('271743', 1200)} alt="The IN SITU showroom in New York" className="w-full h-full object-cover grayscale opacity-80" />
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Header setMenuOpen={setMenuOpen} setCartOpen={setCartOpen} setSearchOpen={setSearchOpen} cartCount={cartCount} />
      
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/shop"><Shop addToCart={addToCart} /></Route>
          <Route path="/product/:id"><ProductDetail addToCart={addToCart} openCart={() => setCartOpen(true)} /></Route>
          <Route path="/collections" component={Collections} />
          <Route path="/collection/:slug" component={Collections} /> {/* Minimal fallback */}
          <Route path="/about" component={About} />
          <Route path="/visit" component={Visit} />
          <Route component={Home} />
        </Switch>
      </main>

      <AnimatePresence>
        {menuOpen && <MenuDrawer close={() => setMenuOpen(false)} />}
        {cartOpen && <CartDrawer cart={cart} setCart={setCart} close={() => setCartOpen(false)} />}
        {searchOpen && <SearchDrawer close={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
