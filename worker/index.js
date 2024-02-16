import 'dotenv/config';

import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import { setupDb } from '../db';

async function main() {
  const tournaments = await fetchTournaments();
  const dbClient = setupDb();
  const dbTournaments = tournaments.map(sharkscopeTournamentToDbTournament);
  const query = generateQuery(dbTournaments);
  await dbClient.execute('delete from tournaments;');
  await dbClient.execute(query);
}

async function fetchTournaments() {
  if (process.env.NODE_ENV === 'development') {
    const file = readFileSync('sharkscope.json').toString();
    const jsonResponse = JSON.parse(file);
    return jsonResponse.Response.RegisteringTournamentsResponse
      .RegisteringTournaments.RegisteringTournament;
  }
  const response = await fetch(process.env.REQUEST_URL, {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      password: process.env.SHARKSCOPE_PASSWORD,
      username: process.env.SHARKSCOPE_USERNAME,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse.Response.RegisteringTournamentsResponse
    .RegisteringTournaments.RegisteringTournament;
}

function sharkscopeTournamentToDbTournament({
  ['@id']: id,
  ['@scheduledStartDate']: startDate,
  ['@lateRegEndDate']: endDate,
  ['@network']: network,
  ['@name']: name,
  ['@rake']: rakeString,
  ['@stake']: stakeString,
  ['@guarantee']: guaranteeString,
  ['@flags']: flagsString,
}) {
  const round = n => Math.round(n * 100) / 100;
  const stake = parseFloat(stakeString);
  const rake = parseFloat(rakeString);
  const flags = flagsString?.split(',');
  const isKo = flags?.includes('B');
  const isTurbo = flags?.includes('T');
  const isHyper = flags?.includes('ST');
  const speed = isTurbo ? 'turbo' : isHyper ? 'hyper' : 'regular';
  const guarantee = parseFloat(guaranteeString) || null;
  return {
    site_id: id,
    start_time: parseInt(startDate) || null,
    end_time: parseInt(endDate) || null,
    network,
    name,
    rake,
    stake,
    buy_in: round(stake + rake),
    guarantee,
    average_players: guarantee && stake ? Math.round(guarantee / stake) : null,
    speed,
    is_ko: isKo,
  };
}

function generateQuery(dbTournaments) {
  const keys = Object.keys(dbTournaments[0]);
  const rows = dbTournaments
    .map(
      tournament =>
        `(${keys.map(key => generateRowValue(tournament, key)).join(', ')})`,
    )
    .join(', ');
  return `insert into tournaments (${keys.join(', ')}) values ${rows};`;
  function generateRowValue(tournament, key) {
    const textKeys = ['site_id', 'network', 'name', 'speed'];
    if (tournament[key] === null || tournament[key] === undefined) {
      return 'null';
    }
    if (textKeys.includes(key)) {
      return `'${tournament[key].replace(/'/g, "''")}'`;
    }
    return tournament[key];
  }
}

main();
