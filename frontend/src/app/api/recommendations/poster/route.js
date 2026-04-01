export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')
  const year = searchParams.get('year')

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&year=${year}&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: 'application/json',
      }
    }
  )

  const data = await res.json()
  console.log('TMDB RESPONSE:', JSON.stringify(data))
  const poster = data.results?.[0]?.poster_path

  if (!poster) return Response.json({ poster: null })

  return Response.json({
    poster: `https://image.tmdb.org/t/p/w500${poster}`
  })
}