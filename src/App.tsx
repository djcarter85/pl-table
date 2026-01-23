const Title = () => {
  return (
    <h1 className="text-center text-5xl font-bold">Premier League Table</h1>
  );
};

const LastUpdated = () => {
  return (
    <div className="flex flex-row items-baseline gap-3">
      <div className="text-sm tracking-wide text-gray-700 uppercase">
        Last updated
      </div>
      <div className="text-lg">22 Jan 2026 22:00</div>
    </div>
  );
};

const HeaderRow = () => {
  return (
    <>
      <div className="font-title mb-2 text-right font-bold tracking-wider uppercase">
        Points
      </div>
      <div className="font-title mb-2 text-left font-bold tracking-wider uppercase">
        Clubs
      </div>
    </>
  );
};

const PointsRow = ({ points, clubs }: { points: number; clubs: string[] }) => {
  return (
    <>
      <div className="text-right">{points}</div>
      <div className="flex flex-row gap-4">
        {clubs.map((c) => (
          <span>{c}</span>
        ))}
      </div>
    </>
  );
};

function App() {
  const data = [
    { points: 50, clubs: ["ARS"] },
    { points: 49, clubs: [] },
    { points: 48, clubs: [] },
    { points: 47, clubs: [] },
    { points: 46, clubs: [] },
    { points: 45, clubs: [] },
    { points: 44, clubs: [] },
    { points: 43, clubs: ["MCI", "AVL"] },
    { points: 42, clubs: [] },
    { points: 41, clubs: [] },
    { points: 40, clubs: [] },
    { points: 39, clubs: [] },
    { points: 38, clubs: [] },
    { points: 37, clubs: [] },
    { points: 36, clubs: ["LIV"] },
    { points: 35, clubs: ["MNU"] },
    { points: 34, clubs: ["CHE"] },
    { points: 33, clubs: ["BRE", "NEW", "SUN"] },
    { points: 32, clubs: ["EVE"] },
    { points: 31, clubs: ["FUL"] },
    { points: 30, clubs: ["BRI"] },
    { points: 29, clubs: [] },
    { points: 28, clubs: ["CRY"] },
    { points: 27, clubs: ["TOT", "BOU"] },
    { points: 26, clubs: [] },
    { points: 25, clubs: ["LEE"] },
    { points: 24, clubs: [] },
    { points: 23, clubs: [] },
    { points: 22, clubs: ["FOR"] },
    { points: 21, clubs: [] },
    { points: 20, clubs: [] },
    { points: 19, clubs: [] },
    { points: 18, clubs: [] },
    { points: 17, clubs: ["WHU"] },
    { points: 16, clubs: [] },
    { points: 15, clubs: [] },
    { points: 14, clubs: ["BUR"] },
    { points: 13, clubs: [] },
    { points: 12, clubs: [] },
    { points: 11, clubs: [] },
    { points: 10, clubs: [] },
    { points: 9, clubs: [] },
    { points: 8, clubs: ["WOL"] },
  ];

  return (
    <>
      <div className="mx-auto flex max-w-md flex-col gap-4 p-4">
        <Title />
        <LastUpdated />

        <div className="grid grid-cols-[1fr_1fr] gap-x-5 font-mono">
          <HeaderRow />
          {data.map((x) => (
            <PointsRow points={x.points} clubs={x.clubs} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
