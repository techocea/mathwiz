import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const MEDIUMS = ["english", "sinhala"];
const YEARS = ["2025", "2026", "2027"];

interface FilterComponentProps {
    year: string;
    medium: string;
    onMediumChange: (value: string) => void;
    onYearChange: (value: string) => void;
}

const FilterComponent = ({
    year,
    medium,
    onMediumChange,
    onYearChange,
}: FilterComponentProps) => {
    return (
        <div className="bg-white rounded-lg flex gap-4 border p-4 mb-4 max-w-lg">
            <div className="space-y-3 w-full">
                <Label htmlFor="medium">Select Medium</Label>
                <Select value={medium} onValueChange={(value) => onMediumChange(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select medium" />
                    </SelectTrigger>
                    <SelectContent>
                        {MEDIUMS.map((m, idx) => (
                            <SelectItem key={idx} value={m}>
                                {m}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-3 w-full">
                <Label htmlFor="year">Select Year</Label>
                <Select value={year} onValueChange={(value) => onYearChange(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {YEARS.map((y, idx) => (
                            <SelectItem key={idx} value={y}>
                                {y}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default FilterComponent;
