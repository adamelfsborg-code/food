"use client"


import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link"
import { TFoodTableExtendedSchema } from "@/lib/schema/food"
import { formatDate } from "@/lib/date"

export const columns: ColumnDef<TFoodTableExtendedSchema>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const food = row.original
      return formatDate(food.timestamp)
    },
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "foodtype.name",
    header: "Food Type",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
  },
  {
    accessorKey: "kcal",
    header: "KCAL",
  },
  {
    accessorKey: "protein",
    header: "Protein",
  },
  {
    accessorKey: "carbs",
    header: "Carbs",
  },
  {
    accessorKey: "fat",
    header: "Fat",
  },
  {
    accessorKey: "saturated",
    header: "Saturated",
  },
  {
    accessorKey: "unsaturated",
    header: "Unsaturated",
  },
  {
    accessorKey: "fiber",
    header: "Fiber",
  },
  {
    accessorKey: "sugars",
    header: "Sugars",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const food = row.original
 
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
                  query: { editId: food.id },
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
                  query: { deleteId: food.id },
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