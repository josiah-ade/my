import { useGetSingleEntries } from "@/providers/hooks/query/getform";
import EmptyState from "../common/empty/empty";
import Accordion from "../accordion/accordion";

interface IProps {
  formId: string;
}

export default function SingleFormEntries({ formId }: IProps) {
  const { data } = useGetSingleEntries(formId);

  return (
    <section>
      <div className="flex mt-4 items-center justify-center">
        <div className="flex w-full flex-col gap-2 ">
          {data?.length ? (
            data?.map((entry) => (
              <Accordion title={entry.fields[0]?.value ?? ""} className="bg-gray-50">
                <div className="space-y-4 bg-white p-3">
                  {entry.fields.map((item, index) => (
                    <div className="block text-sm px-7 py-3.5 bg-gray-50 text-gray-600">
                      <p className="text-gray-400">
                        {index + 1}. {item.fieldName}
                      </p>
                      <p className="font-medium">{item?.value}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            ))
          ) : (
            <EmptyState title="No Submitted Entries" />
          )}
        </div>
      </div>
    </section>
  );
}
