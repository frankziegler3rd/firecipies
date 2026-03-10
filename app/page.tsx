// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Cocktail = {
  id: string
  name: string
  method: string
  glassware: string
  garnish: string
  season: string
  status: string
}

export default function Home() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCocktails() {
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .eq('status', 'active')
        .order('name')

      if (error) console.error(error)
      else setCocktails(data)
      setLoading(false)
    }

    fetchCocktails()
  }, [])

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔥🍸 Firecipies</h1>
      <ul className="flex flex-col gap-2">
        {cocktails.map((c) => (
          <li
            key={c.id}
            className="p-4 rounded-xl border border-gray-200 active:bg-gray-100"
          >
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-gray-500">{c.method} · {c.glassware}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
