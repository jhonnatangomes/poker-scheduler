import 'dotenv/config';

import { createClient } from '@libsql/client';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';

const requestUrl =
  'https://www.sharkscope.com/poker-statistics/networks/PartyPoker%2CPokerStars/activeTournaments?Filter=Type:H;Date!:1D;Class:SCHEDULED';

async function main() {
  const tournaments = await fetchTournaments();
  const dbClient = await setupDb();
  const dbTournaments = tournaments.map(sharkscopeTournamentToDbTournament);
  const query = generateQuery(dbTournaments);
  await dbClient.execute(query);
}

async function fetchTournaments() {
  if (process.env.NODE_ENV === 'development') {
    const file = readFileSync('sharkscope.json').toString();
    const jsonResponse = JSON.parse(file);
    return jsonResponse.Response.RegisteringTournamentsResponse
      .RegisteringTournaments.RegisteringTournament;
  }
  const response = await fetch(requestUrl, {
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

async function setupDb() {
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  if (process.env.NODE_ENV === 'development') {
    await client.execute(
      'CREATE TABLE IF NOT EXISTS tournaments (id integer primary key autoincrement, site_id text, start_time integer, end_time integer, is_ko integer, speed text, name text, guarantee real, network text, buy_in real, stake real, rake real, tournament_structure_id integer, average_players integer);'
    );
  }
  return client;
}

function sharkscopeTournamentToDbTournament({
  ['@id']: id,
  ['@scheduledStartDate']: startDate,
  ['@lateRegEndDate']: endDate,
  ['@network']: network,
  ['@name']: name,
  ['@rake']: rakeString,
  ['@stake']: stakeString,
  ['@guarantee']: guarantee,
  ['@flags']: flagsString,
}) {
  const stake = parseFloat(stakeString);
  const rake = parseFloat(rakeString);
  const buyIn = stake + rake;
  const flags = flagsString?.split(',');
  const isKo = flags?.includes('B');
  const isTurbo = flags?.includes('T');
  const isHyper = flags?.includes('ST');
  const speed = isTurbo ? 'turbo' : isHyper ? 'hyper' : 'regular';
  return {
    site_id: id,
    start_time: parseInt(startDate) * 1000,
    end_time: parseInt(endDate) * 1000 || null,
    network,
    name,
    rake,
    stake,
    buy_in: buyIn,
    guarantee,
    average_players: guarantee && buyIn ? guarantee / buyIn : null,
    speed,
    is_ko: isKo,
  };
}

function generateQuery(dbTournaments) {
  const keys = Object.keys(dbTournaments[0]);
  const rows = dbTournaments
    .map(
      (tournament) =>
        `(${keys.map((key) => generateRowValue(tournament, key)).join(', ')})`
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
