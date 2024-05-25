import { Suspense } from "react";
import { ActivityList } from "./_components/activity-list";

const ActivityPage = () => {
  return (
    <div className="w-full max-h-[70vh] overflow-y-auto  scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-400  ">
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
