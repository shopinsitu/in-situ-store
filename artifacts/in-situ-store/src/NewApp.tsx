import { useState } from 'react';
import { Link, Route, Switch } from 'wouter';
import { Menu, X } from 'lucide-react';
import App from './App';

const image = (id: string, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

const categoryPieces = [
  { fig: 'A', label: 'Furniture', image: image('276528', 900), href: '/shop' },
  { fig: 'B', label: 'Art', image: image('1099816', 900), href: '/shop' },
  { fig: 'C', label: 'Objects', image: image('6186509', 900), href: '/shop' },
  { fig: 'D', label: 'For lounging', image: image('271743', 900), href: '/shop' },
  { fig: 'E', label: 'Useful things', image: image('1350789', 900), href: '/shop' },
  { fig: 'F', label: 'Lighting', image: image('1112598', 900), href: '/shop' },
];

const newArrivals = [
  { name: 'Italian lounge chair in oxblood leather', meta: 'Italy · 1970s', price: '$1,850', image: image('276528', 900), href: '/product/italian-lounge-chair' },
  { name: 'Travertine candleholder, pair', meta: 'Italy · Contemporary', price: '$240', image: image('6186509', 900), href: '/product/travertine-candleholder' },
  { name: 'Brass library lamp by Stilnovo', meta: 'Milan · 1960s', price: '$780', image: image('1112598', 900), href: '/product/brass-library-lamp' },
  { name: 'Oak milking stool with turned legs', meta: 'France · 1920s', price: '$420', image: image('1350789', 900), href: '/product/oak-stool' },
];

function HomeMenu({ close }: { close: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex min-h-[100dvh] flex-col bg-[#efe9dd] px-6 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] text-[#2e2118] md:hidden">
      <div className="flex items-center justify-between">
        <span className="mono text-[9px]">IN SITU</span>
        <button onClick={close} aria-label="Close navigation"><X size={22} strokeWidth={1.25} /></button>
      </div>
      <nav className="mt-auto mb-auto flex flex-col gap-2">
        <Link href="/shop" onClick={close} className="display-serif text-[17vw] leading-[0.9]">Shop</Link>
        <Link href="/collections" onClick={close} className="display-serif text-[17vw] leading-[0.9]">Collections</Link>
        <Link href="/about" onClick={close} className="display-serif text-[17vw] leading-[0.9]">About</Link>
      </nav>
      <div className="mono flex justify-between text-[8px] opacity-60">
        <span>@shopinsitu</span>
        <span>shopinsitu.co</span>
      </div>
    </div>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-hidden bg-[#efe9dd] text-[#2e2118]">
      <section className="relative min-h-[100svh] overflow-hidden bg-[#19140f] text-white md:min-h-[96vh]">
        <img
          src={image('271743', 2400)}
          alt="Collected interior with antique furniture and objects"
          className="absolute inset-0 h-full w-full object-cover object-center grayscale-[8%] sepia-[7%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,9,.42)_0%,rgba(20,14,9,.08)_34%,rgba(20,14,9,.12)_68%,rgba(20,14,9,.44)_100%)]" />

        <div className="absolute left-0 right-0 top-0 z-20 hidden items-center justify-between px-10 py-8 md:flex">
          <nav className="mono flex gap-9 text-[9px]">
            <Link href="/shop" className="transition-opacity hover:opacity-60">Shop</Link>
            <Link href="/collections" className="transition-opacity hover:opacity-60">Collections</Link>
            <Link href="/about" className="transition-opacity hover:opacity-60">About</Link>
          </nav>
          <div className="mono flex gap-9 text-[9px]">
            <Link href="/shop" className="transition-opacity hover:opacity-60">Search</Link>
            <Link href="/shop" className="transition-opacity hover:opacity-60">Bag (0)</Link>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))] md:hidden">
          <button onClick={() => setMenuOpen(true)} aria-label="Open navigation" className="p-1"><Menu size={24} strokeWidth={1.1} /></button>
          <Link href="/shop" className="mono text-[8px]">Bag (0)</Link>
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-20 pt-28 text-center md:min-h-[96vh] md:px-10 md:pb-16 md:pt-20">
          <div className="wordmark-wrapper w-full max-w-[950px] overflow-visible">
            <h1 className="wordmark whitespace-nowrap text-[21vw] leading-none sm:text-[18vw] md:text-[13vw] lg:text-[11vw]">IN SITU</h1>
          </div>
          <p className="mono mt-2 text-[7px] tracking-[0.38em] sm:text-[8px] md:mt-5 md:text-[10px]">Furniture · Objects · Furnishings</p>
          <p className="display-serif mt-9 text-[30px] italic leading-none sm:text-4xl md:mt-12 md:text-4xl">Unusual & considered things.</p>
          <Link href="/shop" className="mono mt-9 border-b border-white pb-2 text-[8px] md:mt-10 md:text-[9px]">Shop new arrivals →</Link>
        </div>

        <p className="mono absolute bottom-6 right-5 z-10 hidden max-w-36 text-right text-[8px] leading-relaxed md:block">A more considered home</p>
      </section>

      <section className="relative border-b border-[#2e2118]/45 px-5 pb-12 pt-10 md:min-h-[900px] md:px-10 md:pb-16 md:pt-12">
        <div className="flex items-start justify-between gap-6">
          <h2 className="mono text-[14px] tracking-[0.28em] md:text-[19px]">Shop categories</h2>
          <div className="hidden max-w-[270px] md:block">
            <p className="display-serif text-[25px] italic leading-[1.05]">Furniture, objects and old things with character.</p>
            <Link href="/shop" className="mono mt-6 inline-block border-b border-[#2e2118] pb-2 text-[8px]">Explore all →</Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 md:absolute md:inset-x-10 md:bottom-28 md:top-24 md:mt-0 md:block">
          {categoryPieces.map((piece, index) => (
            <Link
              href={piece.href}
              key={piece.fig}
              className={`group relative block ${index === 0 ? 'md:absolute md:left-[1%] md:top-[10%] md:w-[18%]' : ''} ${index === 1 ? 'md:absolute md:left-[29%] md:top-[2%] md:w-[16%]' : ''} ${index === 2 ? 'md:absolute md:left-[48%] md:top-[8%] md:w-[18%]' : ''} ${index === 3 ? 'md:absolute md:left-[2%] md:top-[49%] md:w-[35%]' : ''} ${index === 4 ? 'md:absolute md:left-[43%] md:top-[56%] md:w-[17%]' : ''} ${index === 5 ? 'md:absolute md:right-[2%] md:top-[22%] md:w-[19%]' : ''}`}
            >
              <div className={`flex items-center justify-center overflow-hidden bg-transparent ${index === 3 ? 'aspect-[1.4/1]' : 'aspect-[4/5]'} md:aspect-auto`}>
                <img
                  src={piece.image}
                  alt={piece.label}
                  loading="lazy"
                  className="h-full w-full object-cover mix-blend-multiply grayscale-[18%] sepia-[10%] transition-transform duration-[1.4s] group-hover:scale-[1.025] md:max-h-[390px] md:object-contain"
                />
              </div>
              <div className="mt-2 flex items-center justify-between md:mt-1">
                <span className="display-serif text-lg italic">fig. {piece.fig}</span>
                <span className="mono text-[7px] md:hidden">{piece.label}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <p className="display-serif max-w-[270px] text-[26px] italic leading-[1.05]">Furniture, objects and old things with character.</p>
          <Link href="/shop" className="mono mt-6 inline-block border-b border-[#2e2118] pb-2 text-[8px]">Explore all →</Link>
        </div>

        <div className="mono mt-12 flex justify-between border-t border-[#2e2118]/55 pt-5 text-[7px] md:absolute md:bottom-5 md:left-10 md:right-10 md:mt-0 md:text-[8px]">
          <span>Objects for a more considered home.</span>
          <span>IN SITU</span>
        </div>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mb-7 flex items-end gap-5">
          <h2 className="display-serif whitespace-nowrap text-4xl italic md:text-5xl">New arrivals</h2>
          <div className="mb-2 h-px flex-1 bg-[#2e2118]/55" />
          <Link href="/shop" className="mono mb-1 hidden text-[8px] sm:block">View all →</Link>
        </div>
        <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-4 md:gap-5">
          {newArrivals.map((item) => (
            <Link key={item.name} href={item.href} className="group min-w-[76vw] snap-start sm:min-w-0">
              <div className="aspect-[4/5] overflow-hidden bg-[#ddd4c6]">
                <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover grayscale-[12%] transition-transform duration-[1.5s] group-hover:scale-[1.025]" />
              </div>
              <p className="display-serif mt-3 text-xl leading-[1.05] md:text-2xl">{item.name}</p>
              <div className="mono mt-2 flex justify-between gap-3 text-[7px] md:text-[8px]">
                <span>{item.meta}</span>
                <span>{item.price}</span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/shop" className="mono mt-4 inline-block border-b border-[#2e2118] pb-2 text-[8px] sm:hidden">View all →</Link>
      </section>

      {menuOpen && <HomeMenu close={() => setMenuOpen(false)} />}
    </div>
  );
}

export default function NewApp() {
  return (
    <>
      <style>{`
        a[href="/visit"] { display: none !important; }
      `}</style>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route><App /></Route>
      </Switch>
    </>
  );
}
