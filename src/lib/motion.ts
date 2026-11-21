// Satu sumber untuk semua animasi reveal di situs
export const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1]

export const DURATION = {
  pop: 0.35,    // elemen kecil: titik, ikon
  reveal: 0.75, // blok dan teks
}

export const STAGGER = 0.18      // antar item terpisah (kartu, tile)
export const DISTANCE = { up: 16, side: 14 }

// Pemicu saat scroll: sekali saja, saat 40% elemen terlihat
export const VIEWPORT = { once: true, amount: 0.4 }