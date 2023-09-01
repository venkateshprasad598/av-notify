import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import * as yup from "yup";
import AVESelectInput from "../../components/MultiSelectInput/AVESelectInput";
import AVESelectTemplate from "../../components/NotificationTemplate/AVESelectTemplate";
import useAVESendToUsers from "../../hooks/AVESendToUsers/useAVESendToUsers";

const AVESendToUsers = () => {
  const {
    makeTemplateDynamic,
    handleInputChangeTemplate,
    handleChangeTemplate,
    handleChangeApp,
    handleChangeChannel,
    handleChange,
    selectedUsers,
    channelName,
    appName,
    pushTemplate,
    selectedPushTemplateName,
    smsTemplate,
    selectedSMSTemplateName,
    emailTemplate,
    selectedEmailTemplateName,
    pushNotificationIndex,
    smsNotificationIndex,
    emailNotificationIndex,
    onSendNotification,
    users,
    channels,
    apps,
    theme,
    getStyles,
  } = useAVESendToUsers();

  return (
    <div className="av-notify-dashboard">
      <div className="av-notify-mulltistep">
        <AVESelectInput
          label={"Select User List"}
          inputValue={selectedUsers}
          handleChange={handleChange}
          list={users}
          isMultiple={true}
          inputTheme={theme}
        />

        <AVESelectInput
          label={"Select Channels"}
          inputValue={channelName}
          handleChange={handleChangeChannel}
          list={channels}
          isMultiple={true}
          inputTheme={theme}
        />

        <AVESelectInput
          label={"Select App Name"}
          inputValue={appName}
          handleChange={handleChangeApp}
          list={apps}
          isMultiple={true}
          inputTheme={theme}
        />

        {channelName?.includes("Push") && (
          <AVESelectTemplate
            type="Push"
            label="Select Template"
            notificationIndex={pushNotificationIndex}
            inputValue={selectedPushTemplateName}
            theme={theme}
            template={pushTemplate}
            makeTemplateDynamic={makeTemplateDynamic}
            handleChangeTemplate={handleChangeTemplate}
            handleInputChangeTemplate={handleInputChangeTemplate}
            getStyles={getStyles}
          />
        )}
        {channelName?.includes("SMS") && (
          <AVESelectTemplate
            type="SMS"
            label="Select Template"
            notificationIndex={smsNotificationIndex}
            inputValue={selectedSMSTemplateName}
            theme={theme}
            template={smsTemplate}
            makeTemplateDynamic={makeTemplateDynamic}
            handleChangeTemplate={handleChangeTemplate}
            handleInputChangeTemplate={handleInputChangeTemplate}
            getStyles={getStyles}
          />
        )}

        {channelName?.includes("Email") && (
          <AVESelectTemplate
            type="Email"
            label="Select Template"
            notificationIndex={emailNotificationIndex}
            inputValue={selectedEmailTemplateName}
            theme={theme}
            template={emailTemplate}
            makeTemplateDynamic={makeTemplateDynamic}
            handleChangeTemplate={handleChangeTemplate}
            handleInputChangeTemplate={handleInputChangeTemplate}
            getStyles={getStyles}
          />
        )}

        <div className="ave-send-notification-submit">
          <Button
            variant="contained"
            type="button"
            className="av-notify-placeholder-submit bg-ave-primary"
            onClick={onSendNotification}
          >
            Submit
          </Button>
        </div>

        {/* pushTemplate */}
      </div>
    </div>
  );
};

export default AVESendToUsers;
