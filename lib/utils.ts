import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type StackedCardItem = {
  id: number
  title: string
  description: string
  color: string
}

export const cardData: StackedCardItem[] = [
  {
    id: 1,
    title: "Create Batch",
    description: "Define the product, quantity, and production parameters to kick off a new manufacturing run.",
    color: "rgba(139, 92, 246, 0.8)",
  },
  {
    id: 2,
    title: "Assign & Operate",
    description: "Operators receive their tasks and log production activity in real time from the floor.",
    color: "rgba(168, 111, 255, 0.78)",
  },
  {
    id: 3,
    title: "Inspect & Approve",
    description: "QC teams run inspections, flag issues, and supervisors review and approve or request corrections.",
    color: "rgba(129, 83, 235, 0.78)",
  },
  {
    id: 4,
    title: "Trace & Export",
    description: "Every batch is fully traceable end-to-end. Export records, audit logs, and compliance reports in one click.",
    color: "rgba(199, 120, 255, 0.76)",
  },
]
