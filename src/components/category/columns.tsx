"use client"

import { TCategoryTableSchema } from "@/lib/schema/category"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { DeleteCategoryAPI } from "@/actions/protected/culinary/category"
import { toast } from "../ui/use-toast"
import Link from "next/link"

export const columns: ColumnDef<TCategoryTableSchema>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={{
                  query: { editId: category.id },
                }}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                className="text-red-500"
                href={{
                  query: { deleteId: category.id },
                }}
              >
                Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]