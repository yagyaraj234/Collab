import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "./hint";
import { HelpCircle, User2 } from "lucide-react";
export const BoardList = () => {
  return (
    <div className="space-y-2 border-l-2 h-full pl-4">
      <div className="flex items-center font-semibold text-left text-neutral-700 fotn">
        <User2 className="h- w-6 mr-2" />
        Your boards
      </div>
      <div
        className="grid grid-cols-2
         sm:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        <FormPopover sideOffset={10} side={`right`}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition p-4 text-neutral-700 "
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description="Free Plan you can create maximum 5 board upgrade to higher plan to create more boards"
            >
              <HelpCircle className="h-4 w-4 right-2 absolute bottom-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
