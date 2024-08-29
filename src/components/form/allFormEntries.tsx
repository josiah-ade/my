import { useGetAllEntries } from "@/providers/hooks/query/getform";
import EmptyState from "../common/empty/empty";

interface IProps {
  formId: string;
}

export default function AllFormEntries({ formId }: IProps) {
  const { data } = useGetAllEntries(formId);

  return (
    <section>
      {data?.length ? (
        <>
          {data.map((entry, index) => (
            <div key={entry.fieldName} className="mt-4 p-4 lg:p-7 bg-gray-75 rounded-lg">
              <h1 className="text-xl font-bold mb-4">
                {index + 1}. {entry.fieldName}
              </h1>
              <div>
                {entry.fields.map((item) => (
                  <p key={item.fieldId}>{item.value}</p>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <EmptyState title="No Submitted Entries" />
      )}
    </section>
  );
}
