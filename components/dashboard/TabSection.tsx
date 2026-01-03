import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveTabTypes, ResourceType } from "@/types";

interface TabSectionProps {
    activeTab: ActiveTabTypes;
    resourceType: ResourceType;
    onTabChange: (tab: ActiveTabTypes) => void;
}

const TabSection = ({
    activeTab,
    onTabChange,
    resourceType,
}: TabSectionProps) => {
    return (
        <Tabs
            value={activeTab}
            onValueChange={(value) => onTabChange(value as ActiveTabTypes)}
        >
            <TabsList>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                {(resourceType === "paper" || resourceType === "mini-exam" || resourceType === "speed-paper") && (
                    <TabsTrigger value="marked">Marked</TabsTrigger>
                )}
                <TabsTrigger value="markings">Markings</TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default TabSection;
