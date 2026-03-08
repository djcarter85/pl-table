import { DateTime } from "luxon";
import cx from "classix";
import data from "./data.json";

type ClubData = {
  name: string;
  matchesPlayedOffset: number;
  bracket: string | null;
};

type TableEntry = {
  points: number;
  clubs: ClubData[];
};

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

const HeaderRow = ({ mirrored }: { mirrored: boolean }) => {
  if (!mirrored) {
    return (
      <>
        <div className="mb-1 text-left font-bold tracking-wider uppercase">
          Points
        </div>
        <div className="mb-1 text-right font-bold tracking-wider uppercase">
          Clubs
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="mb-1 text-right font-bold tracking-wider uppercase">
          Clubs
        </div>
        <div className="mb-1 text-left font-bold tracking-wider uppercase">
          Points
        </div>
      </>
    );
  }
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
  mirrored,
}: {
  points: number;
  clubs: ClubData[];
  mirrored: boolean;
}) => {
  if (!mirrored) {
    return (
      <>
        <div className="text-left tabular-nums">{points}</div>
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
  } else {
    return (
      <>
        <div className="flex flex-row gap-4">
          {clubs.map((c) => (
            <Club
              name={c.name}
              matchesPlayedOffset={c.matchesPlayedOffset}
              bracket={c.bracket}
            />
          ))}
        </div>
        <div className="text-right tabular-nums">{points}</div>
      </>
    );
  }
};

const TableHalf = ({ data, mirrored }: { data: TableEntry[], mirrored: boolean }) => {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-x-5">
      {/* <HeaderRow mirrored={mirrored} /> */}
      {data.map((x) => (
        <PointsRow points={x.points} clubs={x.clubs} mirrored={mirrored} />
      ))}
    </div>
  );
};

const App = () => {
  const halfway = Math.ceil(data.table.length / 2);
  const topHalf = data.table.slice(0, halfway);
  const bottomHalf = data.table.slice(halfway);
  return (
    <>
      <div className="mx-auto flex max-w-4xl flex-col gap-2 p-4">
        <Title />
        <Details
          matchesPlayed={data.matchesPlayed}
          lastUpdated={DateTime.fromISO(data.lastUpdated)}
        />

        <div className="grid grid-cols-[1fr_1fr] gap-x-5">
          <TableHalf data={topHalf} mirrored={false} />
          <TableHalf data={bottomHalf} mirrored={true} />
        </div>
      </div>
    </>
  );
};

export default App;
