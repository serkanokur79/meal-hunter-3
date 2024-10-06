'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ExternalLink, VideoIcon } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Meal } from '@/app/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import VideoPlayer from './VideoPlayer';

export default function MealTable({ meals }: { meals: Meal[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Meal>[] = [
    {
      accessorKey: 'strMeal',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link href={`/meal/${row.original.idMeal}`} className="hover:underline">
          {row.getValue('strMeal')}
        </Link>
      ),
    },
    {
      accessorKey: 'strMealThumb',
      header: 'Thumbnail',
      cell: ({ row }) => (
        <img
          src={row.getValue('strMealThumb')}
          alt={row.getValue('strMeal')}
          className="h-24 w-36 object-center rounded hover:z-20 hover:scale-150"
        />
      ),
    },
    {
      accessorKey: 'strCategory',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'strArea',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Area
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'strTags',
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.getValue('strTags') as string;
        return tags ? tags.split(',').join(', ') : '-';
      },
    },
    {
      accessorKey: 'ingredients',
      header: 'Ingredients',
      cell: ({ row }) => {
        const ingredients = [
          row.original.strIngredient1,
          row.original.strIngredient2,
          row.original.strIngredient3,
          row.original.strIngredient4,
          row.original.strIngredient5,
        ].filter(Boolean);
        return ingredients.join(', ') + (ingredients.length >= 5 ? '...' : '');
      },
    },
    {
      accessorKey: 'strYoutube',
      header: 'Video',
      cell: ({ row }) => {
        const videoLink = row.getValue('strYoutube') as string;
        return videoLink ? (
          <Dialog>
            <DialogTrigger title="Click to see video in a modal ">
              <VideoIcon className="h-4 w-4 hover:scale-125"  />
            </DialogTrigger>
            <DialogContent className="flex flex-col h-[calc(100dvh-2rem)] my-auto ">
              <DialogHeader>
                <DialogTitle>{row.getValue('strMeal')} video tutorial</DialogTitle>
              </DialogHeader>
         <div >
              {/* <VideoPlayer
                url={videoLink}
                thumbnail={row.getValue('strMealThumb')}
                name={row.getValue('strMeal') || ''}
              /> */}
              <iframe
                className="w-full h-[calc(100vh-8rem)]"
                src={`https://www.youtube.com/embed/${videoLink.split('=')[1]}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          '-'
        );
      },
    },
    {
      accessorKey: 'idMeal',
      header: 'Details',
      cell: ({ row }) => (
        <Link href={`/meal/${row.original.idMeal}`} className="hover:underline" title="Click to go to meal page ">
          <ExternalLink className="h-4 w-4 hover:scale-125" />
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: meals,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
