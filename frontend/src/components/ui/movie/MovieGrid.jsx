
export default function MovieGrid({ movies, onUpdate }) {
  if (!movies.length) return <p>No movies yet. Add one!</p>

  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'16px'}}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onUpdate={onUpdate} />
      ))}
    </div>
  )
}