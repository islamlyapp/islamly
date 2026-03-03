import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Al-Mualim',
    short_name: 'Al-Mualim',
    description: 'AI Quran Teacher & Universal Scholarly Infrastructure',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0304',
    theme_color: '#ad1f37',
    icons: [
      {
        src: 'https://picsum.photos/seed/mualim-icon/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/mualim-icon/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
