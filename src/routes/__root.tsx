import { useEffect } from 'react'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'
import { useAuthSession } from '@/features/auth/domain/auth.repository'
import { AppLayout } from '@/components/layout/app-layout'
import type { RouterContext } from '@/router'

import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Grouped Order' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),

  component: RootComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  const auth = useAuthSession()
  const router = useRouter()

  useEffect(() => {
    router.update({
      context: {
        ...router.options.context,
        auth: {
          isAuthenticated: auth.isAuthenticated,
          isAdmin: auth.isAdmin,
          isPending: auth.isPending,
          user: auth.user,
        },
      },
    })
  }, [auth.isAuthenticated, auth.isAdmin, auth.isPending, auth.user, router])

  return <AppLayout />
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
