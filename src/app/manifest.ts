
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Islamly',
    short_name: 'Islamly',
    description: 'Reliable Islamic guidance and study tools rooted in authentic sources',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0304',
    theme_color: '#ad1f37',
    icons: [
      {
        src: '/favicon.png?v=2',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png?v=2',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
