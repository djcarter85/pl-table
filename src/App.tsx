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
      <div className="text-lg">09 Feb 2026 11:00</div>
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

const PointsRow = ({
  points,
  clubs,
}: {
  points: number;
  clubs: { name: string }[];
}) => {
  return (
    <>
      <div className="text-right">{points}</div>
      <div className="flex flex-row gap-4">
        {clubs.map((c) => (
          <span>{c.name}</span>
        ))}
      </div>
    </>
  );
};

function App() {
  const data = [
    { points: 56, clubs: [{ name: "ARS" }] },
    { points: 55, clubs: [] },
    { points: 54, clubs: [] },
    { points: 53, clubs: [] },
    { points: 52, clubs: [] },
    { points: 51, clubs: [] },
    { points: 50, clubs: [{ name: "MNC" }] },
    { points: 49, clubs: [] },
    { points: 48, clubs: [] },
    { points: 47, clubs: [{ name: "AVL" }] },
    { points: 46, clubs: [] },
    { points: 45, clubs: [] },
    { points: 44, clubs: [{ name: "MNU" }] },
    { points: 43, clubs: [{ name: "CHE" }] },
    { points: 42, clubs: [] },
    { points: 41, clubs: [] },
    { points: 40, clubs: [] },
    { points: 39, clubs: [{ name: "LIV" }, { name: "BRE" }] },
    { points: 38, clubs: [] },
    { points: 37, clubs: [{ name: "EVE" }] },
    { points: 36, clubs: [{ name: "SUN" }] },
    { points: 35, clubs: [] },
    { points: 34, clubs: [{ name: "FUL" }, { name: "BOU" }] },
    { points: 33, clubs: [{ name: "NEW" }] },
    { points: 32, clubs: [{ name: "CRY" }] },
    { points: 31, clubs: [{ name: "BRI" }] },
    { points: 30, clubs: [] },
    { points: 29, clubs: [{ name: "TOT" }, { name: "LEE" }] },
    { points: 28, clubs: [] },
    { points: 27, clubs: [] },
    { points: 26, clubs: [{ name: "FOR" }] },
    { points: 25, clubs: [] },
    { points: 24, clubs: [] },
    { points: 23, clubs: [{ name: "WHU" }] },
    { points: 22, clubs: [] },
    { points: 21, clubs: [] },
    { points: 20, clubs: [] },
    { points: 19, clubs: [] },
    { points: 18, clubs: [] },
    { points: 17, clubs: [] },
    { points: 16, clubs: [] },
    { points: 15, clubs: [{ name: "BUR" }] },
    { points: 14, clubs: [] },
    { points: 13, clubs: [] },
    { points: 12, clubs: [] },
    { points: 11, clubs: [] },
    { points: 10, clubs: [] },
    { points: 9, clubs: [] },
    { points: 8, clubs: [{ name: "WOL" }] },
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
