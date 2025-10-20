//@ts-nocheck
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const localCalls = async () => {
      // guard: nếu client chưa có hoặc user chưa load thì dừng
      if (!client || !user?.id) return;

      setIsLoading(true);

      try {
        // thử bỏ filter trước để kiểm tra response raw:
        // const res = await client.queryCalls({ limit: 20 });
        // console.log("queryCalls (no filter) =>", res);

        // gọi có filter (chú ý 'created_by_user_id' chứ không phải 'create_by_user_id')
        const res = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          limit: 50,
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } } // nếu không đúng: in ra res để kiểm tra field name
            ]
          }
        });

        console.log("queryCalls response:", res);
        setCalls(res.calls ?? []);
        console.log("Time", res.calls[0].state?.createdAt$.source._value)
        console.log("Time - Date", new Date(res.calls[0].state?.createdAt$.source._value))
        console.log("Time compare", new Date(res.calls[0].state?.createdAt$.source._value) < new Date())
      } catch (error) {
        console.error("Failed to query calls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    localCalls();
  }, [client, user?.id]);

  const now = new Date();

  //const endedCalls = calls?.filter((call: any) => {
    //console.log(new Date(call.state.createdAt$.source._value))
    //console.log(now)
    //return (call.state.createdAt$.source._value && new Date(call.state.createdAt$.source._value) < now)
  //});
  //const upcomingCalls = calls?.filter(( call : any) => {
   // return call.state.createdAt$.source._value && new Date(call.state.createdAt$.source._value) > now;
  //});}
   const endedCalls = calls.filter(({state: {startsAt,endedAt}}:Call)=>{
        console.log('ended',startsAt)
        console.log('ended',endedAt)
        return (startsAt && new Date(startsAt)< now || !!endedAt)
    });
    const upcomingCalls = calls.filter(({state:{startsAt}}:Call)=>{
        console.log('upcoming',startsAt)
        return startsAt && new Date(startsAt) > now
    })

  console.log("ended",endedCalls)
  console.log("upcoming",upcomingCalls)

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading
  };
};
