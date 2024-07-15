import { NotificationType } from "@/core/enum/notification";
import useNotificationStore from "@/providers/stores/notificationStore";
import Image from "next/image";

const sampleHeaders = { "Full Name": "", "Phone Number": "", Email: "" };

const exportSampleTemplate = async () => {
  return import("xlsx").then((XLSX) => {
    const ws = XLSX.utils.json_to_sheet<typeof sampleHeaders>([sampleHeaders]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SampleContact");

    ws["!cols"] = [{ wpx: 150 }, { wpx: 200 }, { wpx: 50 }];
    XLSX.writeFile(wb, "SampleContact.xlsx");
  });
};

export default function DownloadSampleTemplate() {
  const setNotification = useNotificationStore((state) => state.setDisplay);

  const downloadedTemplate = () => {
    exportSampleTemplate().then(() => {
      setNotification(true, {
        type: NotificationType.success,
        content: {
          title: "Sample Template Downloaded",
          text: `you have successfully downloaded the sample template`,
        },
      });
    });
  };

  return (
    <div className="flex items-center justify-between p-2 mt-6 border-l-8 border-l-[#0D5EBA] bg-white border rounded shadow-sm">
      <div className="flex items-center p-2 justify-center space-x-4">
        <div className="bg-[#C6DDF7] h-4 w-4 rounded-full p-2">
          <Image src="/check-circle.png" alt="check" width={40} height={40} />
        </div>
        <span className="text-gray-900 text-base font-bold">Download our supported csv/xlsx format template</span>
      </div>
      <p onClick={downloadedTemplate} className="text-orange-500 cursor-pointer hover:underline">
        Download Template
      </p>
    </div>
  );
}
