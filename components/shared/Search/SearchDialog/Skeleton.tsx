'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function SearchDialogSekeleton() {
  return new Array(3)
    .fill(0)
    .map((_, index) => <Skeleton key={index} className="w-full h-8" />)
}
