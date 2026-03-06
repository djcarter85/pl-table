import { DateTime } from "luxon";
import cx from "classix";

const Title = () => {
  return (
    <h1 className="text-center text-3xl font-bold">Premier League Table</h1>
  );
};

const Details = ({
  matchesPlayed,
  lastUpdated,
}: {
  matchesPlayed: number;
  lastUpdated: DateTime;
}) => {
  const lastUpdatedLocal = lastUpdated.toLocal();
  return (
    <p>
      After <span className="text-lg font-bold">{matchesPlayed}</span> matches,
      on <span>{lastUpdatedLocal.toFormat("dd MMM yyyy")}</span> at{" "}
      <span>{lastUpdatedLocal.toFormat("HH:mm")}</span>.
    </p>
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
    return (
      <div className="text-xs font-bold text-green-600">
        {matchesPlayedOffset}
      </div>
    );
  }
  if (matchesPlayedOffset > 0) {
    return (
      <div className="text-xs font-bold text-red-600">
        +{matchesPlayedOffset}
      </div>
    );
  }
};

const Club = ({
  name,
  matchesPlayedOffset,
  bracket,
}: {
  name: string;
  matchesPlayedOffset: number;
  bracket: string | null;
}) => {
  return (
    <div className="flex flex-row items-start gap-1">
      <div
        className={cx(
          bracket && "underline decoration-2 underline-offset-2",
          bracket === "championsLeague" && "decoration-sky-600",
          bracket === "relegation" && "decoration-red-600",
        )}
      >
        {name}
      </div>
      <GamesIdentifier matchesPlayedOffset={matchesPlayedOffset} />
    </div>
  );
};

const PointsRow = ({
  points,
  clubs,
}: {
  points: number;
  clubs: {
    name: string;
    matchesPlayedOffset: number;
    bracket: string | null;
  }[];
}) => {
  return (
    <>
      <div className="text-right">{points}</div>
      <div className="flex flex-row gap-4">
        {clubs.map((c) => (
          <Club
            name={c.name}
            matchesPlayedOffset={c.matchesPlayedOffset}
            bracket={c.bracket}
          />
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
        <Details
          matchesPlayed={data.matchesPlayed}
          lastUpdated={DateTime.fromISO(data.lastUpdated)}
        />

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
