import React, { useEffect, useState } from "react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
const Inbox = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [channelUrl, setChannelUrl] = useState();
  useEffect(() => {
    if (user) {
      const id = (user?.primaryEmailAddress?.emailAddress).split("@")[0];
      setUserId(id);
    }
  }, [user]);
  return (
    <div>
      <div style={{ width: "100%", height: "500px" }}>
        <SendBirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          nickName={user.fullName}
          userId={userId}
          profileUrl={user?.imageUrl}
          allowProfileEdit={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 h-full ">
            {/* channel list */}
            <div className="p-5 border shadow-lg">
              <GroupChannelList
                onChannelSelect={(channel) => setChannelUrl(channel?.url)}
                channelListQueryParams={{
                  includeEmpty: true,
                }}
              />
            </div>

            {/* messagea area */}
            <div className="grid md:col-span-2 shadow-lg">
              <GroupChannel channelUrl={channelUrl} />
            </div>
          </div>
        </SendBirdProvider>
      </div>
    </div>
  );
};

export default Inbox;
