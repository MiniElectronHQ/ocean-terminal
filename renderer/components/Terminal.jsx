import dynamic from 'next/dynamic'
export const Terminal = dynamic(() => import('./XTermView'), { ssr: false })
