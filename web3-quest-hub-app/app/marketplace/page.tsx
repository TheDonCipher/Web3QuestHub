'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import MarketplaceItemCard, { MarketplaceItem } from '@/components/marketplace/MarketplaceItemCard';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: '1',
      name: 'Pixel Sword',
      price: '0.5 ETH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7kPwEuSWu_xGfjurUirC72yG8oS6h0unqaqmTH55zGrenFznZvWvweKHUo__p7PfXk6wtMatGGLI2y2AvaiuTtxsT4yLcQZnXmeWp05AA5nri7M90ruid6SYG9IylL6YYSsVxPKbMGHaQuoCtkqsNBwa3HfZXofGdG9tZc9gD9znMKQf-wq_tC4V_nQ1W8f2gi-3-t5LfdMFAqI57M1TIVZlDwTqn40Lbden5nHuwS7QdeT2hBwBmR64Gg21jOutav0avopRXXs5b',
    },
    {
      id: '2',
      name: 'Cybernetic Armor',
      price: '1.2 ETH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgJpMmgPSpxvsentgzuhNGpi2qKCm1PPgsc8Mk0uC6z5un6tHWYgLVgu33WFz7j-IASXefwGR1LglzuLiy5ajIo_F5by9sj3_O5v2lErA5pMNUyTSRLCnbFoDNBYYasDTCitITsTpcgZ57luPXYBKx8Nlf-LYmcHu370ZU7q1GJC1uLRqRCF-rR02QX3fV2_0fDrvIlWVr2uKxL6XyeN9E6KGQZyaoQlSh29e-qwIbQo-24QNDlbF1r9ENWTmWjhR2fBrzfq8sKqgx',
    },
    {
      id: '3',
      name: 'Mystic Amulet',
      price: '0.8 ETH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdNfJoU1vTLKPuHuiJg00za-8jwWEJa8r5Oqnme5LYkRmQ-7JhTKnO8jyZ5kRB81kFGD6WdbttM1PbN7E6oyk3WPoBU-dIt-eq4gxpl0U-9Q61Mt3ObO5zZUkcPWABtq3-dFHWFQulfIZZ4vQDIeUqwXff2jU7Tz5kcpJa-ZQ0HL4AeebadAKXt2sH0RwZ7KNyQIFKhVFhrV0ft5sWR5ojWeYk3xpmZRUM75SUzu1XIEVKwpEv6sqevIDNCAe7d6r9rw7UN4lFFuCl',
    },
    {
      id: '4',
      name: 'Digital Pet',
      price: '0.3 ETH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp2t_L58YnpmCk9HeqesfzAREjIjMS2B6CzvMXaGaRNYJ94D_mlULzrV12UVJ4hp8_DuFXGWG-QWsyB4r_RqyUPGRU_lB6T2P2sILjglSyfojZZJbFdkQycbpdSNpj5IlNlxY5APrY63vRU6NUx2KPLevvI_u8rFmGyitmki7Li-GwZHLjSdqrzIyNynT-KUIzD4LVsnXInTijw6JnSNwF7Sa6UTCXw7VoQyvUEmKvcbCEJOJsHNyGq5F90PByr26XChiTKCeFqx0a',
    },
    {
      id: '5',
      name: 'Virtual Land',
      price: '2.5 ETH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRR0Ccoa54gw7yHSvMSpOqwibtU6ivpPBhSy-ZU1K0yZ8V8rHEoqb44p4pOZ-qDUdClLIlzVlcR1zI8eq5XDpiHyA_7JEXymOf6M5JxN1ZRD3CSNf6qFxbqaG-abYjvXZOJu9sSY_3rno4Ow6KUkaVXphsvCrih0Be1t2mcpagQ9hj-rOz6i0RMfcVVtKGsdfNyhuSQsupv48mmcZnfjehYhrmyn6zlHhNTjYbN9pOXoWgN7nB6pM0QDJYlN9CXGu4Wvv6xXSDlJLn',
    },
    {
      id: '6',
      name: 'Rare Artifact',
      price: '1.0 ETH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZY4bciVocZn6mP5FjgynYrJ2IQlhDdvyortE3LPif6PZJKPt9lXK65mLoHM7siMkhGCte1d9OgdLqThRRYPT3EMEt25pTaYHmFH2Sl0j_WmjKmwhGgH-Ws2XdT1CIkB2dA9Hy8JkLIGMp8S2KS4odwMYIsbG5ScvZAZc1DgWvrQ-O1-UzUkhGUI-bFiXk-C5PkBMgfvB0jljNCUbRF8Wr4FI-zuxtg6-_T1tjQE7IoAVj7yJiyvrpXNfWNCp_-Cl0e_nJ5mOjqkXt',
    },
    {
      id: '7',
      name: 'Pixelated Vehicle',
      price: '0.7 ETH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwz6YOml8ns_yAnMPc-qF8ROqkL50glJqidxK4-ekw99c1ZUExDXnhqTZwZdVb8020TBNeo8w4tQn3ZOItIj7gEKpxsPvjjiwLs4drjJh9sxbbgJFnFVK5S4OSIHt_nnYXkbzIZmsgx2oIVcrTikRMoglw159CUArVdzM2mJr9DkJS4BqnlvEj4nY6ngcMVytkWxjC-xJKtwYg0xzK_3kTZpS-7gl-fy0Lqzs6T_MZ8PyOzYpLgr2ZBlp2d5FOW15BdPZATuNf5mi7',
    },
    {
      id: '8',
      name: 'Holographic Companion',
      price: '0.6 ETH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANZOSSpO2nOIrandUj3lzSRWwNvHQXv6R99k-qdDUK5joGiy4zDWK5qy-p3Fomqkk4cOKuX1xbu8KK5KlS_5Dyup0s1ycQnMWLwbi4uBncEYnyQRwmxaGVucyiB4BDkvl1qMAnGqOpdm4H_geEOxfThE6OMtZLiC4lrmWbGfWml6etBE7-QsXtZXsGHYDhHwlRGn74sC9QARMp-rp3y5LrpJa3LSNJYcfQIvbS8P7eGCgHOt1PYIeNFCSE8N-qlbHjaymVXVzXU_-k',
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-[var(--primary)] sm:text-5xl">Marketplace</h1>
            <p className="mt-2 text-theme-secondary">Explore and trade unique digital assets within the Web3 Quest Hub.</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-theme-secondary">search</span>
              <input 
                className="form-input h-12 w-full rounded-full border border-[var(--primary)]/20 bg-white/5 pl-10 pr-4 text-theme-primary placeholder:text-theme-secondary focus:border-[var(--primary)] focus:ring-[var(--primary)] focus:outline-none"
                placeholder="Search items, collections, or creators"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[var(--primary)]/20 px-4 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/30">
                Rarity 
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[var(--primary)]/20 px-4 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/30">
                Type 
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[var(--primary)]/20 px-4 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/30">
                Price 
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
            </div>
          </div>

          {/* Marketplace Items Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {marketplaceItems.map((item) => (
              <MarketplaceItemCard 
                key={item.id} 
                item={item}
                onClick={() => console.log('Item clicked:', item.name)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--primary)]/20 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center text-theme-secondary sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a className="text-sm hover:text-[var(--primary)]" href="#">About</a>
            <a className="text-sm hover:text-[var(--primary)]" href="#">Contact</a>
            <a className="text-sm hover:text-[var(--primary)]" href="#">Terms of Service</a>
            <a className="text-sm hover:text-[var(--primary)]" href="#">Privacy Policy</a>
          </div>
          <p className="text-sm">© 2024 Web3 Quest Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
