import EmptyState from "../common/empty/empty";
import WeeklyPlan from "../tab/subscription/weekly";

export const tabs = [
    {
      label: "Weekly Subscription Plans",
      content: 
        <WeeklyPlan />
    },
    {
      label: (
        <>
          Monthly Subscription Plans 
          <span className="text-xs p-2">
            <button disabled className="text-gray-700 rounded-2xl bg-gray-100 p-1 ">
              Coming soon
            </button>
          </span>
        </>
      ),
      content:<EmptyState />,
      disabled: true, 
    },
    {
      label: (
        <>
          Monthly Subscription Plans 
          <span className="text-xs p-2">
            <button disabled className="text-gray-700 rounded-2xl bg-gray-100 p-1 ">
              Coming soon
            </button>
          </span>
        </>
      ),
      content:<EmptyState />,
      disabled: true, 
    },
  ];