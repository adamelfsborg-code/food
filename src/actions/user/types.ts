
import { UUID } from "crypto";

export type UserDto = {
  name: string
  password: string
}

export type UserTable = {
  id: UUID,
  timestamp: Date
  name: string
}