import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Islamly',
    short_name: 'Islamly',
    description: 'AI-Powered Universal Scholarly Infrastructure',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0304',
    theme_color: '#ad1f37',
    icons: [
      {
        src: 'https://picsum.photos/seed/islamly-icon/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/islamly-icon/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
