import { DateTime } from "luxon";

const Title = () => {
  return (
    <h1 className="text-center text-5xl font-bold">Premier League Table</h1>
  );
};

const LastUpdated = ({ lastUpdated }: { lastUpdated: DateTime }) => {
  return (
    <div className="flex flex-row items-baseline gap-3">
      <div className="text-sm tracking-wide text-gray-700 uppercase">
        Last updated
      </div>
      <div className="text-lg">
        {lastUpdated.toLocal().toFormat("dd MMM yyyy HH:mm")}
      </div>
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

const GamesIdentifier = ({
  matchesPlayedOffset,
}: {
  matchesPlayedOffset: number;
}) => {
  if (matchesPlayedOffset < 0) {
    return <div className="size-2 rounded-full bg-green-600"></div>;
  }
  if (matchesPlayedOffset > 0) {
    return <div className="size-2 rounded-full bg-red-600"></div>;
  }
  return <div className="size-2 rounded-full"></div>;
};

const Club = ({
  name,
  matchesPlayedOffset,
}: {
  name: string;
  matchesPlayedOffset: number;
}) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <div>{name}</div>
      <GamesIdentifier matchesPlayedOffset={matchesPlayedOffset} />
    </div>
  );
};

const PointsRow = ({
  points,
  clubs,
}: {
  points: number;
  clubs: { name: string; matchesPlayedOffset: number }[];
}) => {
  return (
    <>
      <div className="text-right">{points}</div>
      <div className="flex flex-row gap-4">
        {clubs.map((c) => (
          <Club name={c.name} matchesPlayedOffset={c.matchesPlayedOffset} />
        ))}
      </div>
    </>
  );
};

import data from "./data.json";

const App = () => {
  return (
    <>
      <div className="mx-auto flex max-w-md flex-col gap-4 p-4">
        <Title />
        <LastUpdated lastUpdated={DateTime.fromISO(data.lastUpdated)} />

        <div className="grid grid-cols-[1fr_1fr] gap-x-5 font-mono">
          <HeaderRow />
          {data.table.map((x) => (
            <PointsRow points={x.points} clubs={x.clubs} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
