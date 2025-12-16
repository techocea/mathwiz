import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveTabTypes } from "@/types";

interface TabSectionProps {
    activeTab: ActiveTabTypes;
    onTabChange: (tab: ActiveTabTypes) => void;
}

const TabSection = ({ activeTab, onTabChange }: TabSectionProps) => {
    return (
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as ActiveTabTypes)}>
            <TabsList>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="marked-papers">Marked Papers</TabsTrigger>
                <TabsTrigger value="marking-schemes">Marking Schemes</TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default TabSection;
