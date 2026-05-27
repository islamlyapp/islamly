import { NextResponse } from 'next/server'
import { calculateCurrentFeatures, formatFeatureCount } from '@/lib/feature-counter'

export async function GET() {
  try {
    const count = calculateCurrentFeatures()
    const formatted = formatFeatureCount(count)
    return NextResponse.json({ count, formatted })
  } catch (err) {
    return NextResponse.json({ error: 'failed to compute features' }, { status: 500 })
  }
}
