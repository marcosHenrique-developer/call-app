'use client'

import { globalCss, getCssText } from '@ignite-ui/react'
import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },
})

export function StitchesRegistry({ children }: { children: React.ReactNode }) {
  const [isRendered, setIsRendered] = useState(false)

  useServerInsertedHTML(() => {
    if (!isRendered) {
      setIsRendered(true)
      return (
        <style
          id="stitches"
          dangerouslySetInnerHTML={{
            __html: `${getCssText()} ${globalStyles()}`,
          }}
        />
      )
    }
  })

  return <>{children}</>
}
