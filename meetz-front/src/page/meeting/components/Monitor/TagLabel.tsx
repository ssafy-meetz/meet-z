interface TagLabelProps {
  title: string;
  color: string;
}

const TagLabel: React.FC<TagLabelProps> = ({ title, color }) => {
  return (
    <div
      style={{ backgroundColor: color, borderColor: color }}
      className="border-2 shadow-md text-white rounded-full text-sm font-normal px-3 py-2 ml-2"
    >
      {title}
    </div>
  );
};

export default TagLabel;
