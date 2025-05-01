const ContactItem = ({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) => (
    <div className="flex gap-3">
        <span>{icon}</span>
        <div className="flex flex-col gap-1">
            <h3 className="text-white text-sm font-semibold uppercase">{title}</h3>
            <p className="text-white text-xs">{text}</p>
        </div>
    </div>
);

export default ContactItem;