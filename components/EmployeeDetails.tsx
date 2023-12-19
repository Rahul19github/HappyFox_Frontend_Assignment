export default function EmployeeDetails({ details }: any) {
  return (
    <li className="p-2 text-2xl text-black list-disc">
      <span>{details.name},</span>
      <span> {details.designation},</span>
      <span> {details.team}</span>
    </li>
  );
}
