import { ReactNode } from 'react'

import type { Metadata } from 'next'
// eslint-disable-next-line
import { Bebas_Neue } from 'next/font/google'
import HeaderCustomerRegistration from '@/components/HeaderCustomerRegistration'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <HeaderCustomerRegistration />
      {children}
    </div>
  )
}