export async function POST(req) {
  const { movies } = await req.json()

  const movieList = movies
    .map(m => `- ${m.title} (rated ${m.rating}/5)`)
    .join('\n')

  const res = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.3-70B-Instruct:groq',
        messages: [
          {
            role: 'user',
            content: `You are a movie expert. Based on these movies the user has watched and rated:\n${movieList}\n\nRecommend 5 movies. Reply ONLY with a JSON array like this:\n[{"title":"Movie","year":2020,"reason":"Why they'd love it"}]`
          }
        ],
        max_tokens: 500
      })
    }
  )

  const rawText = await res.text()
  console.log('HF RAW RESPONSE:', rawText)

  let data
  try {
    data = JSON.parse(rawText)
  } catch {
    return Response.json({ error: 'Invalid response', raw: rawText }, { status: 500 })
  }

  const generated = data.choices?.[0]?.message?.content || ''
  console.log('EXTRACTED TEXT:', generated)

  const match = generated.match(/\[[\s\S]*\]/)
  if (!match) return Response.json({ error: 'Could not parse', raw: generated }, { status: 500 })

  return Response.json({ recommendations: JSON.parse(match[0]) })
}