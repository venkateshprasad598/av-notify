import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { users, channels, apps } from "../../constants/notification";

const baseURL = "https://cloud-api.adroit-vantage.com/dev/aim/notification";

const useAVESendToUsers = () => {
  const theme = useTheme();
  //States
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [channelName, setChannelName] = useState([]);
  const [appName, selectAppName] = useState([]);

  //push notification states
  const [pushTemplate, setPushTemplate] = useState([]);
  const [selectedPushTemplateName, setSelectedPushTemplateName] = useState([]);
  const [pushNotificationIndex, setPushNotificationIndex] = useState(null);

  //sms notification states
  const [smsTemplate, setSMSTemplate] = useState([]);
  const [selectedSMSTemplateName, setSelectedSMSTemplateName] = useState([]);
  const [smsNotificationIndex, setSmsNotificationIndex] = useState(null);

  //email notification states
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedEmailTemplateName, setSelectedEmailTemplateName] = useState(
    []
  );
  const [emailNotificationIndex, setEmailNotificationIndex] = useState(null);

  //template api already called for this values
  const [processedValues, setProcessedValues] = useState([]);

  //Static Data

  //Style for select Inputs
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  //Dynamic Functions
  //UserList Function
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(typeof value === "string" ? value.split(",") : value);
  };

  //ChannelList Function
  const handleChangeChannel = (event) => {
    const {
      target: { value },
    } = event;
    setChannelName(typeof value === "string" ? value.split(",") : value);
  };

  //Applist Function
  const handleChangeApp = (event) => {
    const {
      target: { value },
    } = event;
    selectAppName(typeof value === "string" ? value.split(",") : value);
  };

  //On Selecting Template from dropdown
  const handleChangeTemplate = (event, data, dataType) => {
    const {
      target: { value },
    } = event;
    const index = data?.props?.id;
    const type = dataType.toLowerCase();
    if (type == "push") {
      setPushNotificationIndex(index);
      setSelectedPushTemplateName(value);
    } else if (type == "sms") {
      setSmsNotificationIndex(index);
      setSelectedSMSTemplateName(value);
    } else if (type == "email") {
      setEmailNotificationIndex(index);
      setSelectedEmailTemplateName(value);
    }
  };

  //On input change under selected template
  const handleInputChangeTemplate = (event, dataType) => {
    const { value, name } = event.target;

    const type = dataType.toLowerCase();

    if (type == "push") {
      const templates = [...pushTemplate];
      const prevTemplate = templates[pushNotificationIndex];
      prevTemplate["placeholders"][name]["default"] = value;
      setPushTemplate(templates);
    } else if (type == "sms") {
      const templates = [...smsTemplate];
      const prevTemplate = templates[smsNotificationIndex];
      prevTemplate["placeholders"][name]["default"] = value;
      setSMSTemplate(templates);
    } else if (type == "email") {
      const templates = [...emailTemplate];
      const prevTemplate = templates[emailNotificationIndex];
      prevTemplate["placeholders"][name]["default"] = value;
      setEmailTemplate(templates);
    }
  };

  //Extracts <<value>> and sets to default value of the template
  const makeTemplateDynamic = (template) => {
    const message = template?.body;

    const replacementMapping = {};
    Object.keys(template?.placeholders)?.map((data) => {
      console.log({ hey: data });
      replacementMapping[data] = template?.placeholders?.[data]?.["default"];
    });

    console.log({ template, replacementMapping });

    const newMessage = message.replace(/<<([^>]+)>>/g, (match, placeholder) => {
      return replacementMapping[placeholder] || match;
    });
    console.log({ newMessage });
    return "Message  : " + newMessage;
  };

  //API Response is decoded and restructured in a specific way
  const getTemplateRes = (templateRes) => {
    const templatesRes = templateRes?.data?.templates
      ? templateRes?.data?.templates
      : [];

    const encodedTemplates = templatesRes?.length
      ? templatesRes?.map((data) => {
          if (data?.body) {
            const obj = { ...data };
            obj["body"] = atob(data?.body);
            obj["template"] = atob(data?.body);
            return obj;
          }
          return data;
        })
      : [];

    return encodedTemplates;
  };

  //API Requests for getting template
  const makeTemplateRequests = async () => {
    for (const value of channelName) {
      let channelId = value?.toLowerCase();
      if (!processedValues.includes(channelId)) {
        try {
          const response = await axios.get(baseURL, {
            params: {
              requestType: "get-all-templates",
              channelId: channelId,
            },
          });

          if (response.status == 200) {
            const res = getTemplateRes(response);

            if (channelId === "push") {
              setPushTemplate(res);
            } else if (channelId === "sms") {
              setSMSTemplate(res);
            } else if (channelId === "email") {
              setEmailTemplate(res);
            }
            setProcessedValues([...processedValues, channelId]);
          }
        } catch (error) {
          console.error(`Error for ${value}:`, error.message);
        }
      }
    }
  };

  const resetValues = () => {
    setSelectedUsers([]);
    setChannelName([]);
    selectAppName([]);
    setPushTemplate([]);
    setSelectedPushTemplateName([]);
    setPushNotificationIndex(null);
    setSMSTemplate([]);
    setSelectedSMSTemplateName([]);
    setSmsNotificationIndex(null);
    setEmailTemplate([]);
    setSelectedEmailTemplateName([]);
    setEmailNotificationIndex(null);
    setProcessedValues([]);
  };
  //On Submit
  const onSendNotification = async () => {
    console.log("api calling");
    const allTemplates = {
      push: {
        name: "push",
        index: pushNotificationIndex,
        template: pushTemplate[pushNotificationIndex],
      },
      sms: {
        name: "sms",
        index: smsNotificationIndex,
        template: smsTemplate[smsNotificationIndex],
      },
      email: {
        name: "email",
        index: emailNotificationIndex,
        template: emailTemplate[emailNotificationIndex],
      },
    };

    const channels = [];

    for (const value of channelName) {
      const channelItem = value?.toLowerCase();
      const channelObj = {
        channel: "",
        title: "<Title>",
        appName: "wm2.0",
        section: "general",
        placeholders: [],
        template: "general:v1",
      };
      if (
        allTemplates?.[channelItem]?.["index"] == 0 ||
        allTemplates?.[channelItem]?.["index"]
      ) {
        channelObj["channel"] = allTemplates?.[channelItem]?.["name"];
        channelObj["appName"] = appName[0] ? appName[0] : "wm2.0";
        const currentTemplate = allTemplates[channelItem]["template"];
        const placeholdersArr = [];
        Object.keys(currentTemplate?.["placeholders"])?.map((data) => {
          placeholdersArr.push({
            ph: data,
            value: currentTemplate?.placeholders?.[data]?.default,
          });
        });
        channelObj["placeholders"] = placeholdersArr;
        channels.push(channelObj);
      }
    }

    const payloadObj = {
      requestType: "send-bulk-notification-via-user-list",
      userList: selectedUsers,
      userDataSourceType: "manual",
      notificationType: "promotional",
      channels: channels,
    };

    try {
      const postNotifyRes = await axios.post(baseURL, payloadObj);
      if (postNotifyRes.status == 200) {
        resetValues();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (channelName?.length) {
      makeTemplateRequests();
    }
  }, [channelName]);

  return {
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
  };
};

export default useAVESendToUsers;
