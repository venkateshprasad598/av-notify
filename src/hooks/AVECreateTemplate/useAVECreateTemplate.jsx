import React, { useState, useEffect } from "react";
import { channels } from "../../constants/notification";
import { useTheme } from "@mui/material";
import {
  createTemplate,
  getAllTemplates,
} from "../../actions/notification/notification";
const useAVECreateTemplate = () => {
  const theme = useTheme();

  const [addTemplateValues, setTemplateValues] = useState({
    selectedChannels: [],
    templateName: "",
    templateBody: "",
  });

  const [newTemplateInProgress, setNewTemplateInProgress] = useState({});
  const [allTemplates, setAllTemplates] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState([]);
  const [isEditTemplate, setEditTemplate] = useState(false);
  const [isAddNewTemplate, setAddNewTemplate] = useState(false);

  const onChangeOfChannels = (event) => {
    const { value } = event.target;
    const selectedChannels =
      typeof value === "string" ? value.split(",") : value;

    setTemplateValues({
      ...addTemplateValues,
      selectedChannels: selectedChannels,
    });
  };

  const onAddTemplate = (event) => {
    const { value, name } = event.target;
    setTemplateValues({
      ...addTemplateValues,
      [name]: value,
    });
  };

  const handleChangeAddNewTemp = () => {
    setAddNewTemplate(true);
    setTemplateValues({
      selectedChannels: [],
      templateName: "",
      templateBody: "",
    });
    isEditTemplate && setEditTemplate(false);
    setNewTemplateInProgress({});
    setActiveTemplate([]);
  };

  const editExistingTemplate = (matches) => {
    const prevTemplate = { ...newTemplateInProgress };

    const prevPlaceholders = prevTemplate?.placeholders;
    const newPlaceholder = {};
    matches?.map((data) => {
      if (!prevPlaceholders[data]) {
        newPlaceholder[data] = {
          default: "",
          required: false,
        };
      } else if (prevPlaceholders[data]) {
        newPlaceholder[data] = { ...prevPlaceholders[data] };
      }
    });
    prevTemplate["placeholders"] = newPlaceholder;
    console.log({ prevTemplate });
    setNewTemplateInProgress(prevTemplate);
  };
  const extractPlaceholders = (template) => {
    const message = template;
    const regex = /<<([^>>]+)>>/g;
    const matches = [];
    let match;

    while ((match = regex.exec(message))) {
      console.log({ match });
      matches.push(match[1]);
    }

    if (matches.length) {
      if (isEditTemplate) {
        editExistingTemplate(matches);
      } else {
        const placeholders = {};
        matches?.map((data) => {
          placeholders[data] = {
            default: "",
            required: false,
          };
        });
        const myTemplate = {
          placeholders: placeholders,
        };
        setNewTemplateInProgress(myTemplate);
      }
    }
  };

  const handleInputChangeTemplate = (event, dataType) => {
    const { value, name } = event.target;
    const prevTemplate = { ...newTemplateInProgress };
    prevTemplate["placeholders"][name]["default"] = value;
    setNewTemplateInProgress(prevTemplate);
  };

  const resetValues = () => {
    setTemplateValues({
      selectedChannels: [],
      templateName: "",
      templateBody: "",
    });
    setNewTemplateInProgress({});
    setEditTemplate(false);
    setAddNewTemplate(false);
    setActiveTemplate([]);
  };

  const onCreateTemplate = async () => {
    if (
      addTemplateValues?.templateBody &&
      addTemplateValues?.templateName &&
      addTemplateValues?.selectedChannels
    ) {
      const payloadObj = {
        ...newTemplateInProgress,
        channelId: "",
        templateId: "",
        templateBody: "",
        requestType: isEditTemplate ? "update-template" : "add-template",
      };

      payloadObj["channelId"] = channels?.[0] ? channels[0]?.toLowerCase() : "";
      const templateName = addTemplateValues.templateName
        ? addTemplateValues.templateName?.toLowerCase().split(" ").join("-")
        : "";
      console.log({ templateName });
      payloadObj["templateId"] = templateName;
      payloadObj["templateBody"] = btoa(addTemplateValues?.["templateBody"]);

      console.log({ payloadObj });

      try {
        const createTemplateRes = await createTemplate(payloadObj);
        if (createTemplateRes?.status == 200) {
          resetValues();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const makeTemplateRequests = async () => {
    const templates = [];
    for (const value of channels) {
      let channelId = value?.toLowerCase();
      try {
        const response = await getAllTemplates(channelId);

        if (response.status == 200) {
          const templatesRes = response?.data?.templates
            ? response?.data?.templates
            : [];
          templates.push(...templatesRes);
        }
      } catch (error) {
        console.error(`Error for ${value}:`, error.message);
      }
    }
    setAllTemplates(templates);
  };

  const inputValue = allTemplates?.map(
    (data) => data.channelId + " : " + data.templateId
  );

  const onChangeOfUpdateChannels = (event) => {
    console.log({ event });

    const { value } = event.target;

    const selectedChannel = allTemplates?.length
      ? allTemplates?.filter((data) => {
          if (data.channelId + " : " + data.templateId == value) return true;
        })[0]
      : {};

    const channelsMapping = {
      push: "Push",
      sms: "SMS",
      Email: "email",
    };
    setTemplateValues({
      selectedChannels: [channelsMapping[selectedChannel?.channelId]],
      templateName: selectedChannel?.templateId
        ? selectedChannel?.templateId
        : "",
      templateBody: selectedChannel?.body ? atob(selectedChannel?.body) : "",
    });
    setNewTemplateInProgress(selectedChannel);
    setEditTemplate(true);
    setActiveTemplate(value);
  };

  useEffect(() => {
    makeTemplateRequests();
  }, []);

  useEffect(() => {
    extractPlaceholders(addTemplateValues.templateBody);
  }, [addTemplateValues.templateBody]);

  console.log({ newTemplateInProgress });

  return {
    onChangeOfChannels,
    addTemplateValues,
    channels,
    theme,
    onAddTemplate,
    newTemplateInProgress,
    handleInputChangeTemplate,
    onCreateTemplate,
    onChangeOfUpdateChannels,
    inputValue,
    allTemplates,
    activeTemplate,
    isEditTemplate,
    handleChangeAddNewTemp,
    isAddNewTemplate,
  };
};

export default useAVECreateTemplate;
