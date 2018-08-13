import { ConnectionString } from 'connection-string'
import Logger from '@machinomy/logger'
import SqlMigrator from '../SqlMigrator'

export function migrationsConfig (connectionUrl: string) {
  let c = new ConnectionString(connectionUrl)
  let segments = c.segments || []
  let filename = c.hostname + '/' + segments.join('/')
  return {
    cmdOptions: {
      'migrations-dir': './packages/machinomy/lib/storage/sqlite/migrations/'
    },
    config: {
      defaultEnv: 'defaultSqlite',
      defaultSqlite: {
        driver: 'sqlite3',
        filename: filename
      }
    }
  }
}

const log = new Logger('migrator:sqlite')

export default class SqliteMigrator extends SqlMigrator {
  constructor (databaseUrl: string) {
    super(log, migrationsConfig(databaseUrl))
  }
}