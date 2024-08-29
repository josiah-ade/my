import { useLimitsStore } from "@/providers/stores/statisticsStore";

export default function PlanOption() {
    const paidOption = useLimitsStore((state) => state.limit);
    const bgColorsMap = new Map([
        ["Starter Plan", "bg-secondary text-white"],
        ["Premium Plan", "bg-warning-500 text-white"],
        ["Basic Plan", "bg-success text-white"],
    ]);
    const colorsMap = new Map([
        ["Starter Plan", "text-secondary"],
        ["Premium Plan", "text-warning-500"],
        ["Basic Plan", "text-success"],
    ]);
    // bg-colors
    const backgroundColor = bgColorsMap.get(paidOption?.packageName) || "bg-secondary";
    //   text-colors
    const textColor = colorsMap.get(paidOption?.packageName) || "text-secondary";
    const isHighestPlan = paidOption?.packageName === "Premium Plan";
    return (
        <div className={`mt-2 flex flex-row`}>
            <p
                className={`${backgroundColor} text-white rounded-2xl px-3 py-1 text-center text-sm`}
            >
                {paidOption?.isPaid ? `${paidOption?.packageName}` : "Free Plan"}
            </p>
            <span className={`${textColor} text-secondary font-semibold text-sm pl-2 mt-1 `}>
                {/* {paidOption?.isPaid && !isHighestPlan ? "Upgrade" : ""} */}
                {!isHighestPlan ? "Upgrade" : ""}
            </span>
        </div>
    );
}