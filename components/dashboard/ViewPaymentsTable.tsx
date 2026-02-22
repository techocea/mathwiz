import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { PaymentProps } from "@/global";
import { MoreHorizontal } from "lucide-react";
import DownloadButton from "../shared/DownloadButton";

const ViewPaymentsTable = ({ payments }: PaymentProps) => {
    return (
        <Card className="p-2 rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Submitted At</TableHead>

                        <TableHead align="center" className="text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments.length > 0 ? (
                        payments?.map((p) => (
                            <TableRow key={p._id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center capitalize gap-2">
                                        {p.name}&nbsp;

                                    </div>
                                </TableCell>
                                <TableCell className="capitalize">{p.referenceId}</TableCell>

                                <TableCell>
                                    {new Date(p.createdAt).toLocaleString()}
                                </TableCell>

                                <TableCell align="center" className="cursor-pointer">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="border-2 w-full relative"
                                        >

                                            <DropdownMenuItem>
                                                <DownloadButton
                                                    enableIcon={false}
                                                    variant="ghost"
                                                    publicId={p.cloudinaryPublicId}
                                                    fileName={`payment-slip-${p.name}-${p.referenceId}`}
                                                />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-6">
                                No payment slips found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default ViewPaymentsTable;
