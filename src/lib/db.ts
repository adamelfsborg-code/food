import postgres from 'postgres'

const sql = postgres(process.env.DB_ADDR!) 

export default sql