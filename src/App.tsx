const HeaderRow = () => {
  return (
    <>
      <div>Points</div>
      <div>Clubs</div>
    </>
  );
};

const PointsRow = ({ points, clubs }: { points: number; clubs: string[] }) => {
  return (
    <>
      <div>{points}</div>
      <div className="flex flex-row gap-2">
        {clubs.map((c) => (
          <span>{c}</span>
        ))}
      </div>
    </>
  );
};

function App() {
  const data = [
    { points: 49, clubs: ["ARS"] },
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
    { points: 36, clubs: [] },
    { points: 35, clubs: ["LIV"] },
    { points: 34, clubs: [] },
    { points: 33, clubs: ["BRE"] },
    { points: 32, clubs: ["NEW", "MNU"] },
    { points: 31, clubs: ["CHE", "FUL"] },
    { points: 30, clubs: ["SUN"] },
    { points: 29, clubs: ["BRI", "EVE"] },
    { points: 28, clubs: ["CRY"] },
    { points: 27, clubs: ["TOT"] },
    { points: 26, clubs: ["BOU"] },
    { points: 25, clubs: [] },
    { points: 24, clubs: [] },
    { points: 23, clubs: [] },
    { points: 22, clubs: ["LEE"] },
    { points: 21, clubs: ["FOR"] },
    { points: 20, clubs: [] },
    { points: 19, clubs: [] },
    { points: 18, clubs: [] },
    { points: 17, clubs: [] },
    { points: 16, clubs: [] },
    { points: 15, clubs: [] },
    { points: 14, clubs: ["WHU"] },
    { points: 13, clubs: ["BUR"] },
    { points: 12, clubs: [] },
    { points: 11, clubs: [] },
    { points: 10, clubs: [] },
    { points: 9, clubs: [] },
    { points: 8, clubs: [] },
    { points: 7, clubs: ["WOL"] },
  ];

  return (
    <>
      <div className="mx-auto max-w-md">
        <div className="grid grid-cols-2">
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
