import postgres from 'postgres'
import { parsedEnv } from './schema/env'

const sql = postgres(parsedEnv.DB_ADDR!) 

export default sql