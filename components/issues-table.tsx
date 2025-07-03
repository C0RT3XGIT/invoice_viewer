import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Issue {
  type: string
  field: string
  original: string
  corrected: number
  reason: string
}

export function IssuesTable({ issues }: { issues: Issue[] }) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Field</TableHead>
            <TableHead>Original Value</TableHead>
            <TableHead>Corrected Value</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue, index) => (
            <TableRow key={index}>
              <TableCell>
                <Badge variant={issue.type === "correction" ? "default" : "secondary"}>{issue.type}</Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">{issue.field}</TableCell>
              <TableCell>{issue.original}</TableCell>
              <TableCell>{issue.corrected}</TableCell>
              <TableCell className="max-w-xs">{issue.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
