import { DateTime } from "luxon";
import cx from "classix";
import data from "./data.json";
import { useState } from "react";

type ClubData = {
  name: string;
  matchesPlayedOffset: number;
  bracket: string | null;
};

type TableEntry = {
  points: number;
  clubs: ClubData[];
};

type DisplayType = "oneColumn" | "twoColumns";

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

const GamesIdentifier = ({
  matchesPlayedOffset,
}: {
  matchesPlayedOffset: number;
}) => {
  if (matchesPlayedOffset < 0) {
    return (
      <span className="text-xs font-bold text-green-600">
        {matchesPlayedOffset}
      </span>
    );
  }
  if (matchesPlayedOffset > 0) {
    return (
      <span className="text-xs font-bold text-red-600">
        +{matchesPlayedOffset}
      </span>
    );
  }
};

const getBracketClassName = (bracket: string | null) => {
  return cx(
    bracket && "underline decoration-2 underline-offset-2",
    bracket === "championsLeague" && "decoration-sky-600",
    bracket === "relegation" && "decoration-red-600",
  );
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
      <div className={getBracketClassName(bracket)}>{name}</div>
      <GamesIdentifier matchesPlayedOffset={matchesPlayedOffset} />
    </div>
  );
};

const PointsRow = ({
  points,
  clubs,
}: {
  points: number;
  clubs: ClubData[];
}) => {
  return (
    <>
      <div className="text-right tabular-nums">{points}</div>
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

const Table = ({
  table,
  pointsColumnMode,
}: {
  table: TableEntry[];
  pointsColumnMode: "halfWidth" | "minContent";
}) => {
  return (
    <div
      className={cx(
        "grid gap-x-5",
        pointsColumnMode === "halfWidth" && "grid-cols-[1fr_1fr]",
        pointsColumnMode === "minContent" && "grid-cols-[auto_1fr]",
      )}
    >
      {table.map((x) => (
        <PointsRow points={x.points} clubs={x.clubs} />
      ))}
    </div>
  );
};

const Body = ({
  table,
  display,
}: {
  table: TableEntry[];
  display: DisplayType;
}) => {
  if (display === "twoColumns") {
    const midpointIndex = Math.ceil(data.table.length / 2);
    const tableTopHalf = data.table.slice(0, midpointIndex);
    const tableBottomHalf = data.table.slice(midpointIndex);

    return (
      <div className="grid grid-cols-[1fr_1fr] items-start gap-x-5">
        <Table table={tableTopHalf} pointsColumnMode="minContent" />
        <Table table={tableBottomHalf} pointsColumnMode="minContent" />
      </div>
    );
  } else {
    return <Table table={table} pointsColumnMode="halfWidth" />;
  }
};

const Button = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <button
      className="cursor-pointer rounded-md border-1 border-neutral-600 px-2 py-1 text-sm text-neutral-800 hover:bg-neutral-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const Legend = () => {
  return (
    <div className="text-sm text-neutral-700">
      This page shows the Premier League table ordered by points. If teams have
      played more or fewer games than others, this is shown with{" "}
      <GamesIdentifier matchesPlayedOffset={1} /> or{" "}
      <GamesIdentifier matchesPlayedOffset={-1} />. Champions League places are
      underlined in{" "}
      <span className={getBracketClassName("championsLeague")}>blue</span>,
      while relegation places are underlined in{" "}
      <span className={getBracketClassName("relegation")}>red</span>.
    </div>
  );
};

const App = () => {
  const [display, setDisplay] = useState<DisplayType>("twoColumns");

  const onButtonClick = () => {
    setDisplay((prev) => (prev === "oneColumn" ? "twoColumns" : "oneColumn"));
  };

  return (
    <>
      <div className="mx-auto flex max-w-md flex-col gap-2 p-4">
        <Title />
        <Details
          matchesPlayed={data.matchesPlayed}
          lastUpdated={DateTime.fromISO(data.lastUpdated)}
        />

        <div className="flex flex-row justify-end">
          <Button
            onClick={onButtonClick}
            text={display == "oneColumn" ? "One column" : "Two columns"}
          />
        </div>

        <Body table={data.table} display={display} />

        <Legend />
      </div>
    </>
  );
};

export default App;
